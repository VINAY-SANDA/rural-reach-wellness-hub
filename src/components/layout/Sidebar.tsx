
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, PillIcon, Users, FileText, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'AI Health Chat', path: '/chat', icon: MessageSquare },
    { name: 'Voice Assistant', path: '/voice', icon: Mic },
    { name: 'Medications', path: '/medications', icon: PillIcon },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Health Bulletin', path: '/bulletin', icon: FileText },
  ];

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r transform transition-transform duration-200 ease-in-out",
      isOpen ? "translate-x-0" : "-translate-x-full",
      "md:relative md:translate-x-0"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center justify-center">
            <span className="font-heading font-bold text-2xl text-wellness-700">Rural Reach</span>
          </Link>
          <div className="text-center text-sm text-muted-foreground">Wellness Hub</div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <li key={item.name}>
                  <Link to={item.path}>
                    <Button 
                      variant={isActive ? "default" : "ghost"} 
                      className={cn(
                        "w-full justify-start",
                        isActive ? "bg-wellness-600 text-white hover:bg-wellness-700" : ""
                      )}
                    >
                      <Icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <div className="text-center text-sm text-muted-foreground">
            <span>© 2025 Rural Reach</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
