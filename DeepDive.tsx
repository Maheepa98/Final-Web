import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine, 
  PieChart, Pie, Cell, BarChart, Bar, Rectangle
} from 'recharts';
import { fetchDeepDiveData } from '../services/dataService';
import { DeepDiveData, AnalysisContent } from '../types';
import { TrendingUp, FileText, X, ExternalLink, ArrowRight, BookOpen, GraduationCap, Globe, RotateCcw } from 'lucide-react';

const DeepDive: React.FC = () => {
  const [data, setData] = useState<DeepDiveData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State for Chart Animation Keys to force re-render on click
  const [chartKeys, setChartKeys] = useState({
      completion: 0,
      teacher: 0,
      regional: 0
  });

  // State to hold which analysis is currently active in the modal (null = closed)
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisContent | null>(null);

  useEffect(() => {
    fetchDeepDiveData().then(d => {
        setData(d);
        setLoading(false);
    });
  }, []);

  const handleReplay = (chart: 'completion' | 'teacher' | 'regional') => {
      setChartKeys(prev => ({ ...prev, [chart]: prev[chart] + 1 }));
  };

  if (loading || !data) {
    return (
        <section id="deep-dive" className="min-h-screen bg-black flex items-center justify-center">
             <div className="w-10 h-10 border-2 border-white/20 border-t-red-500 rounded-full animate-spin"></div>
        </section>
    );
  }

  const toPercent = (decimal: number) => `${decimal.toFixed(1)}%`;

  return (
    <section id="deep-dive" className="py-24 bg-[#050505] text-white relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Background Ambience */}
      <div className="absolute top-[10%] right-0 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Main Section Header */}
        <div className="mb-20 animate-vision">
            <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-red-500/50"></div>
                <span className="text-red-400 text-xs font-bold uppercase tracking-[0.2em]">Live Data Forecast</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tight text-white">
                Uneven <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Spread</span>
            </h2>
        </div>

        <div className="flex flex-col gap-32">
            
            {/* =========================================================================
                SECTION 1: COMPLETION RATE (Chart Left, Text Right)
               ========================================================================= */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 h-auto lg:h-[550px]">
                
                {/* LEFT: 70% - Area Chart */}
                <div className="lg:w-[70%] glass-panel rounded-[2.5rem] p-6 md:p-8 flex flex-col shadow-2xl animate-vision border border-white/10 relative overflow-hidden group transition-all duration-500 hover:border-red-500/30 hover:shadow-[0_0_50px_rgba(229,36,59,0.15)]">
                     <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-transparent opacity-50"></div>
                     
                     <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-2xl font-light text-white flex items-center gap-2">
                                Completion Rate Trends <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-vision-subtext uppercase tracking-wider">2015-2025</span>
                            </h3>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex gap-4 text-xs font-medium">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400"></div> Primary</div>
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Lower Sec</div>
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Upper Sec</div>
                            </div>
                            <RefreshButton onClick={() => handleReplay('completion')} />
                        </div>
                     </div>

                     <div className="flex-1 w-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart key={chartKeys.completion} data={data.educationTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="gradPrimary" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="gradLower" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="gradUpper" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="year" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} dy={10} />
                                <YAxis domain={[75, 100]} stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} tickFormatter={toPercent} />
                                <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }} />
                                <ReferenceLine x={2023} stroke="white" strokeDasharray="3 3" label={{ position: 'top', value: 'FORECAST', fill: 'white', fontSize: 10, fillOpacity: 0.5 }} />
                                <Area type="monotone" dataKey="primary" name="Primary" stroke="#4ade80" strokeWidth={2} fill="url(#gradPrimary)" animationDuration={1500} />
                                <Area type="monotone" dataKey="lowerSecondary" name="Lower Secondary" stroke="#60a5fa" strokeWidth={2} fill="url(#gradLower)" animationDuration={1500} animationBegin={200} />
                                <Area type="monotone" dataKey="upperSecondary" name="Upper Secondary" stroke="#ef4444" strokeWidth={3} fill="url(#gradUpper)" animationDuration={1500} animationBegin={400} />
                            </AreaChart>
                        </ResponsiveContainer>
                     </div>
                </div>

                {/* RIGHT: 30% - Context */}
                <div className="lg:w-[30%] flex flex-col gap-6 animate-vision" style={{ animationDelay: '0.2s' }}>
                    <InfoCard 
                        analysis={data.completionAnalysis} 
                        icon={<TrendingUp className="text-red-400" size={24} />}
                        onReadMore={() => setActiveAnalysis(data.completionAnalysis)}
                    />
                </div>
            </div>

            {/* =========================================================================
                SECTION 2: TEACHER TRAINING (Text Left, Chart Right)
               ========================================================================= */}
            <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 h-auto lg:h-[550px]">
                
                {/* LEFT: 30% - Context */}
                <div className="lg:w-[30%] flex flex-col gap-6 animate-vision" style={{ animationDelay: '0.4s' }}>
                    <InfoCard 
                        analysis={data.teacherAnalysis} 
                        icon={<GraduationCap className="text-yellow-400" size={24} />}
                        onReadMore={() => setActiveAnalysis(data.teacherAnalysis)}
                        alignRight={true}
                    />
                </div>

                {/* RIGHT: 70% - Pie Chart */}
                <div className="lg:w-[70%] glass-panel rounded-[2.5rem] p-6 md:p-8 flex flex-col shadow-2xl animate-vision border border-white/10 relative overflow-hidden group transition-all duration-500 hover:border-yellow-500/30 hover:shadow-[0_0_50px_rgba(234,179,8,0.15)]">
                     <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-red-500 to-transparent opacity-50"></div>
                     
                     <div className="flex flex-row justify-between items-start md:items-center mb-6 z-10">
                        <div>
                            <h3 className="text-2xl font-light text-white flex items-center gap-2">
                                Teacher Qualifications <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-vision-subtext uppercase tracking-wider">SDG 4.c.1</span>
                            </h3>
                            <p className="text-sm text-vision-subtext mt-1">Share of trained vs untrained teachers</p>
                        </div>
                        <RefreshButton onClick={() => handleReplay('teacher')} />
                     </div>

                     <div className="flex-1 w-full min-h-[300px] flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart key={chartKeys.teacher}>
                                <Pie
                                    data={data.teacherStats}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={120}
                                    outerRadius={160}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                    startAngle={90}
                                    endAngle={-270}
                                    animationDuration={1500}
                                >
                                    {data.teacherStats.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.color} 
                                            style={{ filter: `drop-shadow(0px 0px 10px ${entry.color}40)` }}
                                        />
                                    ))}
                                </Pie>
                                <RechartsTooltip content={<CustomPieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        
                        {/* Center Statistics Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-6xl font-light text-white tracking-tighter">
                                {data.teacherStats.find(s => s.name === 'Trained')?.value}%
                            </span>
                            <span className="text-sm uppercase tracking-widest text-vision-subtext font-bold mt-2">
                                Trained
                            </span>
                        </div>
                     </div>
                </div>

            </div>

             {/* =========================================================================
                SECTION 3: ASIA-PACIFIC REGION (Chart Left, Text Right)
               ========================================================================= */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 h-auto lg:h-[550px]">
                
                {/* LEFT: 70% - Bar Chart */}
                <div className="lg:w-[70%] glass-panel rounded-[2.5rem] p-6 md:p-8 flex flex-col shadow-2xl animate-vision border border-white/10 relative overflow-hidden group transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]">
                     <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent opacity-50"></div>
                     
                     <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-2xl font-light text-white flex items-center gap-2">
                                Asia - Pacific Region <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-vision-subtext uppercase tracking-wider">SDG 4.1.1</span>
                            </h3>
                            <p className="text-sm text-vision-subtext mt-1">Minimum Proficiency Level (Reading, Lower Secondary)</p>
                        </div>
                        <RefreshButton onClick={() => handleReplay('regional')} />
                     </div>

                     <div className="flex-1 w-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart key={chartKeys.regional} data={data.regionalComparison} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                <defs>
                                    {/* Highlight Gradients (High saturation/contrast) */}
                                    <linearGradient id="gradSingapore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                    </linearGradient>
                                    <linearGradient id="gradSriLanka" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fbbf24" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#C5192D" stopOpacity={0.8}/>
                                    </linearGradient>

                                    {/* Other Country Gradients (Distinct colors) */}
                                    <linearGradient id="gradJapan" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#a78bfa" stopOpacity={1}/> {/* Purple-400 */}
                                        <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.6}/> {/* Violet-600 */}
                                    </linearGradient>
                                    <linearGradient id="gradKorea" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#34d399" stopOpacity={1}/> {/* Emerald-400 */}
                                        <stop offset="100%" stopColor="#059669" stopOpacity={0.6}/> {/* Emerald-600 */}
                                    </linearGradient>
                                    <linearGradient id="gradVietnam" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#f472b6" stopOpacity={1}/> {/* Pink-400 */}
                                        <stop offset="100%" stopColor="#db2777" stopOpacity={0.6}/> {/* Pink-600 */}
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis 
                                    dataKey="country" 
                                    stroke="rgba(255,255,255,0.3)" 
                                    tick={(props) => <CustomFlagTick {...props} data={data.regionalComparison} />}
                                    interval={0}
                                    axisLine={false} 
                                    tickLine={false} 
                                    height={60}
                                />
                                <YAxis 
                                    domain={[0, 100]} 
                                    stroke="rgba(255,255,255,0.3)" 
                                    tick={{ fontSize: 11, fill: '#888' }} 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tickFormatter={toPercent}
                                />
                                <RechartsTooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                                
                                <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1500}>
                                    {data.regionalComparison.map((entry, index) => {
                                        let fillUrl = '#475569';
                                        if (entry.country === 'Singapore') fillUrl = 'url(#gradSingapore)';
                                        else if (entry.country === 'Sri Lanka') fillUrl = 'url(#gradSriLanka)';
                                        else if (entry.country === 'Japan') fillUrl = 'url(#gradJapan)';
                                        else if (entry.country === 'South Korea') fillUrl = 'url(#gradKorea)';
                                        else if (entry.country === 'Vietnam') fillUrl = 'url(#gradVietnam)';

                                        return (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={fillUrl}
                                                fillOpacity={1}
                                                style={{ 
                                                    // Glow only for Highlights (SG & SL)
                                                    filter: entry.isHighlight 
                                                        ? `drop-shadow(0px 0px 10px ${entry.country === 'Singapore' ? 'rgba(34, 211, 238, 0.5)' : 'rgba(251, 191, 36, 0.5)'})` 
                                                        : 'none'
                                                }}
                                            />
                                        );
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                </div>

                {/* RIGHT: 30% - Context */}
                <div className="lg:w-[30%] flex flex-col gap-6 animate-vision" style={{ animationDelay: '0.2s' }}>
                    <InfoCard 
                        analysis={data.regionalAnalysis} 
                        icon={<Globe className="text-blue-400" size={24} />}
                        onReadMore={() => setActiveAnalysis(data.regionalAnalysis)}
                    />
                </div>
            </div>

        </div>

      </div>

      {/* DYNAMIC READ MORE MODAL */}
      {activeAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActiveAnalysis(null)}></div>
            <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 md:p-12 shadow-2xl animate-vision">
                <button 
                    onClick={() => setActiveAnalysis(null)}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <h3 className="text-3xl font-light text-white mb-2">{activeAnalysis.title}</h3>
                <div className="h-1 w-20 bg-red-500 mb-8"></div>

                <div className="prose prose-invert prose-lg text-vision-subtext font-light">
                    <p className="whitespace-pre-line leading-loose">
                        {activeAnalysis.fullText}
                    </p>
                </div>
                
                {/* Official Sources in Modal */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Official Sources</h4>
                    <ul className="space-y-2">
                        {activeAnalysis.sources.map((source, idx) => (
                             <li key={idx}>
                                <a 
                                    href={source.url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                                >
                                    <ExternalLink size={14} /> {source.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 flex justify-end">
                    <button 
                        onClick={() => setActiveAnalysis(null)}
                        className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
                    >
                        Close Analysis
                    </button>
                </div>
            </div>
        </div>
      )}
    </section>
  );
};

/* --- SUB-COMPONENTS --- */

const RefreshButton = ({ onClick }: { onClick: () => void }) => (
    <button 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white/50 hover:text-white transition-all hover:rotate-180 duration-500 group"
        title="Replay Animation"
    >
        <RotateCcw size={16} className="group-active:scale-90 transition-transform" />
    </button>
);

const CustomFlagTick = ({ x, y, payload, data }: any) => {
    const country = data[payload.index];
    if (!country) return null;

    return (
        <g transform={`translate(${x},${y})`}>
            {/* Flag Image */}
            <image 
                x={-12} 
                y={10} 
                width={24} 
                height={24} 
                href={`https://flagcdn.com/w40/${country.code}.png`} 
                style={{ clipPath: 'circle(12px at center)' }}
                className="rounded-full"
            />
            {/* Country Code Label */}
            <text 
                x={0} 
                y={45} 
                textAnchor="middle" 
                fill="#ffffff" 
                fontSize={10} 
                fontWeight={country.isHighlight ? 700 : 400}
                opacity={country.isHighlight ? 1 : 0.6}
            >
                {country.country}
            </text>
        </g>
    );
};


const InfoCard: React.FC<{ 
    analysis: AnalysisContent; 
    icon: React.ReactNode; 
    onReadMore: () => void;
    alignRight?: boolean;
}> = ({ analysis, icon, onReadMore, alignRight }) => (
    <>
        <div className={`glass-panel p-8 rounded-[2rem] flex-1 flex flex-col justify-center border border-white/10 hover:border-white/20 transition-all ${alignRight ? 'items-end text-right' : ''}`}>
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-2xl font-medium text-white mb-4">{analysis.title}</h3>
            <p className="text-vision-subtext leading-relaxed mb-8 font-light">
                {analysis.summary}
            </p>
            <button 
                onClick={onReadMore}
                className={`group flex items-center gap-2 text-white font-medium border-b border-white/20 pb-1 w-fit hover:border-red-500 transition-colors ${alignRight ? 'flex-row-reverse' : ''}`}
            >
                Read Full Analysis 
                <ArrowRight size={16} className={`group-hover:translate-x-1 transition-transform text-red-500 ${alignRight ? 'group-hover:-translate-x-1 rotate-180' : ''}`} />
            </button>
        </div>

        <div className={`glass-panel p-8 rounded-[2rem] border border-white/10 ${alignRight ? 'text-right' : ''}`}>
            <h4 className={`text-xs font-bold text-vision-subtext uppercase tracking-widest mb-4 flex items-center gap-2 ${alignRight ? 'justify-end' : ''}`}>
                <FileText size={12} /> Official Reports
            </h4>
            <ul className="space-y-3">
                {analysis.sources.slice(0, 3).map((source, idx) => (
                    <li key={idx}>
                        <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className={`flex items-center text-sm text-white/70 hover:text-white transition-colors group p-2 hover:bg-white/5 rounded-lg -mx-2 ${alignRight ? 'justify-end' : 'justify-between'}`}
                        >
                            <span className="truncate pr-4">{source.name}</span>
                            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </>
);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl">
                <p className="text-white/60 text-xs mb-3 uppercase tracking-wider font-semibold">Year {label}</p>
                {payload.map((entry: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 mb-2 last:mb-0 min-w-[180px]">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.stroke }}></div>
                            <span className="text-white/80 text-sm font-medium">{entry.name}</span>
                        </div>
                        <span className="text-white text-sm font-bold ml-auto font-mono">
                            {entry.value.toFixed(1)}%
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
            <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-3 rounded-xl shadow-2xl">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.payload.color }}></div>
                    <span className="text-white text-sm font-medium">{data.name}:</span>
                    <span className="text-white text-sm font-bold">{data.value}%</span>
                </div>
            </div>
        );
    }
    return null;
};

const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl">
                <div className="mb-2 flex items-center gap-2">
                    <img src={`https://flagcdn.com/w40/${data.code}.png`} className="w-4 h-3 rounded-[2px]" alt="flag" />
                    <span className="text-white font-bold text-sm">{data.country}</span>
                </div>
                <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Proficiency</div>
                <div className="text-2xl font-light text-white font-mono">{data.value}%</div>
            </div>
        );
    }
    return null;
};

export default DeepDive;
