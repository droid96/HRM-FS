import { Clock, MapPin, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface ClockInOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClockInOutDialog({ open, onOpenChange }: ClockInOutDialogProps) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [location, setLocation] = useState('Fetching location...');
  const [projectName, setProjectName] = useState('');
  const [isClockedIn, setIsClockedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (open && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        () => {
          setLocation('Location access denied');
        }
      );
    }
  }, [open]);

  const handleClockIn = () => {
    if (!projectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }
    setIsClockedIn(true);
    toast.success(`Clocked in at ${currentTime}`);
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    toast.success(`Clocked out at ${currentTime}`);
    onOpenChange(false);
    setProjectName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {/* Time Display */}
          <div className="bg-gradient-to-br from-[#007AFF]/10 to-[#5856D6]/10 rounded-xl p-6 text-center border border-border">
            <p className="text-sm text-muted-foreground font-medium mb-2">Current Time</p>
            <p className="text-4xl font-semibold text-foreground">{currentTime}</p>
            <p className="text-sm text-muted-foreground font-medium mt-2">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              value={location}
              readOnly
              className="bg-muted/50"
            />
          </div>

          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="project" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Project Name *
            </Label>
            <Input
              id="project"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              disabled={isClockedIn}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {!isClockedIn ? (
              <>
                <Button onClick={handleClockIn} className="flex-1">
                  Clock In
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleClockOut} className="w-full bg-[#FF3B30] hover:bg-[#FF3B30]/90">
                Clock Out
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
