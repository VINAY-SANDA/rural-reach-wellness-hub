
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { UserRole, UserProfile } from '@/types/database.types';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, role: UserRole, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      // Check if user is logged in with Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsAuthenticated(true);
        
        // Fetch user profile
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        
        if (error) {
          console.error('Error fetching profile:', error);
        } else if (profile) {
          setUserProfile(profile as UserProfile);
          setUserRole(profile.role as UserRole);
        }
      }
      
      setIsLoading(false);
    };
    
    initAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setIsAuthenticated(true);
          
          // Fetch user profile when signed in
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          if (error) {
            console.error('Error fetching profile:', error);
          } else if (profile) {
            setUserProfile(profile as UserProfile);
            setUserRole(profile.role as UserRole);
          }
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setUserProfile(null);
          setUserRole(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Fetch user profile
      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile:', profileError);
          throw profileError;
        }
        
        setUserProfile(profile as UserProfile);
        setUserRole(profile.role as UserRole);
        
        // Redirect based on role
        redirectBasedOnRole(profile.role as UserRole);
        
        toast({
          title: "Login successful",
          description: `Welcome back! You are logged in as a ${profile.role}.`,
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const signup = async (email: string, password: string, role: UserRole, fullName: string) => {
    setIsLoading(true);
    
    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
        },
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Create a profile entry
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: data.user.id,
              full_name: fullName,
              role,
              email,
              created_at: new Date().toISOString(),
            },
          ]);
        
        if (profileError) {
          console.error('Error creating profile:', profileError);
          throw profileError;
        }
        
        toast({
          title: "Registration successful",
          description: "Your account has been created. Please verify your email to complete the registration.",
        });
        
        navigate('/login');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setIsAuthenticated(false);
      setUserProfile(null);
      setUserRole(null);
      
      navigate('/login');
      
      toast({
        title: "Logout successful",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred during logout.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateProfile = async (profile: Partial<UserProfile>) => {
    if (!userProfile) {
      toast({
        title: "Update failed",
        description: "You must be logged in to update your profile.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('user_id', userProfile.user_id);
      
      if (error) throw error;
      
      // Update the local profile state
      setUserProfile({
        ...userProfile,
        ...profile,
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: "Update failed",
        description: error.message || "An error occurred while updating your profile.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const redirectBasedOnRole = (role: UserRole) => {
    switch (role) {
      case 'patient':
        navigate('/');
        break;
      case 'doctor':
        navigate('/doctor-dashboard');
        break;
      case 'community':
        navigate('/community-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        userRole, 
        userProfile,
        login, 
        logout, 
        isLoading,
        signup,
        updateProfile
      }}
    >
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
