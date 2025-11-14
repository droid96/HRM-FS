import { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, MapPin } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface Event {
  id: string;
  date: Date;
  title: string;
  time: string;
  location?: string;
  description?: string;
  color: string;
}

export function CalendarWidget() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      date: new Date(2025, 9, 16), // Oct 16 - TODAY
      title: '🎉 Steve\'s 50th Birthday',
      time: '12:00 PM',
      location: 'Team Lunch',
      description: 'Celebrating 50 years and 15 years with the company!',
      color: 'purple',
    },
    {
      id: '2',
      date: new Date(2025, 9, 18), // Oct 18
      title: 'Team Building Activity',
      time: '10:00 AM',
      location: 'Conference Room A',
      color: 'cyan',
    },
    {
      id: '3',
      date: new Date(2025, 9, 25), // Oct 25
      title: 'Q4 Performance Review',
      time: '2:00 PM',
      location: 'Main Office',
      color: 'purple',
    },
    {
      id: '4',
      date: new Date(2025, 9, 28), // Oct 28
      title: 'New Employee Orientation',
      time: '9:00 AM',
      location: 'Training Room',
      color: 'blue',
    },
  ]);

  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    location: '',
    description: '',
  });

  const selectedDateEvents = events.filter(
    (event) => date && event.date.toDateString() === date.toDateString()
  );

  const hasEvent = (day: Date) => {
    return events.some((event) => event.date.toDateString() === day.toDateString());
  };

  const handleAddEvent = () => {
    if (newEvent.title && date) {
      const event: Event = {
        id: Date.now().toString(),
        date: date,
        title: newEvent.title,
        time: newEvent.time,
        location: newEvent.location,
        description: newEvent.description,
        color: 'blue',
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', time: '', location: '', description: '' });
      setIsAddingEvent(false);
    }
  };

  const colorClasses = {
    cyan: 'border-l-4 border-l-[#4da6ff] bg-[#4da6ff]/8',
    purple: 'border-l-4 border-l-[#8b6fd9] bg-[#8b6fd9]/8',
    blue: 'border-l-4 border-l-[#5da3ff] bg-[#5da3ff]/8',
    pink: 'border-l-4 border-l-[#ff6b9d] bg-[#ff6b9d]/8',
    green: 'border-l-4 border-l-[#66d966] bg-[#66d966]/8',
  };

  return (
    <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#5856D6] flex items-center justify-center shadow-md">
            <CalendarIcon className="w-6 h-6 text-white drop-shadow-sm" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-card-foreground">Calendar</h3>
            <p className="text-sm text-muted-foreground font-medium">Manage your events and reminders</p>
          </div>
        </div>
        <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
          <DialogTrigger asChild>
            <button className="w-8 h-8 rounded-lg bg-[#007AFF]/15 hover:bg-[#007AFF]/25 flex items-center justify-center transition-all border border-[#007AFF]/40">
              <Plus className="w-4 h-4 text-primary" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-xl border-border">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Team meeting"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="Conference Room A"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Add details about the event..."
                  className="mt-1.5"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleAddEvent} className="flex-1">
                  Add Event
                </Button>
                <Button variant="outline" onClick={() => setIsAddingEvent(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-xl border border-border bg-background/30"
            modifiers={{
              hasEvent: (day) => hasEvent(day),
            }}
            modifiersStyles={{
              hasEvent: {
                backgroundColor: 'hsl(var(--primary))',
                color: 'white',
                fontWeight: 'bold',
              },
            }}
          />
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-card-foreground">
            {date ? date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a date'}
          </h4>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-2">
              {selectedDateEvents.map((event) => (
                <div
                  key={event.id}
                  className={`p-4 rounded-xl ${colorClasses[event.color as keyof typeof colorClasses] || colorClasses.blue} border border-border`}
                >
                  <h5 className="font-medium text-card-foreground mb-2">{event.title}</h5>
                  <div className="space-y-1">
                    {event.time && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {event.time}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-8 text-center">No events scheduled for this day</p>
          )}
        </div>
      </div>
    </div>
  );
}