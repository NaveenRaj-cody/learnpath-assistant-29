
import { coursesData } from '@/data/coursesData';
import { collegesData } from '@/data/collegesData';
import { careersData } from '@/data/careersData';
import { CourseLevel, SubjectArea } from '@/types/filters';

// Get a college by ID
export const getCollegeById = (id: string) => {
  return collegesData.find(college => college.id === id);
};

// Get colleges by IDs
export const getCollegesByIds = (ids: string[]) => {
  return collegesData.filter(college => ids.includes(college.id));
};

// Get a course by ID
export const getCourseById = (id: string) => {
  return coursesData.find(course => course.id === id);
};

// Get a career by ID
export const getCareerById = (id: string) => {
  return careersData.find(career => career.id === id);
};

// Find courses based on filters
export const findCourses = (
  query: string = '', 
  filters: { level: CourseLevel; subject: SubjectArea } = { level: 'all', subject: 'all' }
) => {
  let filtered = [...coursesData];
  
  // Apply level filter
  if (filters.level !== 'all') {
    filtered = filtered.filter(course => course.level === filters.level);
  }
  
  // Apply subject filter
  if (filters.subject !== 'all') {
    filtered = filtered.filter(course => course.field === filters.subject);
  }
  
  // Apply text search if query is not empty
  if (query.trim()) {
    const searchTerms = query.toLowerCase().split(' ');
    filtered = filtered.filter(course => {
      const courseText = `${course.name} ${course.description} ${course.field}`.toLowerCase();
      return searchTerms.some(term => courseText.includes(term));
    });
  }
  
  return filtered;
};

// Find colleges based on filters
export const findColleges = (
  query: string = '',
  filters: { field?: string; location?: string } = {}
) => {
  let filtered = [...collegesData];
  
  // Apply field filter
  if (filters.field && filters.field !== 'all') {
    filtered = filtered.filter(college => 
      college.fields.includes(filters.field)
    );
  }
  
  // Apply location filter
  if (filters.location && filters.location !== 'all') {
    filtered = filtered.filter(college => 
      college.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  // Apply text search if query is not empty
  if (query.trim()) {
    const searchTerms = query.toLowerCase().split(' ');
    filtered = filtered.filter(college => {
      const collegeText = `${college.name} ${college.location} ${college.ranking}`.toLowerCase();
      return searchTerms.some(term => collegeText.includes(term));
    });
  }
  
  return filtered;
};

// Find careers based on filters
export const findCareers = (
  query: string = '',
  filters: { field?: string } = {}
) => {
  let filtered = [...careersData];
  
  // Apply field filter
  if (filters.field && filters.field !== 'all') {
    filtered = filtered.filter(career => career.field === filters.field);
  }
  
  // Apply text search if query is not empty
  if (query.trim()) {
    const searchTerms = query.toLowerCase().split(' ');
    filtered = filtered.filter(career => {
      const careerText = `${career.title} ${career.description} ${career.field}`.toLowerCase();
      return searchTerms.some(term => careerText.includes(term));
    });
  }
  
  return filtered;
};

// Get courses related to a career
export const getCoursesForCareer = (careerTitle: string) => {
  const career = careersData.find(c => c.title === careerTitle);
  if (!career) return [];
  
  return coursesData.filter(course => 
    course.careerProspects.includes(careerTitle)
  );
};

// Get careers related to a course
export const getCareersForCourse = (courseId: string) => {
  const course = getCourseById(courseId);
  if (!course) return [];
  
  return course.careerProspects.map(careerTitle => 
    careersData.find(career => career.title === careerTitle)
  ).filter(Boolean);
};

// Get colleges for a course
export const getCollegesForCourse = (courseId: string) => {
  const course = getCourseById(courseId);
  if (!course) return [];
  
  return getCollegesByIds(course.topCollegeIds);
};

// Get indian colleges for a field
export const getIndianColleges = (field: string = 'all') => {
  const filtered = collegesData.filter(college => 
    college.location.includes('India') && 
    (field === 'all' || college.fields.includes(field))
  );
  
  return filtered;
};
