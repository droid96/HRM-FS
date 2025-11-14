import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DarkModeToggle } from './components/DarkModeToggle';
import { NotificationBell } from './components/NotificationBell';
import { WidgetCustomizer } from './components/WidgetCustomizer';
import { ProfileDialog } from './components/ProfileDialog';
import { FloatingChatButton } from './components/FloatingChatButton';
import { QuickAction, ALL_AVAILABLE_ACTIONS } from './components/QuickActionsCustomizer';
import { Dashboard } from './components/pages/Dashboard';
import { EmployeeList } from './components/pages/EmployeeList';
import { MasterDatabase } from './components/pages/MasterDatabase';
import { Onboarding } from './components/pages/Onboarding';
import { Deboarding } from './components/pages/Deboarding';
import { EventsReminders } from './components/pages/EventsReminders';
import { Attendance } from './components/pages/Attendance';
import { Timesheet } from './components/pages/Timesheet';
import { Email } from './components/pages/Email';
import { Goals } from './components/pages/Goals';
import { PerformanceReview } from './components/pages/PerformanceReview';
import { Metrics } from './components/pages/Metrics';
import { Documents } from './components/pages/Documents';
import { Settings } from './components/pages/Settings';

const DEFAULT_WIDGETS = {
  quickActions: true,
  metrics: true,
  upcomingEvents: true,
};

const DEFAULT_QUICK_ACTIONS = ALL_AVAILABLE_ACTIONS; // All 5 actions

export default function AdminShell() {
  const [activePage, setActivePage] = useState('dashboard');
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);
  const [widgets, setWidgets] = useState(DEFAULT_WIDGETS);
  const [quickActions, setQuickActions] = useState<QuickAction[]>(DEFAULT_QUICK_ACTIONS);

  // Load preferences from localStorage
  useEffect(() => {
    const savedWidgets = localStorage.getItem('dashboardWidgets');
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }

    const savedQuickActions = localStorage.getItem('quickActions');
    if (savedQuickActions) {
      setQuickActions(JSON.parse(savedQuickActions));
    }
  }, []);

  const handleToggleWidget = (widgetId: string) => {
    const newWidgets = {
      ...widgets,
      [widgetId]: !widgets[widgetId],
    };
    setWidgets(newWidgets);
    localStorage.setItem('dashboardWidgets', JSON.stringify(newWidgets));
  };

  const handleUpdateQuickActions = (actions: QuickAction[]) => {
    setQuickActions(actions);
    localStorage.setItem('quickActions', JSON.stringify(actions));
  };

  const handleNavigate = (page: string, tab?: string) => {
    setActivePage(page);
    // Reset activeTab if no tab is specified (e.g., navigating from sidebar)
    setActiveTab(tab || undefined);
  };

  const handleLogout = () => {
    // Clear any user data and redirect
    localStorage.clear();
    window.location.href = 'about:blank';
  };

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return 'Home';
      case 'employee-list': return 'Employee List';
      case 'master-database': return 'Master Database';
      case 'onboarding': return 'Onboarding';
      case 'deboarding': return 'Deboarding';
      case 'events': return 'Events & Reminders';
      case 'attendance': return 'Attendance';
      case 'timesheets': return 'Timesheets';
      case 'goals': return 'Goals';
      case 'performance-review': return 'Performance Review';
      case 'metrics': return 'Metrics';
      case 'documents': return 'Documents';
      case 'settings': return 'Settings';
      default: return 'Home';
    }
  };

  const getPageDescription = () => {
    switch (activePage) {
      case 'dashboard': return 'Overview of your team\'s performance and metrics';
      default: return '';
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard widgets={widgets} quickActions={quickActions} onUpdateQuickActions={handleUpdateQuickActions} onNavigate={handleNavigate} />;
      case 'employee-list':
        return <EmployeeList />;
      case 'master-database':
        return <MasterDatabase />;
      case 'onboarding':
        return <Onboarding initialTab={activeTab} />;
      case 'deboarding':
        return <Deboarding />;
      case 'events':
        return <EventsReminders />;
      case 'attendance':
        return <Attendance />;
      case 'timesheets':
        return <Timesheet />;
      case 'goals':
        return <Goals />;
      case 'performance-review':
        return <PerformanceReview />;
      case 'metrics':
        return <Metrics />;
      case 'documents':
        return <Documents />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard widgets={widgets} quickActions={quickActions} onUpdateQuickActions={handleUpdateQuickActions} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar activePage={activePage} onNavigate={handleNavigate} onLogout={handleLogout} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Gradient Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#1e90ff]/20 via-[#b24bf3]/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#b24bf3]/20 via-[#00f5ff]/20 to-transparent rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 p-8 max-w-[1600px] mx-auto">
          {/* Header - Dashboard or Active Section Title */}
          {/* Only show header for dashboard and settings - other pages have their own headers with icons */}
          {(activePage === 'dashboard' || activePage === 'settings') && (
            <div className="flex items-start justify-between mb-8">
              {activePage === 'dashboard' ? (
                <div>
                  <h1 className="text-4xl font-semibold text-foreground mb-2">{getPageTitle()}</h1>
                  {getPageDescription() && (
                    <p className="text-muted-foreground font-medium">{getPageDescription()}</p>
                  )}
                </div>
              ) : (
                <div>
                  <h1 className="text-4xl font-semibold text-foreground mb-2">{getPageTitle()}</h1>
                </div>
              )}
              <div className="flex gap-2">
                <NotificationBell />
                <DarkModeToggle />
                <ProfileDialog />
              </div>
            </div>
          )}
          
          {/* Show just the controls for pages with their own headers */}
          {activePage !== 'dashboard' && activePage !== 'settings' && (
            <div className="flex justify-end mb-8">
              <div className="flex gap-2">
                <NotificationBell />
                <DarkModeToggle />
                <ProfileDialog />
              </div>
            </div>
          )}

          {/* Page Content */}
          {renderPage()}
        </div>
      </main>

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
}