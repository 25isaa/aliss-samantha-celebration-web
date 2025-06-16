
import { useEffect, useCallback, useRef } from 'react';
import babyShowerAnalytics from '../lib/babyShowerAnalytics';

export const useBabyShowerAnalytics = () => {
  // Configurar URL si no está configurada
  const configurarAnalytics = useCallback((googleScriptUrl: string) => {
    babyShowerAnalytics.configurarURL(googleScriptUrl);
  }, []);

  // Rastrear clics con información adicional
  const trackClick = useCallback((elemento: string, contexto?: string) => {
    babyShowerAnalytics.trackClick(elemento, contexto);
  }, []);

  // Rastrear envío de formularios
  const trackFormSubmit = useCallback((formType: string, formData: any) => {
    babyShowerAnalytics.trackFormSubmit(formType, formData);
  }, []);

  // Rastrear confirmación de asistencia
  const trackConfirmacion = useCallback((nombre: string, asistira: boolean, mensaje?: string) => {
    babyShowerAnalytics.trackConfirmacion(nombre, asistira, mensaje);
  }, []);

  // Rastrear selección de regalos
  const trackGift = useCallback((giftData: any) => {
    babyShowerAnalytics.trackGift(giftData);
  }, []);

  // Rastrear compartir contenido
  const trackShare = useCallback((contentType: string, platform: string) => {
    babyShowerAnalytics.trackShare(contentType, platform);
  }, []);

  // Rastrear descargas
  const trackDownload = useCallback((resource: string) => {
    babyShowerAnalytics.trackDownload(resource);
  }, []);

  // Rastrear eventos personalizados
  const trackCustomEvent = useCallback((eventName: string, description: string, data?: any) => {
    babyShowerAnalytics.trackCustomEvent(eventName, description, data);
  }, []);

  // Rastrear errores
  const trackError = useCallback((error: any, context: string) => {
    babyShowerAnalytics.trackError(error, context);
  }, []);

  // Obtener estado del sistema
  const getAnalyticsStatus = useCallback(() => {
    return babyShowerAnalytics.getStatus();
  }, []);

  return {
    configurarAnalytics,
    trackClick,
    trackFormSubmit,
    trackConfirmacion,
    trackGift,
    trackShare,
    trackDownload,
    trackCustomEvent,
    trackError,
    getAnalyticsStatus
  };
};

// Hook para rastrear automáticamente una página
export const usePageTracking = (pageName: string, options: any = {}) => {
  const pageStartTime = useRef(Date.now());
  
  useEffect(() => {
    // Rastrear visita a la página
    babyShowerAnalytics.trackPageView(pageName);

    // Cleanup: rastrear tiempo en página al desmontar
    return () => {
      const timeSpent = Math.round((Date.now() - pageStartTime.current) / 1000);
      if (timeSpent > 5) { // Solo si estuvo más de 5 segundos
        babyShowerAnalytics.trackCustomEvent(
          'TIEMPO_EN_PAGINA',
          `Pasó ${timeSpent} segundos en: ${pageName}`,
          { pagina: pageName, segundos: timeSpent }
        );
      }
    };
  }, [pageName]);
};

// Hook para formularios con tracking automático
export const useFormTracking = (formName: string) => {
  const { trackFormSubmit, trackError } = useBabyShowerAnalytics();

  const handleSubmit = useCallback(async (formData: any, submitFunction: any) => {
    try {
      // Rastrear inicio del envío
      babyShowerAnalytics.trackCustomEvent(
        'FORMULARIO_INICIADO',
        `Iniciando envío de: ${formName}`,
        { formulario: formName }
      );

      // Ejecutar la función de envío
      const result = await submitFunction(formData);
      
      // Rastrear éxito
      trackFormSubmit(formName, formData);
      
      return result;
    } catch (error) {
      // Rastrear error
      trackError(error, `Formulario: ${formName}`);
      throw error;
    }
  }, [formName, trackFormSubmit, trackError]);

  return { handleSubmit };
};

// Hook para tracking de interacciones de botones
export const useButtonTracking = () => {
  const { trackClick } = useBabyShowerAnalytics();

  const createClickHandler = useCallback((buttonName: string, originalHandler?: any, contexto?: string) => {
    return (...args: any[]) => {
      // Rastrear el clic
      trackClick(buttonName, contexto);
      
      // Ejecutar el handler original si existe
      if (originalHandler) {
        return originalHandler(...args);
      }
    };
  }, [trackClick]);

  return { createClickHandler };
};

// Hook para tracking de errores de React
export const useErrorTracking = () => {
  const { trackError } = useBabyShowerAnalytics();

  useEffect(() => {
    const handleError = (error: any, errorInfo: any) => {
      trackError(error, 'React Error Boundary');
    };

    const handleUnhandledRejection = (event: any) => {
      trackError(event.reason, 'Unhandled Promise Rejection');
    };

    // Escuchar errores globales
    window.addEventListener('error', (event) => {
      trackError(event.error, 'Global Error');
    });

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [trackError]);
};

export default useBabyShowerAnalytics;
