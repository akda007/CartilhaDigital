import { useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";
import { Check, TreePine, Fish, Bird, PawPrint, Globe, BookOpen, Users } from "lucide-react";

// --- IMAGENS DOS PERSONAGENS ---
// Verifique se os caminhos estão corretos para o seu projeto
import goioximImg from '@/assets/1.png';      // Cágado-rajado
import apolloImg from '@/assets/2.png';       // Onça-pintada
import miaImg from '@/assets/3.png';          // Capivara
import richardImg from '@/assets/4.png';    // Tatu-galinha
import yaraImg from '@/assets/5.png';         // Mandi (Peixe)
import condaImg from '@/assets/6.png';        // Harpia

// --- INTERFACE ---
// A interface agora tem a propriedade 'character' opcional
export interface TimelineItem {
  id: string;
  title: string;
  content?: string; // Conteúdo é opcional para cards de personagem
  icon: React.ReactNode;
  side: 'left' | 'right';
  character?: {
    name: string;
    popularName: string;
    uicnClassification: string;
    image: string;
  };
}

// --- DADOS DA TIMELINE ---
// ATUALIZADO COM TODOS OS PERSONAGENS
const defaultTimelineData: TimelineItem[] = [
    { id: '1', title: 'O Desafio do Rio Iguaçu', content: 'O Rio Iguaçu é o maior do Paraná, mas enfrenta um grave problema: é o segundo rio mais poluído do Brasil. Na região de Curitiba, sua qualidade foi classificada como "Ruim".', icon: <Globe className="w-full h-full" />, side: 'right' },
    
    { id: '2', title: 'Condá', icon: <PawPrint className="w-full h-full" />, side: 'left', character: { name: 'Condá', popularName: 'Harpia', uicnClassification: 'Criticamente em perigo', image: condaImg } },

    { id: '3', title: 'A Missão do Bioclube', content: 'Estudantes do Colégio Estadual Lúcia Bastos, em Curitiba, formaram o Bioclube para investigar e conscientizar a comunidade sobre a importância do rio.', icon: <Users className="w-full h-full" />, side: 'right' },
    
    { id: '4', title: 'Apollo', icon: <PawPrint className="w-full h-full" />, side: 'left', character: { name: 'Apollo', popularName: 'Onça-pintada', uicnClassification: 'Criticamente em perigo', image: apolloImg } },

    { id: '5', title: 'Análise da Condição Ambiental', content: 'A equipe avaliou o rio na ponte da Avenida das Américas. Usando um protocolo de avaliação rápida, o resultado confirmou a condição "Ruim", com uma pontuação entre 0 e 30.', icon: <Fish className="w-full h-full" />, side: 'right' },

    { id: '6', title: 'Goioxim', icon: <PawPrint className="w-full h-full" />, side: 'left', character: { name: 'Goioxim', popularName: 'Cágado-rajado', uicnClassification: 'Em perigo', image: goioximImg } },

    { id: '7', title: 'A Cartilha de Educação Ambiental', content: 'O resultado do projeto é uma cartilha educativa com esses personagens para articular o conhecimento científico com a sociedade e inspirar a conservação.', icon: <BookOpen className="w-full h-full" />, side: 'right' },
    
    { id: '8', title: 'Mia', icon: <PawPrint className="w-full h-full" />, side: 'left', character: { name: 'Mia', popularName: 'Capivara', uicnClassification: 'Pouco preocupante', image: miaImg } },

    { id: '9', title: 'Richard', icon: <PawPrint className="w-full h-full" />, side: 'right', character: { name: 'Richard', popularName: 'Tatu-galinha', uicnClassification: 'Pouco preocupante', image: richardImg } },

    { id: '10', title: 'Yara', icon: <PawPrint className="w-full h-full" />, side: 'left', character: { name: 'Yara', popularName: 'Mandi', uicnClassification: 'Pouco preocupante', image: yaraImg } },
];


// --- O RESTANTE DO COMPONENTE ---
// A lógica de animação e scroll permanece a mesma

interface TimelineProps {
  data?: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ data = defaultTimelineData }) => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const completionRef = useRef<HTMLDivElement>(null);

  // A lógica de useLayoutEffect, handleScroll, e useEffect não foi alterada.
  useLayoutEffect(() => {
    const calculateHeight = () => {
      if (timelineRef.current && completionRef.current) {
        const firstItem = timelineRef.current.querySelector('.timeline-item .timeline-dot');
        const lastItem = completionRef.current.querySelector('.completion-goal');
        if (firstItem && lastItem) {
          const firstItemRect = firstItem.getBoundingClientRect();
          const lastItemRect = lastItem.getBoundingClientRect();
          const height = (lastItemRect.top + lastItemRect.height / 2) - (firstItemRect.top + firstItemRect.height / 2);
          setLineHeight(height);
        }
      }
    };
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, [data]);

  const handleScroll = useCallback(() => {
    if (!timelineRef.current || !completionRef.current) return;
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight / 2;
    const newVisibleItems = new Set<string>();
    const items = timelineRef.current.querySelectorAll('.timeline-item');
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemId = item.getAttribute('data-id');
      if (itemId && rect.top < triggerPoint) { newVisibleItems.add(itemId); }
    });
    setVisibleItems(newVisibleItems);
    const completionRect = completionRef.current.getBoundingClientRect();
    if (completionRect.top + completionRect.height / 2 < triggerPoint) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
    const firstItem = timelineRef.current.querySelector('.timeline-item');
    if (!firstItem) return;
    const journeyStartElement = firstItem.querySelector('.timeline-dot') || firstItem;
    const journeyEndElement = completionRef.current.querySelector('.completion-goal') || completionRef.current;
    const startRect = journeyStartElement.getBoundingClientRect();
    const endRect = journeyEndElement.getBoundingClientRect();
    const journeyStartPoint = startRect.top + (startRect.height / 2) + window.scrollY;
    const journeyEndPoint = endRect.top + (endRect.height / 2) + window.scrollY;
    const totalJourneyDistance = journeyEndPoint - journeyStartPoint;
    const viewportMarker = window.scrollY + triggerPoint;
    const scrolledDistance = viewportMarker - journeyStartPoint;
    const progress = Math.max(0, Math.min(scrolledDistance / totalJourneyDistance, 1));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div id="timeline-content" className="timeline-container py-20" ref={timelineRef}>
      <div className="max-w-6xl mx-auto px-6">
        <div 
          className="timeline-line"
          style={{ height: `${lineHeight}px` }}
        >
          <div 
            className="timeline-progress"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        {data.map((item, index) => (
          <div
            key={item.id}
            data-id={item.id}
            className={`timeline-item ${item.side} ${
              visibleItems.has(item.id) ? 'visible' : ''
            }`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div 
              className={`timeline-dot ${
                visibleItems.has(item.id) ? 'active' : ''
              }`}
            >
              <div className="text-nature-green w-6 h-6">{item.icon}</div>
            </div>
            <div className="timeline-content">
              {item.character ? (
                // LAYOUT PARA CARD DE PERSONAGEM
                <div className="flex flex-col items-center text-center p-4">
                  <img src={item.character.image} alt={item.character.name} className="w-48 h-48 object-contain mb-4 rounded-lg bg-gray-100 p-2 shadow-md"/>
                  <h3 className="text-2xl font-bold text-foreground">{item.character.name}</h3>
                  <p className="text-lg text-muted-foreground">{item.character.popularName}</p>
                  <p className="mt-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                    UICN: {item.character.uicnClassification}
                  </p>
                </div>
              ) : (
                // LAYOUT PARA CARD DE INFORMAÇÃO (O SEU ORIGINAL)
                <div>
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-nature-green/10 rounded-full mr-4 flex justify-center items-center ">
                      <div className="text-nature-green flex justify-center items-center w-18">{item.icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">{item.content}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        
        <div ref={completionRef} className="flex justify-center mt-20 mb-10">
          <div className={`completion-goal ${isCompleted ? 'completed' : ''}`}>
            <Check className={`completion-icon ${isCompleted ? 'completed' : ''}`} />
          </div>
        </div>

        {isCompleted && (
          <div className="text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold text-nature-green mb-4">Parabéns! Jornada Concluída</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Você completou esta jornada de aprendizado sobre preservação ambiental. 
              Agora é hora de colocar esse conhecimento em prática!
            </p>

            <a
                href="/quiz" className="inline-block bg-nature-green text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-green-700 transition" >🌱 Teste seus conhecimentos
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;