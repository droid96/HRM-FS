import { Megaphone, Clock, AlertCircle, Info } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'info' | 'holiday' | 'general';
  date: string;
  time: string;
}

interface AnnouncementsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AnnouncementsDialog({ open, onOpenChange }: AnnouncementsDialogProps) {
  const [announcements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Rain Holiday Declared',
      message: 'Due to heavy rainfall and weather warnings, the office will remain closed today. All employees are advised to work from home.',
      type: 'holiday',
      date: 'Nov 10, 2025',
      time: '7:30 AM',
    },
    {
      id: '2',
      title: 'Team Building Event',
      message: 'Join us for a team building event on November 15th. Details will be shared via email.',
      type: 'info',
      date: 'Nov 8, 2025',
      time: '10:00 AM',
    },
    {
      id: '3',
      title: 'System Maintenance',
      message: 'Our HR portal will undergo scheduled maintenance on November 12th from 12:00 AM to 4:00 AM. Please plan accordingly.',
      type: 'urgent',
      date: 'Nov 7, 2025',
      time: '2:30 PM',
    },
    {
      id: '4',
      title: 'New Parking Policy',
      message: 'The new parking allocation system will be implemented from November 16th. Please update your parking preferences in the settings.',
      type: 'general',
      date: 'Nov 5, 2025',
      time: '9:00 AM',
    },
  ]);

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-[#FF3B30]" />;
      case 'holiday':
        return <Megaphone className="w-5 h-5 text-[#34C759]" />;
      case 'info':
        return <Info className="w-5 h-5 text-[#007AFF]" />;
      default:
        return <Megaphone className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getAnnouncementBadge = (type: string) => {
    switch (type) {
      case 'urgent':
        return <Badge className="bg-[#FF3B30]">Urgent</Badge>;
      case 'holiday':
        return <Badge className="bg-[#34C759]">Holiday</Badge>;
      case 'info':
        return <Badge className="bg-[#007AFF]">Info</Badge>;
      case 'general':
        return <Badge className="bg-[#8E8E93]">General</Badge>;
      default:
        return null;
    }
  };

  const getAnnouncementColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'border-red-500/30 bg-red-500/5';
      case 'holiday':
        return 'border-green-500/30 bg-green-500/5';
      case 'info':
        return 'border-blue-500/30 bg-blue-500/5';
      default:
        return 'border-border bg-background/50';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-primary" />
            Announcements ({announcements.length})
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`border rounded-xl p-5 ${getAnnouncementColor(announcement.type)}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getAnnouncementIcon(announcement.type)}
                  <h4 className="font-semibold text-foreground">{announcement.title}</h4>
                </div>
                {getAnnouncementBadge(announcement.type)}
              </div>

              {/* Message */}
              <p className="text-sm text-foreground mb-3 leading-relaxed">
                {announcement.message}
              </p>

              {/* Timestamp */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{announcement.date} at {announcement.time}</span>
              </div>
            </div>
          ))}

          {announcements.length === 0 && (
            <div className="text-center py-12">
              <Megaphone className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No announcements at the moment</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
