import { useState } from 'react';
import { motion, useNavigate } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

export default function Home() {
  // State for tracking active sidebar item
  const [activeSidebarItem, setActiveSidebarItem] = useState('dashboard');
  const navigate = useNavigate();
  
  // Create icon components
  const DashboardIcon = getIcon('LayoutDashboard');
  const BriefcaseIcon = getIcon('Briefcase');
  const UsersIcon = getIcon('Users');
  const FileTextIcon = getIcon('FileText');
  const CalendarIcon = getIcon('Calendar');
  const ClockIcon = getIcon('Clock');
  const SettingsIcon = getIcon('Settings');
  const BellIcon = getIcon('Bell');
  const SearchIcon = getIcon('Search');
  const ChevronRightIcon = getIcon('ChevronRight');
  
  // Mock sidebar navigation items
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'matters', label: 'Matters', icon: BriefcaseIcon },
    { id: 'clients', label: 'Clients', icon: UsersIcon },
    { id: 'documents', label: 'Documents', icon: FileTextIcon },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'time-billing', label: 'Time & Billing', icon: ClockIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon }
  ];
  
  // Function to handle sidebar item click
  const handleSidebarItemClick = (itemId) => {
    
    // Navigation mapping
    const navigationMap = {
      matters: '/matters',
      // Add other routes here as they're implemented
    };
    
    // Navigate if we have a route for this item
    if (navigationMap[itemId]) {
      navigate(navigationMap[itemId]);
    } else {
      toast.info(`Navigating to ${itemId}`, { 
    toast.info(`Navigating to ${itemId}`, { 
      icon: ({ theme, type }) => {
        const NavIcon = sidebarItems.find(item => item.id === itemId)?.icon;
        return NavIcon ? <NavIcon className="h-5 w-5 text-primary" /> : null;
      }
    });
  };
  
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      {/* Mobile search bar */}
      <div className="md:hidden p-4 border-b border-surface-200 dark:border-surface-800">
        <div className="relative">
          <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
          <input 
            type="search"
            placeholder="Search..."
            className="input pl-10 w-full"
          />
        </div>
      </div>
      
      {/* Sidebar/Navigation */}
      <aside className="md:w-64 lg:w-72 shrink-0 border-r border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900">
        {/* Desktop search */}
        <div className="hidden md:block p-4">
          <div className="relative">
            <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
            <input 
              type="search"
              placeholder="Search..."
              className="input pl-10 w-full"
            />
          </div>
        </div>
        
        {/* Navigation links */}
        <nav className="p-2">
          <ul className="space-y-1">
            {sidebarItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => handleSidebarItemClick(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSidebarItem === item.id 
                      ? 'bg-primary text-white' 
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1 font-medium">{item.label}</span>
                  <ChevronRightIcon className={`h-4 w-4 ${activeSidebarItem === item.id ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome to CaseCadence</h1>
              <p className="text-surface-600 dark:text-surface-400">Modern legal practice management</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="btn btn-outline flex items-center gap-2 md:w-auto">
                <BellIcon className="h-4 w-4" />
                <span>Notifications</span>
              </button>
              <button className="btn btn-primary flex items-center gap-2 md:w-auto">
                <BriefcaseIcon className="h-4 w-4" />
                <span>New Matter</span>
              </button>
            </div>
          </header>
          
          {/* Main Feature Component */}
          <MainFeature />
        </div>
      </main>
    </div>
  );
}