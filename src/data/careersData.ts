
export interface Career {
  id: string;
  title: string;
  field: string;
  description: string;
  salaryRange: {
    india: string;
    global: string;
  };
  growthRate: string;
  requiredSkills: string[];
  workLifeBalance: {
    averageHours: string;
    remoteWork: string;
    flexibility: string;
  };
  topCompanies: {
    india: string[];
    global: string[];
  };
  educationRequirements: string[];
  relatedCourseIds: string[]; // IDs of related courses
}

export const careersData: Career[] = [
  {
    id: "software-developer",
    title: "Software Developer",
    field: "engineering",
    description: "Design, build and maintain software applications, websites, and systems using programming languages and development tools.",
    salaryRange: {
      india: "₹5-20 LPA",
      global: "$60K-150K/year"
    },
    growthRate: "14% annually",
    requiredSkills: ["Programming Languages", "Problem Solving", "Data Structures & Algorithms", "Version Control", "Testing"],
    workLifeBalance: {
      averageHours: "40-45 hours/week",
      remoteWork: "Widely available",
      flexibility: "High"
    },
    topCompanies: {
      india: ["TCS", "Infosys", "Wipro", "Tech Mahindra"],
      global: ["Google", "Microsoft", "Apple", "Amazon"]
    },
    educationRequirements: ["B.Tech in Computer Science", "B.Sc in Computer Science", "BCA"],
    relatedCourseIds: ["cs-btech"]
  },
  {
    id: "systems-analyst",
    title: "Systems Analyst",
    field: "engineering",
    description: "Analyze, design and implement information systems to solve business problems and improve efficiency.",
    salaryRange: {
      india: "₹4-15 LPA",
      global: "$55K-120K/year"
    },
    growthRate: "7% annually",
    requiredSkills: ["Business Analysis", "Systems Design", "Project Management", "Communication", "Problem Solving"],
    workLifeBalance: {
      averageHours: "40-45 hours/week",
      remoteWork: "Often available",
      flexibility: "Medium to High"
    },
    topCompanies: {
      india: ["Cognizant", "Accenture", "IBM India", "Capgemini"],
      global: ["IBM", "Accenture", "Deloitte", "HP"]
    },
    educationRequirements: ["B.Tech in Computer Science", "BCA", "MCA"],
    relatedCourseIds: ["cs-btech"]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    field: "engineering",
    description: "Analyze complex data sets to find patterns, derive insights, and develop machine learning models to solve business problems.",
    salaryRange: {
      india: "₹8-25 LPA",
      global: "$80K-160K/year"
    },
    growthRate: "22% annually",
    requiredSkills: ["Statistics", "Machine Learning", "Programming", "Data Visualization", "Domain Knowledge"],
    workLifeBalance: {
      averageHours: "40-50 hours/week",
      remoteWork: "Widely available",
      flexibility: "High"
    },
    topCompanies: {
      india: ["Mu Sigma", "Tiger Analytics", "Fractal Analytics", "Amazon India"],
      global: ["Google", "Facebook", "Netflix", "Amazon"]
    },
    educationRequirements: ["B.Tech/M.Tech in CS/IT", "MSc in Statistics/Mathematics", "Ph.D in related fields"],
    relatedCourseIds: ["cs-btech", "eng-mtech"]
  },
  {
    id: "general-physician",
    title: "General Physician",
    field: "medicine",
    description: "Diagnose and treat a wide range of health conditions and provide preventive care to patients of all ages.",
    salaryRange: {
      india: "₹12-40 LPA",
      global: "$150K-300K/year"
    },
    growthRate: "4% annually",
    requiredSkills: ["Clinical Knowledge", "Diagnostic Skills", "Patient Care", "Communication", "Decision Making"],
    workLifeBalance: {
      averageHours: "50-60 hours/week",
      remoteWork: "Limited (telemedicine growing)",
      flexibility: "Low to Medium"
    },
    topCompanies: {
      india: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Government Hospitals"],
      global: ["Mayo Clinic", "Cleveland Clinic", "NHS", "Kaiser Permanente"]
    },
    educationRequirements: ["MBBS", "MD in General Medicine"],
    relatedCourseIds: ["medicine-mbbs"]
  },
  {
    id: "marketing-executive",
    title: "Marketing Executive",
    field: "business",
    description: "Develop and implement marketing strategies to promote products or services and drive business growth.",
    salaryRange: {
      india: "₹4-15 LPA",
      global: "$50K-120K/year"
    },
    growthRate: "8% annually",
    requiredSkills: ["Market Research", "Digital Marketing", "Content Creation", "Analytics", "Communication"],
    workLifeBalance: {
      averageHours: "40-45 hours/week",
      remoteWork: "Often available",
      flexibility: "Medium to High"
    },
    topCompanies: {
      india: ["Hindustan Unilever", "P&G India", "ITC", "Amazon India"],
      global: ["Unilever", "P&G", "Coca-Cola", "PepsiCo"]
    },
    educationRequirements: ["BBA", "MBA in Marketing", "Bachelor's in Mass Communication"],
    relatedCourseIds: ["business-bba", "biz-mba"]
  },
  {
    id: "ux-ui-designer",
    title: "UX/UI Designer",
    field: "arts",
    description: "Create user-centered designs for digital products, focusing on aesthetics, usability, and user experience.",
    salaryRange: {
      india: "₹5-18 LPA",
      global: "$55K-130K/year"
    },
    growthRate: "15% annually",
    requiredSkills: ["Visual Design", "User Research", "Wireframing", "Prototyping", "Information Architecture"],
    workLifeBalance: {
      averageHours: "40-45 hours/week",
      remoteWork: "Widely available",
      flexibility: "High"
    },
    topCompanies: {
      india: ["Flipkart", "Swiggy", "MakeMyTrip", "Paytm"],
      global: ["Apple", "Google", "Airbnb", "Uber"]
    },
    educationRequirements: ["Bachelor of Design", "Visual Communication Degree", "HCI Courses"],
    relatedCourseIds: ["design-bdes"]
  },
  {
    id: "research-scientist",
    title: "Research Scientist",
    field: "science",
    description: "Conduct scientific research to advance knowledge, develop new technologies, and solve complex problems.",
    salaryRange: {
      india: "₹6-20 LPA",
      global: "$70K-150K/year"
    },
    growthRate: "8% annually",
    requiredSkills: ["Research Methodology", "Data Analysis", "Critical Thinking", "Technical Writing", "Domain Expertise"],
    workLifeBalance: {
      averageHours: "40-50 hours/week",
      remoteWork: "Varies by field",
      flexibility: "Medium"
    },
    topCompanies: {
      india: ["ISRO", "DRDO", "TIFR", "CSIR Labs"],
      global: ["NASA", "CERN", "Max Planck Institutes", "Bell Labs"]
    },
    educationRequirements: ["M.Sc", "Ph.D in relevant fields"],
    relatedCourseIds: ["science-bsc"]
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    field: "engineering",
    description: "Design, develop and deploy artificial intelligence systems and solutions across various applications.",
    salaryRange: {
      india: "₹10-30 LPA",
      global: "$90K-180K/year"
    },
    growthRate: "25% annually",
    requiredSkills: ["Machine Learning", "Deep Learning", "Python", "AI Frameworks", "Mathematics"],
    workLifeBalance: {
      averageHours: "40-50 hours/week",
      remoteWork: "Widely available",
      flexibility: "High"
    },
    topCompanies: {
      india: ["Microsoft India", "Google India", "Amazon India", "IBM India"],
      global: ["Google DeepMind", "OpenAI", "NVIDIA", "Tesla"]
    },
    educationRequirements: ["B.Tech/M.Tech in CS/IT", "Specialized AI degrees"],
    relatedCourseIds: ["cs-btech", "eng-mtech"]
  }
];
