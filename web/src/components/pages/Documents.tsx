import { Upload, File, Download, Search, FileText, Plus, User, Mail } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

// Mock employee database
const employeeDatabase = [
  { 
    id: 'EMP001', 
    name: 'Sarah Johnson', 
    department: 'Engineering', 
    position: 'Senior Software Engineer',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Apt 4B, San Francisco, CA 94102',
    joiningDate: '2020-03-15',
    currentSalary: 95000,
    manager: 'Michael Chen'
  },
  { 
    id: 'EMP002', 
    name: 'Michael Chen', 
    department: 'Engineering', 
    position: 'Engineering Manager',
    email: 'michael.chen@company.com',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Avenue, Unit 12, San Francisco, CA 94103',
    joiningDate: '2018-07-20',
    currentSalary: 125000,
    manager: 'Emily Davis'
  },
  { 
    id: 'EMP003', 
    name: 'Emily Davis', 
    department: 'HR', 
    position: 'HR Director',
    email: 'emily.davis@company.com',
    phone: '+1 (555) 345-6789',
    address: '789 Pine Street, San Francisco, CA 94104',
    joiningDate: '2019-01-10',
    currentSalary: 110000,
    manager: 'Steve Anderson'
  },
  { 
    id: 'EMP004', 
    name: 'Alex Martinez', 
    department: 'Design', 
    position: 'UX Designer',
    email: 'alex.martinez@company.com',
    phone: '+1 (555) 456-7890',
    address: '321 Elm Street, San Francisco, CA 94105',
    joiningDate: '2021-06-01',
    currentSalary: 85000,
    manager: 'Sarah Johnson'
  },
  { 
    id: 'EMP005', 
    name: 'Jessica Lee', 
    department: 'Marketing', 
    position: 'Marketing Specialist',
    email: 'jessica.lee@company.com',
    phone: '+1 (555) 567-8901',
    address: '654 Maple Drive, San Francisco, CA 94106',
    joiningDate: '2022-02-14',
    currentSalary: 72000,
    manager: 'Emily Davis'
  },
];

export function Documents() {
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<typeof employeeDatabase[0] | null>(null);
  const [recipientEmail, setRecipientEmail] = useState('');

  const documents = [
    { id: 1, name: 'Employee Handbook 2025.pdf', size: '2.4 MB', uploadedBy: 'HR Department', date: 'Oct 10, 2025', type: 'PDF' },
    { id: 2, name: 'Benefits Guide.pdf', size: '1.8 MB', uploadedBy: 'Emily Davis', date: 'Oct 5, 2025', type: 'PDF' },
    { id: 3, name: 'Onboarding Checklist.docx', size: '245 KB', uploadedBy: 'Sarah Johnson', date: 'Sep 28, 2025', type: 'DOC' },
    { id: 4, name: 'Q4 Goals Template.xlsx', size: '156 KB', uploadedBy: 'Michael Chen', date: 'Sep 25, 2025', type: 'XLS' },
    { id: 5, name: 'Company Policies.pdf', size: '3.1 MB', uploadedBy: 'HR Department', date: 'Sep 15, 2025', type: 'PDF' },
    { id: 6, name: 'Performance Review Form.pdf', size: '890 KB', uploadedBy: 'Emily Davis', date: 'Sep 10, 2025', type: 'PDF' },
  ];

  const documentTemplates = [
    { id: 1, name: 'Onboarding Letter', description: 'Welcome letter for new employee onboarding' },
    { id: 2, name: 'New Member Introduction Letter', description: 'Introduce new team member to organization' },
    { id: 3, name: 'HDFC Bank Details Letter', description: 'Bank account details letter for HDFC' },
    { id: 4, name: 'Employment Form', description: 'Comprehensive employment details form' },
    { id: 5, name: 'Offer Letter', description: 'Official job offer letter for candidates' },
  ];

  const handleEmployeeSelect = (employeeId: string) => {
    const employee = employeeDatabase.find(emp => emp.id === employeeId);
    setSelectedEmployee(employee || null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-[#0A84FF] flex items-center justify-center shadow-md">
            <FileText className="w-7 h-7 text-white drop-shadow-sm" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Documents</h2>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">Generate, upload and manage documents</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowGenerator(!showGenerator)} className="gap-2">
            <FileText className="w-4 h-4" />
            {showGenerator ? 'View Documents' : 'Generate Letter'}
          </Button>
          <Button className="gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </Button>
        </div>
      </div>

      {showGenerator ? (
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Document Generation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentTemplates.map((template) => (
              <div key={template.id} className="border border-border rounded-xl p-4 hover:bg-accent/5 transition-colors">
                <div className="flex items-start gap-3 mb-2">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">{template.name}</h4>
                    <p className="text-sm text-muted-foreground font-medium">{template.description}</p>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger>
                    <Button size="sm" className="w-full mt-2 gap-2">
                      <Plus className="w-3 h-3" />
                      Generate Letter
                    </Button>
                  </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border">
                  <DialogHeader>
                    <DialogTitle>Generate {template.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {/* Employee Selection */}
                    <div className="bg-accent/10 border border-border rounded-lg p-4">
                      <Label htmlFor="employeeSelect" className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4" />
                        Select Employee
                      </Label>
                      <Select onValueChange={handleEmployeeSelect}>
                        <SelectTrigger id="employeeSelect" className="mt-1.5">
                          <SelectValue placeholder="Choose an employee..." />
                        </SelectTrigger>
                        <SelectContent>
                          {employeeDatabase.map((emp) => (
                            <SelectItem key={emp.id} value={emp.id}>
                              {emp.name} - {emp.id} ({emp.position})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Email Recipient */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <Label htmlFor="recipientEmail" className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        Send To Email Address
                      </Label>
                      <Input
                        id="recipientEmail"
                        type="email"
                        placeholder="recipient@example.com"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        className="mt-1.5"
                      />
                      <p className="text-xs text-muted-foreground font-medium mt-2">
                        The generated document will be sent to this email address
                      </p>
                    </div>

                    {/* Auto-filled Employee Information */}
                    {selectedEmployee && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="employeeName">Employee Name</Label>
                          <Input 
                            id="employeeName" 
                            value={selectedEmployee.name} 
                            className="mt-1.5 bg-muted/50" 
                            readOnly 
                          />
                        </div>
                        <div>
                          <Label htmlFor="employeeId">Employee ID</Label>
                          <Input 
                            id="employeeId" 
                            value={selectedEmployee.id} 
                            className="mt-1.5 bg-muted/50" 
                            readOnly 
                          />
                        </div>
                      </div>
                    )}

                    {/* Onboarding Letter Fields */}
                    {template.id === 1 && selectedEmployee && (
                      <>
                        <div>
                          <Label htmlFor="position">Position</Label>
                          <Input 
                            id="position" 
                            value={selectedEmployee.position} 
                            className="mt-1.5 bg-muted/50" 
                            readOnly 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="joiningDate">Joining Date</Label>
                            <Input 
                              id="joiningDate" 
                              type="date" 
                              value={selectedEmployee.joiningDate} 
                              className="mt-1.5 bg-muted/50" 
                              readOnly 
                            />
                          </div>
                          <div>
                            <Label htmlFor="reportingTime">Reporting Time</Label>
                            <Input 
                              id="reportingTime" 
                              type="time" 
                              defaultValue="09:00"
                              className="mt-1.5" 
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="department">Department</Label>
                          <Input 
                            id="department" 
                            value={selectedEmployee.department} 
                            className="mt-1.5 bg-muted/50" 
                            readOnly 
                          />
                        </div>
                        <div>
                          <Label htmlFor="welcomeMessage">Welcome Message</Label>
                          <Textarea 
                            id="welcomeMessage" 
                            placeholder="Welcome message for the new employee..." 
                            rows={3} 
                            className="mt-1.5" 
                          />
                        </div>
                      </>
                    )}

                    {/* New Member Introduction Letter Fields */}
                    {template.id === 2 && selectedEmployee && (
                      <>
                        <div>
                          <Label htmlFor="position">Position</Label>
                          <Input 
                            id="position" 
                            value={selectedEmployee.position} 
                            className="mt-1.5 bg-muted/50" 
                            readOnly 
                          />
                        </div>
                        <div>
                          <Label htmlFor="department">Department</Label>
                          <Input 
                            id="department" 
                            value={selectedEmployee.department} 
                            className="mt-1.5 bg-muted/50" 
                            readOnly 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="joiningDate">Start Date</Label>
                            <Input 
                              id="joiningDate" 
                              type="date" 
                              value={selectedEmployee.joiningDate} 
                              className="mt-1.5 bg-muted/50" 
                              readOnly 
                            />
                          </div>
                          <div>
                            <Label htmlFor="previousCompany">Previous Company</Label>
                            <Input 
                              id="previousCompany" 
                              placeholder="Previous employer (optional)" 
                              className="mt-1.5" 
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="background">Background & Skills</Label>
                          <Textarea 
                            id="background" 
                            placeholder="Brief background and key skills of the new member..." 
                            rows={3} 
                            className="mt-1.5" 
                          />
                        </div>
                        <div>
                          <Label htmlFor="introMessage">Introduction Message</Label>
                          <Textarea 
                            id="introMessage" 
                            placeholder="Message to introduce the new team member..." 
                            rows={2} 
                            className="mt-1.5" 
                          />
                        </div>
                      </>
                    )}

                    {/* HDFC Bank Details Letter Fields */}
                    {template.id === 3 && selectedEmployee && (
                      <>
                        <div>
                          <Label htmlFor="accountNumber">HDFC Bank Account Number</Label>
                          <Input 
                            id="accountNumber" 
                            placeholder="50100123456789" 
                            className="mt-1.5" 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="ifscCode">IFSC Code</Label>
                            <Input 
                              id="ifscCode" 
                              placeholder="HDFC0001234" 
                              className="mt-1.5" 
                            />
                          </div>
                          <div>
                            <Label htmlFor="branchName">Branch Name</Label>
                            <Input 
                              id="branchName" 
                              placeholder="MG Road Branch" 
                              className="mt-1.5" 
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="accountHolderName">Account Holder Name</Label>
                          <Input 
                            id="accountHolderName" 
                            value={selectedEmployee.name} 
                            className="mt-1.5 bg-muted/50" 
                            readOnly 
                          />
                        </div>
                        <div>
                          <Label htmlFor="accountType">Account Type</Label>
                          <Select>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue placeholder="Select account type..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="savings">Savings Account</SelectItem>
                              <SelectItem value="current">Current Account</SelectItem>
                              <SelectItem value="salary">Salary Account</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="purpose">Purpose of Letter</Label>
                          <Textarea 
                            id="purpose" 
                            placeholder="Salary credit, verification, etc..." 
                            rows={2} 
                            className="mt-1.5" 
                          />
                        </div>
                      </>
                    )}

                    {/* Employment Form Fields */}
                    {template.id === 4 && selectedEmployee && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="position">Position</Label>
                            <Input 
                              id="position" 
                              value={selectedEmployee.position} 
                              className="mt-1.5 bg-muted/50" 
                              readOnly 
                            />
                          </div>
                          <div>
                            <Label htmlFor="department">Department</Label>
                            <Input 
                              id="department" 
                              value={selectedEmployee.department} 
                              className="mt-1.5 bg-muted/50" 
                              readOnly 
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="joiningDate">Joining Date</Label>
                            <Input 
                              id="joiningDate" 
                              type="date" 
                              value={selectedEmployee.joiningDate} 
                              className="mt-1.5 bg-muted/50" 
                              readOnly 
                            />
                          </div>
                          <div>
                            <Label htmlFor="probationPeriod">Probation Period (months)</Label>
                            <Input 
                              id="probationPeriod" 
                              type="number" 
                              defaultValue="3" 
                              className="mt-1.5" 
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="workLocation">Work Location</Label>
                          <Input 
                            id="workLocation" 
                            placeholder="Office location/city" 
                            className="mt-1.5" 
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergencyContact">Emergency Contact</Label>
                          <Input 
                            id="emergencyContact" 
                            placeholder="Name and phone number" 
                            className="mt-1.5" 
                          />
                        </div>
                        <div>
                          <Label htmlFor="medicalHistory">Medical History (if any)</Label>
                          <Textarea 
                            id="medicalHistory" 
                            placeholder="Any medical conditions the company should be aware of..." 
                            rows={2} 
                            className="mt-1.5" 
                          />
                        </div>
                      </>
                    )}

                    {/* Offer Letter Fields */}
                    {template.id === 5 && selectedEmployee && (
                      <>
                        <div>
                          <Label htmlFor="position">Position Offered</Label>
                          <Input 
                            id="position" 
                            value={selectedEmployee.position} 
                            className="mt-1.5 bg-muted/50" 
                            readOnly 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="department">Department</Label>
                            <Input 
                              id="department" 
                              value={selectedEmployee.department} 
                              className="mt-1.5 bg-muted/50" 
                              readOnly 
                            />
                          </div>
                          <div>
                            <Label htmlFor="joiningDate">Proposed Joining Date</Label>
                            <Input 
                              id="joiningDate" 
                              type="date" 
                              className="mt-1.5" 
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="ctc">CTC (Annual) ($)</Label>
                            <Input 
                              id="ctc" 
                              type="number" 
                              placeholder="95000" 
                              className="mt-1.5" 
                            />
                          </div>
                          <div>
                            <Label htmlFor="probationPeriod">Probation Period (months)</Label>
                            <Input 
                              id="probationPeriod" 
                              type="number" 
                              defaultValue="3" 
                              className="mt-1.5" 
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="workLocation">Work Location</Label>
                          <Input 
                            id="workLocation" 
                            placeholder="City/Office location" 
                            className="mt-1.5" 
                          />
                        </div>
                        <div>
                          <Label htmlFor="benefits">Benefits & Perks</Label>
                          <Textarea 
                            id="benefits" 
                            placeholder="Health insurance, PF, leave policy, etc..." 
                            rows={3} 
                            className="mt-1.5" 
                          />
                        </div>
                        <div>
                          <Label htmlFor="reportingTo">Reporting To</Label>
                          <Input 
                            id="reportingTo" 
                            placeholder="Manager name and designation" 
                            className="mt-1.5" 
                          />
                        </div>
                      </>
                    )}

                    {/* Additional Notes for all templates */}
                    {selectedEmployee && (
                      <div>
                        <Label htmlFor="additionalNotes">Additional Notes</Label>
                        <Textarea 
                          id="additionalNotes" 
                          placeholder="Any additional information or special clauses..." 
                          rows={3} 
                          className="mt-1.5" 
                        />
                      </div>
                    )}

                    {/* Generate Buttons */}
                    {selectedEmployee ? (
                      <div className="space-y-3 pt-2">
                        <div className="flex gap-2">
                          <Button className="flex-1">Generate & Download</Button>
                          <Button variant="outline" className="flex-1">Preview</Button>
                        </div>
                        {recipientEmail && (
                          <Button 
                            className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                            onClick={() => {
                              alert(`Document will be generated and sent to: ${recipientEmail}`);
                            }}
                          >
                            <Mail className="w-4 h-4" />
                            Generate & Send to {recipientEmail}
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="bg-muted/50 border border-border rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground font-medium">
                          Please select an employee to generate the document
                        </p>
                      </div>
                    )}
                  </div>
                </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-9" />
            </div>
          </div>

          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm text-foreground">Document Name</th>
                    <th className="text-left p-4 font-medium text-sm text-foreground">Type</th>
                    <th className="text-left p-4 font-medium text-sm text-foreground">Size</th>
                    <th className="text-left p-4 font-medium text-sm text-foreground">Uploaded By</th>
                    <th className="text-left p-4 font-medium text-sm text-foreground">Date</th>
                    <th className="text-left p-4 font-medium text-sm text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <File className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">{doc.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground">
                          {doc.type}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground font-medium">{doc.size}</td>
                      <td className="p-4 text-sm text-muted-foreground font-medium">{doc.uploadedBy}</td>
                      <td className="p-4 text-sm text-muted-foreground font-medium">{doc.date}</td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Download className="w-3 h-3" />
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}