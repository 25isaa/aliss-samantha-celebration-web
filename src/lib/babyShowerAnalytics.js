
class BabyShowerAnalytics {
  constructor() {
    // IMPORTANTE: Reemplaza esta URL cuando despliegues tu Google Apps Script
    this.API_URL = 'PEGA_AQUI_TU_URL_DE_GOOGLE_APPS_SCRIPT';
    
    this.isEnabled = true;
    this.queue = [];
    this.isOnline = navigator.onLine;
    this.sessionId = this.generarSessionId();
    this.visitStartTime = Date.now();
    
    // Detectar si es móvil
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Escuchar cambios de conectividad
    this.setupEventListeners();
    
    // Rastrear visita inicial
    this.trackPageLoad();
    
    console.log('🍼 Baby Shower Analytics inicializado');
  }

  setupEventListeners() {
    // Conectividad
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processQueue();
      console.log('📶 Conexión restaurada, procesando cola...');
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('📶 Sin conexión, guardando en cola...');
    });

    // Rastrear tiempo antes de salir
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - this.visitStartTime) / 1000);
      this.trackTimeSpent(timeSpent);
    });

    // Rastrear scroll (para engagement)
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
          this.trackScrollDepth(maxScroll);
        }
      }
    });
  }

  // Generar ID único de sesión
  generarSessionId() {
    return 'bs_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Función principal para enviar datos
  async enviarDatos(datos) {
    const payload = {
      nombre: datos.nombre || this.obtenerNombreUsuario(),
      tipoInteraccion: datos.tipo || 'INTERACCION',
      descripcion: datos.descripcion || 'Sin descripción',
      navegador: this.obtenerInfoNavegador(),
      referencia: document.referrer || 'Directo',
      url: window.location.href,
      sessionId: this.sessionId,
      dispositivo: this.isMobile ? 'Móvil' : 'Desktop',
      timestamp: new Date().toISOString(),
      ...datos.extra // Datos adicionales
    };

    if (this.isOnline && this.API_URL !== 'PEGA_AQUI_TU_URL_DE_GOOGLE_APPS_SCRIPT') {
      try {
        await this.enviarAGoogleSheets(payload);
      } catch (error) {
        console.warn('⚠️ Error enviando a Google Sheets:', error);
        this.queue.push(payload);
      }
    } else {
      this.queue.push(payload);
      if (this.API_URL === 'PEGA_AQUI_TU_URL_DE_GOOGLE_APPS_SCRIPT') {
        console.warn('⚠️ URL de Google Apps Script no configurada');
      } else {
        console.log('📤 Sin conexión, guardado en cola');
      }
    }
  }

  // Enviar datos a Google Sheets
  async enviarAGoogleSheets(datos) {
    if (!this.isEnabled) return;

    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
        mode: 'no-cors'
      });

      console.log('✅ Datos enviados: ' + datos.tipoInteraccion);
      return true;
    } catch (error) {
      console.error('❌ Error enviando datos:', error);
      throw error;
    }
  }

  // Procesar cola cuando vuelva la conexión
  async processQueue() {
    if (this.queue.length === 0) return;

    console.log(`📋 Procesando ${this.queue.length} eventos en cola...`);
    
    const tempQueue = [...this.queue];
    this.queue = [];

    for (const item of tempQueue) {
      try {
        await this.enviarAGoogleSheets(item);
        await new Promise(resolve => setTimeout(resolve, 100)); // Pequeña pausa
      } catch (error) {
        this.queue.push(item);
      }
    }
  }

  // Obtener información del navegador
  obtenerInfoNavegador() {
    const ua = navigator.userAgent;
    let navegador = 'Desconocido';
    
    if (ua.includes('Chrome') && !ua.includes('Edg')) navegador = 'Chrome';
    else if (ua.includes('Firefox')) navegador = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) navegador = 'Safari';
    else if (ua.includes('Edg')) navegador = 'Edge';
    else if (ua.includes('Opera')) navegador = 'Opera';
    
    const platform = navigator.platform || 'Desconocido';
    return `${navegador} (${platform})`;
  }

  // Intentar obtener nombre del usuario (de localStorage o formularios)
  obtenerNombreUsuario() {
    // Buscar en formularios existentes
    const nameInputs = document.querySelectorAll('input[name*="name"], input[name*="nombre"], input[placeholder*="nombre"]');
    for (let input of nameInputs) {
      if (input.value.trim()) {
        return input.value.trim();
      }
    }
    return 'Visitante';
  }

  // === MÉTODOS DE RASTREO ESPECÍFICOS ===

  trackPageLoad() {
    this.enviarDatos({
      tipo: 'CARGA_PAGINA',
      descripcion: `Página cargada: ${document.title}`,
      extra: {
        resolution: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`
      }
    });
  }

  trackPageView(pageName) {
    this.enviarDatos({
      tipo: 'VISITA_PAGINA',
      descripcion: `Visitó: ${pageName}`
    });
  }

  trackClick(elemento, contexto = '') {
    this.enviarDatos({
      tipo: 'CLIC',
      descripcion: `Clic en: ${elemento}${contexto ? ' - ' + contexto : ''}`
    });
  }

  trackFormSubmit(formType, formData = {}) {
    this.enviarDatos({
      nombre: formData.nombre || this.obtenerNombreUsuario(),
      tipo: 'FORMULARIO_ENVIADO',
      descripcion: `Formulario completado: ${formType}`,
      extra: formData
    });
  }

  trackConfirmacion(nombre, asistira, mensaje = '') {
    this.enviarDatos({
      nombre: nombre,
      tipo: 'CONFIRMACION_ASISTENCIA',
      descripcion: `${nombre} ${asistira ? 'SÍ asistirá' : 'NO asistirá'}${mensaje ? ' - ' + mensaje : ''}`
    });
  }

  trackGift(giftData) {
    this.enviarDatos({
      nombre: giftData.nombre || this.obtenerNombreUsuario(),
      tipo: 'REGALO_SELECCIONADO',
      descripcion: `Regalo elegido: ${giftData.regalo}`,
      extra: giftData
    });
  }

  trackShare(contentType, platform) {
    this.enviarDatos({
      tipo: 'CONTENIDO_COMPARTIDO',
      descripcion: `Compartió ${contentType} en ${platform}`
    });
  }

  trackDownload(resource) {
    this.enviarDatos({
      tipo: 'DESCARGA',
      descripcion: `Descargó: ${resource}`
    });
  }

  trackScrollDepth(percentage) {
    if (percentage === 100) {
      this.enviarDatos({
        tipo: 'SCROLL_COMPLETO',
        descripcion: 'Llegó al final de la página'
      });
    }
  }

  trackTimeSpent(seconds) {
    if (seconds > 10) { // Solo si pasó más de 10 segundos
      this.enviarDatos({
        tipo: 'TIEMPO_EN_SITIO',
        descripcion: `Pasó ${this.formatearTiempo(seconds)} en el sitio`
      });
    }
  }

  trackError(error, context) {
    this.enviarDatos({
      tipo: 'ERROR',
      descripcion: `Error: ${error.message || error} en ${context}`
    });
  }

  trackCustomEvent(eventName, description, data = {}) {
    this.enviarDatos({
      tipo: eventName.toUpperCase(),
      descripcion: description,
      extra: data
    });
  }

  // === UTILIDADES ===

  formatearTiempo(segundos) {
    if (segundos < 60) return `${segundos} segundos`;
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos}m ${segs}s`;
  }

  // Configurar URL de Google Apps Script
  configurarURL(url) {
    this.API_URL = url;
    console.log('🔗 URL de Google Apps Script configurada');
  }

  // Control del sistema
  habilitar() {
    this.isEnabled = true;
    console.log('📊 Baby Shower Analytics habilitado');
  }

  deshabilitar() {
    this.isEnabled = false;
    console.log('📊 Baby Shower Analytics deshabilitado');
  }

  // Debug: Ver estado del sistema
  getStatus() {
    return {
      enabled: this.isEnabled,
      online: this.isOnline,
      queueSize: this.queue.length,
      sessionId: this.sessionId,
      apiConfigured: this.API_URL !== 'PEGA_AQUI_TU_URL_DE_GOOGLE_APPS_SCRIPT'
    };
  }
}

// Crear instancia global
const babyShowerAnalytics = new BabyShowerAnalytics();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = babyShowerAnalytics;
}

// Para uso global en el navegador
if (typeof window !== 'undefined') {
  window.babyShowerAnalytics = babyShowerAnalytics;
}

export default babyShowerAnalytics;
