
import React, { useState, useMemo, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BriefcaseIcon, BookOpen, Building, Search, GraduationCap, X } from 'lucide-react';
import { coursesData } from '@/data/coursesData';
import { useChat } from '@/contexts/ChatContext';
import AnimatedTransition from './AnimatedTransition';
import { CourseLevel, SubjectArea } from '@/types/filters';

interface CourseExplorerProps {
  onAskAboutCourse?: (courseName: string) => void;
}

const CourseExplorer: React.FC<CourseExplorerProps> = ({ onAskAboutCourse }) => {
  const { setCourseFilter } = useChat();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [levelFilter, setLevelFilter] = useState<CourseLevel>('all');
  const [fieldFilter, setFieldFilter] = useState<SubjectArea>('all');
  const [selectedTab, setSelectedTab] = useState('courses');

  // Define field options based on level selection
  const levelSpecificFields = useMemo(() => {
    // Common "All Fields" option for all levels
    const allFieldsOption = { value: 'all', label: 'All Fields' };
    
    // Undergraduate Fields
    const undergraduateFields = [
      { value: 'arts', label: 'Arts/Humanities' },
      { value: 'science', label: 'Science' },
      { value: 'commerce', label: 'Commerce' },
      { value: 'engineering', label: 'Engineering/Technology' },
      { value: 'medicine', label: 'Medicine/Allied Health Sciences' },
      { value: 'law', label: 'Law' },
      { value: 'design', label: 'Design/Architecture' },
      { value: 'computer-applications', label: 'Computer Applications' },
      { value: 'hotel-management', label: 'Hotel Management' },
      { value: 'others', label: 'Others' }
    ];
    
    // Postgraduate Fields
    const postgraduateFields = [
      { value: 'arts', label: 'Arts/Humanities' },
      { value: 'science', label: 'Science' },
      { value: 'management', label: 'Commerce/Management' },
      { value: 'engineering', label: 'Engineering/Technology' },
      { value: 'medicine', label: 'Medicine/Allied Health Sciences' },
      { value: 'law', label: 'Law' },
      { value: 'computer-applications', label: 'Computer Applications' },
      { value: 'design', label: 'Design/Architecture' },
      { value: 'others', label: 'Others' }
    ];
    
    // Doctoral Fields
    const doctoralFields = [
      { value: 'arts', label: 'Arts/Humanities' },
      { value: 'science', label: 'Science' },
      { value: 'social-sciences', label: 'Social Sciences' },
      { value: 'engineering', label: 'Engineering/Technology' },
      { value: 'medicine', label: 'Medicine/Allied Health Sciences' },
      { value: 'law', label: 'Law' },
      { value: 'management', label: 'Management' },
      { value: 'architecture', label: 'Architecture/Design' },
      { value: 'others', label: 'Others' }
    ];
    
    // Diploma Fields
    const diplomaFields = [
      { value: 'engineering', label: 'Engineering/Technology' },
      { value: 'information-technology', label: 'Computer Applications/IT' },
      { value: 'paramedical', label: 'Healthcare/Paramedical' },
      { value: 'business', label: 'Business/Management' },
      { value: 'hospitality', label: 'Hospitality/Tourism' },
      { value: 'fashion', label: 'Design/Fashion' },
      { value: 'vocational', label: 'Vocational Trades' },
      { value: 'agriculture', label: 'Agriculture' },
      { value: 'education', label: 'Education' },
      { value: 'media', label: 'Media/Communication' },
      { value: 'others', label: 'Others' }
    ];
    
    // Integrated Program Fields
    const integratedFields = [
      { value: 'integrated-law', label: 'Integrated Law' },
      { value: 'integrated-science', label: 'Integrated Science' },
      { value: 'integrated-management', label: 'Integrated Management' },
      { value: 'integrated-technology', label: 'Integrated Technology' },
      { value: 'integrated-education', label: 'Integrated Teacher Education' },
      { value: 'others', label: 'Others' }
    ];
    
    // Professional Degree Fields
    const professionalFields = [
      { value: 'medicine', label: 'Medicine' },
      { value: 'law', label: 'Law' },
      { value: 'architecture', label: 'Architecture' },
      { value: 'pharmacy', label: 'Pharmacy' },
      { value: 'education', label: 'Education' },
      { value: 'business', label: 'Business Administration' },
      { value: 'accountancy', label: 'Accountancy' },
      { value: 'veterinary', label: 'Veterinary Science' },
      { value: 'others', label: 'Others' }
    ];
    
    // Default Fields for when "All Levels" is selected
    const defaultFields = [
      { value: 'arts', label: 'Arts/Humanities' },
      { value: 'science', label: 'Science' },
      { value: 'management', label: 'Commerce/Management' },
      { value: 'engineering', label: 'Engineering/Technology' },
      { value: 'medicine', label: 'Medicine/Allied Health Sciences' },
      { value: 'law', label: 'Law' },
      { value: 'computer-applications', label: 'Computer Applications' },
      { value: 'design', label: 'Design/Architecture' },
      { value: 'others', label: 'Others' }
    ];
    
    // Return the appropriate field options based on the selected level
    switch (levelFilter) {
      case 'undergraduate':
        return [allFieldsOption, ...undergraduateFields];
      case 'postgraduate':
        return [allFieldsOption, ...postgraduateFields];
      case 'doctoral':
        return [allFieldsOption, ...doctoralFields];
      case 'diploma':
        return [allFieldsOption, ...diplomaFields];
      case 'integrated':
        return [allFieldsOption, ...integratedFields];
      case 'professional':
        return [allFieldsOption, ...professionalFields];
      default:
        return [allFieldsOption, ...defaultFields];
    }
  }, [levelFilter]);

  // Reset field filter when level changes
  useEffect(() => {
    if (levelFilter !== 'all') {
      const isValidField = levelSpecificFields.some(field => field.value === fieldFilter);
      if (!isValidField) {
        setFieldFilter('all');
      }
    }
  }, [levelFilter, levelSpecificFields, fieldFilter]);

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const suggestions = coursesData
        .filter(course => 
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(course => course.name)
        .slice(0, 5); // Limit to 5 suggestions
      
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchTerm]);

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = searchTerm === '' || 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    const matchesField = fieldFilter === 'all' || course.field === fieldFilter;
    
    return matchesSearch && matchesLevel && matchesField;
  });

  const handleFilterChange = (level: CourseLevel, field: SubjectArea) => {
    setLevelFilter(level);
    setFieldFilter(field);
    setCourseFilter({ level, subject: field });
  };

  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'undergraduate', label: 'Undergraduate Degrees (Bachelor\'s Degrees)' },
    { value: 'postgraduate', label: 'Postgraduate Degrees (Master\'s Degrees)' },
    { value: 'doctoral', label: 'Doctoral Degrees (Ph.D.)' },
    { value: 'diploma', label: 'Diploma and Certificate Programs' },
    { value: 'integrated', label: 'Integrated Programs' },
    { value: 'professional', label: 'Professional Degrees' }
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSearchSuggestions([]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search courses, colleges, or careers in India..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-6 w-full glass-input"
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {/* Search suggestions */}
          {searchSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-border/50 max-h-60 overflow-y-auto">
              <ul className="py-1">
                {searchSuggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Select
            value={levelFilter}
            onValueChange={(value) => handleFilterChange(value as CourseLevel, fieldFilter)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Course Level" />
            </SelectTrigger>
            <SelectContent>
              {levelOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={fieldFilter}
            onValueChange={(value) => handleFilterChange(levelFilter, value as SubjectArea)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Field of Study" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              {levelSpecificFields.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs 
        defaultValue="courses" 
        value={selectedTab} 
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Courses</span>
          </TabsTrigger>
          <TabsTrigger value="colleges" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Colleges</span>
          </TabsTrigger>
          <TabsTrigger value="careers" className="flex items-center gap-2">
            <BriefcaseIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Careers</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-6">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-10">
              <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <AnimatedTransition key={course.id} showDelay={index * 100}>
                  <Card className="overflow-hidden card-hover border border-border/50 h-full">
                    <div className="p-3 sm:p-6">
                      <div className="flex justify-between items-start mb-2 sm:mb-4">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {course.level}
                        </Badge>
                        <Badge variant="outline" className="bg-secondary/80 text-secondary-foreground">
                          {course.field}
                        </Badge>
                      </div>
                      <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">{course.name}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-4">{course.description}</p>
                      <div className="mb-2 sm:mb-4">
                        <div className="text-xs sm:text-sm font-medium mb-1">Duration</div>
                        <div className="text-xs sm:text-sm">{course.duration}</div>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">Career Prospects in India</div>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {course.careerProspects.slice(0, 3).map((career, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-accent text-[10px] sm:text-xs">
                              {career}
                            </Badge>
                          ))}
                          {course.careerProspects.length > 3 && (
                            <Badge variant="outline" className="text-[10px] sm:text-xs">+{course.careerProspects.length - 3} more</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="border-t px-3 sm:px-6 py-2 sm:py-4 bg-muted/30">
                      <Button 
                        variant="default" 
                        className="w-full text-xs sm:text-sm"
                        onClick={() => onAskAboutCourse && onAskAboutCourse(`${course.name} in India`)}
                      >
                        Ask about this course
                      </Button>
                    </div>
                  </Card>
                </AnimatedTransition>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="colleges" className="space-y-6">
          <div className="text-center py-10">
            <Building className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">College Explorer</h3>
            <p className="text-muted-foreground mb-6">Discover top colleges and universities across India</p>
            <Button 
              onClick={() => onAskAboutCourse && onAskAboutCourse("top colleges in India for " + (levelFilter !== 'all' ? levelFilter + " " : "") + (fieldFilter !== 'all' ? fieldFilter : "courses"))}
              className="mx-auto"
            >
              Ask about Indian colleges
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="careers" className="space-y-6">
          <div className="text-center py-10">
            <BriefcaseIcon className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">Career Explorer</h3>
            <p className="text-muted-foreground mb-6">Explore job opportunities and salary trends in the Indian job market</p>
            <Button 
              onClick={() => onAskAboutCourse && onAskAboutCourse("career opportunities in India for " + (levelFilter !== 'all' ? levelFilter + " " : "") + (fieldFilter !== 'all' ? fieldFilter : "graduates"))}
              className="mx-auto"
            >
              Explore Indian job market
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseExplorer;
