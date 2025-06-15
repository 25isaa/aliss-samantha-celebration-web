
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User, Mail, Calendar, PartyPopper, Type } from 'lucide-react';

const CelebrationForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    celebracion: '',
    fecha: '',
    descripcion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      action: 'addCelebration',
      ...formData
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycby2hMR509gl4GC3F2SfI4vH46RE43axKbDPa0egxsVtb5fyhEEU3F2kGfp1Yt7Lqxof/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      });

      toast.success('¡Celebración guardada con éxito!');
      setFormData({
        nombre: '',
        email: '',
        celebracion: '',
        fecha: '',
        descripcion: ''
      });

    } catch (error) {
      console.error('Error saving celebration:', error);
      toast.error('Ocurrió un error al guardar. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-6 sm:p-8 border border-yellow-300/30 mt-12 animate-fade-in-up">
      <h3 className="font-dancing text-3xl text-yellow-300 mb-6 text-center">
        Guarda otra Celebración
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nombre" className="text-yellow-300 flex items-center gap-2">
            <User className="w-4 h-4" />
            Nombre
          </Label>
          <Input id="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Tu nombre" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-yellow-300" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-yellow-300 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </Label>
          <Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="tu@email.com" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-yellow-300" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="celebracion" className="text-yellow-300 flex items-center gap-2">
            <PartyPopper className="w-4 h-4" />
            Celebración
          </Label>
          <Input id="celebracion" value={formData.celebracion} onChange={handleInputChange} placeholder="Ej: Cumpleaños de Juan" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-yellow-300" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fecha" className="text-yellow-300 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Fecha
          </Label>
          <Input id="fecha" type="date" value={formData.fecha} onChange={handleInputChange} className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-yellow-300" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="descripcion" className="text-yellow-300 flex items-center gap-2">
            <Type className="w-4 h-4" />
            Descripción
          </Label>
          <Textarea id="descripcion" value={formData.descripcion} onChange={handleInputChange} placeholder="Detalles de la celebración" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-yellow-300 min-h-[80px]" />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-purple-800 font-bold mt-4"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Celebración'}
        </Button>
      </form>
    </div>
  );
};

export default CelebrationForm;
