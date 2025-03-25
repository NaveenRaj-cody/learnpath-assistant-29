import { CourseLevel, SubjectArea } from '@/types/filters';
import { findCourses, getIndianColleges } from './dataUtils';
import { careersData } from '@/data/careersData';

// Helper function to get a random item from an array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Function to find courses based on user's query and filters
export const findRelevantCourses = (
  query: string, 
  filter: { level: CourseLevel; subject: SubjectArea }
) => {
  return findCourses(query, filter);
};

// Function to process the user message and generate a response
export const processMessage = (
  message: string,
  filter: { level: CourseLevel; subject: SubjectArea }
): string => {
  const lowerMessage = message.toLowerCase();
  
  // Check if the message is asking about courses
  if (
    lowerMessage.includes('course') || 
    lowerMessage.includes('program') || 
    lowerMessage.includes('degree') ||
    lowerMessage.includes('study')
  ) {
    const courses = findRelevantCourses(message, filter);
    
    if (courses.length === 0) {
      return "I couldn't find any courses matching your criteria in India. Could you try a different search or be more specific about what you're looking for?";
    }
    
    // Limit to 3 courses for a concise response
    const displayCourses = courses.slice(0, 3);
    
    let response = "Here are some courses in India that might interest you:\n\n";
    
    displayCourses.forEach((course, index) => {
      response += `**${course.name}** (${course.level})\n`;
      response += `${course.description}\n`;
      response += `**Duration:** ${course.duration}\n`;
      response += `**Career Prospects in India:** ${course.careerProspects.join(', ')}\n`;
      
      if (index < displayCourses.length - 1) {
        response += "\n---\n\n";
      }
    });
    
    if (courses.length > 3) {
      response += "\n\nThere are more courses available in Indian universities. Would you like me to show you more options or refine your search?";
    }
    
    return response;
  }
  
  // Check if the message is asking about colleges
  if (
    lowerMessage.includes('college') || 
    lowerMessage.includes('university') || 
    lowerMessage.includes('institution') ||
    lowerMessage.includes('school')
  ) {
    // Find relevant courses first to determine the field
    const courses = findRelevantCourses(message, filter);
    const field = courses.length > 0 ? courses[0].field : 'all';
    
    // Find Indian colleges
    const indianColleges = getIndianColleges(field);
    
    if (indianColleges.length === 0) {
      return "I couldn't find any colleges in India matching your criteria. Could you try a different search or be more specific about what you're looking for?";
    }
    
    const displayColleges = indianColleges.slice(0, 3);
    
    let response = `Here are some top colleges in India for ${field !== 'all' ? field : 'various fields'}:\n\n`;
    
    displayColleges.forEach((college, index) => {
      response += `**${college.name}**\n`;
      response += `**Location:** ${college.location}\n`;
      response += `**Ranking:** ${college.ranking}\n`;
      response += `**Notable Features:** ${college.features.join(', ')}\n`;
      
      if (index < displayColleges.length - 1) {
        response += "\n---\n\n";
      }
    });
    
    return response;
  }
  
  // Check if the message is asking about jobs or careers
  if (
    lowerMessage.includes('job') || 
    lowerMessage.includes('career') || 
    lowerMessage.includes('work') ||
    lowerMessage.includes('profession') ||
    lowerMessage.includes('salary') ||
    lowerMessage.includes('opportunity')
  ) {
    // Find careers based on the field from filter
    const relevantCareers = careersData.filter(career => 
      filter.subject === 'all' || career.field === filter.subject
    );
    
    if (relevantCareers.length === 0) {
      return "I couldn't find any career paths in India matching your criteria. Could you try a different search or be more specific about what you're looking for?";
    }
    
    // Get a random selection of careers to display
    const selectedCareers = relevantCareers.slice(0, Math.min(3, relevantCareers.length));
    
    let response = `Here are some promising career paths in India for ${filter.subject !== 'all' ? filter.subject : 'your interests'}:\n\n`;
    
    selectedCareers.forEach((career, index) => {
      response += `**${career.title}**\n`;
      response += `${career.description}\n`;
      response += `**Salary Range in India:** ${career.salaryRange.india}\n`;
      response += `**Industry Growth:** ${career.growthRate}\n`;
      response += `**Top Hiring Companies in India:** ${career.topCompanies.india.join(', ')}\n`;
      
      if (index < selectedCareers.length - 1) {
        response += "\n---\n\n";
      }
    });
    
    response += "\n\nWould you like more specific information about any of these career paths in India?";
    
    return response;
  }
  
  // General greeting or introduction
  if (
    lowerMessage.includes('hi') || 
    lowerMessage.includes('hello') || 
    lowerMessage.includes('hey') ||
    lowerMessage.includes('greetings') ||
    lowerMessage.includes('start')
  ) {
    return "Namaste! I'm your AI Career Assistant for Indian students. I can help you with:\n\n" +
      "1. Finding the right courses in Indian colleges based on your interests\n" +
      "2. Discovering top colleges and universities across India\n" +
      "3. Exploring job opportunities and career paths in the Indian market\n" +
      "4. Understanding salary expectations and industry growth in India\n\n" +
      "What would you like to explore today? You can ask me about specific courses, colleges, or careers available in India.";
  }
  
  // Default response
  return "I'm here to help Indian students with education and career questions. You can ask me about courses offered in Indian universities, top colleges in India, job opportunities in the Indian market, or salary expectations for various professions. What specific information are you looking for?";
};

// Keep the other helper functions for compatibility
// ... keep existing code (getIndianSalaryRange, getIndianGrowthRate, getIndianCompanies functions)
