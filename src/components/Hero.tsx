import { Button } from "@/components/ui/button";
import { Leaf, Waves, Heart, VolumeX, Music } from "lucide-react";
import { useState, useRef } from "react";
import heroImage from "@/assets/capa2.jpg";
import musicFile from "@/assets/MusicaCartilha.wav";

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const scrollToContent = () => {
    const contentElement = document.getElementById('characters');
    contentElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(musicFile);
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 ">
        <img 
          src={heroImage} 
          alt="Beautiful natural environment with forest and river" 
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>

      {/* Music Control Button */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={toggleMusic}
          size="lg"
          className={`${
            isPlaying 
              ? 'bg-nature-green hover:bg-nature-green-dark'
              : 'bg-red-500 hover:bg-red-600' 
          } text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-105`}
        >
          {isPlaying ? <Music className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </Button>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Leaf className="text-nature-green w-12 h-12 opacity-70" />
      </div>
      <div className="absolute top-32 right-16 animate-float" style={{ animationDelay: '1s' }}>
        <Waves className="text-nature-blue w-10 h-10 opacity-70" />
      </div>
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <Heart className="text-red-400 w-8 h-8 opacity-70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
           style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
           >            
            Valorização e Conservação do <span className="text-nature-green-light">Rio Iguaçu</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
          >
            O Projeto do Bioclube do Colégio Estadual Lúcia Bastos
          </h2>
          <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
          >
             Conheça a jornada de estudantes na criação de uma cartilha para conscientizar 
             a comunidade sobre o rio mais importante do Paraná.
          </p>
          <Button 
            onClick={scrollToContent}
            size="lg"
            className="bg-nature-green hover:bg-nature-green-dark text-white px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Iniciar Jornada
            <Leaf className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 transform -translate-x-1/2 animate-bounce scroll-indicator">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;