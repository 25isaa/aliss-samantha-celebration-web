
import { useState } from 'react';
import { useBabyShowerAnalytics } from './useBabyShowerAnalytics';

export const useRSVPConfirmation = () => {
  const [state, setState] = useState('initial'); // initial, modal, sending, success, error
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    comentarios: '',
    respuesta: '' // 'asistire' o 'no_asistire'
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { trackConfirmacion, trackError } = useBabyShowerAnalytics();

  const openModal = (respuesta) => {
    setFormData(prev => ({ ...prev, respuesta }));
    setState('modal');
  };

  const closeModal = () => {
    setState('initial');
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      comentarios: '',
      respuesta: ''
    });
    setErrorMessage('');
  };

  const updateFormData = (field, value) => {
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
      const response = await fetch('https://script.google.com/macros/s/AKfycbwIVfTvYTUwFX1dXdjV4a2DPdXqHpm_s9JftbbNVUKf99PmITQRoRWSiiJFvGuWVeFB/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          respuesta: formData.respuesta,
          email: formData.email,
          telefono: formData.telefono,
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
      email: '',
      telefono: '',
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
