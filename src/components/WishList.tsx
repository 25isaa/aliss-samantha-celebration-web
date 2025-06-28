const WishList = () => {
  const wishItems = [
    { icon: '👶', text: 'Ropa de bebé (0-1 año)' },
    { icon: '🍼', text: 'Artículos de alimentación' },
    { icon: '🛁', text: 'Productos de higiene y baño' },
    { icon: '🧸', text: 'Juguetes suaves y mordedores' },
    { icon: '🌟', text: 'Mantas y cobijas' }
  ];

  return (
    <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 border border-yellow-300/20 animate-fade-in-up">
      <h3 className="font-dancing text-2xl sm:text-3xl text-yellow-300 text-center mb-6">
        💝 Lista de regalos sugeridos
      </h3>
      
      <div className="space-y-3">
        {wishItems.map((item, index) => (
          <div 
            key={index}
            className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10 card-hover"
          >
            <span className="text-2xl mr-4 flex-shrink-0">{item.icon}</span>
            <span className="font-playfair text-white/90 text-sm sm:text-base">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
