
import { Gift, Heart } from 'lucide-react';

const GiftRegistryInfo = () => {
  return (
    <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 border border-pink-300/20 animate-fade-in-up">
      <div className="text-center mb-6">
        <Gift className="w-12 h-12 text-pink-300 mx-auto mb-4" />
        <h3 className="font-dancing text-2xl sm:text-3xl text-pink-300 mb-2">
          💝 Registro de regalos
        </h3>
        <p className="font-playfair text-white/90 text-sm sm:text-base leading-relaxed">
          Tu presencia es el regalo más especial, pero si deseas obsequiar algo para nuestra pequeña princesa, 
          aquí tienes algunas sugerencias que nos serían muy útiles.
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-2 text-yellow-300">
        <Heart className="w-5 h-5" />
        <span className="font-great-vibes text-lg">
          Con amor, esperamos compartir este momento especial contigo
        </span>
        <Heart className="w-5 h-5" />
      </div>
    </div>
  );
};

export default GiftRegistryInfo;
