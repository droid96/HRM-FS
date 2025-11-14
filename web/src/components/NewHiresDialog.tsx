import { UserPlus, Mail, Calendar, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';

interface NewHire {
  id: string;
  name: string;
  position: string;
  department: string;
  joiningDate: string;
  email: string;
  status: 'pending' | 'onboarding' | 'completed';
}

interface NewHiresDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewHiresDialog({ open, onOpenChange }: NewHiresDialogProps) {
  const [newHires] = useState<NewHire[]>([
    {
      id: '1',
      name: 'Ananya Sharma',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      joiningDate: 'Nov 15, 2025',
      email: 'ananya.sharma@company.com',
      status: 'onboarding',
    },
    {
      id: '2',
      name: 'Rohan Gupta',
      position: 'Product Manager',
      department: 'Product',
      joiningDate: 'Nov 20, 2025',
      email: 'rohan.gupta@company.com',
      status: 'pending',
    },
    {
      id: '3',
      name: 'Priya Iyer',
      position: 'UI/UX Designer',
      department: 'Design',
      joiningDate: 'Nov 12, 2025',
      email: 'priya.iyer@company.com',
      status: 'completed',
    },
    {
      id: '4',
      name: 'Karthik Menon',
      position: 'Data Analyst',
      department: 'Analytics',
      joiningDate: 'Nov 18, 2025',
      email: 'karthik.menon@company.com',
      status: 'onboarding',
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-[#34C759]">Onboarded</Badge>;
      case 'onboarding':
        return <Badge className="bg-[#FF9500]">In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-[#007AFF]">Pending</Badge>;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/30 bg-green-500/5';
      case 'onboarding':
        return 'border-orange-500/30 bg-orange-500/5';
      case 'pending':
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
            <UserPlus className="w-5 h-5 text-primary" />
            New Hires ({newHires.length})
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {newHires.map((hire) => (
            <div
              key={hire.id}
              className={`border rounded-xl p-5 ${getStatusColor(hire.status)}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{hire.name}</h4>
                  <p className="text-sm text-muted-foreground font-medium">{hire.position}</p>
                </div>
                {getStatusBadge(hire.status)}
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium">{hire.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium">Joining: {hire.joiningDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium">{hire.email}</span>
                </div>
              </div>
            </div>
          ))}

          {newHires.length === 0 && (
            <div className="text-center py-12">
              <UserPlus className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No new hires at the moment</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
