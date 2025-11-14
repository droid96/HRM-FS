import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

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

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: 'Hello! I\'m your HR AI Assistant with access to the employee database and company policies. How can I assist you today?', 
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
    
    // Leave policy queries
    if (msg.includes('leave') || msg.includes('vacation') || msg.includes('time off') || msg.includes('pto')) {
      return `📋 Leave Policy:\n\n• Annual Leave: ${hrPolicies.leave.annual}\n• Sick Leave: ${hrPolicies.leave.sick}\n• Maternity Leave: ${hrPolicies.leave.maternity}\n• Paternity Leave: ${hrPolicies.leave.paternity}`;
    }
    
    // Benefits query
    if (msg.includes('benefit') || msg.includes('perks') || msg.includes('insurance')) {
      return `💼 Employee Benefits:\n\n${hrPolicies.benefits.map(b => `• ${b}`).join('\n')}`;
    }
    
    // Greetings
    if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
      return 'Hello! How can I assist you with HR-related queries today?';
    }
    
    // Default response
    return `I can help you with:\n\n• Employee information\n• Leave policies\n• Benefits and perks\n• Department information\n\nWhat would you like to know?`;
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

  return (
    <>
      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-accent-foreground" />
              <span className="font-semibold text-foreground">HR AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-accent/50 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="flex items-center gap-1 mb-1">
                      <Bot className="w-3 h-3" />
                      <span className="text-xs opacity-70">Assistant</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 text-sm"
              />
              <Button onClick={handleSend} size="sm" className="gap-2">
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#5856D6]/30 to-[#8b6fd9]/30 backdrop-blur-md border border-[#5856D6]/20 flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:from-[#5856D6] hover:to-[#8b6fd9] active:from-[#5856D6] active:to-[#8b6fd9]"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white drop-shadow-sm" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white drop-shadow-sm" />
        )}
      </button>
    </>
  );
}