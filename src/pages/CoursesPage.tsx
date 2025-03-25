import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, X } from 'lucide-react';
import { coursesData, Course } from '@/data/coursesData';
import AnimatedTransition from '@/components/AnimatedTransition';
import { CourseLevel, SubjectArea } from '@/types/filters';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchableSelect from '@/components/SearchableSelect';

const CoursesPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [levelFilter, setLevelFilter] = useState<CourseLevel>('all');
  const [fieldFilter, setFieldFilter] = useState<SubjectArea>('all');
  
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const suggestions = coursesData
        .filter(course => 
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(course => course.name)
        .slice(0, 5);
      
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchTerm]);
  
  const levelSpecificFields = useMemo(() => {
    const diplomaFields = [
      { value: 'all', label: 'All Fields' },
      { value: 'engineering', label: 'Engineering and Technology' },
      { value: 'medicine', label: 'Medical and Paramedical' },
      { value: 'arts', label: 'Arts and Design' },
      { value: 'business', label: 'Commerce and Business' },
      { value: 'agriculture', label: 'Agriculture and Allied Sciences' },
      { value: 'hospitality', label: 'Hotel Management and Hospitality' },
      { value: 'vocational', label: 'Vocational and Skill-Based Courses' },
      { value: 'education', label: 'Education' },
    ];

    const undergraduateFields = [
      { value: 'all', label: 'All Fields' },
      { value: 'engineering', label: 'Engineering and Technology' },
      { value: 'medicine', label: 'Medical and Health Sciences' },
      { value: 'arts', label: 'Arts and Humanities' },
      { value: 'business', label: 'Commerce and Business' },
      { value: 'science', label: 'Science' },
      { value: 'law', label: 'Law' },
      { value: 'agriculture', label: 'Agriculture and Allied Sciences' },
      { value: 'hospitality', label: 'Hotel Management and Hospitality' },
      { value: 'media', label: 'Design and Media' },
    ];

    const postgraduateFields = [
      { value: 'all', label: 'All Fields' },
      { value: 'engineering', label: 'Engineering and Technology' },
      { value: 'medicine', label: 'Medical and Health Sciences' },
      { value: 'arts', label: 'Arts and Humanities' },
      { value: 'business', label: 'Commerce and Business' },
      { value: 'science', label: 'Science' },
      { value: 'law', label: 'Law' },
      { value: 'agriculture', label: 'Agriculture and Allied Sciences' },
      { value: 'hospitality', label: 'Hotel Management and Hospitality' },
      { value: 'media', label: 'Design and Media' },
      { value: 'education', label: 'Education' },
    ];

    const doctoralFields = [
      { value: 'all', label: 'All Fields' },
      { value: 'engineering', label: 'Engineering and Technology' },
      { value: 'medicine', label: 'Medical and Health Sciences' },
      { value: 'science', label: 'Science' },
      { value: 'arts', label: 'Arts and Humanities' },
      { value: 'business', label: 'Commerce and Business' },
      { value: 'law', label: 'Law' },
      { value: 'agriculture', label: 'Agriculture and Allied Sciences' },
      { value: 'education', label: 'Education' },
      { value: 'hospitality', label: 'Hotel Management and Hospitality' },
      { value: 'media', label: 'Design and Media' },
    ];

    const allFields = [
      { value: 'all', label: 'All Fields' },
      { value: 'engineering', label: 'Engineering & Technical' },
      { value: 'medicine', label: 'Healthcare & Medical Sciences' },
      { value: 'business', label: 'Business & Management' },
      { value: 'law', label: 'Law' },
      { value: 'arts', label: 'Arts, Design & Creative' },
      { value: 'science', label: 'Science' },
      { value: 'commerce', label: 'Commerce' },
      { value: 'design', label: 'Design' },
      { value: 'education', label: 'Education' },
      { value: 'vocational', label: 'Vocational & Industrial Training' },
      { value: 'agriculture', label: 'Agriculture & Allied Fields' },
      { value: 'information-technology', label: 'Information Technology' },
      { value: 'hospitality', label: 'Hospitality & Tourism' },
      { value: 'media', label: 'Media & Communication' },
      { value: 'paramedical', label: 'Paramedical Sciences' }
    ];

    switch (levelFilter) {
      case 'diploma':
        return diplomaFields;
      case 'undergraduate':
        return undergraduateFields;
      case 'postgraduate':
        return postgraduateFields;
      case 'doctoral':
        return doctoralFields;
      default:
        return allFields;
    }
  }, [levelFilter]);

  useEffect(() => {
    if (levelFilter !== 'all') {
      const isValidField = levelSpecificFields.some(field => field.value === fieldFilter);
      if (!isValidField) {
        setFieldFilter('all');
      }
    }
  }, [levelFilter, levelSpecificFields, fieldFilter]);
  
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = searchTerm === '' || 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    const matchesField = fieldFilter === 'all' || course.field === fieldFilter;
    
    return matchesSearch && matchesLevel && matchesField;
  });

  const handleViewCourseDetails = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSearchSuggestions([]);
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-4 px-2 sm:py-8 sm:px-4">
        <AnimatedTransition>
          <h1 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-8 text-center bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Explore Courses in India</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
            <div className="lg:col-span-1">
              <Card className="overflow-hidden border-primary/20 shadow-md">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10 py-2 px-3 sm:p-6">
                  <CardTitle className="text-base sm:text-xl flex items-center gap-1">
                    <Search className="h-3 w-3 sm:h-5 sm:w-5 text-primary" />
                    Find Courses
                  </CardTitle>
                  <CardDescription className="text-xs">Filter and search for courses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-4 p-3 sm:p-4">
                  <div className="mobile-filters">
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Search</label>
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3 w-3" />
                        <Input
                          type="text"
                          placeholder="Search courses..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-7 border-primary/20 text-xs h-8"
                        />
                        {searchTerm && (
                          <button 
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            onClick={() => setSearchTerm('')}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                        
                        {searchSuggestions.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-border/50 max-h-40 overflow-y-auto">
                            <ul className="py-1">
                              {searchSuggestions.map((suggestion, index) => (
                                <li 
                                  key={index} 
                                  className="px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center text-xs"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  <Search className="h-3 w-3 mr-2 text-muted-foreground" />
                                  <span>{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Level</label>
                      <Select
                        value={levelFilter}
                        onValueChange={(value) => setLevelFilter(value as CourseLevel)}
                      >
                        <SelectTrigger className="border-primary/20 h-8 text-xs">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {levelOptions.map(option => (
                            <SelectItem key={option.value} value={option.value} className="text-xs">{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Field of Study</label>
                      <Select
                        value={fieldFilter}
                        onValueChange={(value) => setFieldFilter(value as SubjectArea)}
                      >
                        <SelectTrigger className="border-primary/20 h-8 text-xs">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          {levelSpecificFields.map(option => (
                            <SelectItem key={option.value} value={option.value} className="text-xs">{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 border-primary/20 hover:bg-primary/10 text-xs h-8"
                    onClick={() => {
                      setSearchTerm('');
                      setLevelFilter('all');
                      setFieldFilter('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <div className="mb-2 sm:mb-4 flex justify-between items-center">
                <h2 className="text-sm sm:text-xl font-semibold flex items-center gap-1">
                  <BookOpen className="h-3 w-3 sm:h-5 sm:w-5 text-primary" />
                  Results ({filteredCourses.length})
                </h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                {filteredCourses.length === 0 ? (
                  <div className="col-span-full bg-muted rounded-lg p-3 sm:p-8 text-center">
                    <BookOpen className="mx-auto h-6 w-6 sm:h-12 sm:w-12 text-muted-foreground/50 mb-2 sm:mb-4" />
                    <h3 className="text-sm sm:text-lg font-medium mb-1 sm:mb-2">No courses found</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4">Try adjusting your filters</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSearchTerm('');
                        setLevelFilter('all');
                        setFieldFilter('all');
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  filteredCourses.map((course) => (
                    <Card 
                      key={course.id} 
                      className="h-full hover:shadow-lg transition-all duration-300 border-primary/20 animate-fade-in mobile-compact-card flex flex-col"
                    >
                      <CardHeader className="pb-1 p-2 sm:p-3 bg-gradient-to-r from-primary/5 to-blue-500/5">
                        <div className="flex justify-between items-start mb-1">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                            {course.level}
                          </Badge>
                        </div>
                        <CardTitle className="text-xs sm:text-sm">{course.name}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="pb-1 px-2 sm:px-3 pt-1 flex-grow">
                        <div className="text-xs">
                          <div className="mb-1">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium ml-1 inline-block">{course.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="p-2 sm:p-3 mt-auto">
                        <Button 
                          size="sm"
                          className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 h-6 text-[10px] sm:text-xs"
                          onClick={() => handleViewCourseDetails(course.id)}
                        >
                          {isMobile ? 'View' : 'View Details'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default CoursesPage;
