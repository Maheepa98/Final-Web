import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Hero from './Hero.tsx';
import MapSection from './MapSection.tsx';
import SDGGrid from './SDGGrid.tsx';
import ComparisonSlider from './ComparisonSlider.tsx';
import DeepDive from './DeepDive.tsx';
import WhyWeCare from './WhyWeCare.tsx';
import RealtimeProgress from './RealtimeProgress.tsx';
import ProjectDetail from './ProjectDetail.tsx';

const LandingPage: React.FC = () => {
  const [zoomToSriLanka, setZoomToSriLanka] = useState(false);
  const navigate = useNavigate();

  const handleExploreData = useCallback(() => {
    const el = document.getElementById('map-section');
    el?.scrollIntoView({ behavior: 'smooth' });
    setZoomToSriLanka(false);
  }, []);

  const handleExploreJourney = useCallback(() => {
    const el = document.getElementById('map-section');
    el?.scrollIntoView({ behavior: 'smooth' });
    setZoomToSriLanka(true);
  }, []);

  const handleFocusGoal4 = useCallback(() => {
    const el = document.getElementById('deep-dive');
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleNavigateToProject = useCallback((slug: string) => {
    navigate(`/projects/${slug}`);
  }, [navigate]);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 font-sans selection:bg-sdg4 selection:text-white">
      <Hero 
        onExploreData={handleExploreData} 
        onExploreJourney={handleExploreJourney} 
      />
      
      <MapSection 
        zoomToSriLanka={zoomToSriLanka} 
        onNavigateToProject={handleNavigateToProject} 
      />
      
      <SDGGrid onFocusGoal4={handleFocusGoal4} />
      
      <ComparisonSlider />
      
      <DeepDive />

      <WhyWeCare />
      
      <RealtimeProgress />

      <footer className="py-8 text-center text-slate-600 text-sm border-t border-white/5 bg-slate-950">
        <p>© 2025 Data Visualisation Project | MTD - HCD at Singapore University of Technology and Design | Maheepa Daham Walpita<br />
           Data copyrights and authority - UN Statistics Division</p>
      </footer>
    </div>
  );
};

const ProjectRoute: React.FC = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    const handleBack = useCallback(() => navigate('/'), [navigate]);

    return <ProjectDetail slug={slug || ''} onBack={handleBack} />;
}

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects/:slug" element={<ProjectRoute />} />
      </Routes>
    </Router>
  );
};

export default App;
