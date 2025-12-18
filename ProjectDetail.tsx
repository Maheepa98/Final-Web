import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../constants';
import { ArrowLeft, MapPin, Calendar, Target, CheckCircle } from 'lucide-react';

interface ProjectDetailProps {
  slug: string;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ slug, onBack }) => {
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6 animate-vision">
      <div className="max-w-6xl mx-auto">
        <button 
            onClick={onBack}
            className="mb-10 flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/80 font-medium text-sm backdrop-blur-md border border-white/5"
        >
            <ArrowLeft size={18} /> Back to Map
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Content Pane */}
            <div className="lg:col-span-7">
                <div className="flex gap-4 mb-6">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400 bg-red-900/10 px-4 py-1.5 rounded-full border border-red-500/20">
                        <Calendar size={12} /> {project.year}
                    </span>
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-vision-subtext bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                        <MapPin size={12} /> {project.location}
                    </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight tracking-tight">{project.title}</h1>
                <p className="text-2xl text-vision-subtext mb-12 font-light leading-relaxed">
                    {project.description}
                </p>

                <div className="space-y-6">
                    <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-red-500">
                        <h3 className="text-xl font-medium text-white mb-3 flex items-center gap-3"><Target size={20} className="text-red-500"/> The Problem</h3>
                        <p className="text-lg text-vision-subtext font-light">{project.fullDescription.problem}</p>
                    </div>
                    <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-yellow-500">
                        <h3 className="text-xl font-medium text-white mb-3 flex items-center gap-3"><Target size={20} className="text-yellow-500"/> Our Approach</h3>
                        <p className="text-lg text-vision-subtext font-light">{project.fullDescription.solution}</p>
                    </div>
                    <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-green-500">
                        <h3 className="text-xl font-medium text-white mb-3 flex items-center gap-3"><Target size={20} className="text-green-500"/> The Impact</h3>
                        <p className="text-lg text-vision-subtext font-light">{project.fullDescription.impact}</p>
                    </div>
                </div>
            </div>

            {/* Sidebar Pane */}
            <div className="lg:col-span-5 space-y-8">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group">
                    <img src={project.thumbnail} alt={project.title} className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                        <h4 className="text-xs uppercase tracking-widest text-white/60 mb-4 font-semibold">Key Metrics</h4>
                        <div className="flex flex-wrap gap-3">
                            {project.impactMetrics.map((metric, i) => (
                                <span key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white">
                                    <CheckCircle size={14} className="text-green-400" /> {metric}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
                    <h4 className="font-medium text-xl mb-6 text-white">Contribution to SDG 4</h4>
                    <div className="flex gap-6 items-center">
                        <div className="w-20 h-20 bg-sdg4 rounded-2xl flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-red-900/40">4</div>
                        <div className="flex-1">
                            <p className="text-base text-vision-subtext font-light leading-relaxed">
                                This project directly contributes to <strong className="text-white">Target 4.4</strong> (skills for work) and <strong className="text-white">Target 4.c</strong> (qualified teachers).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;