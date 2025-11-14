import { Search, UserPlus, Filter, Network, ChevronDown, ChevronRight, Building2, Users } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { EMPLOYEES, Employee } from '../employeeData';

export function EmployeeList() {
  const [activeTab, setActiveTab] = useState('list');
  const [expandedDepts, setExpandedDepts] = useState<{ [key: string]: boolean }>({});
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  // Department colors
  const deptColors: { [key: string]: { bg: string; border: string; text: string } } = {
    'Executive': { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-600 dark:text-red-400' },
    'Engineering': { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-600 dark:text-blue-400' },
    'IT': { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-600 dark:text-cyan-400' },
    'Product': { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-600 dark:text-purple-400' },
    'Finance': { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-600 dark:text-green-400' },
    'Operations': { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-600 dark:text-orange-400' },
    'Sales': { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-600 dark:text-pink-400' },
    'Customer Success': { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-600 dark:text-indigo-400' },
  };

  // Group employees by department
  const getDepartmentTree = () => {
    const departments: { [key: string]: Employee[] } = {};
    
    EMPLOYEES.forEach(emp => {
      if (!departments[emp.department]) {
        departments[emp.department] = [];
      }
      departments[emp.department].push(emp);
    });

    return departments;
  };

  const departmentTree = getDepartmentTree();

  const toggleDepartment = (dept: string) => {
    setExpandedDepts(prev => ({ ...prev, [dept]: !prev[dept] }));
  };

  // Get CEO
  const getCEO = () => {
    return EMPLOYEES.find(e => e.position.includes('CEO'));
  };

  // Build complete organization hierarchy
  const buildCompleteHierarchy = () => {
    const ceo = getCEO();
    if (!ceo) return null;

    const buildTree = (manager: Employee): any => {
      const directReports = EMPLOYEES.filter(e => e.reportingManager === manager.name);
      return {
        employee: manager,
        reports: directReports.map(emp => buildTree(emp))
      };
    };

    return buildTree(ceo);
  };

  // Render full org chart
  const renderOrgNode = (node: any, level: number = 0) => {
    if (!node) return null;

    const employee = node.employee;
    const dept = employee.department;
    const colors = deptColors[dept] || deptColors['Executive'];
    const hasReports = node.reports && node.reports.length > 0;
    const isCEO = level === 0;
    const isExpanded = expandedDepts[employee.id] !== false; // Default expanded

    return (
      <div key={employee.id} className="flex flex-col items-center">
        {/* Employee Card */}
        <div className={`relative ${isCEO ? 'mb-8' : 'mb-6'}`}>
          <div
            className={`
              ${colors.bg} ${colors.border} border-2 rounded-2xl p-4 
              ${isCEO ? 'min-w-[280px]' : 'min-w-[240px]'} 
              backdrop-blur-sm shadow-lg hover:shadow-xl transition-all
              ${isCEO ? 'ring-4 ring-[#007AFF]/20' : ''}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`${isCEO ? 'w-12 h-12' : 'w-10 h-10'} rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white ${isCEO ? 'text-lg' : ''} font-semibold shadow-md`}>
                {employee.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-bold ${colors.text} ${isCEO ? 'text-lg' : 'text-sm'} truncate`}>
                  {employee.name}
                </div>
                <div className={`text-xs text-muted-foreground font-medium truncate ${isCEO ? 'mt-0.5' : ''}`}>
                  {employee.position}
                </div>
                {isCEO && (
                  <div className="mt-1 px-2 py-0.5 rounded-md bg-primary/20 text-primary text-xs font-semibold inline-block">
                    CEO
                  </div>
                )}
              </div>
            </div>
            
            {hasReports && (
              <button
                onClick={() => setExpandedDepts(prev => ({ ...prev, [employee.id]: !prev[employee.id] }))}
                className="mt-3 w-full flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                <span className="font-medium">{node.reports.length} {node.reports.length === 1 ? 'Direct Report' : 'Direct Reports'}</span>
              </button>
            )}
          </div>

          {/* Vertical connector line to children */}
          {hasReports && isExpanded && (
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-border h-6 -bottom-6" />
          )}
        </div>

        {/* Direct Reports */}
        {hasReports && isExpanded && (
          <div className="flex flex-col items-center w-full">
            {/* Horizontal line */}
            {node.reports.length > 1 && (
              <div className="relative w-full flex justify-center mb-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-border" style={{ width: `${Math.min(node.reports.length * 260, 95)}%` }} />
              </div>
            )}
            
            {/* Children nodes */}
            <div className={`flex ${node.reports.length > 1 ? 'gap-8 justify-center flex-wrap' : 'flex-col items-center'} w-full`}>
              {node.reports.map((report: any, idx: number) => (
                <div key={report.employee.id} className="relative flex flex-col items-center">
                  {/* Vertical line from horizontal connector to card */}
                  {node.reports.length > 1 && (
                    <div className="absolute w-0.5 bg-border h-6 -top-6 left-1/2 -translate-x-1/2" />
                  )}
                  {renderOrgNode(report, level + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Build department hierarchy
  const buildDepartmentHierarchy = (deptName: string) => {
    const deptEmployees = departmentTree[deptName];
    if (!deptEmployees) return null;

    // Find the head of this department
    const head = deptEmployees.find(e => 
      !e.reportingManager || 
      e.position.includes('CEO') ||
      e.position.includes('CTO') ||
      e.position.includes('CIO') ||
      e.position.includes('CFO') ||
      e.position.includes('COO') ||
      e.position.includes('CPO') ||
      e.position.includes('CRO') ||
      deptEmployees.every(other => other.reportingManager !== e.reportingManager)
    );

    if (!head) return null;

    const buildTree = (manager: Employee): any => {
      const directReports = deptEmployees.filter(e => e.reportingManager === manager.name);
      return {
        employee: manager,
        reports: directReports.map(emp => buildTree(emp))
      };
    };

    return buildTree(head);
  };

  const fullOrgHierarchy = buildCompleteHierarchy();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-[#007AFF] flex items-center justify-center shadow-md">
            <svg className="w-7 h-7 text-white drop-shadow-sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="2.5" fill="currentColor" opacity="0.9" />
              <circle cx="17" cy="7" r="2.5" fill="currentColor" opacity="0.9" />
              <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.9" />
              <circle cx="7" cy="17" r="2.5" fill="currentColor" opacity="0.9" />
              <circle cx="17" cy="17" r="2.5" fill="currentColor" opacity="0.9" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Employee List</h2>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">Manage and view all employees</p>
          </div>
        </div>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="list" className="gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="2" fill="currentColor" opacity="0.9" />
              <circle cx="17" cy="7" r="2" fill="currentColor" opacity="0.9" />
              <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.9" />
              <circle cx="7" cy="17" r="2" fill="currentColor" opacity="0.9" />
              <circle cx="17" cy="17" r="2" fill="currentColor" opacity="0.9" />
            </svg>
            Employee List
          </TabsTrigger>
          <TabsTrigger value="tree" className="gap-2">
            <Network className="w-4 h-4" />
            Organization Chart
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search employees..." className="pl-9" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>

          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-medium text-sm text-foreground">S. No.</th>
                    <th className="text-left p-4 font-medium text-sm text-foreground">Name</th>
                    <th className="text-left p-4 font-medium text-sm text-foreground">Position</th>
                    <th className="text-left p-4 font-medium text-sm text-foreground">Department</th>
                    <th className="text-left p-4 font-medium text-sm text-foreground">Reporting To</th>
                    <th className="text-left p-4 font-medium text-sm text-foreground">Email</th>
                    <th className="text-left p-4 font-medium text-sm text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {EMPLOYEES.map((employee) => (
                    <tr key={employee.id} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                      <td className="p-4 text-sm text-muted-foreground font-medium">{employee.sNo}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5da3ff]/90 to-[#8b6fd9]/90 flex items-center justify-center text-white text-sm font-medium">
                            {employee.name.charAt(0)}
                          </div>
                          <span className="font-medium text-foreground">{employee.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground font-medium">{employee.position}</td>
                      <td className="p-4 text-sm text-muted-foreground font-medium">{employee.department}</td>
                      <td className="p-4 text-sm text-muted-foreground font-medium">
                        {employee.reportingManager || '—'}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground font-medium">{employee.email}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          employee.status === 'Completed'
                            ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                            : employee.status === 'In Progress'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                            : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tree">
          <div className="flex gap-6">
            {/* Sidebar - Department List */}
            <div className="w-72 flex-shrink-0">
              <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-sm sticky top-6">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Departments</h3>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedDept(null)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      selectedDept === null
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-accent/30 hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4" />
                      <span className="text-sm font-medium">Full Organization</span>
                    </div>
                    <span className="text-xs font-semibold bg-background/20 px-2 py-0.5 rounded-md">
                      {EMPLOYEES.length}
                    </span>
                  </button>

                  {Object.entries(departmentTree).map(([dept, employees]) => {
                    const colors = deptColors[dept] || deptColors['Executive'];
                    return (
                      <button
                        key={dept}
                        onClick={() => setSelectedDept(dept)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                          selectedDept === dept
                            ? `${colors.bg} ${colors.border} border-2 shadow-md`
                            : 'bg-accent/30 hover:bg-accent/50 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Users className={`w-4 h-4 ${selectedDept === dept ? colors.text : 'text-muted-foreground'}`} />
                          <span className={`text-sm font-medium ${selectedDept === dept ? colors.text : 'text-foreground'}`}>
                            {dept}
                          </span>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                          selectedDept === dept ? `${colors.bg} ${colors.text}` : 'bg-muted text-muted-foreground'
                        }`}>
                          {employees.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Area - Organization Chart */}
            <div className="flex-1">
              <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-sm min-h-[600px]">
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                    <Network className="w-5 h-5 text-primary" />
                    {selectedDept ? `${selectedDept} Department Hierarchy` : 'Complete Organization Chart'}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium mt-1">
                    {selectedDept 
                      ? `Hierarchical structure of the ${selectedDept} department` 
                      : 'Full company organizational hierarchy from CEO down'
                    }
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-max py-8">
                    {selectedDept ? (
                      buildDepartmentHierarchy(selectedDept) ? (
                        renderOrgNode(buildDepartmentHierarchy(selectedDept))
                      ) : (
                        <div className="text-center py-12">
                          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                          <p className="text-muted-foreground">No hierarchy data available for this department</p>
                        </div>
                      )
                    ) : (
                      fullOrgHierarchy ? (
                        renderOrgNode(fullOrgHierarchy)
                      ) : (
                        <div className="text-center py-12">
                          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                          <p className="text-muted-foreground">No organizational data available</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}