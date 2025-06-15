
import { Button } from '@/components/ui/button';

interface RSVPSectionProps {
  onRSVP: (attending: boolean) => void;
}

const RSVPSection = ({ onRSVP }: RSVPSectionProps) => {
  return (
    <div className="text-center mb-8 animate-fade-in-scale">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          onClick={() => onRSVP(true)}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-purple-800 font-playfair font-bold text-base sm:text-lg px-6 py-3 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
        >
          ✅ Asistiré
        </Button>
        
        <Button
          onClick={() => onRSVP(false)}
          className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-playfair font-bold text-base sm:text-lg px-6 py-3 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto"
        >
          ❌ No podré asistir
        </Button>
      </div>
    </div>
  );
};

export default RSVPSection;
