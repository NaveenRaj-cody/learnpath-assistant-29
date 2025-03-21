
import React, { useState } from 'react';
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

const CoursesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<CourseLevel>('all');
  const [fieldFilter, setFieldFilter] = useState<SubjectArea>('all');
  const [durationFilter, setDurationFilter] = useState('all');
  
  // Extract unique durations based on current filters
  const getFilteredDurations = () => {
    const filteredCoursesByLevelAndField = coursesData.filter(course => {
      const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
      const matchesField = fieldFilter === 'all' || course.field === fieldFilter;
      return matchesLevel && matchesField;
    });
    
    return [...new Set(filteredCoursesByLevelAndField.map(course => course.duration))];
  };
  
  const uniqueDurations = getFilteredDurations();
  
  // Reset duration filter if no matching durations exist
  React.useEffect(() => {
    if (durationFilter !== 'all' && !uniqueDurations.includes(durationFilter)) {
      setDurationFilter('all');
    }
  }, [levelFilter, fieldFilter, uniqueDurations, durationFilter]);
  
  // Filter courses based on user selections
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
    { value: 'doctoral', label: 'Doctoral' },
    { value: 'certificate', label: 'Certificate' }
  ];

  const fieldOptions = [
    { value: 'all', label: 'All Fields' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'business', label: 'Business/Management' },
    { value: 'law', label: 'Law' },
    { value: 'arts', label: 'Arts and Humanities' },
    { value: 'science', label: 'Science' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'design', label: 'Design' },
    { value: 'education', label: 'Education' },
    { value: 'vocational', label: 'Vocational/Skill-Based Training' }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <AnimatedTransition>
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Explore Courses in India</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <Card className="overflow-hidden border-primary/20 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-500/10">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    Filters
                  </CardTitle>
                  <CardDescription>Refine your course search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Level</label>
                    <Select
                      value={levelFilter}
                      onValueChange={(value) => setLevelFilter(value as CourseLevel)}
                    >
                      <SelectTrigger className="border-primary/20">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levelOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Field of Study</label>
                    <Select
                      value={fieldFilter}
                      onValueChange={(value) => setFieldFilter(value as SubjectArea)}
                    >
                      <SelectTrigger className="border-primary/20">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <Select
                      value={durationFilter}
                      onValueChange={setDurationFilter}
                      disabled={uniqueDurations.length === 0}
                    >
                      <SelectTrigger className="border-primary/20">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Durations</SelectItem>
                        {uniqueDurations.map((duration) => (
                          <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 border-primary/20 hover:bg-primary/10"
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
            
            <div className="lg:col-span-2">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Results ({filteredCourses.length})
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCourses.length === 0 ? (
                  <div className="col-span-full bg-muted rounded-lg p-8 text-center">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No courses found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                    <Button 
                      variant="outline" 
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
                      <CardHeader className="pb-2 bg-gradient-to-r from-primary/5 to-blue-500/5">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            {course.level}
                          </Badge>
                          <Badge variant="outline" className="bg-secondary/10 text-secondary-foreground">
                            {course.field}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="text-sm">
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium">{course.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          size="sm" 
                          className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
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
