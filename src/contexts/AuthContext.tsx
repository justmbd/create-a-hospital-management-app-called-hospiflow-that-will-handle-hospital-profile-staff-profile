
import { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    email: 'admin@hospiflow.com',
    role: 'admin',
    fullName: 'Admin User',
    department: 'Administration'
  },
  {
    id: '2',
    username: 'doctor',
    password: 'doctor123',
    email: 'doctor@hospiflow.com',
    role: 'doctor',
    fullName: 'Dr. Sarah Johnson',
    department: 'General Medicine'
  },
  {
    id: '3',
    username: 'nurse',
    password: 'nurse123',
    email: 'nurse@hospiflow.com',
    role: 'nurse',
    fullName: 'Emily Davis',
    department: 'Emergency'
  },
  {
    id: '4',
    username: 'pharmacist',
    password: 'pharma123',
    email: 'pharmacist@hospiflow.com',
    role: 'pharmacist',
    fullName: 'Michael Chen',
    department: 'Pharmacy'
  },
  {
    id: '5',
    username: 'lab',
    password: 'lab123',
    email: 'lab@hospiflow.com',
    role: 'lab_tech',
    fullName: 'Robert Martinez',
    department: 'Laboratory'
  }
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('hospiflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('hospiflow_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hospiflow_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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