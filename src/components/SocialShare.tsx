
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useBabyShowerAnalytics } from '@/hooks/useBabyShowerAnalytics';

const SocialShare = () => {
  const { trackShare } = useBabyShowerAnalytics();

  const shareText = "¡Estás invitado al Baby Shower de Aliss Samantha! 👶✨ Celebremos juntos la llegada de nuestra princesa el 29 de Junio a las 4:30 PM";
  const shareUrl = window.location.href;

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
    trackShare('baby-shower-invitation', 'whatsapp');
    toast.success('¡Compartido en WhatsApp! 💚');
  };

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    trackShare('baby-shower-invitation', 'facebook');
    toast.success('¡Compartido en Facebook! 💙');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText + ' ' + shareUrl);
      toast.success('¡Enlace copiado al portapapeles! 📋');
      trackShare('baby-shower-invitation', 'clipboard');
    } catch (error) {
      toast.error('No se pudo copiar el enlace');
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 border-2 border-yellow-300/30 animate-fade-in-up">
      <h3 className="font-dancing text-3xl sm:text-4xl text-yellow-300 text-center mb-6">
        ¡Comparte la alegría! 
      </h3>
      <p className="text-white/90 text-center mb-6 font-playfair">
        Ayúdanos a invitar a más personas especiales
      </p>
      
      <div className="flex flex-wrap justify-center gap-4">
        <Button
          onClick={shareOnWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          📱 WhatsApp
        </Button>
        
        <Button
          onClick={shareOnFacebook}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          📘 Facebook
        </Button>
        
        <Button
          onClick={copyToClipboard}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          📋 Copiar enlace
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;
