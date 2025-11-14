import * as Icons from 'lucide-react';
import { useState } from 'react';
import { QuickAction } from './QuickActionsCustomizer';
import { ClockInOutDialog } from './ClockInOutDialog';
import { LeaveApprovalDialog } from './LeaveApprovalDialog';
import { DeboardingStatusDialog } from './DeboardingStatusDialog';
import { Badge } from './ui/badge';

interface QuickActionsProps {
  actions: QuickAction[];
  onNavigate?: (page: string, tab?: string) => void;
}

export function QuickActions({ actions, onNavigate }: QuickActionsProps) {
  const [clockDialogOpen, setClockDialogOpen] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [deboardingDialogOpen, setDeboardingDialogOpen] = useState(false);

  // Mock data - in a real app, this would come from props or API
  const analytics = {
    'clock-in-out': { type: 'buttons' },
    'pending-approvals': { pending: 1, inProgress: 2, completed: 1 },
    'leave-approval': { pending: 5 },
    'onboarding': { requests: 3 },
    'deboarding-status': { requests: 2 },
  };

  const handleActionClick = (actionId: string) => {
    switch (actionId) {
      case 'clock-in-out':
        // Don't open dialog for clock in/out
        break;
      case 'pending-approvals':
        if (onNavigate) {
          onNavigate('onboarding', 'pending-approval');
        }
        break;
      case 'deboarding-status':
        setDeboardingDialogOpen(true);
        break;
      case 'leave-approval':
        setLeaveDialogOpen(true);
        break;
      case 'onboarding':
        if (onNavigate) {
          onNavigate('onboarding');
        }
        break;
      default:
        // Handle other actions
        break;
    }
  };

  const handleClockIn = () => {
    if (onNavigate) {
      onNavigate('attendance');
    }
  };

  const handleClockOut = () => {
    if (onNavigate) {
      onNavigate('attendance');
    }
  };

  const getAnalyticsDisplay = (actionId: string) => {
    const data = analytics[actionId as keyof typeof analytics];
    
    if (!data) return null;

    if (actionId === 'clock-in-out' && 'type' in data && data.type === 'buttons') {
      return (
        <div className="mt-3 space-y-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClockIn();
            }}
            className="w-full px-3 py-2 bg-[#34C759]/10 hover:bg-[#34C759]/20 rounded-lg border border-[#34C759]/30 transition-colors"
          >
            <p className="text-sm text-[#34C759] font-medium text-center leading-tight">
              Clock In
            </p>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClockOut();
            }}
            className="w-full px-3 py-2 bg-[#FF9500]/10 hover:bg-[#FF9500]/20 rounded-lg border border-[#FF9500]/30 transition-colors"
          >
            <p className="text-sm text-[#FF9500] font-medium text-center leading-tight">
              Clock Out
            </p>
          </button>
        </div>
      );
    }

    if (actionId === 'pending-approvals' && 'pending' in data) {
      return (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between px-3 py-2 bg-[#FF9500]/10 rounded-lg border border-[#FF9500]/30">
            <span className="text-xs text-muted-foreground font-medium">Pending</span>
            <Badge className="bg-[#FF9500] text-white hover:bg-[#FF9500]">{data.pending}</Badge>
          </div>
          <div className="flex items-center justify-between px-3 py-2 bg-[#007AFF]/10 rounded-lg border border-[#007AFF]/30">
            <span className="text-xs text-muted-foreground font-medium">In Progress</span>
            <Badge className="bg-[#007AFF] text-white hover:bg-[#007AFF]">{data.inProgress}</Badge>
          </div>
          <div className="flex items-center justify-between px-3 py-2 bg-[#34C759]/10 rounded-lg border border-[#34C759]/30">
            <span className="text-xs text-muted-foreground font-medium">Completed</span>
            <Badge className="bg-[#34C759] text-white hover:bg-[#34C759]">{data.completed}</Badge>
          </div>
        </div>
      );
    }

    if (actionId === 'leave-approval' && 'pending' in data) {
      return (
        <div className="mt-3">
          <div className="flex items-center justify-between px-3 py-2 bg-[#FF9500]/10 rounded-lg border border-[#FF9500]/30">
            <span className="text-xs text-muted-foreground font-medium">Pending</span>
            <Badge className="bg-[#FF9500] text-white hover:bg-[#FF9500]">{data.pending}</Badge>
          </div>
        </div>
      );
    }

    if (actionId === 'onboarding' && 'requests' in data) {
      return (
        <div className="mt-3">
          <div className="flex items-center justify-between px-3 py-2 bg-[#5856D6]/10 rounded-lg border border-[#5856D6]/30">
            <span className="text-xs text-muted-foreground font-medium">Active Requests</span>
            <Badge className="bg-[#5856D6] text-white hover:bg-[#5856D6]">{data.requests}</Badge>
          </div>
        </div>
      );
    }

    if (actionId === 'deboarding-status' && 'requests' in data) {
      return (
        <div className="mt-3">
          <div className="flex items-center justify-between px-3 py-2 bg-[#FF3B30]/10 rounded-lg border border-[#FF3B30]/30">
            <span className="text-xs text-muted-foreground font-medium">Active Requests</span>
            <Badge className="bg-[#FF3B30] text-white hover:bg-[#FF3B30]">{data.requests}</Badge>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {actions.map((action) => {
          const IconComponent = Icons[action.icon as keyof typeof Icons] as React.ElementType;
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.id)}
              className="group relative overflow-hidden bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg shadow-sm flex flex-col min-h-[240px]"
            >
              <div className={`w-16 h-16 rounded-2xl ${action.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg relative`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                <IconComponent className="w-8 h-8 text-white drop-shadow-lg relative z-10" />
              </div>
              <p className="text-base text-card-foreground font-semibold text-center mb-2">
                {action.label}
              </p>
              {getAnalyticsDisplay(action.id)}
            </button>
          );
        })}
      </div>

      {/* Dialogs */}
      <ClockInOutDialog open={clockDialogOpen} onOpenChange={setClockDialogOpen} />
      <LeaveApprovalDialog open={leaveDialogOpen} onOpenChange={setLeaveDialogOpen} />
      <DeboardingStatusDialog open={deboardingDialogOpen} onOpenChange={setDeboardingDialogOpen} />
    </>
  );
}