import { Settings as SettingsIcon, User, Bell, Lock, Shield, UserPlus, Trash2, Edit, Code, Database, RefreshCw, AlertTriangle, Terminal } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function Settings() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@company.com', role: 'Admin', status: 'Active', access: 'Full Access' },
    { id: 2, name: 'HR Manager', email: 'hr.manager@company.com', role: 'HR', status: 'Active', access: 'Limited Access' },
    { id: 3, name: 'HR Assistant', email: 'hr.assistant@company.com', role: 'HR', status: 'Active', access: 'Limited Access' },
  ]);

  // Mock user role - change this to 'developer' or 'admin' to see developer options
  const currentUserRole = 'developer'; // or 'admin', 'hr', 'user'
  const isDeveloper = currentUserRole === 'developer' || currentUserRole === 'admin';

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9b7cd9]/90 to-[#7b4dbd]/90 flex items-center justify-center shadow-md">
          <SettingsIcon className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground font-medium">Manage account, users and administration</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          {isDeveloper && <TabsTrigger value="developer">Developer</TabsTrigger>}
        </TabsList>

        <TabsContent value="general" className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Profile Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john.doe@company.com" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input id="department" placeholder="Human Resources" className="mt-1.5" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotif">Email Notifications</Label>
                <p className="text-sm text-muted-foreground font-medium">Receive email updates about events and announcements</p>
              </div>
              <Switch id="emailNotif" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="eventReminders">Event Reminders</Label>
                <p className="text-sm text-muted-foreground font-medium">Get notified about upcoming events</p>
              </div>
              <Switch id="eventReminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="leaveApprovals">Leave Approvals</Label>
                <p className="text-sm text-muted-foreground font-medium">Notifications for leave request approvals</p>
              </div>
              <Switch id="leaveApprovals" />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Security</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="••••••••" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="••••••••" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" className="mt-1.5" />
            </div>
            <Button>Update Password</Button>
          </div>
        </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
        {/* HR User Management & Access Control */}
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">HR Login Administration</h3>
                <p className="text-sm text-muted-foreground font-medium">Manage HR users and access levels</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger>
                <Button className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Add HR User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border-border">
                <DialogHeader>
                  <DialogTitle>Add New HR User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="userName">Full Name</Label>
                    <Input id="userName" placeholder="John Doe" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="userEmail">Email Address</Label>
                    <Input id="userEmail" type="email" placeholder="john.doe@company.com" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="userRole">Role & Access Level</Label>
                    <Select>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select role..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin - Full Access</SelectItem>
                        <SelectItem value="hr">HR - Limited Access</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-2 font-medium">
                      Admins have full access. HR users have limited access to sensitive data.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="tempPassword">Temporary Password</Label>
                    <Input id="tempPassword" type="password" placeholder="••••••••" className="mt-1.5" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1">Create User</Button>
                    <Button variant="outline" className="flex-1">Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-muted/30 rounded-xl p-4 mb-4">
            <h4 className="font-medium text-sm text-foreground mb-2">Access Level Permissions:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">Admin:</span>
                  <span className="text-muted-foreground font-medium ml-1">Full access to all modules, user management, settings, payroll, and sensitive employee data</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-foreground">HR:</span>
                  <span className="text-muted-foreground font-medium ml-1">Limited access - can view employees, manage attendance, handle leave requests. Cannot access payroll or admin settings</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left p-3 font-medium text-sm text-foreground">Name</th>
                  <th className="text-left p-3 font-medium text-sm text-foreground">Email</th>
                  <th className="text-left p-3 font-medium text-sm text-foreground">Role</th>
                  <th className="text-left p-3 font-medium text-sm text-foreground">Access Level</th>
                  <th className="text-left p-3 font-medium text-sm text-foreground">Status</th>
                  <th className="text-left p-3 font-medium text-sm text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border/50">
                    <td className="p-3 text-sm text-foreground font-medium">{user.name}</td>
                    <td className="p-3 text-sm text-muted-foreground font-medium">{user.email}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.role === 'Admin'
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                          : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground font-medium">{user.access}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400">
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </TabsContent>

        {/* Developer Tab */}
        {isDeveloper && (
          <TabsContent value="developer" className="space-y-6">
            {/* Developer Administration */}
            <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Developer Administration</h3>
                  <p className="text-sm text-muted-foreground font-medium">Manage development and system updates</p>
                </div>
              </div>

              {/* Warning Banner */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Developer Access Only</h4>
                    <p className="text-sm text-muted-foreground font-medium">
                      These settings are for developers only. Making changes here can affect the entire application. Proceed with caution.
                    </p>
                  </div>
                </div>
              </div>

              {/* Development Tools */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Database className="w-5 h-5 text-primary" />
                    <h4 className="font-medium text-foreground">Database Management</h4>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium mb-3">
                    Manage database schemas, migrations, and backups
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View Schema</Button>
                    <Button size="sm" variant="outline">Backup DB</Button>
                  </div>
                </div>

                <div className="border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <RefreshCw className="w-5 h-5 text-primary" />
                    <h4 className="font-medium text-foreground">System Updates</h4>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium mb-3">
                    Deploy updates and manage application versions
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Check Updates</Button>
                    <Button size="sm">Deploy</Button>
                  </div>
                </div>
              </div>

              {/* Dashboard Customization */}
              <div className="border-t border-border pt-6">
                <h4 className="font-medium text-foreground mb-4">Dashboard Customization Requests</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-foreground">Add new widget to Dashboard</div>
                      <div className="text-xs text-muted-foreground font-medium">Requested by: HR Manager</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Review</Button>
                      <Button size="sm">Implement</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-foreground">Modify attendance tracking fields</div>
                      <div className="text-xs text-muted-foreground font-medium">Requested by: Admin</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Review</Button>
                      <Button size="sm">Implement</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Logs */}
              <div className="border-t border-border pt-6 mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="w-5 h-5 text-primary" />
                  <h4 className="font-medium text-foreground">System Logs</h4>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 font-mono text-xs">
                  <div className="space-y-1">
                    <div className="text-green-600 dark:text-green-400">[2025-11-05 14:30:21] INFO: User login successful - sarah.johnson@company.com</div>
                    <div className="text-blue-600 dark:text-blue-400">[2025-11-05 14:25:15] INFO: Dashboard widget updated</div>
                    <div className="text-green-600 dark:text-green-400">[2025-11-05 14:20:10] INFO: Email sent successfully to 15 recipients</div>
                    <div className="text-orange-600 dark:text-orange-400">[2025-11-05 14:15:05] WARN: High API usage detected</div>
                    <div className="text-green-600 dark:text-green-400">[2025-11-05 14:10:00] INFO: Database backup completed</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">View Full Logs</Button>
                  <Button size="sm" variant="outline">Export Logs</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
