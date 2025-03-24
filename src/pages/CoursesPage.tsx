import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen } from 'lucide-react';
import { coursesData, Course } from '@/data/coursesData';
import AnimatedTransition from '@/components/AnimatedTransition';
import { CourseLevel, SubjectArea } from '@/types/filters';
import { useIsMobile } from '@/hooks/use-mobile';

const CoursesPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<CourseLevel>('all');
  const [fieldFilter, setFieldFilter] = useState<SubjectArea>('all');
  const [durationFilter, setDurationFilter] = useState('all');
  
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
  
  const getFilteredDurations = () => {
    const filteredCoursesByLevelAndField = coursesData.filter(course => {
      const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
      const matchesField = fieldFilter === 'all' || course.field === fieldFilter;
      return matchesLevel && matchesField;
    });
    
    return [...new Set(filteredCoursesByLevelAndField.map(course => course.duration))];
  };
  
  const uniqueDurations = getFilteredDurations();
  
  useEffect(() => {
    if (durationFilter !== 'all' && !uniqueDurations.includes(durationFilter)) {
      setDurationFilter('all');
    }
  }, [levelFilter, fieldFilter, uniqueDurations, durationFilter]);
  
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = searchTerm === '' || 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    const matchesField = fieldFilter === 'all' || course.field === fieldFilter;
    const matchesDuration = durationFilter === 'all' || course.duration === durationFilter;
    
    return matchesSearch && matchesLevel && matchesField && matchesDuration;
  });

  const handleViewCourseDetails = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'undergraduate', label: 'Undergraduate (UG)' },
    { value: 'postgraduate', label: 'Postgraduate (PG)' },
    { value: 'doctoral', label: 'Doctoral' }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-4 sm:py-8 px-3 sm:px-4">
        <AnimatedTransition>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Explore Courses in India</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
            <div className={`${isMobile ? 'mb-4' : 'lg:col-span-1'}`}>
              <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10 py-3 px-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                    <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    Filters
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Refine your course search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4 sm:pt-4">
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3 w-3 sm:h-4 sm:w-4" />
                      <Input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-7 sm:pl-10 border-primary/20 focus:border-primary text-xs sm:text-sm h-8 sm:h-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Level</label>
                    <Select
                      value={levelFilter}
                      onValueChange={(value) => setLevelFilter(value as CourseLevel)}
                    >
                      <SelectTrigger className="border-primary/20 h-8 sm:h-10 text-xs sm:text-sm">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levelOptions.map(option => (
                          <SelectItem key={option.value} value={option.value} className="text-xs sm:text-sm">{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Field of Study</label>
                    <Select
                      value={fieldFilter}
                      onValueChange={(value) => setFieldFilter(value as SubjectArea)}
                    >
                      <SelectTrigger className="border-primary/20 h-8 sm:h-10 text-xs sm:text-sm">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        {levelSpecificFields.map(option => (
                          <SelectItem key={option.value} value={option.value} className="text-xs sm:text-sm">{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-medium">Duration</label>
                    <Select
                      value={durationFilter}
                      onValueChange={setDurationFilter}
                      disabled={uniqueDurations.length === 0}
                    >
                      <SelectTrigger className="border-primary/20 h-8 sm:h-10 text-xs sm:text-sm">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="text-xs sm:text-sm">All Durations</SelectItem>
                        {uniqueDurations.map((duration) => (
                          <SelectItem key={duration} value={duration} className="text-xs sm:text-sm">{duration}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 border-primary/20 hover:bg-primary/10 text-xs sm:text-sm h-8 sm:h-10"
                    onClick={() => {
                      setSearchTerm('');
                      setLevelFilter('all');
                      setFieldFilter('all');
                      setDurationFilter('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className={`${isMobile ? '' : 'lg:col-span-2'}`}>
              <div className="mb-3 sm:mb-4 flex justify-between items-center">
                <h2 className="text-base sm:text-xl font-semibold flex items-center gap-1 sm:gap-2">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Results ({filteredCourses.length})
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {filteredCourses.length === 0 ? (
                  <div className="col-span-full bg-muted rounded-lg p-4 sm:p-8 text-center">
                    <BookOpen className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground/50 mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-medium mb-2">No courses found</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Try adjusting your filters</p>
                    <Button 
                      variant="outline" 
                      size={isMobile ? "sm" : "default"}
                      onClick={() => {
                        setSearchTerm('');
                        setLevelFilter('all');
                        setFieldFilter('all');
                        setDurationFilter('all');
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                ) : (
                  filteredCourses.map((course) => (
                    <Card key={course.id} className="h-full hover:shadow-lg transition-all duration-300 border-primary/20 animate-fade-in">
                      <CardHeader className="pb-1 sm:pb-2 bg-gradient-to-r from-primary/5 to-blue-500/5 p-3 sm:p-4">
                        <div className="flex justify-between items-start mb-1 sm:mb-2">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] sm:text-xs">
                            {course.level}
                          </Badge>
                          <Badge variant="outline" className="bg-secondary/10 text-secondary-foreground text-[10px] sm:text-xs">
                            {course.field}
                          </Badge>
                        </div>
                        <CardTitle className="text-sm sm:text-lg">{course.name}</CardTitle>
                        <CardDescription className="line-clamp-2 text-xs sm:text-sm">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-1 sm:pb-2 px-3 sm:px-4 pt-2 sm:pt-0">
                        <div className="text-xs sm:text-sm">
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium">{course.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-3 sm:p-4">
                        <Button 
                          size={isMobile ? "sm" : "default"}
                          className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 text-xs sm:text-sm"
                          onClick={() => handleViewCourseDetails(course.id)}
                        >
                          View Details
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
