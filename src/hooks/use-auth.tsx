
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'patient' | 'doctor' | 'community' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole') as UserRole;
    
    setIsAuthenticated(loggedIn);
    setUserRole(role);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', role as string);
      
      setIsAuthenticated(true);
      setUserRole(role);
      
      // Redirect based on role
      switch (role) {
        case 'patient':
          navigate('/');
          break;
        case 'doctor':
          navigate('/chat');
          break;
        case 'community':
          navigate('/community');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    
    setIsAuthenticated(false);
    setUserRole(null);
    
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;
