
interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
  description: string;
}

const StatsCard = ({ title, value, icon, description }: StatsCardProps) => {
  return (
    <div className="glass-effect rounded-xl p-4 border border-yellow-300/20 text-center animate-fade-in-scale">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-dancing text-2xl text-yellow-300 mb-1">{title}</div>
      <div className="font-playfair text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-white/70 text-sm">{description}</div>
    </div>
  );
};

export default StatsCard;
