import { Calendar, PartyPopper, Briefcase, Mail, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export function UpcomingEvents() {
  const [emailSent, setEmailSent] = useState<{ [key: string]: boolean }>({});

  const personalEvents = [
    {
      id: 'pe1',
      title: '🎉 Steve\'s 50th Birthday',
      date: 'Oct 16, 2025',
      time: '12:00 PM',
      attendees: 35,
      type: 'personal',
      actualDate: new Date(2025, 9, 16), // October 16, 2025
    },
    {
      id: 'pe2',
      title: '💐 Sarah\'s 5th Anniversary',
      date: 'Oct 20, 2025',
      time: 'All Day',
      attendees: 15,
      type: 'personal',
      actualDate: new Date(2025, 9, 20), // October 20, 2025
    },
  ];

  // Check for personal events at midnight and send email notification to the celebrant
  useEffect(() => {
    const checkAndSendEmails = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      personalEvents.forEach(event => {
        const eventDate = new Date(event.actualDate.getFullYear(), event.actualDate.getMonth(), event.actualDate.getDate());
        
        // Check if today is the event date and email hasn't been sent
        if (eventDate.getTime() === today.getTime() && !emailSent[event.id]) {
          // Extract person's name from title (e.g., "🎉 Steve's 50th Birthday" -> "Steve")
          const personName = event.title.split("'")[0].replace(/🎉|💐/g, '').trim();
          
          // Simulate sending email notification to the celebrant
          console.log(`🎉 Sending celebration email to: ${personName}`);
          console.log(`📧 Email sent at 12:00 AM`);
          
          if (event.title.includes('Birthday')) {
            console.log(`Subject: Happy Birthday ${personName}! 🎂`);
            console.log(`Message: Wishing you a wonderful birthday filled with joy and happiness!`);
          } else if (event.title.includes('Anniversary')) {
            console.log(`Subject: Congratulations on your work anniversary ${personName}! 🎊`);
            console.log(`Message: Congratulations on completing another successful year with us!`);
          }
          
          // Mark as sent
          setEmailSent(prev => ({ ...prev, [event.id]: true }));
          
          // In a real application, this would call an API to send emails
          // sendCelebrationEmail(personName, event);
        }
      });
    };

    // Check immediately on component mount
    checkAndSendEmails();

    // Set up interval to check every hour (or at midnight)
    const interval = setInterval(checkAndSendEmails, 1000 * 60 * 60); // Check every hour

    return () => clearInterval(interval);
  }, [emailSent]);

  // Function to manually trigger email notification (for testing)
  const sendTestNotification = (event: any) => {
    const personName = event.title.split("'")[0].replace(/🎉|💐/g, '').trim();
    console.log(`📧 Manual Test: Sending celebration email to ${personName}`);
    setEmailSent(prev => ({ ...prev, [event.id]: true }));
    alert(`Celebration email sent to ${personName} for: ${event.title}`);
  };

  const workEvents = [
    {
      title: 'Team Building Activity',
      date: 'Oct 18, 2025',
      time: '10:00 AM',
      attendees: 45,
      type: 'work',
    },
    {
      title: 'Q4 Performance Review',
      date: 'Oct 25, 2025',
      time: '2:00 PM',
      attendees: 120,
      type: 'work',
    },
    {
      title: 'New Employee Orientation',
      date: 'Oct 28, 2025',
      time: '9:00 AM',
      attendees: 12,
      type: 'work',
    },
    {
      title: 'Annual Company Meeting',
      date: 'Nov 5, 2025',
      time: '1:00 PM',
      attendees: 248,
      type: 'work',
    },
  ];

  return (
    <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#FF9500] flex items-center justify-center shadow-md">
          <Calendar className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-card-foreground">Upcoming Events</h3>
          <p className="text-sm text-muted-foreground font-medium">Scheduled company events and meetings</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Personal Events Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <PartyPopper className="w-4 h-4 text-destructive" />
            <h4 className="text-sm font-semibold text-foreground">Personal Celebrations</h4>
          </div>
          <div className="space-y-2">
            {personalEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl border-2 border-[#FF2D55]/30 bg-[#FF2D55]/5 hover:bg-[#FF2D55]/10 transition-colors shadow-sm"
              >
                <div className="w-11 h-11 rounded-lg bg-[#FF2D55] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <PartyPopper className="w-5.5 h-5.5 text-white drop-shadow-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium text-card-foreground">{event.title}</h5>
                    {emailSent[event.id] && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
                        <Mail className="w-3 h-3 text-green-600 dark:text-green-400" />
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">Email Sent</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {event.date} • {event.time}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    {emailSent[event.id] 
                      ? '✓ Celebration email sent to the celebrant at 12:00 AM' 
                      : '📧 Celebration email will be sent to the celebrant at 12:00 AM on event day'}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-card-foreground">{event.attendees}</p>
                  <p className="text-xs text-muted-foreground mb-2">attendees</p>
                  {!emailSent[event.id] && (
                    <button
                      onClick={() => sendTestNotification(event)}
                      className="text-xs px-2 py-1 rounded-md bg-destructive/20 hover:bg-destructive/30 text-destructive font-medium transition-colors"
                    >
                      Test Email
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Events Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Work Events</h4>
          </div>
          <div className="space-y-2">
            {workEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl border border-border hover:bg-accent/5 transition-colors shadow-sm"
              >
                <div className="w-11 h-11 rounded-lg bg-[#007AFF] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Calendar className="w-5.5 h-5.5 text-white drop-shadow-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-card-foreground mb-1">{event.title}</h5>
                  <p className="text-sm text-muted-foreground font-medium">
                    {event.date} • {event.time}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-card-foreground">{event.attendees}</p>
                  <p className="text-xs text-muted-foreground">attendees</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}