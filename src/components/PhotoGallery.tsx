
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Placeholder photos - these can be replaced with actual baby shower preparation photos
  const photos = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop",
      alt: "Decoraciones del baby shower",
      title: "Preparando las decoraciones"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      alt: "Mesa de dulces",
      title: "Mesa de dulces especial"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1566041510639-8ab2a4f74d6d?w=400&h=300&fit=crop",
      alt: "Regalos para bebé",
      title: "Regalos para la princesa"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      alt: "Invitaciones",
      title: "Invitaciones especiales"
    }
  ];

  return (
    <div className="glass-effect rounded-2xl p-6 sm:p-8 mb-8 border-2 border-yellow-300/30 animate-fade-in-up">
      <h3 className="font-dancing text-3xl sm:text-4xl text-yellow-300 text-center mb-6">
        Galería de Recuerdos 📸
      </h3>
      <p className="text-white/90 text-center mb-6 font-playfair">
        Momentos especiales preparando la llegada de Aliss Samantha
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <Dialog key={photo.id}>
            <DialogTrigger asChild>
              <div className="relative group cursor-pointer overflow-hidden rounded-lg border-2 border-white/20 hover:border-yellow-300/50 transition-all duration-300">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-bold text-center px-2">
                    {photo.title}
                  </p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl bg-black/90 border-yellow-300/30">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto rounded-lg"
              />
              <p className="text-yellow-300 text-center font-playfair text-lg mt-4">
                {photo.title}
              </p>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <p className="text-white/70 font-playfair italic">
          ¡Más fotos serán añadidas pronto! ✨
        </p>
      </div>
    </div>
  );
};

export default PhotoGallery;
