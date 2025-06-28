
import { useState, useEffect } from 'react';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  elderlyName: string;
  relationship: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('zeroclick_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo, we'll simulate with stored user data
    const savedUsers = JSON.parse(localStorage.getItem('zeroclick_users') || '[]');
    const foundUser = savedUsers.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('zeroclick_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    // Demo fallback - allow any email/password combination
    const demoUser = {
      firstName: 'Demo',
      lastName: 'User',
      email: email,
      elderlyName: 'Grandma',
      relationship: 'Grandchild'
    };
    setUser(demoUser);
    localStorage.setItem('zeroclick_user', JSON.stringify(demoUser));
    return true;
  };

  const signup = (userData: any) => {
    // Save user to localStorage (in real app, this would be API call)
    const savedUsers = JSON.parse(localStorage.getItem('zeroclick_users') || '[]');
    savedUsers.push(userData);
    localStorage.setItem('zeroclick_users', JSON.stringify(savedUsers));
    
    // Auto-login after signup
    const userWithoutPassword = { ...userData };
    delete userWithoutPassword.password;
    delete userWithoutPassword.confirmPassword;
    setUser(userWithoutPassword);
    localStorage.setItem('zeroclick_user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('zeroclick_user');
  };

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };
};
