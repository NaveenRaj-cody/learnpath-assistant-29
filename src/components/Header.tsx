
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { 
  GraduationCap,
  Menu,
  LogOut,
  BookOpen, 
  Building, 
  BriefcaseIcon,
  LogIn,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout, userData } = useAuth();
  
  const menuItems = [
    { path: '/', label: 'Home', icon: null },
    { path: '/courses', label: 'Courses', icon: <BookOpen className="h-4 w-4" /> },
    { path: '/colleges', label: 'Colleges', icon: <Building className="h-4 w-4" /> },
    { path: '/careers', label: 'Careers', icon: <BriefcaseIcon className="h-4 w-4" /> },
    { path: '/about', label: 'About', icon: null }
  ];

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/');
  };

  return (
    <header className={cn("w-full py-3 px-4 sm:py-4 sm:px-6 flex items-center justify-between bg-background/60 backdrop-blur-md border-b", className)}>
      <Link to="/" className="flex items-center gap-1 sm:gap-2">
        <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        <span className="font-bold text-lg sm:text-xl">CareerPath</span>
      </Link>
      
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 hover:scale-105 active:scale-95 transition-all"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        {isLoggedIn ? (
          <div className="hidden md:flex items-center gap-3">
            <div className="text-sm font-medium flex items-center gap-1">
              <User className="h-4 w-4 text-primary" />
              <span>{userData?.name}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="hidden md:flex items-center gap-1 hover:bg-red-50 hover:text-red-500 hover:border-red-200 dark:hover:bg-red-950 dark:hover:text-red-400 dark:hover:border-red-800 transition-all hover:shadow-md active:scale-95"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogin}
            className="hidden md:flex items-center gap-1 hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-95 transition-all"
          >
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </Button>
        )}
        
        <ModeToggle />
        
        {/* Mobile navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8 active:scale-95 transition-all">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col gap-6 mt-8">
              {menuItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className="text-lg font-medium transition-colors hover:text-primary flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {isLoggedIn ? (
                <>
                  <div className="text-lg font-medium flex items-center gap-2 border-t pt-4">
                    <User className="h-5 w-5 text-primary" />
                    <span>{userData?.name}</span>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 hover:bg-red-50 hover:text-red-500 hover:border-red-200 dark:hover:bg-red-950 dark:hover:text-red-400 dark:hover:border-red-800 transition-all hover:shadow-md active:scale-95"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => {
                    handleLogin();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-95 transition-all"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
