
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  name: string;
  email: string;
  educationLevel: string;
  currentInstitution: string;
  state: string;
  district: string; // This field was already changed from city to district
}

interface AuthContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  login: (data: UserData) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Check if user is logged in on initial load
    const loggedIn = localStorage.getItem('userLoggedIn');
    const storedUserData = localStorage.getItem('userData');
    
    if (loggedIn === 'true' && storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        
        // Validate stored data has required fields
        if (
          parsedUserData.name && 
          parsedUserData.email && 
          parsedUserData.educationLevel && 
          parsedUserData.state
        ) {
          setIsLoggedIn(true);
          setUserData(parsedUserData);
        } else {
          // If data is incomplete, clear it
          localStorage.removeItem('userLoggedIn');
          localStorage.removeItem('userData');
        }
      } catch (error) {
        // If parsing fails, clear invalid data
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const login = (data: UserData): boolean => {
    // Validate required fields and email format
    if (!data.name || !data.email || !data.educationLevel || !data.state) {
      console.error("Missing required fields");
      return false;
    }
    
    if (!validateEmail(data.email)) {
      console.error("Invalid email format");
      return false;
    }
    
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(data));
    setIsLoggedIn(true);
    setUserData(data);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
