import React from 'react';

const WhyWeCare: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-black text-center">
      
      {/* 1. Background Image (Forest/Earth Theme) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2670&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4
        }}
      />
      
      {/* 2. Overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-0"></div>
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* 3. Content */}
      <div className="relative z-10 container mx-auto px-6">
        
        {/* Title Tag */}
        <div className="mb-16 animate-fade-in-up">
            <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-white/70 border border-white/20 inline-block px-6 py-2 rounded-full backdrop-blur-md">
                Why we care
            </h2>
        </div>

        {/* Main Animated Text Block */}
        <div className="flex flex-col items-center gap-4 md:gap-8 font-display">
            
            {/* Sentence 1 */}
            <div className="relative">
                 <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-white leading-tight animate-reveal-loop" style={{ animationDelay: '0s' }}>
                    WE DO NOT INHERIT THE EARTH
                 </h1>
            </div>

            {/* Sentence 2 - Highlighted */}
            <div className="relative">
                 <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 leading-tight animate-reveal-loop" style={{ animationDelay: '2s' }}>
                    FROM OUR ANCESTORS
                 </h1>
            </div>

            {/* Sentence 3 */}
            <div className="relative mt-4">
                 <h1 className="text-xl md:text-3xl lg:text-5xl font-light text-white/90 italic serif animate-reveal-loop" style={{ animationDelay: '4s' }}>
                    ; we borrow it from our children.
                 </h1>
            </div>

        </div>

        {/* Footer Text */}
        <div className="mt-24 animate-pulse-slow">
            <p className="text-lg md:text-xl text-white font-medium tracking-[0.2em] uppercase opacity-80">
                A Better Future <span className="text-yellow-500 mx-3">•</span> A Better World
            </p>
        </div>

      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes revealLoop {
            0% { opacity: 0; transform: translateY(40px) scale(0.95); filter: blur(10px); }
            10% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
            45% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
            55% { opacity: 0; transform: translateY(-40px) scale(1.05); filter: blur(10px); }
            100% { opacity: 0; transform: translateY(-40px) scale(1.05); filter: blur(10px); }
        }

        .animate-reveal-loop {
            animation: revealLoop 10s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-up {
            animation: fadeInUp 1s ease-out forwards;
        }

        @keyframes pulseSlow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
        .animate-pulse-slow {
            animation: pulseSlow 4s ease-in-out infinite;
        }
      `}</style>

    </section>
  );
};

export default WhyWeCare;
