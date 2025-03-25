
import { College } from './collegesData';

export interface Course {
  id: string;
  name: string;
  level: string;
  field: string;
  duration: string;
  description: string;
  careerProspects: string[]; // Career titles that this course prepares for
  eligibility: string;
  entranceExams?: string[];
  syllabus?: string[];
  averageFees?: {
    india: string;
    abroad: string;
  };
  topCollegeIds: string[]; // IDs of top colleges offering this course
}

export const coursesData: Course[] = [
  {
    id: "cs-btech",
    name: "B.Tech in Computer Science",
    level: "undergraduate",
    field: "engineering",
    duration: "4 years",
    description: "A comprehensive program that covers programming, algorithms, data structures, computer architecture, and software engineering principles.",
    careerProspects: [
      "Software Developer",
      "Systems Analyst",
      "Data Scientist",
      "Web Developer",
      "AI Engineer"
    ],
    eligibility: "10+2 with Physics, Chemistry and Mathematics",
    entranceExams: ["JEE Main", "JEE Advanced", "State-level engineering exams"],
    syllabus: [
      "Programming Fundamentals",
      "Data Structures & Algorithms",
      "Database Management",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering"
    ],
    averageFees: {
      india: "₹8-15 lakhs (total)",
      abroad: "$120K-200K (total)"
    },
    topCollegeIds: ["iit-delhi", "mit", "stanford", "iit-bombay"]
  },
  {
    id: "medicine-mbbs",
    name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
    level: "undergraduate",
    field: "medicine",
    duration: "5.5 years (including internship)",
    description: "A professional degree in medicine that provides comprehensive training in medical sciences, clinical practice, and patient care.",
    careerProspects: [
      "General Physician",
      "Surgeon",
      "Medical Researcher",
      "Public Health Specialist",
      "Medical Officer"
    ],
    eligibility: "10+2 with Physics, Chemistry and Biology",
    entranceExams: ["NEET-UG", "AIIMS MBBS", "JIPMER MBBS"],
    syllabus: [
      "Anatomy",
      "Physiology",
      "Biochemistry",
      "Pathology",
      "Pharmacology",
      "Medicine",
      "Surgery"
    ],
    averageFees: {
      india: "₹20 lakhs - 1 crore (total)",
      abroad: "$200K-500K (total)"
    },
    topCollegeIds: ["aiims", "harvard-med", "johns-hopkins"]
  },
  {
    id: "business-bba",
    name: "Bachelor of Business Administration (BBA)",
    level: "undergraduate",
    field: "business",
    duration: "3-4 years",
    description: "A program that focuses on business management principles, marketing, finance, human resources, and entrepreneurship.",
    careerProspects: [
      "Business Analyst",
      "Marketing Executive",
      "Human Resources Manager",
      "Operations Manager",
      "Entrepreneur"
    ],
    eligibility: "10+2 in any stream",
    entranceExams: ["DU JAT", "IPMAT", "SET", "NPAT"],
    syllabus: [
      "Principles of Management",
      "Financial Accounting",
      "Marketing Management",
      "Human Resource Management",
      "Business Economics",
      "Operations Research"
    ],
    averageFees: {
      india: "₹3-10 lakhs (total)",
      abroad: "$80K-160K (total)"
    },
    topCollegeIds: ["iim-ahmedabad", "harvard-business", "lse"]
  },
  {
    id: "eng-mtech",
    name: "M.Tech in Artificial Intelligence",
    level: "postgraduate",
    field: "engineering",
    duration: "2 years",
    description: "An advanced program specializing in AI algorithms, machine learning, deep learning, computer vision, and natural language processing.",
    careerProspects: [
      "AI Research Scientist",
      "Machine Learning Engineer",
      "Data Science Lead",
      "AI Product Manager",
      "Computational Linguist"
    ],
    eligibility: "B.Tech/B.E in Computer Science, IT, Electronics or related fields",
    entranceExams: ["GATE", "TOEFL/IELTS (for international universities)"],
    syllabus: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Robotics",
      "Statistical Learning"
    ],
    averageFees: {
      india: "₹2-5 lakhs (total)",
      abroad: "$50K-100K (total)"
    },
    topCollegeIds: ["iit-bombay", "cmu", "mit", "stanford"]
  },
  {
    id: "med-md",
    name: "MD in Pediatrics",
    level: "postgraduate",
    field: "medicine",
    duration: "3 years",
    description: "A specialization in child healthcare, covering pediatric diseases, developmental issues, and specialized treatments for children.",
    careerProspects: [
      "Pediatrician",
      "Neonatologist",
      "Pediatric Surgeon",
      "Child Healthcare Researcher",
      "Developmental Specialist"
    ],
    eligibility: "MBBS degree with completion of internship",
    entranceExams: ["NEET-PG", "USMLE (for USA)"],
    syllabus: [
      "General Pediatrics",
      "Neonatology",
      "Pediatric Infectious Diseases",
      "Developmental Pediatrics",
      "Pediatric Emergency Medicine",
      "Adolescent Medicine"
    ],
    averageFees: {
      india: "₹10-25 lakhs (total)",
      abroad: "$150K-300K (total)"
    },
    topCollegeIds: ["aiims", "harvard-med", "johns-hopkins"]
  },
  {
    id: "biz-mba",
    name: "Master of Business Administration (MBA)",
    level: "postgraduate",
    field: "business",
    duration: "1-2 years",
    description: "An advanced business degree focusing on leadership, strategic management, finance, marketing, and organizational behavior.",
    careerProspects: [
      "Business Consultant",
      "Investment Banker",
      "Marketing Director",
      "Chief Operations Officer",
      "Entrepreneur"
    ],
    eligibility: "Bachelor's degree in any discipline",
    entranceExams: ["CAT", "XAT", "GMAT", "GRE"],
    syllabus: [
      "Management Principles",
      "Financial Management",
      "Marketing Management",
      "Strategic Management",
      "Operations Management",
      "Organizational Behavior"
    ],
    averageFees: {
      india: "₹10-25 lakhs (total)",
      abroad: "$100K-200K (total)"
    },
    topCollegeIds: ["iim-ahmedabad", "harvard-business", "lse", "stanford"]
  },
  {
    id: "design-bdes",
    name: "Bachelor of Design (B.Des)",
    level: "undergraduate",
    field: "arts",
    duration: "4 years",
    description: "A creative program focusing on visual communication, product design, user experience, and design thinking methodologies.",
    careerProspects: [
      "UX/UI Designer",
      "Product Designer",
      "Graphic Designer",
      "Brand Identity Developer",
      "Design Consultant"
    ],
    eligibility: "10+2 in any stream",
    entranceExams: ["UCEED", "NID DAT", "CEED", "NIFT Entrance Exam"],
    syllabus: [
      "Design Fundamentals",
      "Visual Communication",
      "User Experience Design",
      "Typography",
      "Color Theory",
      "Interactive Media"
    ],
    averageFees: {
      india: "₹5-15 lakhs (total)",
      abroad: "$100K-180K (total)"
    },
    topCollegeIds: ["nid", "risd"]
  },
  {
    id: "science-bsc",
    name: "Bachelor of Science in Physics",
    level: "undergraduate",
    field: "science",
    duration: "3-4 years",
    description: "A program exploring the fundamental laws of nature, covering mechanics, electromagnetism, quantum physics, and relativity.",
    careerProspects: [
      "Research Scientist",
      "Data Analyst",
      "Lab Technician",
      "Science Educator",
      "Technical Writer"
    ],
    eligibility: "10+2 with Physics, Chemistry and Mathematics",
    entranceExams: ["CUET", "NEST", "University-specific entrance exams"],
    syllabus: [
      "Classical Mechanics",
      "Electromagnetism",
      "Quantum Mechanics",
      "Thermodynamics",
      "Optics",
      "Nuclear Physics"
    ],
    averageFees: {
      india: "₹1-5 lakhs (total)",
      abroad: "$80K-150K (total)"
    },
    topCollegeIds: ["iisc", "caltech", "cambridge", "mit"]
  }
];
