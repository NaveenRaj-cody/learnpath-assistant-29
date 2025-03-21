
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BriefcaseIcon, BookOpen, Building, Search, GraduationCap } from 'lucide-react';
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
  const [levelFilter, setLevelFilter] = useState<CourseLevel>('all');
  const [fieldFilter, setFieldFilter] = useState<SubjectArea>('all');
  const [selectedTab, setSelectedTab] = useState('courses');

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
            <SelectContent>
              {fieldOptions.map(option => (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <AnimatedTransition key={course.id} showDelay={index * 100}>
                  <Card className="overflow-hidden card-hover border border-border/50 h-full">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {course.level}
                        </Badge>
                        <Badge variant="outline" className="bg-secondary/80 text-secondary-foreground">
                          {course.field}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                      <div className="mb-4">
                        <div className="text-sm font-medium mb-1">Duration</div>
                        <div className="text-sm">{course.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">Career Prospects in India</div>
                        <div className="flex flex-wrap gap-2">
                          {course.careerProspects.slice(0, 3).map((career, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-accent">
                              {career}
                            </Badge>
                          ))}
                          {course.careerProspects.length > 3 && (
                            <Badge variant="outline">+{course.careerProspects.length - 3} more</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="border-t px-6 py-4 bg-muted/30">
                      <Button 
                        variant="default" 
                        className="w-full"
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
