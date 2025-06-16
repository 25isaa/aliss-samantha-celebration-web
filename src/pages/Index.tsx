

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import BabyShowerHeader from '@/components/BabyShowerHeader';
import EventDetails from '@/components/EventDetails';
import CountdownTimer from '@/components/CountdownTimer';
import WishList from '@/components/WishList';
import InteractiveGames from '@/components/InteractiveGames';
import RSVPConfirmation from '@/components/RSVPConfirmation';
import GiftRegistryInfo from '@/components/GiftRegistryInfo';
import ParticleBackground from '@/components/ParticleBackground';
import MusicControls from '@/components/MusicControls';
import SocialShare from '@/components/SocialShare';
import { usePageTracking } from '@/hooks/useBabyShowerAnalytics';

const Index = () => {
  // Usar el hook de tracking de página
  usePageTracking('Página Principal');

  const [gameData, setGameData] = useState({
    weightGuesses: [] as number[],
    namesSuggested: [] as string[],
    attendingCount: 0,
    completedGames: new Set<string>()
  });

  const eventDate = new Date('2025-06-29T16:30:00');

  const handleGameComplete = (gameType: string, data?: any) => {
    setGameData(prev => ({
      ...prev,
      completedGames: new Set([...prev.completedGames, gameType])
    }));

    if (gameType === 'weight' && data) {
      setGameData(prev => ({
        ...prev,
        weightGuesses: [...prev.weightGuesses, data]
      }));
    }

    if (gameType === 'names' && data) {
      setGameData(prev => ({
        ...prev,
        namesSuggested: [...prev.namesSuggested, data]
      }));
    }

    toast.success('¡Genial! Has completado esta actividad 🌟', {
      duration: 3000,
      style: {
        background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(139, 195, 74, 0.9))',
        color: 'white',
        fontFamily: 'Playfair Display, serif'
      }
    });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl animate-float">
            
            <BabyShowerHeader />
            
            <EventDetails eventDate={eventDate} />
            
            <CountdownTimer eventDate={eventDate} />
            
            <div className="text-center mt-8 mb-8">
              <h2 className="font-dancing text-3xl sm:text-4xl lg:text-5xl text-yellow-300 text-glow animate-fade-in-up">
                Isaías & Kimberly
              </h2>
            </div>
            
            <RSVPConfirmation />
            
            <SocialShare />
            
            <GiftRegistryInfo />
            
            <WishList />
            
            <InteractiveGames 
              gameData={gameData}
              onGameComplete={handleGameComplete}
            />

            <div className="text-center mt-12 animate-fade-in-scale">
              <p className="font-great-vibes text-2xl sm:text-3xl lg:text-4xl text-yellow-300 text-glow leading-relaxed">
                Tu presencia hará esta celebración especial
              </p>
            </div>
            
          </div>
        </div>
      </div>
      
      <MusicControls />
    </div>
  );
};

export default Index;

