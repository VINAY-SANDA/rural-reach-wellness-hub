
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, Moon, Sun, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    
    navigate('/login');
  };

  const getRoleDisplay = () => {
    switch (userRole) {
      case 'patient':
        return 'Patient';
      case 'doctor':
        return 'Doctor';
      case 'community':
        return 'Service Provider';
      default:
        return 'User';
    }
  };

  const getAvatarFallback = () => {
    switch (userRole) {
      case 'patient':
        return 'P';
      case 'doctor':
        return 'D';
      case 'community':
        return 'SP';
      default:
        return 'U';
    }
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-800 border-b px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
          <Menu className="h-5 w-5" />
        </Button>
        {isMobile && (
          <Link to="/" className="flex items-center">
            <span className="font-heading font-semibold text-xl text-wellness-700">Rural Reach</span>
          </Link>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        
        {userRole && (
          <span className="hidden md:inline-block text-sm font-medium mr-2 text-muted-foreground">
            Logged in as {getRoleDisplay()}
          </span>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link to="/profile" className="w-full">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/settings" className="w-full">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
