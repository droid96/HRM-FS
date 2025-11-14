import { Clock, Calendar, Users, ChevronDown, ChevronUp, Download, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// Employee time sheet data
interface EmployeeTimeSheet {
  employeeId: string;
  name: string;
  department: string;
  dailyHours: { date: string; clockIn: string; clockOut: string; breakTime: number; hoursWorked: number; project: string }[];
  totalMonthHours: number;
  expectedHours: number;
  leaveTaken: number;
  wfhDays: number;
}

export function Timesheet() {
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('November 2025');

  // Individual employee time sheets
  const employeeTimeSheets: EmployeeTimeSheet[] = [
    {
      employeeId: 'EMP001',
      name: 'Rahul Sharma',
      department: 'Engineering',
      dailyHours: [
        { date: 'Nov 1', clockIn: '09:00 AM', clockOut: '06:15 PM', breakTime: 45, hoursWorked: 8.5, project: 'HR Portal Dashboard' },
        { date: 'Nov 2', clockIn: '09:05 AM', clockOut: '06:00 PM', breakTime: 60, hoursWorked: 8.17, project: 'HR Portal Dashboard' },
        { date: 'Nov 3', clockIn: '08:55 AM', clockOut: '06:30 PM', breakTime: 45, hoursWorked: 8.83, project: 'Mobile App Backend' },
        { date: 'Nov 4', clockIn: '09:10 AM', clockOut: '06:05 PM', breakTime: 50, hoursWorked: 8.08, project: 'Mobile App Backend' },
        { date: 'Nov 5', clockIn: '09:00 AM', clockOut: 'In Progress', breakTime: 0, hoursWorked: 0, project: 'HR Portal Dashboard' },
        { date: 'Nov 6', clockIn: '09:05 AM', clockOut: '06:10 PM', breakTime: 50, hoursWorked: 8.25, project: 'HR Portal Dashboard' },
        { date: 'Nov 7', clockIn: '09:00 AM', clockOut: '06:20 PM', breakTime: 45, hoursWorked: 8.58, project: 'Mobile App Backend' },
        { date: 'Nov 8', clockIn: '08:55 AM', clockOut: '06:15 PM', breakTime: 60, hoursWorked: 8.5, project: 'HR Portal Dashboard' },
      ],
      totalMonthHours: 58.91,
      expectedHours: 176,
      leaveTaken: 2,
      wfhDays: 1,
    },
    {
      employeeId: 'EMP002',
      name: 'Priya Patel',
      department: 'Design',
      dailyHours: [
        { date: 'Nov 1', clockIn: '09:15 AM', clockOut: '06:00 PM', breakTime: 60, hoursWorked: 7.75, project: 'Website Redesign' },
        { date: 'Nov 2', clockIn: '09:00 AM', clockOut: '06:10 PM', breakTime: 45, hoursWorked: 8.42, project: 'Website Redesign' },
        { date: 'Nov 3', clockIn: '09:20 AM', clockOut: '06:15 PM', breakTime: 50, hoursWorked: 8.08, project: 'Mobile App UI' },
        { date: 'Nov 4', clockIn: '09:05 AM', clockOut: '06:00 PM', breakTime: 55, hoursWorked: 8.0, project: 'Mobile App UI' },
        { date: 'Nov 5', clockIn: '09:10 AM', clockOut: 'In Progress', breakTime: 0, hoursWorked: 0, project: 'Website Redesign' },
        { date: 'Nov 6', clockIn: '09:00 AM', clockOut: '06:05 PM', breakTime: 45, hoursWorked: 8.33, project: 'Mobile App UI' },
        { date: 'Nov 7', clockIn: '09:15 AM', clockOut: '06:10 PM', breakTime: 50, hoursWorked: 8.08, project: 'Website Redesign' },
        { date: 'Nov 8', clockIn: '09:05 AM', clockOut: '06:00 PM', breakTime: 60, hoursWorked: 7.92, project: 'Mobile App UI' },
      ],
      totalMonthHours: 56.58,
      expectedHours: 176,
      leaveTaken: 3,
      wfhDays: 0,
    },
    {
      employeeId: 'EMP003',
      name: 'Amit Kumar',
      department: 'Marketing',
      dailyHours: [
        { date: 'Nov 1', clockIn: '09:00 AM', clockOut: '06:20 PM', breakTime: 45, hoursWorked: 8.58, project: 'Q4 Campaign' },
        { date: 'Nov 2', clockIn: '08:55 AM', clockOut: '06:25 PM', breakTime: 60, hoursWorked: 8.5, project: 'Q4 Campaign' },
        { date: 'Nov 3', clockIn: '09:10 AM', clockOut: '06:00 PM', breakTime: 50, hoursWorked: 8.0, project: 'Social Media Strategy' },
        { date: 'Nov 4', clockIn: '09:00 AM', clockOut: '06:30 PM', breakTime: 45, hoursWorked: 8.75, project: 'Social Media Strategy' },
        { date: 'Nov 5', clockIn: '09:05 AM', clockOut: 'In Progress', breakTime: 0, hoursWorked: 0, project: 'Q4 Campaign' },
        { date: 'Nov 6', clockIn: '09:00 AM', clockOut: '06:15 PM', breakTime: 50, hoursWorked: 8.42, project: 'Q4 Campaign' },
        { date: 'Nov 7', clockIn: '08:55 AM', clockOut: '06:20 PM', breakTime: 45, hoursWorked: 8.67, project: 'Social Media Strategy' },
        { date: 'Nov 8', clockIn: '09:10 AM', clockOut: '06:10 PM', breakTime: 60, hoursWorked: 8.0, project: 'Q4 Campaign' },
      ],
      totalMonthHours: 58.92,
      expectedHours: 176,
      leaveTaken: 1.5,
      wfhDays: 2,
    },
    {
      employeeId: 'EMP004',
      name: 'Sneha Desai',
      department: 'Sales',
      dailyHours: [
        { date: 'Nov 1', clockIn: '08:50 AM', clockOut: '06:00 PM', breakTime: 45, hoursWorked: 8.42, project: 'Client Outreach' },
        { date: 'Nov 2', clockIn: '09:00 AM', clockOut: '06:15 PM', breakTime: 50, hoursWorked: 8.42, project: 'Client Outreach' },
        { date: 'Nov 3', clockIn: '09:05 AM', clockOut: '06:10 PM', breakTime: 55, hoursWorked: 8.17, project: 'Lead Generation' },
        { date: 'Nov 4', clockIn: '08:55 AM', clockOut: '06:20 PM', breakTime: 45, hoursWorked: 8.67, project: 'Lead Generation' },
        { date: 'Nov 5', clockIn: '09:00 AM', clockOut: 'In Progress', breakTime: 0, hoursWorked: 0, project: 'Client Outreach' },
        { date: 'Nov 6', clockIn: '09:10 AM', clockOut: '06:05 PM', breakTime: 50, hoursWorked: 8.08, project: 'Lead Generation' },
        { date: 'Nov 7', clockIn: '09:00 AM', clockOut: '06:25 PM', breakTime: 60, hoursWorked: 8.42, project: 'Client Outreach' },
        { date: 'Nov 8', clockIn: '08:55 AM', clockOut: '06:15 PM', breakTime: 45, hoursWorked: 8.5, project: 'Lead Generation' },
      ],
      totalMonthHours: 58.68,
      expectedHours: 176,
      leaveTaken: 1,
      wfhDays: 3,
    },
  ];

  // Function to calculate hours per project for an employee
  const getProjectHours = (employee: EmployeeTimeSheet) => {
    const projectHours: { [key: string]: number } = {};
    
    employee.dailyHours.forEach(day => {
      if (day.project && day.hoursWorked > 0) {
        if (!projectHours[day.project]) {
          projectHours[day.project] = 0;
        }
        projectHours[day.project] += day.hoursWorked;
      }
    });
    
    return Object.entries(projectHours).map(([project, hours]) => ({
      project,
      hours: Number(hours.toFixed(2))
    }));
  };

  // Calculate total hours across all employees
  const totalHoursAllEmployees = employeeTimeSheets.reduce((acc, emp) => acc + emp.totalMonthHours, 0);
  const avgHoursPerEmployee = totalHoursAllEmployees / employeeTimeSheets.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950/20 via-slate-950 to-blue-950/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center shadow-md">
          <Clock className="w-7 h-7 text-white drop-shadow-sm" />
        </div>
        <div>
          <h2 className="text-4xl font-semibold text-white">Employee Timesheets</h2>
          <p className="text-slate-400">Track employee work hours and project allocation</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Total Employees</span>
          </div>
          <p className="text-3xl font-semibold text-foreground">{employeeTimeSheets.length}</p>
          <p className="text-sm text-muted-foreground font-medium mt-1">Active timesheets</p>
        </div>

        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Total Hours</span>
          </div>
          <p className="text-3xl font-semibold text-foreground">{totalHoursAllEmployees.toFixed(1)}h</p>
          <p className="text-sm text-muted-foreground font-medium mt-1">This month</p>
        </div>

        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Avg Hours/Employee</span>
          </div>
          <p className="text-3xl font-semibold text-foreground">{avgHoursPerEmployee.toFixed(1)}h</p>
          <p className="text-sm text-muted-foreground font-medium mt-1">This month</p>
        </div>

        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Selected Period</span>
          </div>
          <p className="text-3xl font-semibold text-foreground">{selectedMonth.split(' ')[0]}</p>
          <p className="text-sm text-muted-foreground font-medium mt-1">{selectedMonth.split(' ')[1]}</p>
        </div>
      </div>

      {/* Employee Time Sheets Section */}
      <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Individual Employee Timesheets</h3>
            <p className="text-sm text-muted-foreground font-medium">Detailed breakdown of work hours by employee</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="November 2025">November 2025</SelectItem>
                <SelectItem value="October 2025">October 2025</SelectItem>
                <SelectItem value="September 2025">September 2025</SelectItem>
                <SelectItem value="August 2025">August 2025</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {employeeTimeSheets.map((employee) => (
            <div key={employee.employeeId} className="border border-border rounded-xl overflow-hidden">
              {/* Employee Header */}
              <button
                onClick={() => setExpandedEmployee(expandedEmployee === employee.employeeId ? null : employee.employeeId)}
                className="w-full flex items-center justify-between p-4 hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white font-medium">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-foreground">{employee.name}</div>
                    <div className="text-xs text-muted-foreground font-medium">{employee.employeeId} • {employee.department}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground font-medium">Total Hours (Month)</div>
                    <div className="text-sm font-semibold text-foreground">{employee.totalMonthHours.toFixed(2)}h / {employee.expectedHours}h</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      employee.totalMonthHours >= employee.expectedHours * 0.9 
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                        : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                    }`}>
                      {((employee.totalMonthHours / employee.expectedHours) * 100).toFixed(1)}%
                    </div>
                    {expandedEmployee === employee.employeeId ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Time Sheet Details */}
              {expandedEmployee === employee.employeeId && (
                <div className="border-t border-border bg-accent/5 p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border">
                        <tr>
                          <th className="text-left p-2 text-xs font-medium text-muted-foreground">Date</th>
                          <th className="text-left p-2 text-xs font-medium text-muted-foreground">Clock In</th>
                          <th className="text-left p-2 text-xs font-medium text-muted-foreground">Clock Out</th>
                          <th className="text-left p-2 text-xs font-medium text-muted-foreground">Break (min)</th>
                          <th className="text-left p-2 text-xs font-medium text-muted-foreground">Project</th>
                          <th className="text-left p-2 text-xs font-medium text-muted-foreground">Hours Worked</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employee.dailyHours.map((day, idx) => (
                          <tr key={idx} className="border-b border-border/50">
                            <td className="p-2 text-xs font-medium text-foreground">{day.date}</td>
                            <td className="p-2 text-xs text-muted-foreground font-medium">{day.clockIn}</td>
                            <td className="p-2 text-xs text-muted-foreground font-medium">
                              <span className={day.clockOut === 'In Progress' ? 'text-primary font-medium' : ''}>
                                {day.clockOut}
                              </span>
                            </td>
                            <td className="p-2 text-xs text-muted-foreground font-medium">{day.breakTime || '--'}</td>
                            <td className="p-2 text-xs text-foreground font-medium">
                              <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">
                                {day.project || '--'}
                              </span>
                            </td>
                            <td className="p-2 text-xs font-medium text-foreground">
                              {day.hoursWorked > 0 ? `${day.hoursWorked.toFixed(2)}h` : '--'}
                              {day.hoursWorked > 8 && (
                                <span className="ml-2 px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs">
                                  OT: {(day.hoursWorked - 8).toFixed(2)}h
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Monthly Summary for this employee */}
                  <div className="mt-4 p-3 bg-card/60 backdrop-blur-xl border border-border rounded-lg">
                    <div className="grid grid-cols-5 gap-4 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground font-medium mb-1">Total Hours</div>
                        <div className="text-sm font-semibold text-foreground">{employee.totalMonthHours.toFixed(2)}h</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-medium mb-1">Expected</div>
                        <div className="text-sm font-semibold text-foreground">{employee.expectedHours}h</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-medium mb-1">Leave Taken</div>
                        <div className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                          {employee.leaveTaken} {employee.leaveTaken === 1 ? 'day' : 'days'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-medium mb-1">WFH Days</div>
                        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {employee.wfhDays} {employee.wfhDays === 1 ? 'day' : 'days'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-medium mb-1">Avg Daily</div>
                        <div className="text-sm font-semibold text-foreground">
                          {(employee.totalMonthHours / employee.dailyHours.filter(d => d.hoursWorked > 0).length).toFixed(2)}h
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hours Per Project Breakdown */}
                  <div className="mt-4 p-3 bg-card/60 backdrop-blur-xl border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <h4 className="text-sm font-semibold text-foreground">Hours by Project</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {getProjectHours(employee).map((projectData, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-accent/10 border border-border rounded-lg">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-xs font-medium text-foreground truncate">{projectData.project}</span>
                          </div>
                          <span className="text-xs font-semibold text-primary ml-2">{projectData.hours}h</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
