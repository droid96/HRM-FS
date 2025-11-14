# HR Portal Dashboard - Complete Source Code

This is a complete iOS-inspired HR Portal built with React, TypeScript, and Tailwind CSS featuring dark mode, customizable widgets, employee lifecycle management, and automated workflows.

## Project Structure

```
├── App.tsx
├── styles/
│   └── globals.css
├── components/
│   ├── Sidebar.tsx
│   ├── DarkModeToggle.tsx
│   ├── MetricCards.tsx
│   ├── QuickActions.tsx
│   ├── QuickActionsCustomizer.tsx
│   ├── WidgetCustomizer.tsx
│   ├── CalendarWidget.tsx
│   ├── UpcomingEvents.tsx
│   └── pages/
│       ├── Dashboard.tsx
│       ├── EmployeeList.tsx
│       ├── MasterDatabase.tsx
│       ├── Onboarding.tsx
│       ├── Deboarding.tsx
│       ├── EventsReminders.tsx
│       ├── Attendance.tsx
│       ├── Chat.tsx
│       ├── Email.tsx
│       ├── Payroll.tsx
│       ├── Documents.tsx
│       └── Settings.tsx
```

---

## File: `/App.tsx`

```tsx
import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DarkModeToggle } from './components/DarkModeToggle';
import { WidgetCustomizer } from './components/WidgetCustomizer';
import { QuickAction, ALL_AVAILABLE_ACTIONS } from './components/QuickActionsCustomizer';
import { Dashboard } from './components/pages/Dashboard';
import { EmployeeList } from './components/pages/EmployeeList';
import { MasterDatabase } from './components/pages/MasterDatabase';
import { Onboarding } from './components/pages/Onboarding';
import { Deboarding } from './components/pages/Deboarding';
import { EventsReminders } from './components/pages/EventsReminders';
import { Attendance } from './components/pages/Attendance';
import { Chat } from './components/pages/Chat';
import { Email } from './components/pages/Email';
import { Payroll } from './components/pages/Payroll';
import { Documents } from './components/pages/Documents';
import { Settings } from './components/pages/Settings';

const DEFAULT_WIDGETS = {
  quickActions: true,
  metrics: true,
  upcomingEvents: true,
  calendar: true,
};

const DEFAULT_QUICK_ACTIONS = ALL_AVAILABLE_ACTIONS.slice(0, 6);

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
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

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  const handleLogout = () => {
    // Clear any user data and redirect
    localStorage.clear();
    window.location.href = 'about:blank';
  };

  const getPageTitle = () => {
    switch (activePage) {
      case 'dashboard': return 'Dashboard';
      case 'employee-list': return 'Employee List';
      case 'master-database': return 'Master Database';
      case 'onboarding': return 'Onboarding';
      case 'deboarding': return 'Deboarding';
      case 'events': return 'Events & Reminders';
      case 'attendance': return 'Attendance';
      case 'chat': return 'Chat';
      case 'email': return 'Email';
      case 'payroll': return 'Payroll';
      case 'documents': return 'Documents';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
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
        return <Dashboard widgets={widgets} quickActions={quickActions} onUpdateQuickActions={handleUpdateQuickActions} />;
      case 'employee-list':
        return <EmployeeList />;
      case 'master-database':
        return <MasterDatabase />;
      case 'onboarding':
        return <Onboarding />;
      case 'deboarding':
        return <Deboarding />;
      case 'events':
        return <EventsReminders />;
      case 'attendance':
        return <Attendance />;
      case 'chat':
        return <Chat />;
      case 'email':
        return <Email />;
      case 'payroll':
        return <Payroll />;
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
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl font-semibold text-foreground mb-2">{getPageTitle()}</h1>
              {getPageDescription() && (
                <p className="text-muted-foreground font-medium">{getPageDescription()}</p>
              )}
            </div>
            <div className="flex gap-2">
              {activePage === 'dashboard' && (
                <WidgetCustomizer widgets={widgets} onToggleWidget={handleToggleWidget} />
              )}
              <DarkModeToggle />
            </div>
          </div>

          {/* Page Content */}
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
```

---

## File: `/styles/globals.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@custom-variant dark (&:is(.dark *));

:root {
  --font-size: 16px;
  
  /* Apple iOS Light Theme */
  --background: #f5f5f7;
  --foreground: #1d1d1f;
  --card: rgba(255, 255, 255, 0.8);
  --card-foreground: #1d1d1f;
  --popover: rgba(255, 255, 255, 0.95);
  --popover-foreground: #1d1d1f;
  --primary: #007AFF;
  --primary-foreground: #ffffff;
  --secondary: #f5f5f7;
  --secondary-foreground: #1d1d1f;
  --muted: #e5e5e7;
  --muted-foreground: #86868b;
  --accent: #007AFF;
  --accent-foreground: #ffffff;
  --destructive: #ff3b30;
  --destructive-foreground: #ffffff;
  --border: rgba(0, 0, 0, 0.1);
  --input: transparent;
  --input-background: rgba(142, 142, 147, 0.12);
  --switch-background: #e5e5e7;
  --font-weight-medium: 600;
  --font-weight-normal: 400;
  --ring: #007AFF;
  --chart-1: #007AFF;
  --chart-2: #5856d6;
  --chart-3: #af52de;
  --chart-4: #34c759;
  --chart-5: #ff9500;
  --radius: 0.75rem;
  --neon-cyan: #00f5ff;
  --neon-blue: #1e90ff;
  --neon-purple: #b24bf3;
  --neon-pink: #ff006e;
  --neon-green: #39ff14;
  --neon-orange: #ff6b35;
  --sidebar: rgba(255, 255, 255, 0.8);
  --sidebar-foreground: #1d1d1f;
  --sidebar-primary: #007AFF;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: rgba(0, 122, 255, 0.1);
  --sidebar-accent-foreground: #007AFF;
  --sidebar-border: rgba(0, 0, 0, 0.1);
  --sidebar-ring: #007AFF;
}

.dark {
  /* Apple iOS Dark Theme */
  --background: #000000;
  --foreground: #f5f5f7;
  --card: rgba(28, 28, 30, 0.8);
  --card-foreground: #f5f5f7;
  --popover: rgba(28, 28, 30, 0.95);
  --popover-foreground: #f5f5f7;
  --primary: #0a84ff;
  --primary-foreground: #ffffff;
  --secondary: #1c1c1e;
  --secondary-foreground: #f5f5f7;
  --muted: #2c2c2e;
  --muted-foreground: #98989d;
  --accent: #0a84ff;
  --accent-foreground: #ffffff;
  --destructive: #ff453a;
  --destructive-foreground: #ffffff;
  --border: rgba(255, 255, 255, 0.15);
  --input: rgba(255, 255, 255, 0.1);
  --input-background: rgba(118, 118, 128, 0.24);
  --switch-background: #39393d;
  --ring: #0a84ff;
  --chart-1: #0a84ff;
  --chart-2: #5e5ce6;
  --chart-3: #bf5af2;
  --chart-4: #30d158;
  --chart-5: #ff9f0a;
  --neon-cyan: #00f5ff;
  --neon-blue: #1e90ff;
  --neon-purple: #b24bf3;
  --neon-pink: #ff006e;
  --neon-green: #39ff14;
  --neon-orange: #ff6b35;
  --sidebar: rgba(28, 28, 30, 0.8);
  --sidebar-foreground: #f5f5f7;
  --sidebar-primary: #0a84ff;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: rgba(10, 132, 255, 0.15);
  --sidebar-accent-foreground: #0a84ff;
  --sidebar-border: rgba(255, 255, 255, 0.15);
  --sidebar-ring: #0a84ff;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-neon-cyan: var(--neon-cyan);
  --color-neon-blue: var(--neon-blue);
  --color-neon-purple: var(--neon-purple);
  --color-neon-pink: var(--neon-pink);
  --color-neon-green: var(--neon-green);
  --color-neon-orange: var(--neon-orange);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
    font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/**
 * Base typography. This is not applied to elements which have an ancestor with a Tailwind text class.
 */
@layer base {
  :where(:not(:has([class*=" text-"]), :not(:has([class^="text-"])))) {
    h1 {
      font-size: var(--text-2xl);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h2 {
      font-size: var(--text-xl);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h3 {
      font-size: var(--text-lg);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    h4 {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    p {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }

    label {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    button {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      line-height: 1.5;
    }

    input {
      font-size: var(--text-base);
      font-weight: var(--font-weight-normal);
      line-height: 1.5;
    }
  }
}

html {
  font-size: var(--font-size);
}
```

---

## Components

Due to length, I'll continue with the component files in the next sections...

### File: `/components/Sidebar.tsx`

[Due to character limits, continuing in next message - this file contains the navigation sidebar code]

---

## Required Dependencies

This project requires the following npm packages:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "lucide-react": "latest",
    "sonner": "^2.0.3",
    "@radix-ui/react-dialog": "latest",
    "@radix-ui/react-switch": "latest",
    "@radix-ui/react-select": "latest",
    "@radix-ui/react-label": "latest",
    "@radix-ui/react-tabs": "latest"
  }
}
```

## Instructions for ChatGPT/Claude to Host

1. This is a React + TypeScript + Tailwind CSS project
2. All components use shadcn/ui components (Dialog, Switch, Select, Button, Input, etc.)
3. The app uses localStorage for persisting user preferences
4. Dark mode is fully functional and toggleable
5. All pages are client-side routed through the main App component

Please create a working preview with all files properly structured!
