import { 
  CheckCircle, 
  Users, 
  Clock, 
  UserX, 
  Calendar, 
  AlertCircle,
  CheckCheck,
  XCircle,
  Search,
  Filter,
  Download,
  TrendingUp,
  Award,
  UserCheck,
  Bell,
  User
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Employee attendance data
interface AttendanceRecord {
  id: string;
  employeeName: string;
  department: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  checkIn: string;
  checkOut: string;
  approval: 'Approved' | 'Pending' | 'Rejected';
  avatar?: string;
}

interface PendingApproval {
  id: string;
  employeeName: string;
  date: string;
  reason: string;
  requestedChange: string;
}

interface RealtimeClockIn {
  id: string;
  employeeName: string;
  status: 'Checked In' | 'Checked Out';
  time: string;
  avatar?: string;
}

export function Attendance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('today');

  // Summary statistics
  const todayStats = {
    present: 235,
    presentPercentage: 94.8,
    absent: 8,
    absentPercentage: 3.2,
    late: 12,
    latePercentage: 4.8,
    onLeave: 5,
    leavePercentage: 2.0,
    total: 248
  };

  // 7-day attendance trend
  const weeklyTrend = [
    { day: 'Mon', rate: 96.2 },
    { day: 'Tue', rate: 94.8 },
    { day: 'Wed', rate: 95.5 },
    { day: 'Thu', rate: 93.9 },
    { day: 'Fri', rate: 92.1 },
    { day: 'Sat', rate: 88.5 },
    { day: 'Sun', rate: 85.2 }
  ];

  // Department-wise attendance
  const departmentData = [
    { department: 'Engineering', rate: 96.5, count: 58 },
    { department: 'Design', rate: 94.2, count: 24 },
    { department: 'Marketing', rate: 93.1, count: 32 },
    { department: 'Sales', rate: 91.8, count: 45 },
    { department: 'HR', rate: 97.3, count: 12 },
    { department: 'Finance', rate: 95.6, count: 18 }
  ];

  // Real-time clock-ins (live updates)
  const realtimeClockIns: RealtimeClockIn[] = [
    { id: '1', employeeName: 'Rahul Sharma', status: 'Checked In', time: '2 mins ago' },
    { id: '2', employeeName: 'Priya Patel', status: 'Checked In', time: '5 mins ago' },
    { id: '3', employeeName: 'Amit Kumar', status: 'Checked Out', time: '8 mins ago' },
    { id: '4', employeeName: 'Sneha Desai', status: 'Checked In', time: '12 mins ago' },
    { id: '5', employeeName: 'Vikram Singh', status: 'Checked In', time: '15 mins ago' },
    { id: '6', employeeName: 'Ananya Roy', status: 'Checked Out', time: '18 mins ago' }
  ];

  // Pending approvals
  const pendingApprovals: PendingApproval[] = [
    { 
      id: '1', 
      employeeName: 'Karan Mehta', 
      date: 'Nov 11, 2025', 
      reason: 'Forgot to clock out',
      requestedChange: 'Add 6:00 PM clock-out time'
    },
    { 
      id: '2', 
      employeeName: 'Neha Gupta', 
      date: 'Nov 10, 2025', 
      reason: 'System error during check-in',
      requestedChange: 'Mark attendance as present'
    },
    { 
      id: '3', 
      employeeName: 'Arjun Reddy', 
      date: 'Nov 9, 2025', 
      reason: 'Late due to traffic',
      requestedChange: 'Approve late arrival'
    }
  ];

  // Top consistent employees
  const topEmployees = [
    { name: 'Rahul Sharma', attendanceRate: 100, streak: 45 },
    { name: 'Priya Patel', attendanceRate: 99.5, streak: 42 },
    { name: 'Amit Kumar', attendanceRate: 98.8, streak: 38 },
    { name: 'Sneha Desai', attendanceRate: 98.2, streak: 35 },
    { name: 'Vikram Singh', attendanceRate: 97.9, streak: 32 }
  ];

  // Sample attendance records
  const attendanceRecords: AttendanceRecord[] = [
    {
      id: '1',
      employeeName: 'Rahul Sharma',
      department: 'Engineering',
      date: 'Nov 12, 2025',
      status: 'Present',
      checkIn: '09:00 AM',
      checkOut: '06:15 PM',
      approval: 'Approved'
    },
    {
      id: '2',
      employeeName: 'Priya Patel',
      department: 'Design',
      date: 'Nov 12, 2025',
      status: 'Present',
      checkIn: '09:05 AM',
      checkOut: '06:00 PM',
      approval: 'Approved'
    },
    {
      id: '3',
      employeeName: 'Amit Kumar',
      department: 'Marketing',
      date: 'Nov 12, 2025',
      status: 'Late',
      checkIn: '09:45 AM',
      checkOut: '06:30 PM',
      approval: 'Pending'
    },
    {
      id: '4',
      employeeName: 'Sneha Desai',
      department: 'Sales',
      date: 'Nov 12, 2025',
      status: 'Present',
      checkIn: '08:55 AM',
      checkOut: '06:00 PM',
      approval: 'Approved'
    },
    {
      id: '5',
      employeeName: 'Vikram Singh',
      department: 'Engineering',
      date: 'Nov 12, 2025',
      status: 'Leave',
      checkIn: '--',
      checkOut: '--',
      approval: 'Approved'
    },
    {
      id: '6',
      employeeName: 'Ananya Roy',
      department: 'HR',
      date: 'Nov 12, 2025',
      status: 'Absent',
      checkIn: '--',
      checkOut: '--',
      approval: 'Pending'
    },
    {
      id: '7',
      employeeName: 'Karan Mehta',
      department: 'Finance',
      date: 'Nov 12, 2025',
      status: 'Present',
      checkIn: '09:10 AM',
      checkOut: '06:05 PM',
      approval: 'Approved'
    },
    {
      id: '8',
      employeeName: 'Neha Gupta',
      department: 'Marketing',
      date: 'Nov 12, 2025',
      status: 'Late',
      checkIn: '09:30 AM',
      checkOut: '06:20 PM',
      approval: 'Approved'
    }
  ];

  // Filter records based on search and filters
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Handle approval actions
  const handleApprove = (id: string) => {
    console.log('Approved:', id);
    // Add your approval logic here
  };

  const handleReject = (id: string) => {
    console.log('Rejected:', id);
    // Add your rejection logic here
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30';
      case 'Absent':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30';
      case 'Late':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30';
      case 'Leave':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30';
    }
  };

  const getApprovalBadge = (approval: string) => {
    switch (approval) {
      case 'Approved':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'Pending':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
      case 'Rejected':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center shadow-lg">
            <UserCheck className="w-7 h-7 text-white drop-shadow-sm" />
          </div>
          <div>
            <h1 className="text-4xl font-semibold text-foreground">Attendance Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor daily employee attendance and approvals</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Quick search..."
              className="pl-10 w-64 bg-background/50 border-border"
            />
          </div>
          
          {/* Notification Icon */}
          <Button variant="outline" size="icon" className="rounded-xl">
            <Bell className="w-4 h-4" />
          </Button>
          
          {/* Profile Card */}
          <div className="flex items-center gap-3 bg-card/60 backdrop-blur-xl border border-border rounded-2xl px-4 py-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground text-sm">Admin User</p>
              <p className="text-xs text-muted-foreground">HR Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards - Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Present Today */}
        <div className="bg-gradient-to-br from-emerald-50/80 to-green-50/50 dark:from-green-500/10 dark:to-green-600/5 border border-green-200/60 dark:border-green-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center shadow-sm">
              <UserCheck className="w-7 h-7 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-foreground">{todayStats.present}</p>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">{todayStats.presentPercentage}%</p>
            </div>
          </div>
          <h3 className="font-semibold text-foreground">Present Today</h3>
          <p className="text-sm text-muted-foreground mt-1">Employees checked in</p>
        </div>

        {/* Absent Today */}
        <div className="bg-gradient-to-br from-red-50/80 to-rose-50/50 dark:from-red-500/10 dark:to-red-600/5 border border-red-200/60 dark:border-red-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center shadow-sm">
              <UserX className="w-7 h-7 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-foreground">{todayStats.absent}</p>
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">{todayStats.absentPercentage}%</p>
            </div>
          </div>
          <h3 className="font-semibold text-foreground">Absent Today</h3>
          <p className="text-sm text-muted-foreground mt-1">Of total staff</p>
        </div>

        {/* Late Arrivals */}
        <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/50 dark:from-orange-500/10 dark:to-orange-600/5 border border-orange-200/60 dark:border-orange-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center shadow-sm">
              <Clock className="w-7 h-7 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-foreground">{todayStats.late}</p>
              <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">{todayStats.latePercentage}%</p>
            </div>
          </div>
          <h3 className="font-semibold text-foreground">Late Arrivals</h3>
          <p className="text-sm text-muted-foreground mt-1">Of present staff</p>
        </div>

        {/* On Leave Today */}
        <div className="bg-gradient-to-br from-yellow-50/80 to-amber-50/50 dark:from-yellow-500/10 dark:to-yellow-600/5 border border-yellow-200/60 dark:border-yellow-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center shadow-sm">
              <Calendar className="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-foreground">{todayStats.onLeave}</p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">{todayStats.leavePercentage}%</p>
            </div>
          </div>
          <h3 className="font-semibold text-foreground">On Leave Today</h3>
          <p className="text-sm text-muted-foreground mt-1">Approved leaves</p>
        </div>
      </div>

      {/* Second Row - Real-Time Clock-Ins & Attendance Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Real-Time Clock-Ins */}
        <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-card/60 dark:to-card/40 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center shadow-md">
              <Users className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Real-Time Clock-Ins</h3>
              <p className="text-sm text-muted-foreground">Live activity updates</p>
            </div>
          </div>
          
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
            {realtimeClockIns.map((record) => (
              <div 
                key={record.id} 
                className="flex items-center gap-3 p-4 bg-card/60 border border-border rounded-2xl hover:bg-accent/5 transition-all hover:shadow-sm"
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white font-medium shadow-sm">
                    {record.employeeName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white dark:border-card ${
                    record.status === 'Checked In' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{record.employeeName}</p>
                  <p className="text-xs text-muted-foreground">{record.time}</p>
                </div>
                <Badge className={`${
                  record.status === 'Checked In' 
                    ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30' 
                    : 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30'
                } border`}>
                  {record.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Trend (7 Days) */}
        <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/30 dark:from-card/60 dark:to-card/40 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <TrendingUp className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Attendance Trend (7 Days)</h3>
              <p className="text-sm text-muted-foreground">Weekly attendance rates</p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" opacity={0.5} />
              <XAxis 
                dataKey="day" 
                stroke="currentColor"
                className="text-muted-foreground"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="currentColor"
                className="text-muted-foreground"
                style={{ fontSize: '12px' }}
                domain={[80, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value: number) => [`${value}%`, 'Attendance Rate']}
              />
              <Bar 
                dataKey="rate" 
                fill="url(#colorGradient)" 
                radius={[12, 12, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#007AFF" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#5856D6" stopOpacity={0.5} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Third Row - Pending Approvals & Department Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pending Approvals */}
        <div className="bg-gradient-to-br from-amber-50/50 to-yellow-50/30 dark:from-card/60 dark:to-card/40 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-md">
                <AlertCircle className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Pending Approvals</h3>
                <p className="text-sm text-muted-foreground">{pendingApprovals.length} requests awaiting action</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
            {pendingApprovals.map((approval) => (
              <div 
                key={approval.id} 
                className="p-4 bg-card/60 border border-yellow-200/60 dark:border-yellow-500/20 rounded-2xl hover:bg-accent/5 transition-all hover:shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white font-medium shadow-sm">
                      {approval.employeeName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{approval.employeeName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{approval.date}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground mb-2">{approval.reason}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mb-3 font-medium">{approval.requestedChange}</p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleApprove(approval.id)}
                    className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-600 dark:text-green-400 border border-green-500/30"
                  >
                    <CheckCheck className="w-4 h-4 mr-1.5" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleReject(approval.id)}
                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-600 dark:text-red-400 border border-red-500/30"
                  >
                    <XCircle className="w-4 h-4 mr-1.5" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Attendance Chart */}
        <div className="bg-gradient-to-br from-cyan-50/50 to-blue-50/30 dark:from-card/60 dark:to-card/40 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-md">
              <Users className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Department Attendance</h3>
              <p className="text-sm text-muted-foreground">Comparison by department</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={departmentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" opacity={0.5} />
              <XAxis 
                type="number" 
                stroke="currentColor"
                className="text-muted-foreground"
                style={{ fontSize: '12px' }}
                domain={[85, 100]}
              />
              <YAxis 
                type="category" 
                dataKey="department" 
                stroke="currentColor"
                className="text-muted-foreground"
                style={{ fontSize: '12px' }}
                width={100}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value: number) => [`${value}%`, 'Attendance Rate']}
              />
              <Bar 
                dataKey="rate" 
                fill="url(#deptGradient)" 
                radius={[0, 12, 12, 0]}
              />
              <defs>
                <linearGradient id="deptGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#5856D6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#007AFF" stopOpacity={0.5} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Employee Attendance List - Main Table */}
      <div className="bg-gradient-to-br from-slate-50/50 to-gray-50/30 dark:from-card/60 dark:to-card/40 backdrop-blur-xl border border-border rounded-3xl p-6 mb-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-semibold text-foreground">Employee Attendance List</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Manage and track employee attendance records</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 lg:flex-none lg:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-border"
              />
            </div>
            
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-40 bg-background/50 border-border">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32 bg-background/50 border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
                <SelectItem value="Leave">Leave</SelectItem>
              </SelectContent>
            </Select>

            <Button className="gap-2 bg-gradient-to-br from-[#007AFF] to-[#5856D6] hover:opacity-90">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="text-left p-4 font-medium text-muted-foreground">Employee Name</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Department</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Check-In</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Check-Out</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Approval</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-border/50 hover:bg-accent/10 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white font-medium shadow-sm">
                        {record.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-foreground">{record.employeeName}</span>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{record.department}</td>
                  <td className="p-4 text-foreground">{record.date}</td>
                  <td className="p-4">
                    <Badge className={`${getStatusBadge(record.status)} border px-3 py-1`}>
                      {record.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-foreground">{record.checkIn}</td>
                  <td className="p-4 text-foreground">{record.checkOut}</td>
                  <td className="p-4">
                    <Badge className={`${getApprovalBadge(record.approval)} border px-3 py-1`}>
                      {record.approval}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No records found</p>
          </div>
        )}
      </div>

      {/* Insights Section - Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Average Work Hours */}
        <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-blue-500/10 dark:to-blue-600/5 border border-blue-200/60 dark:border-blue-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center shadow-sm">
              <Clock className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Work Hours</p>
              <p className="text-3xl font-semibold text-foreground">8.2h</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Per day across all employees</p>
        </div>

        {/* Late Arrival % */}
        <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/50 dark:from-orange-500/10 dark:to-orange-600/5 border border-orange-200/60 dark:border-orange-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center shadow-sm">
              <TrendingUp className="w-7 h-7 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Late Arrival %</p>
              <p className="text-3xl font-semibold text-foreground">4.8%</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Of all present employees</p>
        </div>

        {/* Top Consistent Employees */}
        <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/50 dark:from-purple-500/10 dark:to-pink-600/5 border border-purple-200/60 dark:border-purple-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <Award className="w-7 h-7 text-white drop-shadow-sm" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Top Performers</p>
              <p className="font-medium text-foreground">Most Consistent</p>
            </div>
          </div>
          <div className="space-y-2">
            {topEmployees.slice(0, 3).map((employee, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-card/50 rounded-xl border border-border/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white text-xs font-medium shadow-sm">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{employee.name}</p>
                  <p className="text-xs text-muted-foreground">{employee.attendanceRate}% • {employee.streak} days</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
