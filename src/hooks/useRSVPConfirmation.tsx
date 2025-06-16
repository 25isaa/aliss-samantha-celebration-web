
import { useState } from 'react';
import { useBabyShowerAnalytics } from './useBabyShowerAnalytics';

type RSVPState = 'initial' | 'modal' | 'sending' | 'success' | 'error';

interface FormData {
  nombre: string;
  comentarios: string;
  respuesta: string; // 'asistire' o 'no_asistire'
}

export const useRSVPConfirmation = () => {
  const [state, setState] = useState<RSVPState>('initial');
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    comentarios: '',
    respuesta: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { trackConfirmacion, trackError } = useBabyShowerAnalytics();

  const openModal = (respuesta: string) => {
    setFormData(prev => ({ ...prev, respuesta }));
    setState('modal');
  };

  const closeModal = () => {
    setState('initial');
    setFormData({
      nombre: '',
      comentarios: '',
      respuesta: ''
    });
    setErrorMessage('');
  };

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      setErrorMessage('El nombre es requerido');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const submitConfirmation = async () => {
    if (!validateForm()) return;

    setState('sending');
    
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyT_5xpF403_Tb_oKvnGtxDB5DSpixLKRbXbwkla2FuRXSP7klsNvG8ABW5SFPr-8ENIA/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          respuesta: formData.respuesta,
          comentarios: formData.comentarios
        })
      });

      // Rastrear confirmación exitosa
      trackConfirmacion(
        formData.nombre, 
        formData.respuesta === 'asistire', 
        formData.comentarios
      );

      setState('success');
    } catch (error) {
      console.error('Error al enviar confirmación:', error);
      trackError(error, 'Confirmación RSVP');
      setErrorMessage('Error al enviar la confirmación. Por favor, intenta nuevamente.');
      setState('error');
    }
  };

  const changeResponse = () => {
    setState('initial');
    setFormData({
      nombre: '',
      comentarios: '',
      respuesta: ''
    });
  };

  return {
    state,
    formData,
    errorMessage,
    openModal,
    closeModal,
    updateFormData,
    submitConfirmation,
    changeResponse
  };
};
