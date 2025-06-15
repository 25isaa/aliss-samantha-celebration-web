
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

const MusicControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // Here you could add actual audio functionality
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={toggleMusic}
        className="glass-effect hover:bg-white/20 border-yellow-300/30 border-2 w-14 h-14 rounded-full p-0 shadow-lg"
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {isPlaying ? (
          <VolumeX className="w-6 h-6 text-yellow-300" />
        ) : (
          <Volume2 className="w-6 h-6 text-yellow-300" />
        )}
      </Button>
    </div>
  );
};

export default MusicControls;
