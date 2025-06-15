
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface GameData {
  weightGuesses: number[];
  namesSuggested: string[];
  attendingCount: number;
  completedGames: Set<string>;
}

interface InteractiveGamesProps {
  gameData: GameData;
  onGameComplete: (gameType: string, data?: any) => void;
}

const InteractiveGames = ({ gameData, onGameComplete }: InteractiveGamesProps) => {
  const [weightGuess, setWeightGuess] = useState('');
  const [nameGuess, setNameGuess] = useState('');

  const gameIcons = [
    {
      id: 'calendar',
      emoji: '📅',
      label: 'Fecha',
      title: 'Confirma la Fecha',
      content: 'El evento será el domingo 29 de junio a las 4:30 PM. ¡No lo olvides!'
    },
    {
      id: 'weight',
      emoji: '⚖️',
      label: 'Peso',
      title: 'Adivina el Peso',
      interactive: true
    },
    {
      id: 'names',
      emoji: '📝',
      label: 'Nombres',
      title: 'Sugerencias de Nombres',
      interactive: true
    },
    {
      id: 'photos',
      emoji: '📸',
      label: 'Fotos',
      title: 'Galería de Fotos',
      content: '¡Prepara tu cámara! Habrá muchos momentos especiales para capturar.'
    },
    {
      id: 'gift',
      emoji: '🎁',
      label: 'Sorpresa',
      title: 'Sorpresa Especial',
      content: '¡Tenemos una sorpresa muy especial preparada para todos los invitados!'
    }
  ];

  const handleWeightSubmit = () => {
    if (weightGuess && !isNaN(Number(weightGuess))) {
      onGameComplete('weight', Number(weightGuess));
      setWeightGuess('');
      toast.success(`¡Tu predicción de ${weightGuess}kg ha sido registrada!`);
    }
  };

  const handleNameSubmit = () => {
    if (nameGuess.trim()) {
      onGameComplete('names', nameGuess.trim());
      setNameGuess('');
      toast.success(`¡Tu sugerencia "${nameGuess}" ha sido registrada!`);
    }
  };

  const handleSimpleGame = (gameId: string) => {
    onGameComplete(gameId);
  };

  return (
    <div className="mb-8 animate-fade-in-scale">
      <div className="text-center mb-8">
        <h3 className="font-dancing text-2xl sm:text-3xl text-white/90 mb-6">
          ¡Juegos y Sorpresas!
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {gameIcons.map((game) => (
            <Dialog key={game.id}>
              <DialogTrigger asChild>
                <div className={`glass-effect rounded-full w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex flex-col items-center justify-center cursor-pointer card-hover group ${
                  gameData.completedGames.has(game.id) ? 'bg-green-500/20 border-green-400/50' : 'border-white/20'
                } border-2 relative overflow-hidden`}>
                  
                  <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 group-hover:scale-110 transition-transform duration-300">
                    {game.emoji}
                  </div>
                  <div className="font-playfair text-xs sm:text-sm text-white/90 font-medium">
                    {game.label}
                  </div>
                  
                  {gameData.completedGames.has(game.id) && (
                    <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                  )}
                </div>
              </DialogTrigger>
              
              <DialogContent className="glass-effect border-yellow-300/30 text-white max-w-md mx-4">
                <DialogHeader>
                  <DialogTitle className="font-dancing text-2xl text-yellow-300 text-center">
                    {game.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="p-4 text-center">
                  <div className="text-5xl mb-4">{game.emoji}</div>
                  
                  {game.id === 'weight' && (
                    <div className="space-y-4">
                      <p className="font-playfair">¿Cuánto crees que pesará nuestra princesa?</p>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Peso en kg"
                          value={weightGuess}
                          onChange={(e) => setWeightGuess(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                        <Button 
                          onClick={handleWeightSubmit}
                          className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold"
                        >
                          Enviar
                        </Button>
                      </div>
                      {gameData.weightGuesses.length > 0 && (
                        <p className="text-sm text-white/70">
                          {gameData.weightGuesses.length} predicciones registradas
                        </p>
                      )}
                    </div>
                  )}
                  
                  {game.id === 'names' && (
                    <div className="space-y-4">
                      <p className="font-playfair">¿Tienes alguna sugerencia de nombre?</p>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="Tu sugerencia"
                          value={nameGuess}
                          onChange={(e) => setNameGuess(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                        <Button 
                          onClick={handleNameSubmit}
                          className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold"
                        >
                          Enviar
                        </Button>
                      </div>
                      {gameData.namesSuggested.length > 0 && (
                        <p className="text-sm text-white/70">
                          {gameData.namesSuggested.length} sugerencias registradas
                        </p>
                      )}
                    </div>
                  )}
                  
                  {game.content && (
                    <div className="space-y-4">
                      <p className="font-playfair">{game.content}</p>
                      <Button 
                        onClick={() => handleSimpleGame(game.id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold"
                      >
                        ¡Entendido!
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveGames;
