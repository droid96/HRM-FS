import { Calendar as CalendarIcon, Plus, Bell, Cake, Heart, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { Calendar } from '../ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Reminder {
  id: string;
  date: Date;
  title: string;
  time: string;
  type: 'personal' | 'work';
  category?: 'birthday' | 'anniversary' | 'meeting' | 'deadline' | 'general';
}

export function EventsReminders() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([
    // Personal Reminders - Birthdays
    {
      id: 'p1',
      date: new Date(2025, 10, 10), // Nov 10 - TODAY
      title: 'Steve\'s 50th Birthday',
      time: 'All Day',
      type: 'personal',
      category: 'birthday',
    },
    {
      id: 'p2',
      date: new Date(2025, 10, 15), // Nov 15
      title: 'Sarah Johnson\'s Birthday',
      time: 'All Day',
      type: 'personal',
      category: 'birthday',
    },
    {
      id: 'p3',
      date: new Date(2025, 10, 22), // Nov 22
      title: 'Rahul Sharma\'s Birthday',
      time: 'All Day',
      type: 'personal',
      category: 'birthday',
    },
    // Personal Reminders - Work Anniversaries
    {
      id: 'p4',
      date: new Date(2025, 10, 12), // Nov 12
      title: 'Amit Kumar - 5 Year Work Anniversary',
      time: 'All Day',
      type: 'personal',
      category: 'anniversary',
    },
    {
      id: 'p5',
      date: new Date(2025, 10, 20), // Nov 20
      title: 'Priya Patel - 3 Year Work Anniversary',
      time: 'All Day',
      type: 'personal',
      category: 'anniversary',
    },
    // Work Reminders
    {
      id: 'w1',
      date: new Date(2025, 10, 10), // Nov 10 - TODAY
      title: 'Submit quarterly reports',
      time: '2:00 PM',
      type: 'work',
      category: 'deadline',
    },
    {
      id: 'w2',
      date: new Date(2025, 10, 10), // Nov 10 - TODAY
      title: 'Team sync meeting',
      time: '4:30 PM',
      type: 'work',
      category: 'meeting',
    },
    {
      id: 'w3',
      date: new Date(2025, 10, 10), // Nov 10 - TODAY
      title: 'Review performance metrics',
      time: '5:00 PM',
      type: 'work',
      category: 'meeting',
    },
    {
      id: 'w4',
      date: new Date(2025, 10, 12), // Nov 12
      title: 'Project deadline',
      time: '11:59 PM',
      type: 'work',
      category: 'deadline',
    },
    {
      id: 'w5',
      date: new Date(2025, 10, 15), // Nov 15
      title: 'Client presentation',
      time: '10:00 AM',
      type: 'work',
      category: 'meeting',
    },
    {
      id: 'w6',
      date: new Date(2025, 10, 18), // Nov 18
      title: 'Budget planning session',
      time: '3:00 PM',
      type: 'work',
      category: 'meeting',
    },
  ]);

  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    time: '',
    type: 'work' as 'personal' | 'work',
  });

  const personalReminders = reminders.filter(r => r.type === 'personal');
  const workReminders = reminders.filter(r => r.type === 'work');

  const hasReminder = (day: Date) => {
    return reminders.some((reminder) => reminder.date.toDateString() === day.toDateString());
  };

  const handleAddReminder = () => {
    if (newReminder.title && date) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        date: date,
        title: newReminder.title,
        time: newReminder.time,
        type: newReminder.type,
        category: 'general',
      };
      setReminders([...reminders, reminder]);
      setNewReminder({ title: '', time: '', type: 'work' });
      setIsAddingReminder(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b6fd9]/90 to-[#5da3ff]/90 flex items-center justify-center shadow-md">
            <CalendarIcon className="w-7 h-7 text-white drop-shadow-sm" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Events & Reminders</h2>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">View and manage all company events</p>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#5856D6] flex items-center justify-center shadow-md">
              <CalendarIcon className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-card-foreground">Calendar</h3>
              <p className="text-sm text-muted-foreground font-medium">Select a date to view details</p>
            </div>
          </div>
          <Dialog open={isAddingReminder} onOpenChange={setIsAddingReminder}>
            <DialogTrigger asChild>
              <button className="w-8 h-8 rounded-lg bg-[#007AFF]/15 hover:bg-[#007AFF]/25 flex items-center justify-center transition-all border border-[#007AFF]/40">
                <Plus className="w-4 h-4 text-primary" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-xl border-border">
              <DialogHeader>
                <DialogTitle>Add New Reminder</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title">Reminder Title</Label>
                  <Input
                    id="title"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                    placeholder="Team meeting"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newReminder.type} onValueChange={(value: 'personal' | 'work') => setNewReminder({ ...newReminder, type: value })}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">Work Reminder</SelectItem>
                      <SelectItem value="personal">Personal Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button onClick={handleAddReminder} className="flex-1">
                    Add Reminder
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingReminder(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-xl border border-border bg-background/30"
            modifiers={{
              hasReminder: (day) => hasReminder(day),
            }}
            modifiersStyles={{
              hasReminder: {
                backgroundColor: 'hsl(var(--primary))',
                color: 'white',
                fontWeight: 'bold',
              },
            }}
          />
        </div>
      </div>

      {/* Personal Reminders Section */}
      <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#FF3B30] flex items-center justify-center shadow-md">
            <Heart className="w-6 h-6 text-white drop-shadow-sm" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-card-foreground">Personal Reminders</h3>
            <p className="text-sm text-muted-foreground font-medium">Birthdays & Work Anniversaries</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Birthdays */}
          {personalReminders.filter(r => r.category === 'birthday').length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                <Cake className="w-4 h-4" />
                Employee Birthdays
              </h4>
              <div className="space-y-2">
                {personalReminders
                  .filter(r => r.category === 'birthday')
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((reminder) => (
                    <div
                      key={reminder.id}
                      className="flex items-start justify-between p-3 rounded-xl bg-[#FF3B30]/8 border border-[#FF3B30]/20 hover:bg-[#FF3B30]/12 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#FF3B30] mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-card-foreground">{reminder.title}</p>
                          <p className="text-sm text-muted-foreground font-medium mt-0.5">
                            {reminder.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <Cake className="w-5 h-5 text-[#FF3B30]" />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Work Anniversaries */}
          {personalReminders.filter(r => r.category === 'anniversary').length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Work Anniversaries
              </h4>
              <div className="space-y-2">
                {personalReminders
                  .filter(r => r.category === 'anniversary')
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((reminder) => (
                    <div
                      key={reminder.id}
                      className="flex items-start justify-between p-3 rounded-xl bg-[#5856D6]/8 border border-[#5856D6]/20 hover:bg-[#5856D6]/12 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#5856D6] mt-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-card-foreground">{reminder.title}</p>
                          <p className="text-sm text-muted-foreground font-medium mt-0.5">
                            {reminder.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <Heart className="w-5 h-5 text-[#5856D6]" />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Work Reminders Section */}
      <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#007AFF] flex items-center justify-center shadow-md">
            <Briefcase className="w-6 h-6 text-white drop-shadow-sm" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-card-foreground">Work Reminders</h3>
            <p className="text-sm text-muted-foreground font-medium">Meetings, Deadlines & Tasks</p>
          </div>
        </div>

        <div className="space-y-2">
          {workReminders.length > 0 ? (
            workReminders
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-start justify-between p-3 rounded-xl bg-[#007AFF]/8 border border-[#007AFF]/20 hover:bg-[#007AFF]/12 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#007AFF] mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-card-foreground">{reminder.title}</p>
                      <p className="text-sm text-muted-foreground font-medium mt-0.5">
                        {reminder.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} {reminder.time && `at ${reminder.time}`}
                      </p>
                    </div>
                  </div>
                  <Bell className="w-5 h-5 text-[#007AFF]" />
                </div>
              ))
          ) : (
            <div className="py-8 text-center">
              <Briefcase className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No work reminders</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
