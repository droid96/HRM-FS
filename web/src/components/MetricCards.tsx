import { Users, CheckCircle, Mail, TrendingUp } from 'lucide-react';

export function MetricCards() {
  const metrics = [
    {
      icon: Users,
      label: 'Total Employees',
      value: '248',
      change: '+12%',
      changeType: 'positive',
      iconBg: 'bg-[#007AFF]',
    },
    {
      icon: CheckCircle,
      label: 'Attendance Rate',
      value: '94.2%',
      change: '+2.8%',
      changeType: 'positive',
      iconBg: 'bg-[#34C759]',
    },
    {
      icon: Mail,
      label: 'Pending Requests',
      value: '23',
      change: '-3',
      changeType: 'neutral',
      iconBg: 'bg-[#FF9500]',
    },
    {
      icon: TrendingUp,
      label: 'Performance Score',
      value: '8.7/10',
      change: '+0.3',
      changeType: 'positive',
      iconBg: 'bg-[#5856D6]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="relative overflow-hidden bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 hover:shadow-md transition-all duration-300 shadow-sm"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 rounded-2xl ${metric.iconBg} flex items-center justify-center shadow-lg relative`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
              <metric.icon className="w-7 h-7 text-white drop-shadow-lg relative z-10" />
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                metric.changeType === 'positive'
                  ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                  : 'bg-gray-500/10 text-gray-600 dark:text-gray-400'
              }`}
            >
              {metric.change}
            </span>
          </div>
          <p className="text-sm text-foreground mb-1 font-medium">{metric.label}</p>
          <p className="text-3xl font-semibold text-card-foreground">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}