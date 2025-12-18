export interface Project {
  slug: string;
  title: string;
  year: number;
  location: string;
  thumbnail: string;
  description: string;
  impactMetrics: string[];
  coordinates: [number, number]; // [latitude, longitude]
  fullDescription: {
    problem: string;
    solution: string;
    impact: string;
  };
}

export interface SDGGoal {
  id: number;
  title: string;
  description: string;
  color: string;
  targets: string[];
  image: string;
  progress: number; // New field for 2030 projection score (0-100)
  stats: {
    targets: number;
    events: number;
    publications: number;
    actions: number;
  };
}

export interface CountryData {
  name: string;
  code: string; // ISO 3-letter
  value: number;
}

export interface YearValue {
  year: number;
  value: number;
}

export interface IndicatorData {
  id: string;
  name: string;
  data: CountryData[]; // Snapshot for map/ranking
  trends: { name: string; series: YearValue[] }[]; // For trend chart
}

export interface AnalysisContent {
  title: string;
  summary: string;
  fullText: string;
  sources: { name: string; url: string }[];
}

export interface DeepDiveData {
  // Section 1: Education Completion (SDG 4.1.2)
  educationTrends: {
    year: number;
    primary: number;       
    lowerSecondary: number; 
    upperSecondary: number; 
    isForecast: boolean;
  }[];
  completionAnalysis: AnalysisContent;

  // Section 2: Teacher Training (SDG 4.c.1)
  teacherStats: { 
    name: string; 
    value: number; 
    color: string; 
  }[];
  teacherAnalysis: AnalysisContent;

  // Section 3: Asia-Pacific Comparison (SDG 4.1.1)
  regionalComparison: {
    country: string;
    code: string; // ISO 2-letter for flags
    value: number;
    isHighlight: boolean; // For Gradient styling (SL + SG)
  }[];
  regionalAnalysis: AnalysisContent;
}
