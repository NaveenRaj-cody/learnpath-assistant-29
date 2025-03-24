
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { coursesData } from '@/data/coursesData';
import { BookOpen, Building } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from '@/hooks/use-mobile';

interface CoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'courses' | 'colleges';
}

const CoursesModal: React.FC<CoursesModalProps> = ({ isOpen, onClose, type }) => {
  const isMobile = useIsMobile();
  
  // Extract unique course names or college names from coursesData
  const courses = coursesData.map(course => course.name);
  
  // Extract all colleges and remove duplicates
  const allColleges = coursesData.flatMap(course => 
    course.topColleges.map(college => college.name)
  );
  const uniqueColleges = [...new Set(allColleges)];
  
  const isCollegeView = type === 'colleges';
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`${isMobile ? 'p-3 max-w-[95vw]' : 'sm:max-w-md md:max-w-lg'}`}>
        <DialogHeader className={isMobile ? 'space-y-1 mb-2' : ''}>
          <DialogTitle className={`flex items-center gap-1 ${isMobile ? 'text-base' : ''}`}>
            {isCollegeView ? (
              <>
                <Building className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-primary`} />
                <span>Top Colleges in India</span>
              </>
            ) : (
              <>
                <BookOpen className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-primary`} />
                <span>Available Courses in India</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription className={isMobile ? 'text-xs' : ''}>
            {isCollegeView 
              ? "Browse through our list of top colleges and universities across India."
              : "Browse through our comprehensive list of courses available across Indian universities."
            }
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className={`${isMobile ? 'h-[40vh]' : 'h-[300px]'} mt-2 sm:mt-4`}>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-1' : 'grid-cols-1 md:grid-cols-2 gap-2'}`}>
            {isCollegeView ? (
              uniqueColleges.map((college, index) => (
                <div 
                  key={index} 
                  className={`${isMobile ? 'p-1.5 text-xs' : 'p-2'} border rounded-md hover:bg-accent transition-colors flex items-center gap-1`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>{college}</span>
                </div>
              ))
            ) : (
              courses.map((course, index) => (
                <div 
                  key={index} 
                  className={`${isMobile ? 'p-1.5 text-xs' : 'p-2'} border rounded-md hover:bg-accent transition-colors flex items-center gap-1`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>{course}</span>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        
        <DialogFooter className={isMobile ? 'mt-2' : 'mt-4'}>
          <Button size={isMobile ? "sm" : "default"} onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CoursesModal;
