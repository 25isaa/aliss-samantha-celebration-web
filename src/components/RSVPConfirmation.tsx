

import { Calendar, Clock, MapPin, Heart, Gift, User, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRSVPConfirmation } from '@/hooks/useRSVPConfirmation';

const RSVPConfirmation = () => {
  const {
    state,
    formData,
    errorMessage,
    openModal,
    closeModal,
    updateFormData,
    submitConfirmation,
    changeResponse
  } = useRSVPConfirmation();

  // Estado inicial: mostrar botones de confirmación
  if (state === 'initial') {
    return (
      <div className="text-center mb-8 animate-fade-in-scale">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => openModal('asistire')}
            className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-playfair font-bold text-base sm:text-lg px-6 py-3 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
          >
            ✅ ¡Voy a asistir!
          </Button>
          
          <Button
            onClick={() => openModal('no_asistire')}
            className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-playfair font-bold text-base sm:text-lg px-6 py-3 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
          >
            ❌ No puedo asistir
          </Button>
        </div>
      </div>
    );
  }

  // Estado de éxito: mostrar mensaje de confirmación
  if (state === 'success') {
    return (
      <div className="text-center mb-8 animate-fade-in-scale">
        <div className="glass-effect rounded-2xl p-6 border border-green-300/30">
          <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="font-dancing text-2xl text-green-300 mb-2">
            ¡Confirmación Recibida!
          </h3>
          <p className="font-playfair text-white/90 mb-4">
            {formData.respuesta === 'asistire' 
              ? '¡Gracias por confirmar tu asistencia! Te esperamos con mucha alegría.' 
              : 'Gracias por avisar. Aunque no puedas acompañarnos, estarás en nuestros corazones.'}
          </p>
          <Button
            onClick={changeResponse}
            variant="outline"
            className="border-green-300/50 text-green-300 hover:bg-green-300/10"
          >
            Cambiar respuesta
          </Button>
        </div>
      </div>
    );
  }

  // Estado de error
  if (state === 'error') {
    return (
      <div className="text-center mb-8 animate-fade-in-scale">
        <div className="glass-effect rounded-2xl p-6 border border-red-300/30">
          <MessageCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="font-dancing text-2xl text-red-300 mb-2">
            Error al enviar
          </h3>
          <p className="font-playfair text-white/90 mb-4">
            {errorMessage}
          </p>
          <Button
            onClick={() => openModal(formData.respuesta)}
            className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white"
          >
            Intentar nuevamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Modal de formulario */}
      <Dialog open={state === 'modal' || state === 'sending'} onOpenChange={state === 'sending' ? undefined : closeModal}>
        <DialogContent className="glass-effect border-yellow-300/30 text-white max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="font-dancing text-2xl text-yellow-300 text-center">
              {formData.respuesta === 'asistire' ? '🎉 ¡Qué alegría!' : '💝 Gracias por avisar'}
            </DialogTitle>
          </DialogHeader>

          {state === 'sending' ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-300 mx-auto mb-4"></div>
              <p className="font-playfair text-lg">Enviando...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {errorMessage && (
                <div className="bg-red-500/20 border border-red-300/30 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{errorMessage}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-yellow-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nombre completo *
                </Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => updateFormData('nombre', e.target.value)}
                  placeholder="Tu nombre completo"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-yellow-300"
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comentarios" className="text-yellow-300 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Comentarios adicionales (opcional)
                </Label>
                <Textarea
                  id="comentarios"
                  value={formData.comentarios}
                  onChange={(e) => updateFormData('comentarios', e.target.value)}
                  placeholder="Algún mensaje especial..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-yellow-300 min-h-[80px]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={closeModal}
                  variant="outline"
                  className="flex-1 border-white/30 text-white hover:bg-white/10"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={submitConfirmation}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-purple-800 font-bold"
                >
                  Confirmar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RSVPConfirmation;

