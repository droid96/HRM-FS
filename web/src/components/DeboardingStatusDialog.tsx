import { UserX, CheckCircle, Clock, AlertCircle, Check } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface DeboardingEmployee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  lastWorkingDay: string;
  completionPercentage: number;
  departmentApprovals: {
    department: string;
    approved: boolean;
  }[];
  tasks: {
    name: string;
    completed: boolean;
  }[];
}

interface DeboardingStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeboardingStatusDialog({ open, onOpenChange }: DeboardingStatusDialogProps) {
  const [employees, setEmployees] = useState<DeboardingEmployee[]>([
    {
      id: '1',
      name: 'Vijay Kumar',
      employeeId: 'EMP045',
      department: 'Engineering',
      lastWorkingDay: 'Nov 30, 2025',
      completionPercentage: 75,
      departmentApprovals: [
        { department: 'Engineering', approved: true },
        { department: 'IT', approved: true },
        { department: 'HR', approved: false },
        { department: 'Finance', approved: false },
      ],
      tasks: [
        { name: 'Exit Interview Completed', completed: true },
        { name: 'IT Assets Returned', completed: true },
        { name: 'Knowledge Transfer Done', completed: true },
        { name: 'Final Settlement Pending', completed: false },
      ],
    },
    {
      id: '2',
      name: 'Sneha Reddy',
      employeeId: 'EMP067',
      department: 'Marketing',
      lastWorkingDay: 'Nov 25, 2025',
      completionPercentage: 50,
      departmentApprovals: [
        { department: 'Marketing', approved: true },
        { department: 'IT', approved: false },
        { department: 'HR', approved: false },
        { department: 'Finance', approved: false },
      ],
      tasks: [
        { name: 'Exit Interview Completed', completed: true },
        { name: 'IT Assets Returned', completed: true },
        { name: 'Knowledge Transfer Done', completed: false },
        { name: 'Final Settlement Pending', completed: false },
      ],
    },
    {
      id: '3',
      name: 'Arjun Mehta',
      employeeId: 'EMP089',
      department: 'Sales',
      lastWorkingDay: 'Dec 5, 2025',
      completionPercentage: 25,
      departmentApprovals: [
        { department: 'Sales', approved: true },
        { department: 'IT', approved: false },
        { department: 'HR', approved: false },
        { department: 'Finance', approved: false },
      ],
      tasks: [
        { name: 'Exit Interview Completed', completed: true },
        { name: 'IT Assets Returned', completed: false },
        { name: 'Knowledge Transfer Done', completed: false },
        { name: 'Final Settlement Pending', completed: false },
      ],
    },
  ]);

  const handleApproveDepartment = (employeeId: string, departmentName: string) => {
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === employeeId) {
          const updatedApprovals = emp.departmentApprovals.map(dept =>
            dept.department === departmentName ? { ...dept, approved: true } : dept
          );
          const approvedCount = updatedApprovals.filter(d => d.approved).length;
          const newPercentage = Math.round((approvedCount / updatedApprovals.length) * 100);
          
          return {
            ...emp,
            departmentApprovals: updatedApprovals,
            completionPercentage: newPercentage,
          };
        }
        return emp;
      })
    );
    toast.success(`${departmentName} clearance approved!`);
  };

  const getStatusBadge = (percentage: number) => {
    if (percentage === 100) {
      return <Badge className="bg-[#34C759]">Complete</Badge>;
    } else if (percentage >= 50) {
      return <Badge className="bg-[#FF9500]">In Progress</Badge>;
    } else {
      return <Badge className="bg-[#FF3B30]">Just Started</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserX className="w-5 h-5 text-primary" />
            Deboarding Status ({employees.length} Employees)
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="bg-background/50 border border-border rounded-xl p-5 space-y-4"
            >
              {/* Employee Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">{employee.name}</h4>
                  <p className="text-sm text-muted-foreground font-medium">{employee.employeeId} • {employee.department}</p>
                  <p className="text-xs text-muted-foreground font-medium mt-1">
                    Last Working Day: {employee.lastWorkingDay}
                  </p>
                </div>
                {getStatusBadge(employee.completionPercentage)}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Completion Progress</p>
                  <p className="text-sm font-medium text-primary">{employee.completionPercentage}%</p>
                </div>
                <Progress value={employee.completionPercentage} className="h-2" />
              </div>

              {/* Department Approvals */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Department Clearances:</p>
                <div className="space-y-1.5">
                  {employee.departmentApprovals.map((dept, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-2 rounded-lg ${
                        dept.approved ? 'bg-green-500/10' : 'bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {dept.approved ? (
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <p className={`text-sm font-medium ${
                          dept.approved ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {dept.department}
                        </p>
                      </div>
                      {!dept.approved && (
                        <Button
                          size="sm"
                          onClick={() => handleApproveDepartment(employee.id, dept.department)}
                          className="h-7 px-3 text-xs gap-1.5"
                        >
                          <Check className="w-3 h-3" />
                          Approve
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Checklist */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Deboarding Checklist:</p>
                <div className="space-y-1.5">
                  {employee.tasks.map((task, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        task.completed ? 'bg-green-500/10' : 'bg-muted/30'
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <p className={`text-sm font-medium ${
                        task.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {task.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {employees.length === 0 && (
            <div className="text-center py-12">
              <UserX className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No active deboarding processes</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
