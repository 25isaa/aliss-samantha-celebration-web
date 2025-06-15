
import { useEffect, useState } from 'react';

const BabyShowerHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="text-center mb-8 sm:mb-12">
      {/* Crown */}
      <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 animate-bounce-gentle">
        👑
      </div>
      
      {/* Main Title */}
      <h1 className={`font-great-vibes text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-yellow-300 text-glow mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Baby Shower
      </h1>
      
      {/* Subtitle */}
      <div className={`font-dancing text-xl sm:text-2xl lg:text-3xl text-white/90 mb-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        para nuestra princesa
      </div>
      
      {/* Princess Name */}
      <h2 className={`font-great-vibes text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-yellow-300 text-glow transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Aliss Samantha
      </h2>
    </div>
  );
};

export default BabyShowerHeader;
