import { FileText, Calendar, Clock, User, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface LeaveApplication {
  id: string;
  employeeName: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface LeaveApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeaveApprovalDialog({ open, onOpenChange }: LeaveApprovalDialogProps) {
  const [applications, setApplications] = useState<LeaveApplication[]>([
    {
      id: '1',
      employeeName: 'Rahul Sharma',
      employeeId: 'EMP001',
      leaveType: 'Sick Leave',
      startDate: 'Nov 15, 2025',
      endDate: 'Nov 17, 2025',
      days: 3,
      reason: 'Medical treatment required for fever and flu symptoms.',
      status: 'pending',
    },
    {
      id: '2',
      employeeName: 'Priya Patel',
      employeeId: 'EMP002',
      leaveType: 'Casual Leave',
      startDate: 'Nov 20, 2025',
      endDate: 'Nov 22, 2025',
      days: 3,
      reason: 'Family function to attend in hometown.',
      status: 'pending',
    },
    {
      id: '3',
      employeeName: 'Amit Singh',
      employeeId: 'EMP003',
      leaveType: 'Annual Leave',
      startDate: 'Dec 1, 2025',
      endDate: 'Dec 10, 2025',
      days: 10,
      reason: 'Vacation with family to Goa.',
      status: 'pending',
    },
  ]);

  const handleApprove = (id: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: 'approved' as const } : app
      )
    );
    const app = applications.find(a => a.id === id);
    toast.success(`Leave approved for ${app?.employeeName}`);
  };

  const handleReject = (id: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: 'rejected' as const } : app
      )
    );
    const app = applications.find(a => a.id === id);
    toast.error(`Leave rejected for ${app?.employeeName}`);
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'Sick Leave': return 'bg-[#FF3B30]';
      case 'Casual Leave': return 'bg-[#007AFF]';
      case 'Annual Leave': return 'bg-[#34C759]';
      default: return 'bg-[#5856D6]';
    }
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Leave Approval ({pendingApplications.length} Pending)
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {pendingApplications.length > 0 ? (
            pendingApplications.map((application) => (
              <div
                key={application.id}
                className="bg-background/50 border border-border rounded-xl p-5 space-y-4"
              >
                {/* Employee Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{application.employeeName}</h4>
                      <p className="text-sm text-muted-foreground font-medium">{application.employeeId}</p>
                    </div>
                  </div>
                  <Badge className={`${getLeaveTypeColor(application.leaveType)} text-white`}>
                    {application.leaveType}
                  </Badge>
                </div>

                {/* Leave Details */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Start Date</p>
                      <p className="text-sm text-foreground font-medium">{application.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">End Date</p>
                      <p className="text-sm text-foreground font-medium">{application.endDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Duration</p>
                      <p className="text-sm text-foreground font-medium">{application.days} days</p>
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Reason:</p>
                  <p className="text-sm text-foreground">{application.reason}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => handleApprove(application.id)}
                    className="flex-1 gap-2 bg-[#34C759] hover:bg-[#34C759]/90"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(application.id)}
                    variant="destructive"
                    className="flex-1 gap-2"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No pending leave applications</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
