import { QuickActions } from '../QuickActions';
import { QuickActionsCustomizer, QuickAction } from '../QuickActionsCustomizer';
import { Home, Users } from 'lucide-react';

interface DashboardProps {
  widgets: Record<string, boolean>;
  quickActions: QuickAction[];
  onUpdateQuickActions: (actions: QuickAction[]) => void;
  onNavigate?: (page: string, tab?: string) => void;
}

export function Dashboard({ widgets, quickActions, onUpdateQuickActions, onNavigate }: DashboardProps) {
  // Mock data for WFH employees
  const wfhEmployees = [
    { id: 'EMP001', name: 'Rahul Sharma', department: 'Engineering' },
    { id: 'EMP002', name: 'Priya Patel', department: 'Design' },
    { id: 'EMP005', name: 'Michael Chen', department: 'Engineering' },
    { id: 'EMP007', name: 'Jessica Lee', department: 'Marketing' },
  ];

  return (
    <>
      {/* Quick Actions */}
      {widgets.quickActions && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
            <QuickActionsCustomizer 
              selectedActions={quickActions}
              onUpdateActions={onUpdateQuickActions}
            />
          </div>
          <QuickActions actions={quickActions} onNavigate={onNavigate} />
        </div>
      )}

      {/* Work From Home Widget */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">Employees Working From Home Today</h2>
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center shadow-md">
              <Home className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
            <div>
              <p className="text-3xl font-semibold text-foreground">{wfhEmployees.length}</p>
              <p className="text-sm text-muted-foreground font-medium">employees working remotely</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {wfhEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center gap-3 p-3 bg-accent/50 border border-border rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{employee.name}</p>
                  <p className="text-xs text-muted-foreground font-medium truncate">{employee.department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}