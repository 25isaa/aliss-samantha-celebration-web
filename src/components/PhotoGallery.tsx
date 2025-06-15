
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Camera, Sparkles, Baby } from 'lucide-react';

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

  // Fotos temáticas de baby shower que cargan correctamente
  const photos = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=400&fit=crop&crop=center",
      alt: "Decoraciones rosadas para baby shower",
      title: "Decoraciones Mágicas",
      category: "Decoración"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&h=400&fit=crop&crop=center",
      alt: "Mesa dulce para bebé",
      title: "Mesa de Dulces",
      category: "Dulces"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1566041510639-8ab2a4f74d6d?w=500&h=400&fit=crop&crop=center",
      alt: "Regalos envueltos para bebé",
      title: "Regalos Especiales",
      category: "Regalos"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop&crop=center",
      alt: "Invitaciones elegantes",
      title: "Invitaciones de Ensueño",
      category: "Invitaciones"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&h=400&fit=crop&crop=center",
      alt: "Globos de celebración",
      title: "Globos Festivos",
      category: "Decoración"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=500&h=400&fit=crop&crop=center",
      alt: "Flores delicadas",
      title: "Arreglos Florales",
      category: "Flores"
    }
  ];

  const handleImageLoad = (photoId: number) => {
    setLoadingStates(prev => ({ ...prev, [photoId]: false }));
  };

  const handleImageError = (photoId: number) => {
    setLoadingStates(prev => ({ ...prev, [photoId]: false }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Decoración': return <Sparkles className="w-4 h-4" />;
      case 'Dulces': return <Heart className="w-4 h-4" />;
      case 'Regalos': return <Baby className="w-4 h-4" />;
      case 'Flores': return <Sparkles className="w-4 h-4" />;
      default: return <Camera className="w-4 h-4" />;
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 border-2 border-yellow-300/30 animate-fade-in-up">
      <div className="text-center mb-8">
        <h3 className="font-dancing text-3xl sm:text-4xl text-yellow-300 mb-4 flex items-center justify-center gap-3">
          <Camera className="w-8 h-8 animate-bounce-gentle" />
          Galería de Recuerdos
          <Sparkles className="w-8 h-8 animate-twinkle" />
        </h3>
        <p className="text-white/90 font-playfair text-lg leading-relaxed">
          Momentos especiales preparando la llegada de 
          <span className="text-yellow-300 font-bold"> Aliss Samantha</span>
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-1 w-12 bg-gradient-to-r from-pink-400 to-yellow-300 rounded-full"></div>
          <Heart className="w-5 h-5 text-pink-300 animate-pulse" />
          <div className="h-1 w-12 bg-gradient-to-r from-yellow-300 to-pink-400 rounded-full"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Dialog key={photo.id}>
            <DialogTrigger asChild>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl border-2 border-white/20 hover:border-yellow-300/60 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-[1.02]">
                  {/* Loading placeholder */}
                  {loadingStates[photo.id] !== false && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 animate-pulse flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white/50 animate-bounce" />
                    </div>
                  )}
                  
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    onLoad={() => handleImageLoad(photo.id)}
                    onError={() => handleImageError(photo.id)}
                    loading="lazy"
                  />
                  
                  {/* Overlay con información */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(photo.category)}
                        <span className="text-yellow-300 text-sm font-medium">
                          {photo.category}
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-1">
                        {photo.title}
                      </h4>
                      <p className="text-white/80 text-sm">
                        Haz clic para ver en grande
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-3 right-3 bg-yellow-300/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-12">
                    <Heart className="w-4 h-4 text-purple-800" />
                  </div>
                </div>
              </div>
            </DialogTrigger>
            
            <DialogContent className="max-w-4xl bg-black/95 border-yellow-300/40 border-2">
              <div className="relative">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center gap-3 mb-2">
                    {getCategoryIcon(photo.category)}
                    <span className="text-yellow-300 font-medium">
                      {photo.category}
                    </span>
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {photo.title}
                  </h3>
                  <p className="text-white/80">
                    Preparando cada detalle con amor para Aliss Samantha
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      
      <div className="text-center mt-8 p-6 glass-effect rounded-xl border border-yellow-300/30">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Sparkles className="w-6 h-6 text-yellow-300 animate-twinkle" />
          <p className="text-white/90 font-playfair text-lg font-medium">
            ¡Más fotos especiales serán añadidas pronto!
          </p>
          <Sparkles className="w-6 h-6 text-yellow-300 animate-twinkle" />
        </div>
        <p className="text-white/70 italic text-sm">
          Cada momento es único e irrepetible ✨
        </p>
      </div>
    </div>
  );
};

export default PhotoGallery;
