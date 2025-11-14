import { Target, Plus, Clock, Bell, Trash2, Calendar as CalendarIcon, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';

interface Goal {
  id: string;
  employeeId: string;
  employeeName: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Not Started' | 'In Progress' | 'Completed';
  reminderEnabled: boolean;
  reminderFrequency: 'Daily' | 'Weekly' | 'Before Deadline';
  reminderDays?: number; // Days before deadline
  createdDate: string;
}

export function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      title: 'Complete HR Portal Dashboard',
      description: 'Finish implementing all features of the HR Portal Dashboard including metrics, attendance tracking, and onboarding workflows.',
      dueDate: '2025-11-20',
      priority: 'High',
      status: 'In Progress',
      reminderEnabled: true,
      reminderFrequency: 'Weekly',
      createdDate: '2025-11-01',
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Priya Patel',
      title: 'Design Mobile App UI',
      description: 'Create comprehensive UI designs for the mobile application including all screens and user flows.',
      dueDate: '2025-11-15',
      priority: 'High',
      status: 'In Progress',
      reminderEnabled: true,
      reminderFrequency: 'Daily',
      createdDate: '2025-11-01',
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'Amit Kumar',
      title: 'Q4 Marketing Campaign Launch',
      description: 'Execute the Q4 marketing campaign across all channels including social media, email, and paid advertising.',
      dueDate: '2025-12-01',
      priority: 'Medium',
      status: 'Not Started',
      reminderEnabled: true,
      reminderFrequency: 'Before Deadline',
      reminderDays: 7,
      createdDate: '2025-11-05',
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    priority: 'Medium',
    status: 'Not Started',
    reminderEnabled: false,
    reminderFrequency: 'Weekly',
  });

  const handleAddGoal = () => {
    if (newGoal.employeeName && newGoal.title && newGoal.dueDate) {
      const goal: Goal = {
        id: Date.now().toString(),
        employeeId: `EMP${String(goals.length + 1).padStart(3, '0')}`,
        employeeName: newGoal.employeeName!,
        title: newGoal.title!,
        description: newGoal.description || '',
        dueDate: newGoal.dueDate!,
        priority: newGoal.priority as 'Low' | 'Medium' | 'High',
        status: newGoal.status as 'Not Started' | 'In Progress' | 'Completed',
        reminderEnabled: newGoal.reminderEnabled || false,
        reminderFrequency: newGoal.reminderFrequency as 'Daily' | 'Weekly' | 'Before Deadline',
        reminderDays: newGoal.reminderDays,
        createdDate: new Date().toISOString().split('T')[0],
      };
      setGoals([...goals, goal]);
      setNewGoal({
        priority: 'Medium',
        status: 'Not Started',
        reminderEnabled: false,
        reminderFrequency: 'Weekly',
      });
      setDialogOpen(false);
    }
  };

  const handleUpdateReminder = () => {
    if (selectedGoal) {
      setGoals(goals.map(g => 
        g.id === selectedGoal.id ? selectedGoal : g
      ));
      setReminderDialogOpen(false);
    }
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
  };

  const handleStatusChange = (goalId: string, newStatus: string) => {
    setGoals(goals.map(g => 
      g.id === goalId ? { ...g, status: newStatus as Goal['status'] } : g
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30';
      case 'Medium': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30';
      case 'Low': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30';
      case 'In Progress': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'Not Started': return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center shadow-md">
            <Target className="w-7 h-7 text-white drop-shadow-sm" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Goals</h2>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">Track and manage employee goals</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-br from-[#007AFF] to-[#5856D6] hover:opacity-90">
              <Plus className="w-4 h-4" />
              Add New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Employee Name</Label>
                  <Input
                    placeholder="Enter employee name"
                    value={newGoal.employeeName || ''}
                    onChange={(e) => setNewGoal({ ...newGoal, employeeName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={newGoal.priority} onValueChange={(value) => setNewGoal({ ...newGoal, priority: value as Goal['priority'] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Goal Title</Label>
                <Input
                  placeholder="Enter goal title"
                  value={newGoal.title || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter goal description..."
                  rows={4}
                  value={newGoal.description || ''}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={newGoal.dueDate || ''}
                    onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={newGoal.status} onValueChange={(value) => setNewGoal({ ...newGoal, status: value as Goal['status'] })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddGoal}>Add Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => {
          const daysUntilDue = getDaysUntilDue(goal.dueDate);
          const isOverdue = daysUntilDue < 0;
          const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

          return (
            <div key={goal.id} className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{goal.title}</h3>
                  <p className="text-xs text-muted-foreground font-medium">{goal.employeeName}</p>
                </div>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="p-1.5 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground font-medium mb-4 line-clamp-2">
                {goal.description}
              </p>

              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${getPriorityColor(goal.priority)} border`}>
                  {goal.priority}
                </Badge>
                <Badge className={`${getStatusColor(goal.status)} border`}>
                  {goal.status}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <CalendarIcon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium">
                    Due: {new Date(goal.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                {isOverdue && (
                  <div className="px-2 py-1 bg-red-500/10 rounded-md border border-red-500/30">
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                      Overdue by {Math.abs(daysUntilDue)} {Math.abs(daysUntilDue) === 1 ? 'day' : 'days'}
                    </p>
                  </div>
                )}
                {isDueSoon && !isOverdue && (
                  <div className="px-2 py-1 bg-orange-500/10 rounded-md border border-orange-500/30">
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                      Due in {daysUntilDue} {daysUntilDue === 1 ? 'day' : 'days'}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => {
                    setSelectedGoal(goal);
                    setReminderDialogOpen(true);
                  }}
                >
                  <Bell className={`w-3.5 h-3.5 ${goal.reminderEnabled ? 'text-primary' : ''}`} />
                  {goal.reminderEnabled ? 'Edit Reminder' : 'Set Reminder'}
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Update Status</Label>
                <Select value={goal.status} onValueChange={(value) => handleStatusChange(goal.id, value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reminder Settings Dialog */}
      <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Goal Reminder Settings</DialogTitle>
          </DialogHeader>
          {selectedGoal && (
            <div className="space-y-4 py-4">
              <div className="p-3 bg-accent/50 rounded-lg">
                <p className="font-medium text-foreground">{selectedGoal.title}</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">{selectedGoal.employeeName}</p>
              </div>
              <div className="flex items-center justify-between">
                <Label>Enable Reminders</Label>
                <button
                  onClick={() => setSelectedGoal({ ...selectedGoal, reminderEnabled: !selectedGoal.reminderEnabled })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    selectedGoal.reminderEnabled ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    selectedGoal.reminderEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              {selectedGoal.reminderEnabled && (
                <>
                  <div className="space-y-2">
                    <Label>Reminder Frequency</Label>
                    <Select 
                      value={selectedGoal.reminderFrequency} 
                      onValueChange={(value) => setSelectedGoal({ ...selectedGoal, reminderFrequency: value as Goal['reminderFrequency'] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Before Deadline">Before Deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedGoal.reminderFrequency === 'Before Deadline' && (
                    <div className="space-y-2">
                      <Label>Days Before Deadline</Label>
                      <Input
                        type="number"
                        min="1"
                        max="30"
                        value={selectedGoal.reminderDays || 7}
                        onChange={(e) => setSelectedGoal({ ...selectedGoal, reminderDays: parseInt(e.target.value) })}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setReminderDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateReminder}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
