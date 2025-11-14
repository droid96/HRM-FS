import { Settings, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface WidgetCustomizerProps {
  widgets: Record<string, boolean>;
  onToggleWidget: (widgetId: string) => void;
}

export function WidgetCustomizer({ widgets, onToggleWidget }: WidgetCustomizerProps) {
  const [open, setOpen] = useState(false);

  const widgetList = [
    { id: 'quickActions', name: 'Quick Actions', description: 'Fast access to common tasks' },
    { id: 'metrics', name: 'Overview Metrics', description: 'Key performance indicators' },
    { id: 'upcomingEvents', name: 'Upcoming Events', description: 'Scheduled events list' },
    { id: 'calendar', name: 'Calendar', description: 'Interactive event calendar' },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="w-10 h-10 rounded-xl bg-card/60 backdrop-blur-xl border border-border flex items-center justify-center hover:bg-accent/10 transition-all"
          aria-label="Customize dashboard"
        >
          <Settings className="w-5 h-5 text-foreground" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl">Customize Dashboard</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">
            Toggle widgets to customize your dashboard view
          </p>
          <div className="space-y-3">
            {widgetList.map((widget) => (
              <div
                key={widget.id}
                className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex-1">
                  <Label htmlFor={widget.id} className="cursor-pointer">
                    {widget.name}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">{widget.description}</p>
                </div>
                <Switch
                  id={widget.id}
                  checked={widgets[widget.id]}
                  onCheckedChange={() => onToggleWidget(widget.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
