import { UserX, FileText, CheckCircle, Clock, AlertCircle, DollarSign, Package, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface DeboardingRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  department: string;
  resignationDate: string;
  lastWorkingDay: string;
  reason: string;
  hrApproval: 'pending' | 'approved' | 'rejected';
  financeApproval: 'pending' | 'approved' | 'rejected';
  managerApproval: 'pending' | 'approved' | 'rejected';
  assetsReturned: boolean;
  finalSettlement: boolean;
}

export function Deboarding() {
  const [deboardingRequests, setDeboardingRequests] = useState<DeboardingRequest[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'Vikram Singh',
      position: 'Senior Developer',
      department: 'Engineering',
      resignationDate: '2025-10-15',
      lastWorkingDay: '2025-11-15',
      reason: 'Better opportunity abroad',
      hrApproval: 'approved',
      financeApproval: 'pending',
      managerApproval: 'approved',
      assetsReturned: false,
      finalSettlement: false,
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Anjali Mehta',
      position: 'Marketing Manager',
      department: 'Marketing',
      resignationDate: '2025-10-20',
      lastWorkingDay: '2025-11-20',
      reason: 'Personal reasons - relocating',
      hrApproval: 'pending',
      financeApproval: 'pending',
      managerApproval: 'pending',
      assetsReturned: false,
      finalSettlement: false,
    },
  ]);

  const [userRole] = useState<'hr' | 'finance' | 'manager'>('hr'); // Simulating logged-in user role

  const handleApproval = (requestId: string, approvalType: 'hr' | 'finance' | 'manager', status: 'approved' | 'rejected') => {
    setDeboardingRequests(prev =>
      prev.map(req => {
        if (req.id === requestId) {
          const updated = { ...req };
          if (approvalType === 'hr') updated.hrApproval = status;
          if (approvalType === 'finance') updated.financeApproval = status;
          if (approvalType === 'manager') updated.managerApproval = status;
          return updated;
        }
        return req;
      })
    );
    toast.success(`${approvalType.toUpperCase()} approval ${status}!`);
  };

  const handleAssetReturn = (requestId: string) => {
    setDeboardingRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, assetsReturned: true } : req
      )
    );
    toast.success('Assets marked as returned!');
  };

  const handleFinalSettlement = (requestId: string) => {
    setDeboardingRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, finalSettlement: true } : req
      )
    );
    toast.success('Final settlement processed!');
  };

  const handleRemoveFromDatabase = (request: DeboardingRequest) => {
    if (request.hrApproval !== 'approved' || request.financeApproval !== 'approved' || request.managerApproval !== 'approved') {
      toast.error('All approvals required before removing from database!');
      return;
    }
    if (!request.assetsReturned) {
      toast.error('Assets must be returned before deboarding!');
      return;
    }
    if (!request.finalSettlement) {
      toast.error('Final settlement must be processed before deboarding!');
      return;
    }

    toast.success(`${request.employeeName} has been deboarded and moved to Previous Employees database.`);
    setDeboardingRequests(prev => prev.filter(req => req.id !== request.id));
  };

  const getApprovalStatus = (request: DeboardingRequest) => {
    const approvals = [request.hrApproval, request.financeApproval, request.managerApproval];
    if (approvals.some(a => a === 'rejected')) return 'rejected';
    if (approvals.every(a => a === 'approved')) return 'approved';
    return 'pending';
  };

  const canDeboard = (request: DeboardingRequest) => {
    return (
      request.hrApproval === 'approved' &&
      request.financeApproval === 'approved' &&
      request.managerApproval === 'approved' &&
      request.assetsReturned &&
      request.finalSettlement
    );
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF3B30] to-[#FF9500] flex items-center justify-center shadow-lg">
          <UserX className="w-7 h-7 text-white drop-shadow-md" />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-foreground">Employee Deboarding</h2>
          <p className="text-sm text-muted-foreground font-medium mt-0.5">Multi-level approval workflow for employee exits</p>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Deboarding Workflow</h3>
            <p className="text-sm text-muted-foreground font-medium">
              Complete deboarding requires approval from HR, Finance, and Manager. After all approvals, ensure assets are returned and final settlement is processed before removing the employee from the database.
            </p>
          </div>
        </div>
      </div>

      {/* Deboarding Requests */}
      <div className="space-y-4">
        {deboardingRequests.length === 0 ? (
          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-12 text-center shadow-sm">
            <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">No active deboarding requests</p>
          </div>
        ) : (
          deboardingRequests.map((request) => {
            const overallStatus = getApprovalStatus(request);
            const isDeboardable = canDeboard(request);

            return (
              <div
                key={request.id}
                className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF3B30] to-[#FF9500] flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{request.employeeName}</h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        {request.position} • {request.department}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        Employee ID: {request.employeeId}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={overallStatus === 'approved' ? 'default' : overallStatus === 'rejected' ? 'destructive' : 'outline'}
                    className="gap-1"
                  >
                    {overallStatus === 'approved' && <CheckCircle className="w-3 h-3" />}
                    {overallStatus === 'pending' && <Clock className="w-3 h-3" />}
                    {overallStatus === 'rejected' && <AlertCircle className="w-3 h-3" />}
                    {overallStatus.charAt(0).toUpperCase() + overallStatus.slice(1)}
                  </Badge>
                </div>

                {/* Resignation Details */}
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                  <div>
                    <Label className="text-xs text-muted-foreground">Resignation Date</Label>
                    <p className="text-sm font-medium mt-1">{request.resignationDate}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Last Working Day</Label>
                    <p className="text-sm font-medium mt-1">{request.lastWorkingDay}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Reason</Label>
                    <p className="text-sm font-medium mt-1">{request.reason}</p>
                  </div>
                </div>

                {/* Approval Workflow */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#007AFF]" />
                    Approval Workflow
                  </h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {/* HR Approval */}
                    <div className={`border rounded-xl p-4 ${request.hrApproval === 'approved' ? 'border-[#34C759] bg-[#34C759]/5' : request.hrApproval === 'rejected' ? 'border-red-500 bg-red-50' : 'border-border'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="w-4 h-4 text-[#007AFF]" />
                        <h5 className="font-medium text-sm">HR Approval</h5>
                      </div>
                      {request.hrApproval === 'pending' && userRole === 'hr' ? (
                        <div className="space-y-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproval(request.id, 'hr', 'approved')}
                            className="w-full bg-[#34C759] hover:bg-[#30D158]"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApproval(request.id, 'hr', 'rejected')}
                            className="w-full border-red-500 text-red-500"
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Badge
                          variant={request.hrApproval === 'approved' ? 'default' : request.hrApproval === 'rejected' ? 'destructive' : 'outline'}
                          className="w-full justify-center"
                        >
                          {request.hrApproval === 'approved' && '✓ Approved'}
                          {request.hrApproval === 'rejected' && '✗ Rejected'}
                          {request.hrApproval === 'pending' && '⏳ Pending'}
                        </Badge>
                      )}
                    </div>

                    {/* Finance Approval */}
                    <div className={`border rounded-xl p-4 ${request.financeApproval === 'approved' ? 'border-[#34C759] bg-[#34C759]/5' : request.financeApproval === 'rejected' ? 'border-red-500 bg-red-50' : 'border-border'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="w-4 h-4 text-[#34C759]" />
                        <h5 className="font-medium text-sm">Finance Approval</h5>
                      </div>
                      {request.financeApproval === 'pending' && userRole === 'finance' ? (
                        <div className="space-y-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproval(request.id, 'finance', 'approved')}
                            className="w-full bg-[#34C759] hover:bg-[#30D158]"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApproval(request.id, 'finance', 'rejected')}
                            className="w-full border-red-500 text-red-500"
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Badge
                          variant={request.financeApproval === 'approved' ? 'default' : request.financeApproval === 'rejected' ? 'destructive' : 'outline'}
                          className="w-full justify-center"
                        >
                          {request.financeApproval === 'approved' && '✓ Approved'}
                          {request.financeApproval === 'rejected' && '✗ Rejected'}
                          {request.financeApproval === 'pending' && '⏳ Pending'}
                        </Badge>
                      )}
                    </div>

                    {/* Manager Approval */}
                    <div className={`border rounded-xl p-4 ${request.managerApproval === 'approved' ? 'border-[#34C759] bg-[#34C759]/5' : request.managerApproval === 'rejected' ? 'border-red-500 bg-red-50' : 'border-border'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4 text-[#5856D6]" />
                        <h5 className="font-medium text-sm">Manager Approval</h5>
                      </div>
                      {request.managerApproval === 'pending' && userRole === 'manager' ? (
                        <div className="space-y-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproval(request.id, 'manager', 'approved')}
                            className="w-full bg-[#34C759] hover:bg-[#30D158]"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApproval(request.id, 'manager', 'rejected')}
                            className="w-full border-red-500 text-red-500"
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <Badge
                          variant={request.managerApproval === 'approved' ? 'default' : request.managerApproval === 'rejected' ? 'destructive' : 'outline'}
                          className="w-full justify-center"
                        >
                          {request.managerApproval === 'approved' && '✓ Approved'}
                          {request.managerApproval === 'rejected' && '✗ Rejected'}
                          {request.managerApproval === 'pending' && '⏳ Pending'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Asset Return & Final Settlement */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className={`border rounded-xl p-4 ${request.assetsReturned ? 'border-[#34C759] bg-[#34C759]/5' : 'border-border'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Package className="w-4 h-4 text-[#FF9500]" />
                      <h5 className="font-medium text-sm">Asset Return</h5>
                    </div>
                    {request.assetsReturned ? (
                      <Badge variant="default" className="w-full justify-center bg-[#34C759]">
                        ✓ All Assets Returned
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleAssetReturn(request.id)}
                        className="w-full"
                        variant="outline"
                      >
                        Mark as Returned
                      </Button>
                    )}
                  </div>

                  <div className={`border rounded-xl p-4 ${request.finalSettlement ? 'border-[#34C759] bg-[#34C759]/5' : 'border-border'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-4 h-4 text-[#34C759]" />
                      <h5 className="font-medium text-sm">Final Settlement</h5>
                    </div>
                    {request.finalSettlement ? (
                      <Badge variant="default" className="w-full justify-center bg-[#34C759]">
                        ✓ Settlement Complete
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleFinalSettlement(request.id)}
                        className="w-full"
                        variant="outline"
                      >
                        Process Settlement
                      </Button>
                    )}
                  </div>
                </div>

                {/* Final Action */}
                {isDeboardable && (
                  <div className="bg-[#34C759]/10 border border-[#34C759]/30 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-[#34C759]" />
                      <p className="font-medium text-foreground">Ready to Deboard</p>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium mb-3">
                      All approvals received, assets returned, and settlement processed. You can now remove this employee from the active database.
                    </p>
                    <Button
                      onClick={() => handleRemoveFromDatabase(request)}
                      className="w-full gap-2 bg-[#FF3B30] hover:bg-[#FF453A]"
                    >
                      <UserX className="w-4 h-4" />
                      Complete Deboarding & Move to Previous Employees
                    </Button>
                  </div>
                )}

                {overallStatus === 'rejected' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <p className="font-medium text-red-900">Deboarding Request Rejected</p>
                    </div>
                    <p className="text-sm text-red-700 mt-2">
                      This deboarding request has been rejected by one or more approvers. Please contact HR for further action.
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}