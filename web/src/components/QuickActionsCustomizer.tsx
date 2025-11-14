import { Settings2, Check } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import * as Icons from 'lucide-react';

export interface QuickAction {
  id: string;
  icon: string;
  label: string;
  color: string;
}

// Fixed 5 actions only
export const ALL_AVAILABLE_ACTIONS: QuickAction[] = [
  { id: 'clock-in-out', icon: 'Clock', label: 'Clock In/Out', color: 'bg-[#007AFF]' },
  { id: 'pending-approvals', icon: 'ClipboardCheck', label: 'Pending Approvals', color: 'bg-[#FF9500]' },
  { id: 'leave-approval', icon: 'FileText', label: 'Leave Approval', color: 'bg-[#34C759]' },
  { id: 'onboarding', icon: 'UserCheck', label: 'Onboarding', color: 'bg-[#5856D6]' },
  { id: 'deboarding-status', icon: 'UserX', label: 'Deboarding', color: 'bg-[#FF3B30]' },
];

interface QuickActionsCustomizerProps {
  selectedActions: QuickAction[];
  onUpdateActions: (actions: QuickAction[]) => void;
}

export function QuickActionsCustomizer({ selectedActions, onUpdateActions }: QuickActionsCustomizerProps) {
  const [open, setOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<QuickAction[]>(selectedActions);

  const toggleAction = (action: QuickAction) => {
    const isSelected = tempSelected.some(a => a.id === action.id);
    if (isSelected) {
      setTempSelected(tempSelected.filter(a => a.id !== action.id));
    } else {
      if (tempSelected.length < 5) {
        setTempSelected([...tempSelected, action]);
      }
    }
  };

  const handleSave = () => {
    onUpdateActions(tempSelected);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempSelected(selectedActions);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        setTempSelected(selectedActions);
      }
    }}>
      <DialogTrigger asChild>
        <button
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-card/60 backdrop-blur-xl border border-border hover:bg-card/80 transition-all shadow-sm hover:shadow-md"
          aria-label="Customize quick actions"
        >
          <Settings2 className="w-4 h-4 text-foreground" />
          <span className="text-sm font-medium text-foreground">Customize</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-card/95 backdrop-blur-xl border-border max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Customize Quick Actions</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4 flex-1 overflow-hidden flex flex-col">
          <p className="text-sm text-muted-foreground font-medium">
            Select up to 5 actions to display on your dashboard ({tempSelected.length}/5)
          </p>
          <div className="grid grid-cols-3 gap-3 overflow-y-auto pr-2 flex-1">
            {ALL_AVAILABLE_ACTIONS.map((action) => {
              const isSelected = tempSelected.some(a => a.id === action.id);
              const IconComponent = Icons[action.icon as keyof typeof Icons] as React.ElementType;
              
              return (
                <button
                  key={action.id}
                  onClick={() => toggleAction(action)}
                  disabled={!isSelected && tempSelected.length >= 5}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-md scale-105'
                      : 'border-border bg-background/50 hover:border-primary/50 hover:scale-102'
                  } ${!isSelected && tempSelected.length >= 5 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`w-14 h-14 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-2 shadow-md`}>
                    <IconComponent className="w-7 h-7 text-white drop-shadow-sm" />
                  </div>
                  <p className="text-xs text-center text-foreground font-medium leading-tight break-words">{action.label}</p>
                </button>
              );
            })}
          </div>
          <div className="flex gap-2 pt-4 border-t border-border">
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
