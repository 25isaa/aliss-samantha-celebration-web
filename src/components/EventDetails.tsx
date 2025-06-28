
interface EventDetailsProps {
  eventDate: Date;
}

const EventDetails = ({ eventDate }: EventDetailsProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 border-2 border-yellow-300/30 animate-fade-in-up">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-center">
        <div className="space-y-2">
          <div className="text-2xl">📅</div>
          <div className="font-playfair text-lg sm:text-xl lg:text-2xl text-yellow-300 font-bold capitalize">
            {formatDate(eventDate)}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl">🕐</div>
          <div className="font-playfair text-lg sm:text-xl lg:text-2xl text-yellow-300 font-bold">
            {formatTime(eventDate)}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-white/20 text-center">
        <div className="text-2xl mb-2">📍</div>
        <div className="font-playfair text-base sm:text-lg lg:text-xl text-white/90 italic">
          Barrio Class, Cl. 57b Sur #80h-32
        </div>
      </div>
      
    </div>
  );
};

export default EventDetails;
