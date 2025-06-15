
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  eventDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ eventDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEventDay, setIsEventDay] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsEventDay(false);
      } else {
        setIsEventDay(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  if (isEventDay) {
    return (
      <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 border border-yellow-300/20 text-center animate-fade-in-scale">
        <div className="text-4xl sm:text-5xl mb-4">🎉</div>
        <div className="font-dancing text-2xl sm:text-3xl text-yellow-300">
          ¡Es hoy!
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 border border-yellow-300/20 animate-fade-in-scale">
      <div className="text-center mb-6">
        <div className="font-dancing text-xl sm:text-2xl text-yellow-300 mb-4">
          ⏰ Faltan:
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: timeLeft.days, label: 'días' },
            { value: timeLeft.hours, label: 'horas' },
            { value: timeLeft.minutes, label: 'minutos' },
            { value: timeLeft.seconds, label: 'segundos' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-300 animate-bounce-gentle">
                {item.value.toString().padStart(2, '0')}
              </div>
              <div className="font-playfair text-xs sm:text-sm text-white/80 mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
