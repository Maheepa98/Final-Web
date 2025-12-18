import React, { useState } from 'react';
import { SDG_GOALS } from '../constants';

const RealtimeProgress: React.FC = () => {
  const [hoveredGoalId, setHoveredGoalId] = useState<number | null>(null);

  const activeGoal = hoveredGoalId ? SDG_GOALS.find(g => g.id === hoveredGoalId) : null;

  return (
    <section className="py-24 bg-[#080808] min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Title */}
        <div className="mb-16 text-center z-10 animate-vision">
            <h2 className="text-4xl md:text-6xl font-extralight text-white tracking-tighter italic font-display">
                Last but not least...
            </h2>
            <p className="text-vision-subtext mt-4 text-sm uppercase tracking-widest">
                Global Achievement Rate • 2030 Projection
            </p>
        </div>

        {/* Central Spinning Wheel */}
        <div className="relative mb-16 z-10 w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
             
             {/* 1. The Spinning Ring */}
             <div className="absolute inset-0 animate-[spin_30s_linear_infinite]">
                 <img 
                    src="https://assets.bizclikmedia.net/1336/6e218d9770a32d292e1321b07a5ee9ad:d1fcf276290f37d67b5c5d2dd07724d3/sdg-logo.webp"
                    alt="SDG Color Wheel"
                    className="w-full h-full object-contain drop-shadow-2xl"
                 />
             </div>

             {/* 2. The Static Center Text */}
             <div className="absolute z-5 w-[40%] h-[40%] bg-[#080808] rounded-full flex flex-col items-center justify-center text-center shadow-2xl border border-white/10 p-4">
                <span className="text-white/90 font-bold text-xs md:text-sm uppercase tracking-widest leading-relaxed">
                   SDG<br/>
                </span>
                <span className="text-sdg4 font-bold text-lg md:text-xl mt-1 tracking-tighter">
                    2030
                </span>
             </div>

        </div>

        {/* Bar Chart Container */}
        <div className="w-full max-w-6xl px-6 z-10">
            <div className="flex items-end justify-center gap-2 md:gap-4 h-[300px] border-b border-white/10 pb-4">
                {SDG_GOALS.map((goal) => {
                    const isHovered = hoveredGoalId === goal.id;
                    return (
                        <div 
                            key={goal.id}
                            className="group relative flex-1 flex flex-col justify-end items-center h-full transition-all duration-300"
                            onMouseEnter={() => setHoveredGoalId(goal.id)}
                            onMouseLeave={() => setHoveredGoalId(null)}
                        >
                            {/* The Bar */}
                            <div 
                                className="w-full min-w-[12px] md:min-w-[40px] rounded-t-lg transition-all duration-500 ease-out relative"
                                style={{ 
                                    height: `${goal.progress}%`,
                                    backgroundColor: goal.color,
                                    opacity: hoveredGoalId ? (isHovered ? 1 : 0.2) : 0.8,
                                    transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)',
                                    transformOrigin: 'bottom',
                                    boxShadow: isHovered ? `0 0 20px ${goal.color}` : 'none'
                                }}
                            >
                                {/* Percentage Label on top of bar (visible on hover) */}
                                <div 
                                    className={`absolute -top-8 left-1/2 -translate-x-1/2 text-white text-xs font-bold transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    {goal.progress}%
                                </div>
                            </div>

                            {/* Goal Number Label (Bottom) */}
                            <div className="mt-3 text-xs md:text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                                {goal.id}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Interactive Tooltip / Detail View */}
        <div className="h-24 mt-8 flex items-center justify-center text-center px-4 w-full">
            {activeGoal ? (
                <div className="animate-fade-in-up bg-white/5 border border-white/10 backdrop-blur-md px-8 py-4 rounded-2xl shadow-2xl flex flex-col items-center">
                    <h3 className="text-2xl font-bold mb-1" style={{ color: activeGoal.color }}>
                        Goal {activeGoal.id}: {activeGoal.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                         <span className="uppercase tracking-wider opacity-60">2030 Projection</span>
                         <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                             <div 
                                className="h-full rounded-full transition-all duration-300" 
                                style={{ width: `${activeGoal.progress}%`, backgroundColor: activeGoal.color }}
                             ></div>
                         </div>
                         <span className="font-mono font-bold">{activeGoal.progress}%</span>
                    </div>
                </div>
            ) : (
                <p className="text-white/30 text-sm animate-pulse">Hover over the bars to see details</p>
            )}
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none -z-0"></div>

    </section>
  );
};

export default RealtimeProgress;
