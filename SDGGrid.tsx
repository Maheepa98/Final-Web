import React from 'react';
import { SDG_GOALS } from '../constants';
import { SDGGoal } from '../types';

interface SDGGridProps {
  onFocusGoal4: () => void;
}

const SDGGrid: React.FC<SDGGridProps> = ({ onFocusGoal4 }) => {
  return (
    <section className="py-24 bg-black relative border-t border-white/5 min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-vision">
                 <h2 className="text-5xl md:text-6xl font-light text-white mb-6">The Sustainable Development Goals - 2030 </h2>
                 <p className="text-xl text-vision-subtext max-w-2xl mx-auto font-light">Seventeen interlinked objectives to transform our world.</p>
            </div>

            {/* Centered Grid with Vertical Rectangles */}
            <div className="flex flex-wrap justify-center gap-6 max-w-[1600px] mx-auto">
                {SDG_GOALS.map((goal) => (
                   <GoalCard key={goal.id} goal={goal} onFocusGoal4={onFocusGoal4} />
                ))}
            </div>
        </div>
    </section>
  );
};

// Helper to convert hex to rgba for the overlay
const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const GoalCard: React.FC<{ goal: SDGGoal; onFocusGoal4: () => void }> = ({ goal, onFocusGoal4 }) => {
    const isTarget = goal.id === 4;

    return (
        <div className={`relative w-[280px] h-[480px] rounded-lg transition-transform duration-300 hover:-translate-y-2 ${isTarget ? 'z-10' : 'z-0'}`}>
            
            {/* ANIMATED BORDER FOR GOAL 4 */}
            {isTarget && (
                <>
                    {/* 1. Spinning Multi-Color Gradient Layer (The Border) */}
                    <div className="absolute -inset-[4px] rounded-xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,#E5243B,#DDA63A,#4C9F38,#0A97D9,#19486A,#E5243B)] animate-[spin_4s_linear_infinite]" />
                    </div>

                    {/* 2. Soft Glow Layer behind the card */}
                    <div className="absolute -inset-4 bg-red-600/30 blur-2xl rounded-full opacity-60 animate-pulse pointer-events-none"></div>
                </>
            )}

            {/* Main Card Content */}
            <div 
                className="group relative w-full h-full bg-slate-900 rounded-lg overflow-hidden cursor-pointer shadow-xl"
                onClick={() => { if(isTarget) onFocusGoal4(); }}
            >
                {/* 1. Default State: Icon + Color Background */}
                <div 
                    className="absolute inset-0 flex flex-col p-6 transition-all duration-500 group-hover:opacity-0 z-10"
                    style={{ backgroundColor: goal.color }}
                >
                    {/* Header Number */}
                    <div className="text-4xl font-bold text-white mb-4 drop-shadow-md">{goal.id}</div>
                    
                    {/* Centered Icon - White */}
                    <div className="flex-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-95 group-hover:brightness-90">
                        <img 
                            src={`https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${goal.id.toString().padStart(2, '0')}.jpg`}
                            alt={`SDG ${goal.id}`}
                            className="w-48 h-48 object-contain" 
                            style={{ mixBlendMode: 'normal' }} 
                        />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white uppercase leading-tight mt-4 drop-shadow-md">{goal.title}</h3>
                </div>

                {/* 2. Hover State: Image Background + Info Overlay (The Popup) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-20">
                    {/* Background Image */}
                    <img 
                        src={goal.image} 
                        alt={goal.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Colored Overlay (92% opacity) */}
                    <div 
                        className="absolute inset-0 p-6 flex flex-col text-white"
                        style={{ backgroundColor: hexToRgba(goal.color, 0.92) }}
                    >
                        {/* Big Number */}
                        <div className="text-7xl font-bold mb-2 opacity-30 select-none">{goal.id}</div>
                        
                        {/* Header */}
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2">Goal {goal.id}</h3>
                            <p className="font-semibold text-base leading-snug">{goal.description}</p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-white/50 mb-6"></div>

                        {/* Stats Grid 2x2 */}
                        <div className="grid grid-cols-2 gap-y-6 gap-x-2 mb-auto">
                            <div>
                                <span className="block text-4xl font-bold condensed leading-none">{goal.stats.targets}</span>
                                <span className="text-sm font-medium">Targets</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-bold condensed leading-none">{goal.stats.events}</span>
                                <span className="text-sm font-medium">Events</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-bold condensed leading-none">{goal.stats.publications}</span>
                                <span className="text-sm font-medium">Publications</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-bold condensed leading-none">{goal.stats.actions}</span>
                                <span className="text-sm font-medium">Actions</span>
                            </div>
                        </div>

                        {/* Official SDG Link Button */}
                        <a 
                            href={`https://sdgs.un.org/goals/goal${goal.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} // Stop propagation to allow external link click without triggering card scroll
                            className="w-full py-3 border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-black transition-colors uppercase tracking-wide mt-4 block text-center"
                        >
                            More info
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SDGGrid;