import { 
  Home,
  Calendar, 
  Mail, 
  DollarSign, 
  FileText, 
  LogOut, 
  Settings,
  CheckCircle,
  Database,
  UserCheck,
  UserX,
  Target,
  Award,
  BarChart3,
  Clock
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export function Sidebar({ activePage, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Home', id: 'dashboard' },
    { icon: CheckCircle, label: 'Attendance', id: 'attendance' },
    { icon: Clock, label: 'Timesheets', id: 'timesheets' },
    { icon: Target, label: 'Goals', id: 'goals' },
    { icon: Award, label: 'Performance Review', id: 'performance-review' },
    { icon: BarChart3, label: 'Metrics', id: 'metrics' },
    { icon: UserCheck, label: 'Onboarding', id: 'onboarding' },
    { icon: UserX, label: 'Deboarding', id: 'deboarding' },
    { icon: null, label: 'Employee List', id: 'employee-list', customIcon: true },
    { icon: Calendar, label: 'Events & Reminders', id: 'events' },
    { icon: FileText, label: 'Documents', id: 'documents' },
    { icon: Database, label: 'Master Database', id: 'master-database' },
  ];

  return (
    <aside className="w-64 h-screen bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border flex flex-col">
      <div className="p-5 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#5da3ff]/90 to-[#8b6fd9]/90 flex items-center justify-center shadow-md">
          <Home className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
        <span className="font-semibold text-xl text-sidebar-foreground">HR Portal</span>
      </div>
      
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 transition-all ${
              activePage === item.id
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                : 'text-sidebar-foreground hover:bg-sidebar-accent/50 font-medium'
            }`}
          >
            {item.customIcon ? (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="2.5" fill="currentColor" opacity="0.9" />
                <circle cx="17" cy="7" r="2.5" fill="currentColor" opacity="0.9" />
                <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.9" />
                <circle cx="7" cy="17" r="2.5" fill="currentColor" opacity="0.9" />
                <circle cx="17" cy="17" r="2.5" fill="currentColor" opacity="0.9" />
              </svg>
            ) : (
              <item.icon className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border space-y-0.5">
        <button 
          onClick={() => onNavigate('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium ${
            activePage === 'settings'
              ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
              : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  );
}