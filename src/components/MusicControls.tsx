
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { toast } from 'sonner';

const MusicControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a gentle lullaby/baby shower appropriate music
    const audio = new Audio();
    audio.src = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'; // Placeholder - you can replace with actual baby shower music
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      toast.info('Música pausada 🎵');
    } else {
      audioRef.current.play().catch(() => {
        toast.error('No se pudo reproducir la música. Asegúrate de interactuar con la página primero.');
      });
      setIsPlaying(true);
      toast.success('¡Música iniciada! 🎶');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <Button
        onClick={toggleMusic}
        className="glass-effect hover:bg-white/20 border-yellow-300/30 border-2 w-14 h-14 rounded-full p-0 shadow-lg animate-bounce-gentle"
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {isPlaying ? (
          <Music className="w-6 h-6 text-yellow-300 animate-pulse" />
        ) : (
          <Volume2 className="w-6 h-6 text-yellow-300" />
        )}
      </Button>
    </div>
  );
};

export default MusicControls;
