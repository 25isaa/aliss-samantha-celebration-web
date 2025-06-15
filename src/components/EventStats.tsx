
import StatsCard from './StatsCard';

interface EventStatsProps {
  gameData: {
    weightGuesses: number[];
    namesSuggested: string[];
    attendingCount: number;
    completedGames: Set<string>;
  };
}

const EventStats = ({ gameData }: EventStatsProps) => {
  const daysUntilEvent = Math.ceil((new Date('2025-06-29T16:30:00').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 border-2 border-yellow-300/30 animate-fade-in-up">
      <h3 className="font-dancing text-3xl sm:text-4xl text-yellow-300 text-center mb-6">
        Estadísticas del Evento 📊
      </h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Días restantes"
          value={daysUntilEvent > 0 ? daysUntilEvent : 0}
          icon="⏰"
          description="Para el gran día"
        />
        
        <StatsCard
          title="Confirmaciones"
          value={gameData.attendingCount}
          icon="✅"
          description="Invitados confirmados"
        />
        
        <StatsCard
          title="Juegos completados"
          value={gameData.completedGames.size}
          icon="🎮"
          description="Actividades realizadas"
        />
        
        <StatsCard
          title="Sugerencias"
          value={gameData.namesSuggested.length + gameData.weightGuesses.length}
          icon="💡"
          description="Ideas compartidas"
        />
      </div>
    </div>
  );
};

export default EventStats;
