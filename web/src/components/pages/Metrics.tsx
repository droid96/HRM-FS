import { BarChart3, TrendingUp, TrendingDown, Award, AlertCircle, Home as HomeIcon, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface EmployeeMetrics {
  employeeId: string;
  employeeName: string;
  department: string;
  leaveDays: number;
  wfhDays: number;
  totalHoursWorked: number;
  expectedHours: number;
  projectHours: { project: string; hours: number }[];
  performanceStatus: 'Outstanding' | 'Ahead' | 'On Target' | 'Below Expectations';
  performanceScore: number;
}

interface ProjectMetrics {
  projectName: string;
  team: { name: string; role: string; hours: number; contribution: number }[];
  totalHours: number;
  progress: number;
  status: 'On Track' | 'At Risk' | 'Delayed';
}

export function Metrics() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  const employeeMetrics: EmployeeMetrics[] = [
    {
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      department: 'Engineering',
      leaveDays: 2,
      wfhDays: 5,
      totalHoursWorked: 176,
      expectedHours: 176,
      projectHours: [
        { project: 'HR Portal Dashboard', hours: 120 },
        { project: 'Mobile App Backend', hours: 56 },
      ],
      performanceStatus: 'Outstanding',
      performanceScore: 98,
    },
    {
      employeeId: 'EMP002',
      employeeName: 'Priya Patel',
      department: 'Design',
      leaveDays: 3,
      wfhDays: 8,
      totalHoursWorked: 168,
      expectedHours: 176,
      projectHours: [
        { project: 'Website Redesign', hours: 95 },
        { project: 'Mobile App UI', hours: 73 },
      ],
      performanceStatus: 'Ahead',
      performanceScore: 92,
    },
    {
      employeeId: 'EMP003',
      employeeName: 'Amit Kumar',
      department: 'Marketing',
      leaveDays: 1.5,
      wfhDays: 3,
      totalHoursWorked: 180,
      expectedHours: 176,
      projectHours: [
        { project: 'Q4 Campaign', hours: 110 },
        { project: 'Social Media Strategy', hours: 70 },
      ],
      performanceStatus: 'Outstanding',
      performanceScore: 95,
    },
    {
      employeeId: 'EMP004',
      employeeName: 'Sarah Wilson',
      department: 'Sales',
      leaveDays: 8,
      wfhDays: 2,
      totalHoursWorked: 120,
      expectedHours: 176,
      projectHours: [
        { project: 'Client Outreach', hours: 80 },
        { project: 'Lead Generation', hours: 40 },
      ],
      performanceStatus: 'Below Expectations',
      performanceScore: 65,
    },
    {
      employeeId: 'EMP005',
      employeeName: 'Michael Chen',
      department: 'Engineering',
      leaveDays: 7,
      wfhDays: 4,
      totalHoursWorked: 130,
      expectedHours: 176,
      projectHours: [
        { project: 'API Development', hours: 90 },
        { project: 'Database Optimization', hours: 40 },
      ],
      performanceStatus: 'Below Expectations',
      performanceScore: 68,
    },
  ];

  const projectMetrics: ProjectMetrics[] = [
    {
      projectName: 'HR Portal Dashboard',
      team: [
        { name: 'Rahul Sharma', role: 'Lead Developer', hours: 120, contribution: 55 },
        { name: 'Neha Gupta', role: 'Frontend Dev', hours: 98, contribution: 45 },
      ],
      totalHours: 218,
      progress: 85,
      status: 'On Track',
    },
    {
      projectName: 'Mobile App Backend',
      team: [
        { name: 'Rahul Sharma', role: 'Backend Dev', hours: 56, contribution: 35 },
        { name: 'Arjun Reddy', role: 'Backend Dev', hours: 75, contribution: 47 },
        { name: 'Kavya Singh', role: 'DevOps', hours: 29, contribution: 18 },
      ],
      totalHours: 160,
      progress: 60,
      status: 'On Track',
    },
    {
      projectName: 'Website Redesign',
      team: [
        { name: 'Priya Patel', role: 'Lead Designer', hours: 95, contribution: 60 },
        { name: 'Rohan Kumar', role: 'UI Designer', hours: 63, contribution: 40 },
      ],
      totalHours: 158,
      progress: 75,
      status: 'On Track',
    },
    {
      projectName: 'Q4 Campaign',
      team: [
        { name: 'Amit Kumar', role: 'Marketing Lead', hours: 110, contribution: 65 },
        { name: 'Jessica Lee', role: 'Content Writer', hours: 59, contribution: 35 },
      ],
      totalHours: 169,
      progress: 45,
      status: 'At Risk',
    },
  ];

  const outstandingPerformers = employeeMetrics.filter(e => 
    e.performanceStatus === 'Outstanding' || e.performanceStatus === 'Ahead'
  ).sort((a, b) => b.performanceScore - a.performanceScore);

  const underperformers = employeeMetrics.filter(e => 
    e.performanceStatus === 'Below Expectations'
  ).sort((a, b) => b.leaveDays - a.leaveDays);

  const getPerformanceColor = (status: string) => {
    switch (status) {
      case 'Outstanding': return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30';
      case 'Ahead': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'On Target': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30';
      case 'Below Expectations': return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30';
      default: return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30';
      case 'At Risk': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30';
      case 'Delayed': return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30';
      default: return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5856D6] to-[#b24bf3] flex items-center justify-center shadow-md">
            <BarChart3 className="w-7 h-7 text-white drop-shadow-sm" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Metrics</h2>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">Employee and project performance metrics</p>
          </div>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="This Month">This Month</SelectItem>
            <SelectItem value="Last Month">Last Month</SelectItem>
            <SelectItem value="Last Quarter">Last Quarter</SelectItem>
            <SelectItem value="This Year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Outstanding Performers */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h3 className="text-xl font-semibold text-foreground">Outstanding Performers</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outstandingPerformers.map((employee) => (
            <div key={employee.employeeId} className="bg-gradient-to-br from-green-500/5 to-blue-500/5 border border-green-500/20 backdrop-blur-xl rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#34C759] to-[#007AFF] flex items-center justify-center text-white font-medium">
                    {employee.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{employee.employeeName}</h4>
                    <p className="text-xs text-muted-foreground font-medium">{employee.department}</p>
                  </div>
                </div>
                <Badge className={`${getPerformanceColor(employee.performanceStatus)} border`}>
                  {employee.performanceStatus}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center p-2 bg-card/60 rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground font-medium mb-1">Score</div>
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400">{employee.performanceScore}%</div>
                </div>
                <div className="text-center p-2 bg-card/60 rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground font-medium mb-1">Hours</div>
                  <div className="text-lg font-semibold text-foreground">{employee.totalHoursWorked}h</div>
                </div>
                <div className="text-center p-2 bg-card/60 rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground font-medium mb-1">WFH</div>
                  <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{employee.wfhDays}d</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-xs text-muted-foreground font-medium">
                  {employee.totalHoursWorked >= employee.expectedHours ? 'Meeting' : 'Exceeding'} expectations
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Underperformers */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <h3 className="text-xl font-semibold text-foreground">Requires Attention</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {underperformers.map((employee) => (
            <div key={employee.employeeId} className="bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20 backdrop-blur-xl rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF3B30] to-[#FF9500] flex items-center justify-center text-white font-medium">
                    {employee.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{employee.employeeName}</h4>
                    <p className="text-xs text-muted-foreground font-medium">{employee.department}</p>
                  </div>
                </div>
                <Badge className={`${getPerformanceColor(employee.performanceStatus)} border`}>
                  {employee.performanceStatus}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center p-2 bg-card/60 rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground font-medium mb-1">Leave</div>
                  <div className="text-lg font-semibold text-red-600 dark:text-red-400">{employee.leaveDays}d</div>
                </div>
                <div className="text-center p-2 bg-card/60 rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground font-medium mb-1">Hours</div>
                  <div className="text-lg font-semibold text-orange-600 dark:text-orange-400">{employee.totalHoursWorked}h</div>
                </div>
                <div className="text-center p-2 bg-card/60 rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground font-medium mb-1">Target</div>
                  <div className="text-lg font-semibold text-foreground">{employee.expectedHours}h</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-xs text-muted-foreground font-medium">
                  {employee.expectedHours - employee.totalHoursWorked}h below target
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Employee Metrics */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Employee Attendance & Performance</h3>
        <div className="space-y-4">
          {employeeMetrics.map((employee) => (
            <div key={employee.employeeId} className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white font-medium text-sm">
                    {employee.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{employee.employeeName}</h4>
                    <p className="text-xs text-muted-foreground font-medium">{employee.employeeId} • {employee.department}</p>
                  </div>
                </div>
                <Badge className={`${getPerformanceColor(employee.performanceStatus)} border`}>
                  {employee.performanceStatus}
                </Badge>
              </div>

              <div className="grid grid-cols-5 gap-4 mb-4">
                <div className="text-center p-3 bg-accent/50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    <div className="text-xs text-muted-foreground font-medium">Leave Days</div>
                  </div>
                  <div className="text-xl font-semibold text-foreground">{employee.leaveDays}</div>
                </div>
                <div className="text-center p-3 bg-accent/50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <HomeIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <div className="text-xs text-muted-foreground font-medium">WFH Days</div>
                  </div>
                  <div className="text-xl font-semibold text-foreground">{employee.wfhDays}</div>
                </div>
                <div className="text-center p-3 bg-accent/50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                    <div className="text-xs text-muted-foreground font-medium">Total Hours</div>
                  </div>
                  <div className="text-xl font-semibold text-foreground">{employee.totalHoursWorked}h</div>
                </div>
                <div className="text-center p-3 bg-accent/50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    <div className="text-xs text-muted-foreground font-medium">Expected</div>
                  </div>
                  <div className="text-xl font-semibold text-foreground">{employee.expectedHours}h</div>
                </div>
                <div className="text-center p-3 bg-accent/50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <div className="text-xs text-muted-foreground font-medium">Status</div>
                  </div>
                  <div className={`text-sm font-semibold mt-1 ${
                    employee.totalHoursWorked >= employee.expectedHours 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-orange-600 dark:text-orange-400'
                  }`}>
                    {employee.totalHoursWorked >= employee.expectedHours ? 'On Target' : 'Behind'}
                  </div>
                </div>
              </div>

              {/* Project Hours */}
              <div className="p-4 bg-accent/30 border border-border rounded-xl">
                <h5 className="text-sm font-semibold text-foreground mb-3">Hours by Project</h5>
                <div className="space-y-2">
                  {employee.projectHours.map((project, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm text-foreground font-medium">{project.project}</span>
                      </div>
                      <span className="text-sm font-semibold text-primary">{project.hours}h</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Metrics */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Project Performance</h3>
        <div className="space-y-4">
          {projectMetrics.map((project, idx) => (
            <div key={idx} className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground">{project.projectName}</h4>
                  <p className="text-sm text-muted-foreground font-medium mt-1">
                    {project.team.length} team {project.team.length === 1 ? 'member' : 'members'} • {project.totalHours}h total
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${getProjectStatusColor(project.status)} border`}>
                    {project.status}
                  </Badge>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground font-medium">Progress</div>
                    <div className="text-lg font-semibold text-primary">{project.progress}%</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#007AFF] to-[#5856D6] rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Team Members Bar Chart */}
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-foreground mb-3">Team Contribution (Hours Worked)</h5>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={project.team}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      tickLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <YAxis 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      tickLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="hours" fill="#007AFF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Team Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {project.team.map((member, memberIdx) => (
                  <div key={memberIdx} className="p-3 bg-accent/30 border border-border rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white text-xs font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{member.name}</div>
                        <div className="text-xs text-muted-foreground font-medium">{member.role}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground font-medium">Hours</div>
                        <div className="text-sm font-semibold text-primary">{member.hours}h</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-medium">Contribution</div>
                        <div className="text-sm font-semibold text-foreground">{member.contribution}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
