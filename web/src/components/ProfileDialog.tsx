import { User, Briefcase, Mail, Hash, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';

interface ProfileDialogProps {
  userName?: string;
  designation?: string;
  employeeId?: string;
  email?: string;
  department?: string;
}

export function ProfileDialog({
  userName = 'Meera Goel',
  designation = 'Chief Executive Officer (CEO)',
  employeeId = 'INT-EMP-5601',
  email = 'meera.goel@introlligent.com',
  department = 'Executive'
}: ProfileDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-card/60 backdrop-blur-xl hover:bg-card transition-all shadow-sm">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white font-medium">
            {userName.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-sm font-medium text-foreground">{userName}</div>
            <div className="text-xs text-muted-foreground font-medium">{designation}</div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-card/95 backdrop-blur-xl border-border">
        <DialogHeader>
          <DialogTitle>Profile Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Profile Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-border">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white text-xl font-medium shadow-lg">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{userName}</h3>
              <p className="text-sm text-muted-foreground font-medium">{designation}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Hash className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium">Employee ID</div>
                <div className="text-sm font-medium text-foreground">{employeeId}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium">Department</div>
                <div className="text-sm font-medium text-foreground">{department}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium">Email</div>
                <div className="text-sm font-medium text-foreground">{email}</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <Button className="flex-1" variant="outline">
              View Full Profile
            </Button>
            <Button className="flex-1">
              Edit Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
