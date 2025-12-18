import { Project, SDGGoal } from './types';

export const PROJECTS: Project[] = [
  {
    slug: 'digital-safety-awareness',
    title: 'Digital Safety & Awareness',
    year: 2022,
    location: 'Central Province, Sri Lanka',
    thumbnail: 'https://github.com/Maheepa98/Final-Web/blob/main/Digital%20Literacy.jpg?raw=true',
    description: 'Promoting responsible technology usage among students.',
    impactMetrics: ['500+ Students', '10 Schools', '50% Under 15 Participation'],
    coordinates: [7.2906, 80.6337],
    fullDescription: {
      problem: 'Following the COVID-19 pandemic, unsupervised smartphone usage among students surged, leading to increased vulnerability to cyber scams, cyberbullying, and fake news.',
      solution: 'We provide comprehensive digital literacy training that teaches students how to navigate the digital world responsibly, distinguishing between safe and harmful online practices.',
      impact: 'Students have gained the critical skills needed to use technology wisely and manage their social media presence within healthy limits.'
    }
  },
  {
    slug: 'equipped-to-learn',
    title: 'School Essentials Drive',
    year: 2023,
    location: 'Southern Province, Sri Lanka',
    thumbnail: 'https://github.com/Maheepa98/Final-Web/blob/main/Digital%20Literacy_02.webp.jpg?raw=true',
    description: 'Equipped to Learn: Ensuring universal access to resources.',
    impactMetrics: ['10 Pilot Schools', '15% Grade Improvement', 'Studying Essentials'],
    coordinates: [6.0535, 80.2210],
    fullDescription: {
      problem: 'Inadequate infrastructure and lack of basic supplies in rural schools hinder student performance.',
      solution: 'A donation drive ensuring universal access to educational resources, including stationery, books, and bags.',
      impact: 'Reduced dropout rates by providing essential supplies to low-income students, boosting attendance and morale.'
    }
  },
  {
    slug: 'global-youth-skills',
    title: 'Global Youth Skills Day 2025',
    year: 2025,
    location: 'National Event, Sri Lanka',
    thumbnail: 'https://github.com/Maheepa98/Final-Web/blob/main/Digital%20Literacy_03.jpg?raw=true',
    description: 'Action Beyond Screens: Engaging youth in real-world challenges.',
    impactMetrics: ['1000+ Volunteers', 'Youth Community Engagement'],
    coordinates: [6.9271, 79.8612],
    fullDescription: {
      problem: 'Youth disconnected from volunteering due to digital saturation.',
      solution: 'Engaging youth in real-world societal challenges through hands-on workshops and community service.',
      impact: 'Recognized as a national event; mobilized 1,000+ youth for community action.'
    }
  },
  {
    slug: 'world-youth-festival',
    title: 'World Youth Festival – Russia',
    year: 2024,
    location: 'Sochi, Russia',
    thumbnail: 'https://github.com/Maheepa98/Final-Web/blob/main/Digital%20Literacy_04.jpg?raw=true',
    description: 'Global Minds, Local Solutions: International collaboration.',
    impactMetrics: ['20,000 Participants', '100+ Edu Talks'],
    coordinates: [43.6028, 39.7342], // Sochi
    fullDescription: {
      problem: 'Rising school disengagement and lack of cross-border educational dialogue.',
      solution: 'International collaboration to brainstorm and implement regional solutions for SDG 4.',
      impact: 'Redefined education as a pillar of life quality through new policy frameworks and global networking.'
    }
  },
  {
    slug: 'sdg-sustainable-innovations',
    title: 'SDG Sustainable Innovations',
    year: 2025,
    location: 'Sri Lanka & India',
    thumbnail: 'https://github.com/Maheepa98/Final-Web/blob/main/Digital%20Literacy_05.jpg?raw=true',
    description: 'Teaching design principles for a sustainable future.',
    impactMetrics: ['10+ Products', 'Commonwealth Student Association'],
    coordinates: [8.3114, 80.4037],
    fullDescription: {
      problem: 'Limited student understanding of sustainability concepts and green innovation.',
      solution: 'Workshops teaching design principles for a sustainable future, focusing on eco-friendly product creation.',
      impact: 'Achieved 1st place at the SDG STEM Robotics Competition in India.'
    }
  },
];

export const SDG_GOALS: SDGGoal[] = [
  { 
    id: 1, 
    title: 'No Poverty', 
    description: 'End poverty in all its forms everywhere.', 
    color: '#E5243B', 
    progress: 42,
    targets: ['Target 1.1: Eradicate extreme poverty', 'Target 1.2: Reduce poverty by at least 50%'],
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600',
    stats: { targets: 7, events: 148, publications: 51, actions: 1559 }
  },
  { 
    id: 2, 
    title: 'Zero Hunger', 
    description: 'End hunger, achieve food security and improved nutrition.', 
    color: '#DDA63A', 
    progress: 38,
    targets: ['Target 2.1: Universal access to safe food', 'Target 2.2: End all forms of malnutrition'],
    image: 'https://raw.githubusercontent.com/Maheepa98/Final-Web/refs/heads/main/Zero%20Hunger.jpg.avif$0',
    stats: { targets: 8, events: 130, publications: 18, actions: 1480 }
  },
  { 
    id: 3, 
    title: 'Good Health', 
    description: 'Ensure healthy lives and promote well-being for all at all ages.', 
    color: '#4C9F38', 
    progress: 68,
    targets: ['Target 3.1: Reduce maternal mortality', 'Target 3.2: End preventable deaths under 5'],
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600',
    stats: { targets: 13, events: 75, publications: 50, actions: 1362 }
  },
  { 
    id: 4, 
    title: 'Quality Education', 
    description: 'Ensure inclusive and equitable quality education and promote lifelong learning.', 
    color: '#C5192D', 
    progress: 55,
    targets: ['Target 4.1: Free primary and secondary education', 'Target 4.c: Increase supply of qualified teachers'],
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600',
    stats: { targets: 10, events: 82, publications: 12, actions: 1959 }
  },
  { 
    id: 5, 
    title: 'Gender Equality', 
    description: 'Achieve gender equality and empower all women and girls.', 
    color: '#FF3A21', 
    progress: 48,
    targets: ['Target 5.1: End discrimination against women', 'Target 5.5: Ensure full participation in leadership'],
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600',
    stats: { targets: 9, events: 113, publications: 49, actions: 1839 }
  },
  { 
    id: 6, 
    title: 'Clean Water', 
    description: 'Ensure availability and sustainable management of water and sanitation.', 
    color: '#26BDE2', 
    progress: 62,
    targets: ['Target 6.1: Safe and affordable drinking water', 'Target 6.2: End open defecation'],
    image: 'https://github.com/Maheepa98/Final-Web/blob/main/Water.jpg?raw=true$0',
    stats: { targets: 8, events: 310, publications: 37, actions: 1917 }
  },
  { 
    id: 7, 
    title: 'Clean Energy', 
    description: 'Ensure access to affordable, reliable, sustainable and modern energy.', 
    color: '#FCC30B', 
    progress: 65,
    targets: ['Target 7.1: Universal access to modern energy', 'Target 7.2: Increase global percentage of renewable energy'],
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600',
    stats: { targets: 5, events: 91, publications: 46, actions: 1102 }
  },
  { 
    id: 8, 
    title: 'Decent Work', 
    description: 'Promote sustained, inclusive and sustainable economic growth.', 
    color: '#A21942', 
    progress: 58,
    targets: ['Target 8.1: Sustainable economic growth', 'Target 8.5: Full employment and decent work'],
    image: 'https://github.com/Maheepa98/Final-Web/blob/main/Economic%20Growth.jpg?raw=true$0',
    stats: { targets: 12, events: 134, publications: 51, actions: 2114 }
  },
  { 
    id: 9, 
    title: 'Industry & Innovation', 
    description: 'Build resilient infrastructure, promote inclusive and sustainable industrialization.', 
    color: '#FD6925', 
    progress: 60,
    targets: ['Target 9.1: Develop quality, reliable, sustainable and resilient infrastructure'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600',
    stats: { targets: 8, events: 129, publications: 18, actions: 1154 }
  },
  { 
    id: 10, 
    title: 'Reduced Inequalities', 
    description: 'Reduce inequality within and among countries.', 
    color: '#DD1367', 
    progress: 35,
    targets: ['Target 10.1: Reduce income inequalities', 'Target 10.2: Promote universal social, economic and political inclusion'],
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=600',
    stats: { targets: 10, events: 106, publications: 15, actions: 1072 }
  },
  { 
    id: 11, 
    title: 'Sustainable Cities', 
    description: 'Make cities and human settlements inclusive, safe, resilient and sustainable.', 
    color: '#FD9D24', 
    progress: 54,
    targets: ['Target 11.1: Safe and affordable housing', 'Target 11.2: Affordable and sustainable transport systems'],
    image: 'https://github.com/Maheepa98/Final-Web/blob/main/Make%20Cities.jpg?raw=true$0',
    stats: { targets: 10, events: 141, publications: 24, actions: 1330 }
  },
  { 
    id: 12, 
    title: 'Responsible Consumption', 
    description: 'Ensure sustainable consumption and production patterns.', 
    color: '#BF8B2E', 
    progress: 58,
    targets: ['Target 12.3: Halve global per capita food waste', 'Target 12.5: Substantially reduce waste generation'],
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600',
    stats: { targets: 11, events: 64, publications: 19, actions: 1831 }
  },
  { 
    id: 13, 
    title: 'Climate Action', 
    description: 'Take urgent action to combat climate change and its impacts.', 
    color: '#3F7E44', 
    progress: 25,
    targets: ['Target 13.1: Strengthen resilience and adaptive capacity to climate-related hazards'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600',
    stats: { targets: 5, events: 88, publications: 40, actions: 2420 }
  },
  { 
    id: 14, 
    title: 'Life Below Water', 
    description: 'Conserve and sustainably use the oceans, seas and marine resources.', 
    color: '#0A97D9', 
    progress: 45,
    targets: ['Target 14.1: Prevent and significantly reduce marine pollution'],
    image: 'https://github.com/Maheepa98/Final-Web/blob/main/Ocean.jpg?raw=true$0',
    stats: { targets: 10, events: 148, publications: 44, actions: 3363 }
  },
  { 
    id: 15, 
    title: 'Life on Land', 
    description: 'Protect, restore and promote sustainable use of terrestrial ecosystems.', 
    color: '#56C02B', 
    progress: 48,
    targets: ['Target 15.1: Ensure conservation, restoration and sustainable use of terrestrial and inland freshwater ecosystems'],
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600',
    stats: { targets: 12, events: 137, publications: 38, actions: 1426 }
  },
  { 
    id: 16, 
    title: 'Peace & Justice', 
    description: 'Promote peaceful and inclusive societies for sustainable development.', 
    color: '#00689D', 
    progress: 51,
    targets: ['Target 16.1: Significantly reduce all forms of violence', 'Target 16.5: Substantially reduce corruption and bribery'],
    image: 'https://github.com/Maheepa98/Final-Web/blob/main/Peace.webp?raw=true$0',
    stats: { targets: 12, events: 81, publications: 15, actions: 1124 }
  },
  { 
    id: 17, 
    title: 'Partnerships', 
    description: 'Strengthen the means of implementation and revitalize the global partnership.', 
    color: '#19486A', 
    progress: 60,
    targets: ['Target 17.1: Mobilize resources to improve domestic revenue collection'],
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600',
    stats: { targets: 19, events: 349, publications: 82, actions: 2360 }
  },
];

export const MAP_GEOJSON_URL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";
export const SRI_LANKA_GEOJSON_URL = "https://raw.githubusercontent.com/randymeech/kanjingo-iso-3166-2-geojson/master/gl-json/LKA.geojson"; // Provinces for better detail
