
export interface College {
  id: string;
  name: string;
  location: string;
  ranking: string;
  features: string[];
  fields: string[]; // Fields of study offered
  campusSize?: string;
  foundedYear?: number;
  acceptanceRate?: string;
  studentCount?: string;
  website?: string;
  logo?: string;
}

export const collegesData: College[] = [
  {
    id: "iit-delhi",
    name: "Indian Institute of Technology (IIT), Delhi",
    location: "New Delhi, India",
    ranking: "Top 5 in Engineering",
    features: ["World-class faculty", "Cutting-edge research facilities", "Strong industry connections"],
    fields: ["engineering", "technology", "science"],
    foundedYear: 1961,
    acceptanceRate: "2%",
    studentCount: "8,500+",
    website: "https://home.iitd.ac.in/"
  },
  {
    id: "mit",
    name: "Massachusetts Institute of Technology (MIT)",
    location: "Cambridge, USA",
    ranking: "#1 in Computer Science",
    features: ["Innovation hub", "Top research output", "Strong alumni network"],
    fields: ["engineering", "science", "technology", "business"],
    foundedYear: 1861,
    acceptanceRate: "4%",
    studentCount: "11,000+",
    website: "https://www.mit.edu/"
  },
  {
    id: "stanford",
    name: "Stanford University",
    location: "Stanford, USA",
    ranking: "Top 3 globally",
    features: ["Silicon Valley connections", "Entrepreneurship focus", "Research excellence"],
    fields: ["engineering", "business", "medicine", "law", "arts"],
    foundedYear: 1885,
    acceptanceRate: "4%",
    studentCount: "16,000+",
    website: "https://www.stanford.edu/"
  },
  {
    id: "aiims",
    name: "All India Institute of Medical Sciences (AIIMS)",
    location: "New Delhi, India",
    ranking: "#1 in Medicine in India",
    features: ["Premier medical institution", "Advanced research facilities", "Specialized departments"],
    fields: ["medicine", "healthcare"],
    foundedYear: 1956,
    acceptanceRate: "0.1%",
    studentCount: "2,500+",
    website: "https://www.aiims.edu/"
  },
  {
    id: "harvard-med",
    name: "Harvard Medical School",
    location: "Boston, USA",
    ranking: "Top 5 globally",
    features: ["Cutting-edge research", "Distinguished faculty", "Excellent clinical training"],
    fields: ["medicine", "healthcare", "research"],
    foundedYear: 1782,
    acceptanceRate: "3.7%",
    studentCount: "1,700+",
    website: "https://hms.harvard.edu/"
  },
  {
    id: "johns-hopkins",
    name: "Johns Hopkins University School of Medicine",
    location: "Baltimore, USA",
    ranking: "Top 3 globally",
    features: ["Research excellence", "Clinical innovation", "Interdisciplinary approach"],
    fields: ["medicine", "public health", "research"],
    foundedYear: 1876,
    acceptanceRate: "6%",
    studentCount: "1,500+",
    website: "https://www.hopkinsmedicine.org/"
  },
  {
    id: "iim-ahmedabad",
    name: "Indian Institute of Management (IIM), Ahmedabad",
    location: "Ahmedabad, India",
    ranking: "Top Business School in India",
    features: ["Case study method", "Industry partnerships", "Strong placement record"],
    fields: ["business", "management"],
    foundedYear: 1961,
    acceptanceRate: "0.25%",
    studentCount: "1,100+",
    website: "https://www.iima.ac.in/"
  },
  {
    id: "harvard-business",
    name: "Harvard Business School",
    location: "Boston, USA",
    ranking: "#1 globally",
    features: ["Leadership focus", "Global network", "Case method teaching"],
    fields: ["business", "management", "entrepreneurship"],
    foundedYear: 1908,
    acceptanceRate: "12%",
    studentCount: "2,000+",
    website: "https://www.hbs.edu/"
  },
  {
    id: "lse",
    name: "London School of Economics",
    location: "London, UK",
    ranking: "Top 10 globally",
    features: ["Economic focus", "International environment", "Research excellence"],
    fields: ["business", "economics", "social sciences"],
    foundedYear: 1895,
    acceptanceRate: "8.9%",
    studentCount: "11,000+",
    website: "https://www.lse.ac.uk/"
  },
  {
    id: "iit-bombay",
    name: "Indian Institute of Technology (IIT), Bombay",
    location: "Mumbai, India",
    ranking: "Top 3 in India for AI",
    features: ["AI research center", "Industry collaborations", "Advanced computing facilities"],
    fields: ["engineering", "technology", "computer science"],
    foundedYear: 1958,
    acceptanceRate: "2.2%",
    studentCount: "10,000+",
    website: "https://www.iitb.ac.in/"
  },
  {
    id: "cmu",
    name: "Carnegie Mellon University",
    location: "Pittsburgh, USA",
    ranking: "Top 5 globally for AI",
    features: ["Pioneering AI research", "Robotics innovation", "Industry connections"],
    fields: ["computer science", "engineering", "arts"],
    foundedYear: 1900,
    acceptanceRate: "15%",
    studentCount: "14,000+",
    website: "https://www.cmu.edu/"
  },
  {
    id: "oxford",
    name: "University of Oxford",
    location: "Oxford, UK",
    ranking: "Top 10 globally",
    features: ["Interdisciplinary approach", "Research excellence", "Historic prestige"],
    fields: ["arts", "science", "medicine", "law", "business"],
    foundedYear: 1096,
    acceptanceRate: "17.5%",
    studentCount: "24,000+",
    website: "https://www.ox.ac.uk/"
  },
  {
    id: "nid",
    name: "National Institute of Design (NID)",
    location: "Ahmedabad, India",
    ranking: "Top Design School in India",
    features: ["Industry projects", "Design thinking approach", "Practical learning"],
    fields: ["design", "arts"],
    foundedYear: 1961,
    acceptanceRate: "3%",
    studentCount: "1,200+",
    website: "https://www.nid.edu/"
  },
  {
    id: "risd",
    name: "Rhode Island School of Design (RISD)",
    location: "Providence, USA",
    ranking: "Top 5 globally",
    features: ["Creative excellence", "Studio-based learning", "Cross-disciplinary approach"],
    fields: ["design", "arts", "architecture"],
    foundedYear: 1877,
    acceptanceRate: "20%",
    studentCount: "2,500+",
    website: "https://www.risd.edu/"
  },
  {
    id: "iisc",
    name: "Indian Institute of Science (IISc)",
    location: "Bangalore, India",
    ranking: "Top Science Institution in India",
    features: ["Research excellence", "Scientific innovation", "Interdisciplinary approach"],
    fields: ["science", "engineering", "technology"],
    foundedYear: 1909,
    acceptanceRate: "1%",
    studentCount: "4,200+",
    website: "https://www.iisc.ac.in/"
  },
  {
    id: "caltech",
    name: "California Institute of Technology (Caltech)",
    location: "Pasadena, USA",
    ranking: "Top 5 globally for Physics",
    features: ["Research intensity", "Nobel laureate faculty", "Advanced facilities"],
    fields: ["science", "engineering", "technology"],
    foundedYear: 1891,
    acceptanceRate: "6.4%",
    studentCount: "2,200+",
    website: "https://www.caltech.edu/"
  },
  {
    id: "cambridge",
    name: "University of Cambridge",
    location: "Cambridge, UK",
    ranking: "Top 5 globally",
    features: ["Historic excellence", "Cavendish Laboratory", "Scientific breakthroughs"],
    fields: ["science", "arts", "engineering", "medicine", "business"],
    foundedYear: 1209,
    acceptanceRate: "21%",
    studentCount: "20,000+",
    website: "https://www.cam.ac.uk/"
  }
];
