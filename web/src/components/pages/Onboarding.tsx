import { UserCheck, Mail, Send, CheckCircle, Clock, AlertCircle, FileText, User, Check, X, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

interface OnboardingCandidate {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  joiningDate: string;
  emailStages: {
    stage1_welcome: { sent: boolean; sentAt?: string };
    stage2_credentials: { sent: boolean; sentAt?: string };
    stage3_availability: { sent: boolean; sentAt?: string };
    stage4_teamMeet: { sent: boolean; sentAt?: string };
    stage5_onboardingForm: { sent: boolean; sentAt?: string };
  };
  formSubmitted: boolean;
  formData?: any;
  hrApproved: boolean;
  addedToSystem: boolean;
}

interface OnboardingProps {
  initialTab?: string;
}

export function Onboarding({ initialTab }: OnboardingProps = {}) {
  const [activeView, setActiveView] = useState<'onboarding' | 'new-hires'>('onboarding');
  
  const [candidates, setCandidates] = useState<OnboardingCandidate[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@company.com',
      position: 'Software Engineer',
      department: 'Engineering',
      joiningDate: 'Nov 15, 2025',
      emailStages: {
        stage1_welcome: { sent: true, sentAt: 'Nov 1, 2025 09:00 AM' },
        stage2_credentials: { sent: true, sentAt: 'Nov 1, 2025 10:00 AM' },
        stage3_availability: { sent: true, sentAt: 'Nov 2, 2025 02:00 PM' },
        stage4_teamMeet: { sent: true, sentAt: 'Nov 3, 2025 11:00 AM' },
        stage5_onboardingForm: { sent: true, sentAt: 'Nov 4, 2025 09:00 AM' },
      },
      formSubmitted: true,
      formData: {
        // Personal Information
        firstName: 'Rahul',
        middleName: 'Kumar',
        lastName: 'Sharma',
        dateOfBirth: '1995-05-15',
        gender: 'Male',
        maritalStatus: 'Single',
        nationality: 'Indian',
        bloodGroup: 'O+',
        // Contact Information
        personalEmail: 'rahul.personal@gmail.com',
        phoneNumber: '+91-9876543210',
        alternatePhone: '+91-9876543211',
        currentAddress: '123 MG Road, Bangalore',
        permanentAddress: '456 Park Street, Delhi',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        country: 'India',
        // Emergency Contact
        emergencyContactName: 'Suresh Sharma',
        emergencyContactRelation: 'Father',
        emergencyContactPhone: '+91-9876543212',
        emergencyContactAddress: '456 Park Street, Delhi',
        // Education
        highestQualification: 'B.Tech',
        university: 'IIT Delhi',
        graduationYear: '2017',
        specialization: 'Computer Science',
        // Work Experience
        previousCompany: 'Tech Corp',
        previousPosition: 'Junior Developer',
        yearsOfExperience: '3',
        totalExperience: '3.5 years',
        // Documents
        panNumber: 'ABCDE1234F',
        aadharNumber: '1234-5678-9012',
        passportNumber: 'M1234567',
        drivingLicense: 'KA01-20190012345',
        // Bank Details
        bankName: 'HDFC Bank',
        accountNumber: '12345678901234',
        ifscCode: 'HDFC0001234',
        branchName: 'MG Road Branch',
        // Professional Details
        employeeId: 'EMP001',
        joiningDate: 'Nov 15, 2025',
        position: 'Software Engineer',
        department: 'Engineering',
        reportingManager: 'Amit Patel',
        workLocation: 'Bangalore Office',
        employmentType: 'Full Time',
        probationPeriod: '3 months',
      },
      hrApproved: false,
      addedToSystem: false,
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya.p@company.com',
      position: 'UI/UX Designer',
      department: 'Design',
      joiningDate: 'Nov 20, 2025',
      emailStages: {
        stage1_welcome: { sent: true, sentAt: 'Nov 2, 2025 09:00 AM' },
        stage2_credentials: { sent: true, sentAt: 'Nov 2, 2025 10:00 AM' },
        stage3_availability: { sent: true, sentAt: 'Nov 3, 2025 02:00 PM' },
        stage4_teamMeet: { sent: false },
        stage5_onboardingForm: { sent: false },
      },
      formSubmitted: false,
      hrApproved: false,
      addedToSystem: false,
    },
    {
      id: '3',
      name: 'Amit Kumar',
      email: 'amit.kumar@company.com',
      position: 'Product Manager',
      department: 'Product',
      joiningDate: 'Nov 18, 2025',
      emailStages: {
        stage1_welcome: { sent: true, sentAt: 'Nov 5, 2025 09:00 AM' },
        stage2_credentials: { sent: true, sentAt: 'Nov 5, 2025 10:00 AM' },
        stage3_availability: { sent: false },
        stage4_teamMeet: { sent: false },
        stage5_onboardingForm: { sent: false },
      },
      formSubmitted: false,
      hrApproved: false,
      addedToSystem: false,
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      email: 'sneha.r@company.com',
      position: 'Marketing Specialist',
      department: 'Marketing',
      joiningDate: 'Nov 25, 2025',
      emailStages: {
        stage1_welcome: { sent: true, sentAt: 'Nov 6, 2025 09:00 AM' },
        stage2_credentials: { sent: true, sentAt: 'Nov 6, 2025 10:00 AM' },
        stage3_availability: { sent: true, sentAt: 'Nov 7, 2025 02:00 PM' },
        stage4_teamMeet: { sent: true, sentAt: 'Nov 8, 2025 11:00 AM' },
        stage5_onboardingForm: { sent: true, sentAt: 'Nov 9, 2025 09:00 AM' },
      },
      formSubmitted: true,
      formData: {},
      hrApproved: true,
      addedToSystem: true,
    },
  ]);

  const [newCandidateName, setNewCandidateName] = useState('');
  const [newCandidateEmail, setNewCandidateEmail] = useState('');
  const [newCandidatePosition, setNewCandidatePosition] = useState('');
  const [newCandidateDepartment, setNewCandidateDepartment] = useState('');
  const [newCandidateJoiningDate, setNewCandidateJoiningDate] = useState('');
  const [showStartNewDialog, setShowStartNewDialog] = useState(false);

  const handleStartOnboarding = () => {
    if (!newCandidateName || !newCandidateEmail || !newCandidatePosition || !newCandidateDepartment || !newCandidateJoiningDate) {
      toast.error('Please fill all fields');
      return;
    }

    const newCandidate: OnboardingCandidate = {
      id: Date.now().toString(),
      name: newCandidateName,
      email: newCandidateEmail,
      position: newCandidatePosition,
      department: newCandidateDepartment,
      joiningDate: newCandidateJoiningDate,
      emailStages: {
        stage1_welcome: { sent: true, sentAt: new Date().toLocaleString() },
        stage2_credentials: { sent: false },
        stage3_availability: { sent: false },
        stage4_teamMeet: { sent: false },
        stage5_onboardingForm: { sent: false },
      },
      formSubmitted: false,
      hrApproved: false,
      addedToSystem: false,
    };

    setCandidates([newCandidate, ...candidates]);
    toast.success(`Onboarding started for ${newCandidateName}! Welcome email sent.`);
    
    setNewCandidateName('');
    setNewCandidateEmail('');
    setNewCandidatePosition('');
    setNewCandidateDepartment('');
    setNewCandidateJoiningDate('');
    setShowStartNewDialog(false);
  };

  const handleSendNextEmail = (candidateId: string, stage: string) => {
    setCandidates(prev =>
      prev.map(c => {
        if (c.id === candidateId) {
          return {
            ...c,
            emailStages: {
              ...c.emailStages,
              [stage]: { sent: true, sentAt: new Date().toLocaleString() },
            },
          };
        }
        return c;
      })
    );
    toast.success('Email sent successfully!');
  };

  const handleApproveCandidate = (candidateId: string) => {
    setCandidates(prev =>
      prev.map(c =>
        c.id === candidateId
          ? { ...c, hrApproved: true, addedToSystem: true }
          : c
      )
    );
    toast.success('Candidate approved and added to system! Welcome announcement sent to team.');
  };

  const handleRejectCandidate = (candidateId: string) => {
    toast.error('Candidate onboarding rejected. Notification sent.');
    // In a real app, you might want to move them to a rejected list or remove them
  };

  const getEmailStageInfo = (stageName: string) => {
    const stages: Record<string, { title: string; description: string }> = {
      stage1_welcome: {
        title: 'Availability Confirmation',
        description: 'Confirm joining date and availability'
      },
      stage2_credentials: {
        title: 'Welcome Email',
        description: 'Welcome message and company overview'
      },
      stage3_availability: {
        title: 'Onboarding Form Link',
        description: 'Main onboarding form with all employee details'
      },
      stage4_teamMeet: {
        title: 'Team Assignment',
        description: 'Who they will meet and work with'
      },
      stage5_onboardingForm: {
        title: 'Credentials & Team Introduction',
        description: 'Login credentials and introduction to the team'
      },
    };
    return stages[stageName];
  };

  const getOverallStatus = (candidate: OnboardingCandidate) => {
    if (candidate.addedToSystem) return 'completed';
    if (candidate.formSubmitted && !candidate.hrApproved) return 'pending';
    return 'in-progress';
  };

  const getEmailProgress = (candidate: OnboardingCandidate) => {
    const stages = Object.values(candidate.emailStages);
    const completed = stages.filter(s => s.sent).length;
    return Math.round((completed / stages.length) * 100);
  };

  // Filter based on initialTab if provided
  const displayCandidates = initialTab === 'pending-approval'
    ? candidates.filter(c => c.formSubmitted && !c.hrApproved && !c.addedToSystem)
    : candidates.filter(c => !c.addedToSystem);

  // Get new hires (employees who have been added to system)
  const newHires = candidates.filter(c => c.addedToSystem);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center shadow-lg">
            <UserCheck className="w-7 h-7 text-white drop-shadow-md" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Employee Onboarding</h2>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">Manage the complete onboarding workflow</p>
          </div>
        </div>
        <Dialog open={showStartNewDialog} onOpenChange={setShowStartNewDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-[#007AFF] to-[#5856D6] hover:opacity-90">
              <UserCheck className="w-4 h-4" />
              Start New Onboarding
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border-border">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" />
                Start New Employee Onboarding
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newCandidateName}
                  onChange={(e) => setNewCandidateName(e.target.value)}
                  placeholder="Enter employee name"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCandidateEmail}
                  onChange={(e) => setNewCandidateEmail(e.target.value)}
                  placeholder="employee@company.com"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newCandidatePosition}
                  onChange={(e) => setNewCandidatePosition(e.target.value)}
                  placeholder="Software Engineer"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newCandidateDepartment}
                  onChange={(e) => setNewCandidateDepartment(e.target.value)}
                  placeholder="Engineering"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="joiningDate">Joining Date</Label>
                <Input
                  id="joiningDate"
                  value={newCandidateJoiningDate}
                  onChange={(e) => setNewCandidateJoiningDate(e.target.value)}
                  placeholder="Nov 15, 2025"
                  className="mt-1.5"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={handleStartOnboarding} className="flex-1">
                  Start Onboarding
                </Button>
                <Button variant="outline" onClick={() => setShowStartNewDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveView('onboarding')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            activeView === 'onboarding'
              ? 'bg-gradient-to-r from-[#007AFF] to-[#5856D6] text-white shadow-lg'
              : 'bg-card/60 backdrop-blur-xl border border-border text-foreground hover:bg-card/80'
          }`}
        >
          <Users className="w-4 h-4" />
          Onboarding
        </button>
        <button
          onClick={() => setActiveView('new-hires')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            activeView === 'new-hires'
              ? 'bg-gradient-to-r from-[#007AFF] to-[#5856D6] text-white shadow-lg'
              : 'bg-card/60 backdrop-blur-xl border border-border text-foreground hover:bg-card/80'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          New Hires
        </button>
      </div>

      {/* Onboarding View */}
      {activeView === 'onboarding' && (
        <>
          {/* Info Card */}
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-5 mb-6 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Onboarding Workflow</h3>
                <p className="text-sm text-muted-foreground font-medium">
                  The onboarding process includes 5 email stages. Once the candidate submits the comprehensive onboarding form, HR must review and approve before the employee is added to the system.
                </p>
              </div>
            </div>
          </div>

          {/* Onboarding Candidates */}
          <div className="space-y-4">
            {displayCandidates.length === 0 ? (
              <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-12 text-center shadow-sm">
                <UserCheck className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">
                  {initialTab === 'pending-approval' ? 'No pending approvals' : 'No active onboarding processes'}
                </p>
              </div>
            ) : (
              displayCandidates.map((candidate) => {
                const overallStatus = getOverallStatus(candidate);
                const emailProgress = getEmailProgress(candidate);

                return (
                  <div
                    key={candidate.id}
                    className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{candidate.name}</h3>
                          <p className="text-sm text-muted-foreground font-medium">{candidate.position}</p>
                          <p className="text-xs text-muted-foreground font-medium mt-0.5">
                            {candidate.email} • Joining: {candidate.joiningDate}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={overallStatus === 'completed' ? 'default' : overallStatus === 'pending' ? 'outline' : 'secondary'}
                        className={`gap-1 ${
                          overallStatus === 'completed' ? 'bg-[#34C759]' : 
                          overallStatus === 'pending' ? 'bg-[#FF9500] text-white' : ''
                        }`}
                      >
                        {overallStatus === 'completed' && <CheckCircle className="w-3 h-3" />}
                        {overallStatus === 'pending' && <Clock className="w-3 h-3" />}
                        {overallStatus === 'in-progress' && <Mail className="w-3 h-3" />}
                        {overallStatus === 'completed' ? 'Onboarded' : overallStatus === 'pending' ? 'Awaiting Approval' : 'In Progress'}
                      </Badge>
                    </div>

                    {/* Email Progress */}
                    <div className="mb-6 pb-6 border-b border-border">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#007AFF]" />
                          Email Communication Progress
                        </h4>
                        <span className="text-sm font-medium text-primary">{emailProgress}%</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(candidate.emailStages).map(([stageName, stageData], index) => {
                          const info = getEmailStageInfo(stageName);
                          return (
                            <div
                              key={stageName}
                              className={`border rounded-xl p-3 ${
                                stageData.sent ? 'border-[#34C759] bg-[#34C759]/5' : 'border-border'
                              }`}
                            >
                              <div className="flex items-start gap-2 mb-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  stageData.sent ? 'bg-[#34C759]' : 'bg-muted'
                                }`}>
                                  {stageData.sent ? (
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  ) : (
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-medium text-foreground leading-tight">
                                    Stage {index + 1}: {info.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground font-medium leading-tight mt-0.5">
                                    {info.description}
                                  </div>
                                  {stageData.sent && stageData.sentAt && (
                                    <div className="text-xs text-[#34C759] font-medium mt-1">
                                      ✓ {stageData.sentAt}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {!stageData.sent && (
                                <Button
                                  size="sm"
                                  onClick={() => handleSendNextEmail(candidate.id, stageName)}
                                  className="w-full h-7 text-xs gap-1.5 mt-2"
                                >
                                  <Send className="w-3 h-3" />
                                  Send Email
                                </Button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Form Submission Status */}
                    {candidate.emailStages.stage5_onboardingForm.sent && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#007AFF]" />
                          Onboarding Form Status
                        </h4>
                        
                        <div className={`border rounded-xl p-4 ${
                          candidate.formSubmitted 
                            ? 'border-[#34C759] bg-[#34C759]/5' 
                            : 'border-border bg-background/50'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            {candidate.formSubmitted ? (
                              <>
                                <CheckCircle className="w-5 h-5 text-[#34C759]" />
                                <span className="font-medium text-foreground">Form Submitted Successfully</span>
                              </>
                            ) : (
                              <>
                                <Clock className="w-5 h-5 text-muted-foreground" />
                                <span className="font-medium text-foreground">Awaiting Form Submission</span>
                              </>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground font-medium">
                            {candidate.formSubmitted 
                              ? 'The candidate has submitted the comprehensive onboarding form with 40+ employee details.'
                              : 'Waiting for the candidate to fill and submit the onboarding form.'}
                          </p>
                          
                          {candidate.formSubmitted && candidate.formData && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="w-full mt-3" size="sm">
                                  <FileText className="w-3 h-3 mr-2" />
                                  Review Submitted Form (40+ Fields)
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[900px] max-h-[85vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border">
                                <DialogHeader>
                                  <DialogTitle>Onboarding Form - {candidate.name}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-6 mt-4 pr-2">
                                  {/* Personal Information */}
                                  <div>
                                    <h4 className="font-semibold text-foreground mb-3 text-sm border-b pb-2">Personal Information</h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div><span className="font-medium text-muted-foreground">First Name:</span> <span className="text-foreground">{candidate.formData.firstName}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Middle Name:</span> <span className="text-foreground">{candidate.formData.middleName}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Last Name:</span> <span className="text-foreground">{candidate.formData.lastName}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Date of Birth:</span> <span className="text-foreground">{candidate.formData.dateOfBirth}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Gender:</span> <span className="text-foreground">{candidate.formData.gender}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Marital Status:</span> <span className="text-foreground">{candidate.formData.maritalStatus}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Nationality:</span> <span className="text-foreground">{candidate.formData.nationality}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Blood Group:</span> <span className="text-foreground">{candidate.formData.bloodGroup}</span></div>
                                    </div>
                                  </div>

                                  {/* Contact Information */}
                                  <div>
                                    <h4 className="font-semibold text-foreground mb-3 text-sm border-b pb-2">Contact Information</h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div><span className="font-medium text-muted-foreground">Work Email:</span> <span className="text-foreground">{candidate.email}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Personal Email:</span> <span className="text-foreground">{candidate.formData.personalEmail}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Phone Number:</span> <span className="text-foreground">{candidate.formData.phoneNumber}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Alternate Phone:</span> <span className="text-foreground">{candidate.formData.alternatePhone}</span></div>
                                      <div className="col-span-2"><span className="font-medium text-muted-foreground">Current Address:</span> <span className="text-foreground">{candidate.formData.currentAddress}</span></div>
                                      <div className="col-span-2"><span className="font-medium text-muted-foreground">Permanent Address:</span> <span className="text-foreground">{candidate.formData.permanentAddress}</span></div>
                                      <div><span className="font-medium text-muted-foreground">City:</span> <span className="text-foreground">{candidate.formData.city}</span></div>
                                      <div><span className="font-medium text-muted-foreground">State:</span> <span className="text-foreground">{candidate.formData.state}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Pincode:</span> <span className="text-foreground">{candidate.formData.pincode}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Country:</span> <span className="text-foreground">{candidate.formData.country}</span></div>
                                    </div>
                                  </div>

                                  {/* Emergency Contact */}
                                  <div>
                                    <h4 className="font-semibold text-foreground mb-3 text-sm border-b pb-2">Emergency Contact</h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div><span className="font-medium text-muted-foreground">Contact Name:</span> <span className="text-foreground">{candidate.formData.emergencyContactName}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Relation:</span> <span className="text-foreground">{candidate.formData.emergencyContactRelation}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Contact Phone:</span> <span className="text-foreground">{candidate.formData.emergencyContactPhone}</span></div>
                                      <div className="col-span-2"><span className="font-medium text-muted-foreground">Contact Address:</span> <span className="text-foreground">{candidate.formData.emergencyContactAddress}</span></div>
                                    </div>
                                  </div>

                                  {/* Education */}
                                  <div>
                                    <h4 className="font-semibold text-foreground mb-3 text-sm border-b pb-2">Education</h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div><span className="font-medium text-muted-foreground">Highest Qualification:</span> <span className="text-foreground">{candidate.formData.highestQualification}</span></div>
                                      <div><span className="font-medium text-muted-foreground">University:</span> <span className="text-foreground">{candidate.formData.university}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Graduation Year:</span> <span className="text-foreground">{candidate.formData.graduationYear}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Specialization:</span> <span className="text-foreground">{candidate.formData.specialization}</span></div>
                                    </div>
                                  </div>

                                  {/* Work Experience */}
                                  <div>
                                    <h4 className="font-semibold text-foreground mb-3 text-sm border-b pb-2">Work Experience</h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div><span className="font-medium text-muted-foreground">Previous Company:</span> <span className="text-foreground">{candidate.formData.previousCompany}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Previous Position:</span> <span className="text-foreground">{candidate.formData.previousPosition}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Years at Previous Company:</span> <span className="text-foreground">{candidate.formData.yearsOfExperience}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Total Experience:</span> <span className="text-foreground">{candidate.formData.totalExperience}</span></div>
                                    </div>
                                  </div>

                                  {/* Documents */}
                                  <div>
                                    <h4 className="font-semibold text-foreground mb-3 text-sm border-b pb-2">Identity Documents</h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div><span className="font-medium text-muted-foreground">PAN Number:</span> <span className="text-foreground">{candidate.formData.panNumber}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Aadhar Number:</span> <span className="text-foreground">{candidate.formData.aadharNumber}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Passport Number:</span> <span className="text-foreground">{candidate.formData.passportNumber}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Driving License:</span> <span className="text-foreground">{candidate.formData.drivingLicense}</span></div>
                                    </div>
                                  </div>

                                  {/* Bank Details */}
                                  <div>
                                    <h4 className="font-semibold text-foreground mb-3 text-sm border-b pb-2">Bank Details</h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div><span className="font-medium text-muted-foreground">Bank Name:</span> <span className="text-foreground">{candidate.formData.bankName}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Account Number:</span> <span className="text-foreground">{candidate.formData.accountNumber}</span></div>
                                      <div><span className="font-medium text-muted-foreground">IFSC Code:</span> <span className="text-foreground">{candidate.formData.ifscCode}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Branch Name:</span> <span className="text-foreground">{candidate.formData.branchName}</span></div>
                                    </div>
                                  </div>

                                  {/* Professional Details */}
                                  <div>
                                    <h4 className="font-semibold text-foreground mb-3 text-sm border-b pb-2">Professional Details</h4>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                      <div><span className="font-medium text-muted-foreground">Employee ID:</span> <span className="text-foreground">{candidate.formData.employeeId}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Joining Date:</span> <span className="text-foreground">{candidate.formData.joiningDate}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Position:</span> <span className="text-foreground">{candidate.formData.position}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Department:</span> <span className="text-foreground">{candidate.formData.department}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Reporting Manager:</span> <span className="text-foreground">{candidate.formData.reportingManager}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Work Location:</span> <span className="text-foreground">{candidate.formData.workLocation}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Employment Type:</span> <span className="text-foreground">{candidate.formData.employmentType}</span></div>
                                      <div><span className="font-medium text-muted-foreground">Probation Period:</span> <span className="text-foreground">{candidate.formData.probationPeriod}</span></div>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    )}

                    {/* HR Approval Section */}
                    {candidate.formSubmitted && !candidate.hrApproved && (
                      <div className="bg-[#FF9500]/10 border border-[#FF9500]/30 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="w-5 h-5 text-[#FF9500]" />
                          <p className="font-medium text-foreground">HR Approval Required</p>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium mb-4">
                          Review all submitted information and verify details before approving the candidate. Once approved, the employee will be added to the system and a welcome announcement will be sent to the team.
                        </p>
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleApproveCandidate(candidate.id)}
                            className="flex-1 gap-2 bg-[#34C759] hover:bg-[#30D158]"
                          >
                            <Check className="w-4 h-4" />
                            Approve & Add to System
                          </Button>
                          <Button
                            onClick={() => handleRejectCandidate(candidate.id)}
                            variant="outline"
                            className="flex-1 gap-2 border-red-500 text-red-500 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Completed Status */}
                    {candidate.hrApproved && candidate.addedToSystem && (
                      <div className="bg-[#34C759]/10 border border-[#34C759]/30 rounded-xl p-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#34C759]" />
                          <p className="font-medium text-foreground">Onboarding Complete</p>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium mt-2">
                          {candidate.name} has been successfully onboarded and added to the employee database. Welcome announcement has been sent to the team.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* New Hires View */}
      {activeView === 'new-hires' && (
        <div>
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-5 mb-6 shadow-sm">
            <div className="flex items-start gap-3">
              <UserPlus className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Recently Onboarded Employees</h3>
                <p className="text-sm text-muted-foreground font-medium">
                  View all employees who have been successfully onboarded and added to the system.
                </p>
              </div>
            </div>
          </div>

          {newHires.length === 0 ? (
            <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-12 text-center shadow-sm">
              <UserPlus className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No new hires yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newHires.map((employee) => (
                <div
                  key={employee.id}
                  className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#34C759] to-[#30D158] flex items-center justify-center">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground font-medium truncate">{employee.position}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground font-medium">Department:</span>
                      <span className="text-foreground font-medium">{employee.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground font-medium">Joined:</span>
                      <span className="text-foreground font-medium">{employee.joiningDate}</span>
                    </div>
                  </div>
                  <Badge className="w-full mt-4 bg-[#34C759] hover:bg-[#30D158] justify-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Onboarded
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
