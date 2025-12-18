import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ArrowRight, ArrowLeft, Info } from 'lucide-react';

const MDG_DATA = [
  { id: 1, title: "Eradicate Extreme Poverty", img: "https://i0.wp.com/www.mdgmonitor.org/wp-content/uploads/2015/09/MDG1-eradicate-poverty.jpg?w=200&ssl=1$0" },
  { id: 2, title: "Universal Primary Education", img: "https://i0.wp.com/www.mdgmonitor.org/wp-content/uploads/2015/09/mdg-2.jpg?resize=300%2C300&ssl=1$0" },
  { id: 3, title: "Gender Equality", img: "https://i2.wp.com/www.mdgmonitor.org/wp-content/uploads/2015/09/mdg-3-feature.jpg?resize=300%2C300&ssl=1$0" },
  { id: 4, title: "Reduce Child Mortality", img: "https://i1.wp.com/www.mdgmonitor.org/wp-content/uploads/2015/09/MDG4.jpg?resize=300%2C300&ssl=1$0" },
  { id: 5, title: "Improve Maternal Health", img: "https://i1.wp.com/www.mdgmonitor.org/wp-content/uploads/2015/09/MDG5-1.jpg?resize=300%2C300&ssl=1$0" },
  { id: 6, title: "Combat HIV/AIDS", img: "https://i1.wp.com/www.mdgmonitor.org/wp-content/uploads/2015/09/MDG-6_Logo.jpg?resize=300%2C300&ssl=1$0" },
  { id: 7, title: "Environmental Sustainability", img: "https://i1.wp.com/www.mdgmonitor.org/wp-content/uploads/2015/09/MDG7_Logo.jpg?resize=300%2C300&ssl=1$0" },
  { id: 8, title: "Global Partnership", img: "https://i2.wp.com/www.mdgmonitor.org/wp-content/uploads/2015/09/MDG8_Logo.jpg?resize=300%2C300&ssl=1$0" },
];

const SDG_DATA = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    img: `https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${(i + 1).toString().padStart(2, '0')}.jpg`
}));

const ComparisonSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };

  useEffect(() => {
    const stopDrag = () => { isDragging.current = false; };
    const moveDrag = (e: MouseEvent) => handleMouseMove(e);

    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('mousemove', moveDrag);
    return () => {
        window.removeEventListener('mouseup', stopDrag);
        window.removeEventListener('mousemove', moveDrag);
    };
  }, []);

  return (
    <section className="py-24 bg-black text-center px-4 overflow-hidden relative select-none">
        {/* Custom Animation Styles */}
        <style dangerouslySetInnerHTML={{__html: `
            @keyframes float-slow {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-8px) rotate(0.5deg); }
            }
            @keyframes float-medium {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-6px) rotate(-0.5deg); }
            }
             @keyframes float-fast {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-4px) rotate(0.5deg); }
            }
            .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
            .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
            .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
        `}} />

        <div className="max-w-4xl mx-auto mb-12 relative z-10">
            <h2 className="text-4xl md:text-6xl font-extralight text-white mb-6 tracking-tight">Evolution of Goals</h2>
            <p className="text-xl text-vision-subtext font-light max-w-2xl mx-auto">
                Comparing the 8 Millennium Development Goals (2000) with the 17 Sustainable Development Goals (2015).
            </p>
        </div>

        <div 
            ref={containerRef}
            className="relative w-full max-w-[1400px] mx-auto h-[850px] md:h-[750px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-950 touch-none group"
            onMouseDown={handleMouseDown}
            onTouchStart={() => isDragging.current = true}
            onTouchEnd={() => isDragging.current = false}
            onTouchMove={(e) => {
                if (!containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                setSliderPosition((x / rect.width) * 100);
            }}
        >
            {/* =========================================================
                LAYER 1 (Background): SDG (Sustainable Development Goals)
                Visible on the RIGHT side.
               ========================================================= */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black flex items-center justify-center">
                 <div className="w-full h-full flex flex-col items-center justify-center p-8">
                     
                     {/* Header Content */}
                     <div className="mb-8 md:mb-12 flex flex-col items-center animate-vision">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase mb-4 border border-red-500/20">
                            <Calendar size={12} /> 2015 — 2030
                         </div>
                        <h3 className="text-4xl font-bold text-white mb-2">Sustainable Development Goals</h3>
                        <p className="text-red-200/80 font-light">17 Goals to Transform Our World</p>
                     </div>

                     {/* SDG GRID */}
                     <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 max-w-6xl mx-auto">
                        {SDG_DATA.map((goal, i) => {
                             // Randomize animation duration/type slightly
                             const animClass = i % 3 === 0 ? 'animate-float-slow' : i % 2 === 0 ? 'animate-float-medium' : 'animate-float-fast';
                             return (
                                 <div 
                                    key={goal.id} 
                                    className={`relative group/icon ${animClass}`}
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                 >
                                    <div className="aspect-square rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover/icon:scale-110 group-hover/icon:z-10 bg-white/5 border border-white/5 relative">
                                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/icon:opacity-20 transition-opacity"></div>
                                        <img 
                                            src={goal.img} 
                                            alt={`SDG ${goal.id}`} 
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                 </div>
                             );
                        })}
                     </div>
                     
                     {/* Info Card - Bottom */}
                     <div className="mt-8 glass-panel p-4 rounded-xl max-w-2xl text-sm text-vision-subtext flex gap-4 items-start text-left border-l-2 border-l-red-500 backdrop-blur-md">
                        <Info className="shrink-0 text-red-500 mt-0.5" size={18} />
                        <div>
                            <strong className="text-white block mb-1">Expanded Scope</strong>
                            A set of 17 goals that apply universally to all countries (rich and poor alike). They are broader, covering economic, social, and environmental dimensions of sustainability.
                        </div>
                     </div>
                 </div>
            </div>

            {/* =========================================================
                LAYER 2 (Foreground): MDG (Millennium Development Goals)
                Clipped from the right. Visible on the LEFT side.
               ========================================================= */}
            <div 
                className="absolute inset-0 bg-gradient-to-br from-blue-950 to-slate-900 flex items-center justify-center border-r border-white/20 shadow-[-10px_0_40px_rgba(0,0,0,0.6)]"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <div className="w-full h-full flex flex-col items-center justify-center p-8">
                    
                    {/* Header Content */}
                    <div className="mb-8 md:mb-12 flex flex-col items-center animate-vision">
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase mb-4 border border-blue-500/20">
                            <Calendar size={12} /> 2000 — 2015
                         </div>
                        <h3 className="text-4xl font-bold text-white mb-2">Millennium Development Goals</h3>
                        <p className="text-blue-200/80 font-light">8 Goals to End Poverty</p>
                    </div>

                    {/* MDG GRID */}
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                        {MDG_DATA.map((goal, i) => {
                             const animClass = i % 3 === 0 ? 'animate-float-slow' : i % 2 === 0 ? 'animate-float-medium' : 'animate-float-fast';
                             return (
                                 <div 
                                    key={goal.id} 
                                    className={`relative group/icon ${animClass}`}
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                 >
                                    <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 group-hover/icon:scale-110 group-hover/icon:z-10 bg-transparent border-0 p-0">
                                        <img 
                                            src={goal.img} 
                                            alt={goal.title}
                                            className="w-full h-full object-cover rounded-xl"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover/icon:opacity-100 transition-opacity flex items-center justify-center p-2 text-center rounded-2xl pointer-events-none">
                                        <p className="text-white text-xs font-bold leading-tight">{goal.title}</p>
                                    </div>
                                 </div>
                             );
                        })}
                     </div>

                    {/* Info Card - Bottom */}
                    <div className="mt-12 glass-panel p-4 rounded-xl max-w-2xl text-sm text-vision-subtext flex gap-4 items-start text-left border-l-2 border-l-blue-500 backdrop-blur-md">
                        <Info className="shrink-0 text-blue-500 mt-0.5" size={18} />
                        <div>
                            <strong className="text-white block mb-1">Targeted Action</strong>
                            A set of 8 goals focused primarily on social issues like poverty, hunger, and disease. They were targeted specifically at developing countries, often framed as rich nations aiding poorer ones.
                        </div>
                     </div>
                </div>
            </div>

            {/* Handle Line */}
            <div 
                className="absolute top-0 bottom-0 w-1 bg-white/60 cursor-col-resize z-30 shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:bg-white transition-colors"
                style={{ left: `${sliderPosition}%` }}
            >
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center shadow-lg text-white transition-transform hover:scale-110 active:scale-95">
                    <div className="flex gap-2">
                        <ArrowLeft size={14} />
                        <ArrowRight size={14} />
                    </div>
                 </div>
            </div>
            
        </div>
    </section>
  );
};

export default ComparisonSlider;
