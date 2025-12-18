import React from 'react';
import { ChevronDown, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onExploreData: () => void;
  onExploreJourney: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreData, onExploreJourney }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      
      {/* Header Logos (Absolute Top Left & Top Right) */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-start z-50 pointer-events-none">
          {/* Top Left: SDG Logo */}
          <img 
            src="https://github.com/Maheepa98/Final-Web/blob/main/SDG%20LOGO.png?raw=true" 
            alt="Sustainable Development Goals Logo" 
            className="h-8 md:h-12 object-contain drop-shadow-xl pointer-events-auto hover:scale-80 transition-transform duration-300"
          />
          
          {/* Top Right: SUTD Logo */}
          <img 
            src="https://github.com/Maheepa98/Final-Web/blob/main/logo-sutd-white.png?raw=true" 
            alt="SUTD Logo" 
            className="h-18 md:h-20 object-contain drop-shadow-xl pointer-events-auto hover:scale-105 transition-transform duration-300 opacity-90 hover:opacity-100"
          />
      </div>

      {/* Immersive Background Effects (Aurora-like) */}
      <div className="absolute top-[-10%] left-[20%] w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[160px] animate-pulse mix-blend-screen opacity-60" />
      <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] mix-blend-screen opacity-50" />
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] mix-blend-screen" />

      <div className="z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center animate-vision">
        
        {/* Pill Label */}
        <div className="mb-8 inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium tracking-widest uppercase text-white/80 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          Sustainable Development Goal 4
        </div>
        
        {/* Main Title - SF Pro Display Style (Light weight) */}
        <h1 className="text-6xl md:text-8xl font-light text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
          Quality Education <br />
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-300">
            Asia-Pacific
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-vision-subtext mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Experience the journey of transforming education through data and stories in Sri Lanka and beyond.
        </p>
        
        {/* Action Buttons - Vision OS Glass Pills */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button 
            onClick={onExploreData}
            className="group relative px-8 py-4 bg-white/90 text-black rounded-full text-lg font-medium transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center gap-2"
          >
            Explore Data
            <ChevronDown className="w-5 h-5 opacity-70 group-hover:translate-y-1 transition-transform" />
          </button>
          
          <button 
            onClick={onExploreJourney}
            className="group px-8 py-4 glass-panel rounded-full text-white text-lg font-medium transition-all hover:bg-white/10 hover:scale-105 flex items-center gap-3"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
              <Play size={14} className="fill-white ml-0.5"/>
            </span>
            View Journey
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Hero;
