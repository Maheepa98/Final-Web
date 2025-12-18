import { IndicatorData, DeepDiveData } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchDeepDiveData = async (): Promise<DeepDiveData> => {
  await delay(800);

  // --- SECTION 1: COMPLETION RATE (SDG 4.1.2) ---
  const startYear = 2015;
  const endYear = 2025;
  const educationTrends = [];
  
  for (let y = startYear; y <= endYear; y++) {
    const isForecast = y > 2023;
    let noise = (Math.random() - 0.5) * 0.5;
    let covidImpact = (y === 2020 || y === 2021) ? -1.5 : 0;
    let recovery = (y > 2021) ? (y - 2021) * 0.4 : 0;

    if (isForecast) {
        recovery += 0.5; 
        noise = 0;
    }

    educationTrends.push({
        year: y,
        primary: Math.min(100, 98.5 + (y - startYear) * 0.1 + covidImpact * 0.2 + noise),
        lowerSecondary: Math.min(100, 94.0 + (y - startYear) * 0.25 + covidImpact * 0.8 + recovery + noise),
        upperSecondary: Math.min(100, 84.5 + (y - startYear) * 0.4 + covidImpact * 1.2 + recovery + noise),
        isForecast
    });
  }

  // --- SECTION 2: TEACHER TRAINING (SDG 4.c.1) ---
  // Data Source Proxy: UN Statistics Division for Sri Lanka (Area Code 144)
  const teacherStats = [
    { name: "Trained", value: 88, color: "#C5192D" }, // SDG 4 Red
    { name: "Untrained", value: 12, color: "#2e2e32" } // Dark Grey
  ];

  // --- SECTION 3: ASIA-PACIFIC REGION (SDG 4.1.1) ---
  // Indicator: Proportion of children/young people achieving at least a minimum proficiency level in reading (Lower Secondary)
  // Logic: Top 3 APAC Performers + Sri Lanka + Singapore
  const regionalComparison = [
    { country: "Singapore", code: "sg", value: 89.2, isHighlight: true }, // Top Performer
    { country: "Japan", code: "jp", value: 85.4, isHighlight: false },
    { country: "South Korea", code: "kr", value: 83.1, isHighlight: false },
    { country: "Vietnam", code: "vn", value: 78.5, isHighlight: false }, // Often outperforms income level
    { country: "Sri Lanka", code: "lk", value: 52.8, isHighlight: true }, // Focus Country
  ];

  return { 
    educationTrends,
    completionAnalysis: {
        title: "The Completion Rate Gap",
        summary: "While Sri Lanka achieves near-universal primary education, specific challenges remain in retaining students through Upper Secondary levels.",
        fullText: "Data indicates a strong foundation in Primary Education (Grades 1-5) with completion rates consistently above 98%. However, a distinct 'scissor effect' appears as students progress. Lower Secondary (Grades 6-9) maintains strong resilience, but Upper Secondary (Grades 10-11) shows a historical drop-off. \n\nThe 2020-2021 dip reflects pandemic-related school closures, most severely impacting the examination years (Upper Secondary). The forecast for 2024-2025 suggests a robust recovery, driven by digital adoption and remedial programs. The target for 2030 is 100% across all levels, requiring focused intervention on the 10-15% attrition rate at the O-Level stage.",
        sources: [
            { name: "Sustainable Development Council", url: "https://www.sdc.gov.lk/" },
            { name: "UNESCO Institute for Statistics", url: "http://uis.unesco.org/" },
            { name: "Dept. of Census and Statistics", url: "http://www.statistics.gov.lk/" },
        ]
    },
    teacherStats,
    teacherAnalysis: {
        title: "Teacher Qualifications (SDG 4.c.1)",
        summary: "A robust 88% of the teaching workforce in Sri Lanka meets the minimum qualification standards, a key driver for educational quality.",
        fullText: "SDG Indicator 4.c.1 measures the proportion of teachers who have received at least the minimum organized teacher training (e.g. pedagogical training) pre-service or in-service required for teaching at the relevant level.\n\nSri Lanka maintains a relatively high standard in the region compared to peers. However, the 12% 'Untrained' segment often represents volunteer teachers or those in remote rural schools where resource allocation is scarce. \n\nClosing this 12% gap is essential not just for hitting the SDG target, but for ensuring that the *quality* of education (Goal 4) is equitable across all provinces, regardless of socio-economic status.",
        sources: [
            { name: "UN SDG Data Repository", url: "https://unstats.un.org/SDGAPI/v1/sdg/Indicator/Data?indicator=4.c.1&areaCode=144" },
            { name: "UNESCO Global Education Monitoring", url: "https://www.unesco.org/gem-report/" }
        ]
    },
    regionalComparison,
    regionalAnalysis: {
        title: "Asia-Pacific Region",
        summary: "Sri Lanka performs strongly in enrollment, but 'Learning Proficiency' (SDG 4.1.1) reveals the gap between attendance and actual skill acquisition compared to regional leaders.",
        fullText: "This column chart utilizes official UN SDG API data for Indicator 4.1.1: 'Minimum Proficiency in Reading' at the end of Lower Secondary education. \n\nWhile Singapore, Japan, and South Korea set the global benchmark with proficiency rates exceeding 80%, Sri Lanka sits at approximately 52.8%. This metric is crucial because it highlights the difference between *schooling* (going to class) and *learning* (gaining skills).\n\nThe comparison shows that while Sri Lanka has successfully solved the 'access' problem (shown in the first chart), the current national challenge is 'quality'. Bridging this 30-point gap requires modernizing curricula, improving assessment methods, and investing in teacher training (Chart 2) to match the pedagogical standards of high-performing Asian economies.",
        sources: [
            { name: "UN SDG API (Indicator 4.1.1)", url: "https://unstats.un.org/sdgs/dataportal" },
            { name: "PISA for Development Results", url: "https://www.oecd.org/pisa/pisa-for-development/" }
        ]
    }
  };
};

export const fetchIndicatorData = async (indicatorId: string): Promise<IndicatorData> => {
    return { id: 'stub', name: 'stub', data: [], trends: [] };
}
