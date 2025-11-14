import { MessageSquare, Send, Bot } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Mock employee database for RAG-like responses
const employeeDatabase = {
  'EMP001': { name: 'Sarah Johnson', department: 'Engineering', position: 'Senior Software Engineer', salary: 95000, joinDate: '2020-03-15', status: 'Active' },
  'EMP002': { name: 'Michael Chen', department: 'Engineering', position: 'Engineering Manager', salary: 125000, joinDate: '2018-07-20', status: 'Active' },
  'EMP003': { name: 'Emily Davis', department: 'HR', position: 'HR Director', salary: 110000, joinDate: '2019-01-10', status: 'Active' },
  'EMP004': { name: 'Alex Martinez', department: 'Design', position: 'UX Designer', salary: 85000, joinDate: '2021-06-01', status: 'Active' },
  'EMP005': { name: 'Jessica Lee', department: 'Marketing', position: 'Marketing Specialist', salary: 72000, joinDate: '2022-02-14', status: 'Active' },
};

const hrPolicies = {
  leave: {
    annual: '20 days per year',
    sick: '10 days per year',
    maternity: '16 weeks',
    paternity: '2 weeks',
  },
  workingHours: '9:00 AM to 6:00 PM, Monday to Friday',
  benefits: ['Health Insurance', 'Dental Coverage', '401(k) Matching', 'Gym Membership', 'Learning Budget'],
  remoteWork: 'Hybrid - 3 days in office, 2 days remote',
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: 'Hello! I\'m your HR AI Assistant with access to the employee database and company policies. I can help you with:\n\n• Employee information and details\n• Leave policies and balances\n• Company policies and benefits\n• Payroll and compensation queries\n• Working hours and remote work policy\n\nHow can I assist you today?', 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase().trim();
    
    // Employee lookup queries
    if (msg.includes('employee') && (msg.includes('list') || msg.includes('count') || msg.includes('how many'))) {
      const count = Object.keys(employeeDatabase).length;
      return `We currently have ${count} active employees in our database:\n\n${Object.entries(employeeDatabase).map(([id, emp]) => `• ${emp.name} (${id}) - ${emp.position}, ${emp.department}`).join('\n')}`;
    }
    
    // Check for employee ID
    const empIdMatch = msg.match(/emp\d{3}/i);
    if (empIdMatch) {
      const empId = empIdMatch[0].toUpperCase();
      const emp = employeeDatabase[empId as keyof typeof employeeDatabase];
      if (emp) {
        return `Employee Details for ${empId}:\n\n• Name: ${emp.name}\n• Position: ${emp.position}\n• Department: ${emp.department}\n• Salary: $${emp.salary.toLocaleString()}\n• Join Date: ${emp.joinDate}\n• Status: ${emp.status}`;
      }
    }
    
    // Search by name
    for (const [id, emp] of Object.entries(employeeDatabase)) {
      if (msg.includes(emp.name.toLowerCase())) {
        return `Employee Details for ${emp.name} (${id}):\n\n• Position: ${emp.position}\n• Department: ${emp.department}\n• Salary: $${emp.salary.toLocaleString()}\n• Join Date: ${emp.joinDate}\n• Status: ${emp.status}`;
      }
    }
    
    // Department queries
    if (msg.includes('engineering') || msg.includes('engineer')) {
      const engEmps = Object.entries(employeeDatabase).filter(([_, emp]) => emp.department === 'Engineering');
      return `Engineering Department has ${engEmps.length} employees:\n\n${engEmps.map(([id, emp]) => `• ${emp.name} (${id}) - ${emp.position}`).join('\n')}`;
    }
    
    // Leave policy queries
    if (msg.includes('leave') || msg.includes('vacation') || msg.includes('time off') || msg.includes('pto')) {
      return `📋 Leave Policy:\n\n• Annual Leave: ${hrPolicies.leave.annual}\n• Sick Leave: ${hrPolicies.leave.sick}\n• Maternity Leave: ${hrPolicies.leave.maternity}\n• Paternity Leave: ${hrPolicies.leave.paternity}\n\nLeave requests should be submitted at least 2 weeks in advance through the HR portal.`;
    }
    
    // Working hours query
    if (msg.includes('working hours') || msg.includes('office hours') || msg.includes('work time')) {
      return `⏰ Working Hours:\n\n${hrPolicies.workingHours}\n\nWe follow a ${hrPolicies.remoteWork} policy.`;
    }
    
    // Remote work policy
    if (msg.includes('remote') || msg.includes('work from home') || msg.includes('wfh') || msg.includes('hybrid')) {
      return `🏠 Remote Work Policy:\n\n${hrPolicies.remoteWork}\n\nEmployees can choose which days to work remotely based on team coordination.`;
    }
    
    // Benefits query
    if (msg.includes('benefit') || msg.includes('perks') || msg.includes('insurance')) {
      return `💼 Employee Benefits:\n\n${hrPolicies.benefits.map(b => `• ${b}`).join('\n')}\n\nFor detailed information about each benefit, please contact HR at hr@company.com`;
    }
    
    // Salary/Payroll queries
    if (msg.includes('salary') || msg.includes('payroll') || msg.includes('compensation')) {
      const avgSalary = Math.round(Object.values(employeeDatabase).reduce((sum, emp) => sum + emp.salary, 0) / Object.keys(employeeDatabase).length);
      return `💰 Payroll Information:\n\n• Payroll is processed on the last working day of each month\n• Average salary across all employees: $${avgSalary.toLocaleString()}\n• Annual performance reviews in Q4\n\nFor individual salary queries, please specify an employee ID or name.`;
    }
    
    // Total employees count
    if (msg.includes('total') && (msg.includes('employee') || msg.includes('staff'))) {
      return `We currently have ${Object.keys(employeeDatabase).length} active employees across all departments.`;
    }
    
    // Department list
    if (msg.includes('department')) {
      const depts = [...new Set(Object.values(employeeDatabase).map(emp => emp.department))];
      return `📊 Departments:\n\n${depts.map(dept => {
        const count = Object.values(employeeDatabase).filter(emp => emp.department === dept).length;
        return `• ${dept} (${count} employee${count > 1 ? 's' : ''})`;
      }).join('\n')}`;
    }
    
    // Greetings
    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
      return 'Hello! How can I assist you with HR-related queries today? I have access to employee records, leave policies, benefits, and more.';
    }
    
    if (msg.includes('thank') || msg.includes('thanks')) {
      return 'You\'re welcome! Feel free to ask if you need anything else.';
    }
    
    // Default response with suggestions
    return `I can help you with:\n\n• Employee information (try "show employee EMP001" or "who is Sarah Johnson")\n• Leave policies and balances\n• Benefits and perks\n• Department information\n• Salary and payroll queries\n• Working hours and remote work policy\n\nWhat would you like to know?`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleQuickQuery = (query: string) => {
    setInput(query);
  };

  const quickQueries = [
    'Show all employees',
    'What is the leave policy?',
    'Show employee EMP001',
    'What are the benefits?',
    'Working hours policy',
    'Engineering department employees',
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#5856D6] flex items-center justify-center shadow-md">
          <Bot className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">HR AI Assistant</h2>
          <p className="text-sm text-muted-foreground font-medium">Ask anything about employees, policies, and HR data</p>
        </div>
      </div>

      {/* Quick Query Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {quickQueries.map((query, index) => (
          <button
            key={index}
            onClick={() => handleQuickQuery(query)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-accent/50 text-foreground hover:bg-accent transition-colors border border-border"
          >
            {query}
          </button>
        ))}
      </div>

      <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-4 h-4" />
                    <span className="text-xs font-semibold opacity-70">HR AI Assistant</span>
                  </div>
                )}
                <p className="text-sm font-medium whitespace-pre-line">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about employees, policies, leave, benefits..."
              className="flex-1"
            />
            <Button onClick={handleSend} className="gap-2">
              <Send className="w-4 h-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}