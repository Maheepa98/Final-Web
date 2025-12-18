import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { MAP_GEOJSON_URL, SRI_LANKA_GEOJSON_URL, PROJECTS } from './constants';
import { ArrowRight } from 'lucide-react';

interface MapSectionProps {
  zoomToSriLanka: boolean;
  onNavigateToProject: (slug: string) => void;
}

// List of Asia-Pacific Countries for Highlighting
const APAC_COUNTRIES = [
  "Afghanistan", "Australia", "Bangladesh", "Bhutan", "Brunei", "Cambodia", 
  "China", "Fiji", "India", "Indonesia", "Japan", "Kazakhstan", "Kiribati", 
  "Kyrgyzstan", "Laos", "Lao PDR", "Malaysia", "Maldives", "Marshall Islands", "Micronesia", 
  "Mongolia", "Myanmar", "Nauru", "Nepal", "New Zealand", "North Korea", "Dem. Rep. Korea", 
  "Pakistan", "Palau", "Papua New Guinea", "Philippines", "Samoa", "Singapore", "Solomon Islands", 
  "South Korea", "Korea", "Republic of Korea", "Sri Lanka", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", 
  "Tonga", "Turkmenistan", "Tuvalu", "Uzbekistan", "Vanuatu", "Vietnam", "Viet Nam"
];

const MapSection: React.FC<MapSectionProps> = ({ zoomToSriLanka, onNavigateToProject }) => {
  const worldContainerRef = useRef<HTMLDivElement>(null);
  const slContainerRef = useRef<HTMLDivElement>(null);
  const [worldGeoData, setWorldGeoData] = useState<any>(null);
  const [isHoveringApac, setIsHoveringApac] = useState(false);

  // Load World Data Once
  useEffect(() => {
    d3.json(MAP_GEOJSON_URL).then((data: any) => {
      setWorldGeoData(data);
    });
  }, []);

  // 1. Render World Map
  useEffect(() => {
    if (!worldGeoData || !worldContainerRef.current) return;

    const container = worldContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    container.innerHTML = "";
    
    const svg = d3.select(container)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("cursor", "crosshair");

    // Defs for Glows
    const defs = svg.append("defs");
    
    // Red Glow (Sri Lanka)
    const redGlow = defs.append("filter").attr("id", "sl-glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    redGlow.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
    const feMergeRed = redGlow.append("feMerge");
    feMergeRed.append("feMergeNode").attr("in", "coloredBlur");
    feMergeRed.append("feMergeNode").attr("in", "SourceGraphic");

    // Yellow Glow (APAC Region)
    const yellowGlow = defs.append("filter").attr("id", "apac-glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    yellowGlow.append("feGaussianBlur").attr("stdDeviation", "6").attr("result", "coloredBlur");
    const feMergeYellow = yellowGlow.append("feMerge");
    feMergeYellow.append("feMergeNode").attr("in", "coloredBlur");
    feMergeYellow.append("feMergeNode").attr("in", "SourceGraphic");

    const g = svg.append("g");
    
    const projection = d3.geoMercator()
      .center([110, 15]) 
      .scale(width / 2.2) 
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);
    const countries = topojson.feature(worldGeoData, worldGeoData.objects.countries);

    const tip = d3.select(container)
        .append("div")
        .attr("class", "absolute pointer-events-none px-3 py-1.5 bg-black/90 border border-white/20 rounded-lg text-white text-xs opacity-0 z-50 transition-opacity duration-200");

    const paths = g.selectAll("path")
      // @ts-ignore
      .data(countries.features)
      .enter()
      .append("path")
      // @ts-ignore
      .attr("d", path)
      .attr("stroke", "#222")
      .attr("stroke-width", 0.5)
      .attr("class", "country-path")
      .style("transition", "fill 0.4s ease, filter 0.4s ease")
      .attr("fill", (d: any) => {
          if (d.properties.name === "Sri Lanka") return "#C5192D";
          return "#161618";
      });

    // Interaction Logic
    paths.on("mousemove", (event, d: any) => {
        const name = d.properties.name;
        const isApac = APAC_COUNTRIES.includes(name);
        
        setIsHoveringApac(isApac);
        
        tip.style("opacity", 1)
           .style("left", `${event.offsetX + 15}px`)
           .style("top", `${event.offsetY + 15}px`)
           .html(`<div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full ${isApac ? 'bg-yellow-400' : 'bg-white/20'}"></span>
                    ${name}
                  </div>`);
    })
    .on("mouseleave", () => {
        setIsHoveringApac(false);
        tip.style("opacity", 0);
    });
  }, [worldGeoData]); 

  // Refill logic based on hover state - SEPARATE EFFECT (NOT NESTED)
  useEffect(() => {
      if (!worldContainerRef.current) return;
      const paths = d3.select(worldContainerRef.current).selectAll(".country-path");
      
      paths.transition().duration(400)
           .attr("fill", (d: any) => {
               if (d.properties.name === "Sri Lanka") return "#C5192D";
               if (isHoveringApac && APAC_COUNTRIES.includes(d.properties.name)) return "#fbbf24";
               return "#161618";
           })
           .style("filter", (d: any) => {
               if (d.properties.name === "Sri Lanka") return "url(#sl-glow)";
               if (isHoveringApac && APAC_COUNTRIES.includes(d.properties.name)) return "url(#apac-glow)";
               return "none";
           });
  }, [isHoveringApac]);

  // 2. Render Sri Lanka Markers on top of PNG
  useEffect(() => {
    if (!zoomToSriLanka || !slContainerRef.current) return;

    const renderSLMarkers = async () => {
        const container = slContainerRef.current;
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const existingOverlay = container.querySelector('.marker-overlay');
        if (existingOverlay) existingOverlay.remove();

        // Get GeoJSON to align coordinates
        const geojson = await d3.json(SRI_LANKA_GEOJSON_URL) as any;

        const svg = d3
            .select(container)
            .append("svg")
            .attr("class", "marker-overlay absolute inset-0 z-30")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style("width", "100%")
            .style("height", "100%")
            .style("overflow", "visible")
            .style("pointer-events", "none");

        const defs = svg.append("defs");
        PROJECTS.forEach((p, i) => {
            defs.append("pattern")
                .attr("id", `pattern-${i}`)
                .attr("width", 1)
                .attr("height", 1)
                .attr("patternContentUnits", "objectBoundingBox")
                .append("image")
                .attr("href", p.thumbnail)
                .attr("width", 1).attr("height", 1)
                .attr("preserveAspectRatio", "xMidYMid slice");
        });

        const g = svg.append("g");
        
        // Match the projection to the PNG's bounds roughly
        const projection = d3.geoMercator().fitExtent([[width * 0.15, height * 0.15], [width * 0.85, height * 0.85]], geojson);

        const markers = g.selectAll(".pin-group")
            .data(PROJECTS)
            .enter()
            .append("g")
            .attr("class", "pin-group")
            .style("cursor", "pointer")
            .style("pointer-events", "auto")
            .attr("transform", (d) => {
                const [lat, lon] = d.coordinates;
                const coords = projection([lon, lat]) || [0,0];
                return `translate(${coords[0]}, ${coords[1]})`;
            });

        markers.each(function(d, i) {
            const group = d3.select(this);
            group.style("animation", `float ${3 + i * 0.7}s ease-in-out infinite`);
            
            // Marker Shadow
            group.append("circle")
                .attr("r", 24)
                .attr("fill", "rgba(0,0,0,0.5)")
                .attr("filter", "blur(4px)")
                .attr("cy", 10);

            // Marker Ring
            group.append("circle")
                .attr("r", 22)
                .attr("fill", "#1a1a1a")
                .attr("stroke", "#fff")
                .attr("stroke-width", 2);

            // Marker Content
            group.append("circle")
                .attr("r", 20)
                .attr("fill", `url(#pattern-${i})`);
        });

        markers.on("click", (_, d) => onNavigateToProject(d.slug));
    };

    renderSLMarkers();
  }, [zoomToSriLanka, onNavigateToProject]);

  return (
    <section id="map-section" className="relative min-h-screen flex flex-col lg:flex-row bg-[#080808] overflow-hidden">
      
      {/* Immersive Motion Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
        }
        @keyframes island-drift {
            0%, 100% { transform: scale(1) translateY(0px) rotate(0deg); }
            50% { transform: scale(1.03) translateY(-15px) rotate(0.5deg); }
        }
        @keyframes pulse-relief {
            0%, 100% { filter: drop-shadow(0 0 30px rgba(197, 25, 45, 0.2)); }
            50% { filter: drop-shadow(0 0 60px rgba(197, 25, 45, 0.4)); }
        }
        .relief-island {
            animation: island-drift 8s ease-in-out infinite, pulse-relief 6s ease-in-out infinite;
        }
        .country-path:hover {
            stroke: #fff;
            stroke-width: 1px;
            z-index: 10;
        }
      `}} />

      {/* Left Info Panel */}
      <div className={`relative z-40 flex-1 p-6 lg:p-12 flex flex-col justify-center transition-all duration-1000 ease-in-out ${zoomToSriLanka ? 'lg:w-[35%] opacity-100 translate-x-0' : 'lg:w-[40%]'}`}>
        <div className="glass-panel p-8 md:p-12 rounded-[2.5rem]">
            {!zoomToSriLanka ? (
                <div className="animate-vision">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-1 bg-yellow-500 rounded-full"></div>
                        <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">Region of Opportunity</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-light mb-6 text-white tracking-tight">Asia-Pacific</h2>
                    <p className="text-xl text-vision-subtext mb-10 leading-relaxed font-light">
                        Explore the diverse educational landscape across the region. From global leaders to emerging success stories, the journey of quality learning is unique for every nation.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-yellow-500/30 transition-colors">
                            <h3 className="text-4xl font-light text-white mb-2">98%</h3>
                            <p className="text-xs text-vision-subtext font-bold uppercase tracking-wider">Net Enrollment</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-red-500/30 transition-colors">
                            <h3 className="text-4xl font-light text-red-500 mb-2">1:35</h3>
                            <p className="text-xs text-vision-subtext font-bold uppercase tracking-wider">Avg Teacher Ratio</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="animate-vision">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-light text-white">Sri Lanka Journey</h2>
                            <p className="text-xs text-vision-subtext mt-1 uppercase tracking-widest">Interactive Project Map</p>
                        </div>
                        <span className="px-3 py-1 bg-red-900/40 text-red-300 text-xs font-bold rounded-full border border-red-500/20">Active</span>
                    </div>
                    <div className="space-y-4 max-h-[50vh] overflow-y-auto scrollbar-hide pr-2">
                        {PROJECTS.map((project, idx) => (
                            <div 
                                key={project.slug}
                                onClick={() => onNavigateToProject(project.slug)}
                                className="group cursor-pointer bg-white/5 hover:bg-white/10 border border-white/5 p-4 rounded-3xl flex gap-5 items-center transition-all duration-300 hover:scale-[1.02]"
                            >
                                <div className="relative">
                                    <img src={project.thumbnail} alt={project.title} className="w-16 h-16 object-cover rounded-2xl border border-white/10" />
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#080808]">
                                        {idx + 1}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-white group-hover:text-red-400 transition-colors">{project.title}</h3>
                                    <p className="text-xs text-vision-subtext">{project.location}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                    <ArrowRight className="text-white w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Right Map Area */}
      <div className="relative flex-1 h-[50vh] lg:h-auto overflow-hidden">
        
        {/* World Map Layer */}
        <div 
            ref={worldContainerRef} 
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${zoomToSriLanka ? 'opacity-0 scale-[2.5] blur-2xl pointer-events-none' : 'opacity-100 scale-100 blur-0'}`}
        ></div>

        {/* Sri Lanka Immersive Relief PNG Layer */}
        <div 
            ref={slContainerRef} 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${zoomToSriLanka ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
        >
            <div className="relative w-full h-full flex items-center justify-center p-12">
                <img 
                    src="https://github.com/Maheepa98/Final-Web/blob/main/sri-lanka-map-shaded-relief-color-height-map-3d-illustration-png.webp.png?raw=true$0" 
                    alt="Sri Lanka Relief" 
                    className="relief-island max-w-[80%] max-h-[80%] object-contain transition-all duration-1000"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://github.com/Maheepa98/Final-Web/blob/main/sri-lanka-relief.png?raw=true";
                    }}
                />
            </div>
        </div>

        {/* Dynamic Contextual Glows */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[200px] pointer-events-none transition-colors duration-1000 ${isHoveringApac ? 'bg-yellow-500/10' : 'bg-red-900/5'}`}></div>
      </div>
    </section>
  );
};

export default MapSection;
