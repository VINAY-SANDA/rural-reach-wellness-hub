
import React, { createContext, useContext, useState } from "react";

// Mock user type
type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
  signUp: (email: string, password: string) => Promise<{
    success: boolean;
    error?: string;
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Mock users storage
  const users: { email: string; password: string }[] = [
    { email: "test@example.com", password: "password123" }
  ];

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundUser = users.find(
        user => user.email === email && user.password === password
      );
      
      if (foundUser) {
        setUser({ id: 'user-1', email });
        return { success: true };
      }
      
      return { success: false, error: "Invalid email or password" };
    } catch (error: any) {
      return { success: false, error: error.message || "An error occurred during login" };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if user already exists
      const userExists = users.some(user => user.email === email);
      
      if (userExists) {
        return { success: false, error: "User already exists" };
      }
      
      // In a real app, we would save this user to a database
      // Here we're just pretending it worked
      users.push({ email, password });
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "An error occurred during registration" };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    setUser(null);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
