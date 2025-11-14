import { Mail, Send, Users, ChevronDown, ChevronUp, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { EMPLOYEES, Employee } from '../employeeData';

export function Email() {
  const [expandedDepts, setExpandedDepts] = useState<{ [key: string]: boolean }>({
    Executive: true,
    Engineering: true,
    IT: true,
    Product: true,
    Finance: true,
    Operations: true,
    Sales: true,
    'Customer Success': true,
  });
  const [selectedRecipient, setSelectedRecipient] = useState<{
    type: 'individual' | 'team';
    employee: Employee;
    teamMembers?: Employee[];
  } | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Group employees by department
  const getDepartmentTree = () => {
    const departments: { [key: string]: Employee[] } = {};
    
    EMPLOYEES.forEach(emp => {
      if (!departments[emp.department]) {
        departments[emp.department] = [];
      }
      departments[emp.department].push(emp);
    });

    // Sort employees within each department
    Object.keys(departments).forEach(dept => {
      departments[dept].sort((a, b) => {
        if (!a.reportingManager) return -1;
        if (!b.reportingManager) return 1;
        
        const positionRank: { [key: string]: number } = {
          'CEO': 1, 'CTO': 2, 'CIO': 3, 'CFO': 4, 'COO': 5,
          'CPO': 6, 'CRO': 7, 'Chief': 2, 'Head': 8, 'Lead': 9,
        };
        
        const getRank = (position: string) => {
          for (const [key, rank] of Object.entries(positionRank)) {
            if (position.includes(key)) return rank;
          }
          return 10;
        };
        
        return getRank(a.position) - getRank(b.position);
      });
    });

    return departments;
  };

  const departmentTree = getDepartmentTree();

  const toggleDepartment = (dept: string) => {
    setExpandedDepts(prev => ({ ...prev, [dept]: !prev[dept] }));
  };

  const getReportingEmployees = (employee: Employee): Employee[] => {
    return EMPLOYEES.filter(emp => emp.reportingManager === employee.name);
  };

  const handleEmployeeClick = (employee: Employee) => {
    const reportingEmployees = getReportingEmployees(employee);
    setSelectedRecipient({
      type: 'individual',
      employee,
      teamMembers: reportingEmployees,
    });
  };

  const handleSendEmail = (toTeam: boolean) => {
    if (!selectedRecipient) return;

    const recipients = toTeam && selectedRecipient.teamMembers && selectedRecipient.teamMembers.length > 0
      ? [selectedRecipient.employee, ...selectedRecipient.teamMembers]
      : [selectedRecipient.employee];

    console.log('📧 Sending email to:', recipients.map(r => r.email).join(', '));
    console.log('Subject:', emailSubject);
    console.log('Body:', emailBody);

    alert(`Email sent to ${recipients.length} recipient(s):\n${recipients.map(r => `- ${r.name} (${r.email})`).join('\n')}`);
    
    setEmailSubject('');
    setEmailBody('');
    setSelectedRecipient(null);
  };

  const DepartmentNode = ({ dept, employees }: { dept: string; employees: Employee[] }) => {
    const isExpanded = expandedDepts[dept];
    const head = employees.find(e => !e.reportingManager || e.position.includes('CEO'));
    const reports = employees.filter(e => e.reportingManager && !e.position.includes('CEO'));

    return (
      <div className="mb-3">
        <button
          onClick={() => toggleDepartment(dept)}
          className="w-full flex items-center justify-between p-3 bg-card/40 border border-border rounded-lg hover:bg-accent/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white text-xs font-semibold shadow-sm">
              {employees.length}
            </div>
            <div className="text-left">
              <h4 className="text-sm font-semibold text-foreground">{dept}</h4>
              <p className="text-xs text-muted-foreground font-medium">
                {employees.length} {employees.length === 1 ? 'member' : 'members'}
              </p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {isExpanded && (
          <div className="ml-4 mt-2 pl-4 border-l-2 border-border/50 space-y-1">
            {head && (
              <button
                onClick={() => handleEmployeeClick(head)}
                className="w-full p-2 bg-accent/10 border border-border rounded-lg hover:bg-accent/20 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center text-white text-sm font-medium shadow-sm">
                    {head.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{head.name}</div>
                    <div className="text-xs text-muted-foreground font-medium truncate">{head.position}</div>
                  </div>
                  <Mail className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                </div>
              </button>
            )}

            {reports.length > 0 && (
              <div className="space-y-1 pt-1">
                {reports.map(emp => (
                  <button
                    key={emp.id}
                    onClick={() => handleEmployeeClick(emp)}
                    className="w-full p-2 bg-card/40 border border-border rounded-lg hover:bg-accent/5 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5da3ff]/90 to-[#8b6fd9]/90 flex items-center justify-center text-white text-xs font-medium shadow-sm">
                        {emp.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-foreground truncate">{emp.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{emp.position}</div>
                      </div>
                      <Mail className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 rounded-xl bg-[#007AFF] flex items-center justify-center shadow-md">
          <Mail className="w-7 h-7 text-white drop-shadow-sm" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-foreground">Email</h2>
          <p className="text-sm text-muted-foreground font-medium mt-0.5">Send emails to employees and teams</p>
        </div>
      </div>

      {/* Email Compose Area */}
      <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-foreground mb-4">Compose Email</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              placeholder="Select recipient from organization directory below..."
              value={selectedRecipient ? selectedRecipient.employee.email : ''}
              readOnly
              className="mt-1.5 bg-muted/50"
            />
            {selectedRecipient && selectedRecipient.teamMembers && selectedRecipient.teamMembers.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                💡 {selectedRecipient.employee.name} has {selectedRecipient.teamMembers.length} team member(s) reporting to them
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Email subject..."
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="body">Message</Label>
            <Textarea
              id="body"
              placeholder="Write your message here..."
              rows={8}
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              className="mt-1.5"
            />
          </div>

          {selectedRecipient && (
            <div className="flex gap-2 pt-2">
              <Button 
                onClick={() => handleSendEmail(false)}
                className="flex-1 gap-2"
                disabled={!emailSubject || !emailBody}
              >
                <User className="w-4 h-4" />
                Send to {selectedRecipient.employee.name}
              </Button>
              
              {selectedRecipient.teamMembers && selectedRecipient.teamMembers.length > 0 && (
                <Button 
                  onClick={() => handleSendEmail(true)}
                  variant="outline"
                  className="flex-1 gap-2"
                  disabled={!emailSubject || !emailBody}
                >
                  <Users className="w-4 h-4" />
                  Send to Team ({selectedRecipient.teamMembers.length + 1})
                </Button>
              )}
            </div>
          )}

          {!selectedRecipient && (
            <div className="bg-muted/50 border border-border rounded-lg p-6 text-center">
              <Mail className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground font-medium">
                Select a recipient from the organization directory below to compose an email
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Organization Directory */}
      <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Organization Directory
        </h3>
        <p className="text-xs text-muted-foreground mb-4 font-medium">
          Click on any employee to select as email recipient
        </p>
        
        <div className="space-y-2">
          {Object.entries(departmentTree).map(([dept, employees]) => (
            <DepartmentNode key={dept} dept={dept} employees={employees} />
          ))}
        </div>
      </div>

      {/* Recent Emails */}
      <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-foreground mb-4">Recent Emails</h3>
        <div className="space-y-2">
          {[
            { subject: 'Welcome to the Team!', to: 'Sneha Rao', date: 'Nov 6, 2025' },
            { subject: 'Q4 Performance Review', to: 'All Employees', date: 'Nov 5, 2025' },
            { subject: 'Project Update', to: 'Engineering Team', date: 'Nov 4, 2025' },
          ].map((email, idx) => (
            <div key={idx} className="p-3 border border-border rounded-lg hover:bg-accent/5 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">{email.subject}</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">To: {email.to}</div>
                </div>
                <div className="text-xs text-muted-foreground font-medium">{email.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
