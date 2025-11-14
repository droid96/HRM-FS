import { Bell } from 'lucide-react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Badge } from './ui/badge';

interface Notification {
  id: string;
  type: 'clock' | 'reminder' | 'holiday' | 'announcement' | 'goal';
  title: string;
  message: string;
  time: string;
  date: string;
}

export function NotificationBell() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'clock',
      title: '⏰ Clock In Reminder',
      message: 'Don\'t forget to clock in for today! It\'s important to track your work hours.',
      time: '8:45 AM',
      date: today,
    },
    {
      id: '2',
      type: 'clock',
      title: '⏰ Clock Out Reminder',
      message: 'Remember to clock out at the end of your shift today.',
      time: '4:30 PM',
      date: today,
    },
    {
      id: '3',
      type: 'goal',
      title: '🎯 Goal Reminder: Complete HR Portal Dashboard',
      message: 'Your goal "Complete HR Portal Dashboard" is due on November 20, 2025. You have 9 days remaining.',
      time: '9:00 AM',
      date: today,
    },
    {
      id: '4',
      type: 'goal',
      title: '🎯 Goal Alert: Design Mobile App UI - Due Soon!',
      message: 'Your goal "Design Mobile App UI" is due in 4 days (November 15, 2025). Please make sure to complete it on time.',
      time: '9:00 AM',
      date: today,
    },
    {
      id: '5',
      type: 'reminder',
      title: '📋 Important: Performance Review Due',
      message: 'Q4 performance reviews are due by end of week. Please complete all pending reviews urgently.',
      time: '9:00 AM',
      date: today,
    },
    {
      id: '6',
      type: 'holiday',
      title: '🎊 Last Minute Announcement: Diwali Holiday',
      message: 'Office will be closed on November 1st and 2nd for Diwali celebrations. Plan your work accordingly.',
      time: '9:30 AM',
      date: today,
    },
    {
      id: '7',
      type: 'reminder',
      title: '⚠️ Urgent: Team Meeting in 30 minutes',
      message: 'Don\'t miss the quarterly planning meeting at 10:00 AM in Conference Room A.',
      time: '9:30 AM',
      date: today,
    },
    {
      id: '8',
      type: 'reminder',
      title: '📌 Reminder: Submit Timesheets',
      message: 'Last day to submit timesheets for this week. Submit before 5:00 PM today.',
      time: '10:00 AM',
      date: today,
    },
    {
      id: '9',
      type: 'announcement',
      title: '🎉 Team Birthday Today!',
      message: 'Steve is celebrating his 50th birthday today. Don\'t forget to wish him!',
      time: '10:30 AM',
      date: today,
    },
    {
      id: '10',
      type: 'holiday',
      title: '📢 Upcoming Holiday: Guru Nanak Jayanti',
      message: 'Office will remain closed on November 15th for Guru Nanak Jayanti.',
      time: '11:00 AM',
      date: today,
    },
    {
      id: '11',
      type: 'reminder',
      title: '🔔 Important: Leave Approvals Pending',
      message: 'You have 5 leave approval requests pending. Please review them at your earliest convenience.',
      time: '11:30 AM',
      date: today,
    },
    {
      id: '12',
      type: 'reminder',
      title: '📧 Reminder: Onboarding Approvals Needed',
      message: 'There are 3 onboarding requests waiting for your approval. Check the Onboarding section.',
      time: '12:00 PM',
      date: today,
    },
  ]);

  const getNotificationColor = (type: string) => {
    switch(type) {
      case 'clock': return 'border-l-[#007AFF]';
      case 'reminder': return 'border-l-[#FF9500]';
      case 'holiday': return 'border-l-[#FF3B30]';
      case 'announcement': return 'border-l-[#5856D6]';
      case 'goal': return 'border-l-[#34C759]';
      default: return 'border-l-[#007AFF]';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative w-10 h-10 rounded-xl bg-card/60 backdrop-blur-xl border border-border hover:bg-card/80 transition-all shadow-sm hover:shadow-md flex items-center justify-center group">
          <Bell className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
          {notifications.length > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[#FF3B30] hover:bg-[#FF3B30] text-white text-xs">
              {notifications.length}
            </Badge>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 bg-card/95 backdrop-blur-xl border-border" align="end">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {notifications.length} new
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground font-medium">{today}</p>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="p-2 space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border-l-4 ${getNotificationColor(notification.type)} bg-background/50 hover:bg-background/80 transition-all cursor-pointer`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-sm text-foreground">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    {notification.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground font-medium">No notifications for today</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}