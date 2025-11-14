import { Award, TrendingUp, Star, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface PerformanceReview {
  employeeId: string;
  employeeName: string;
  department: string;
  rating: number;
  period: string;
  overallScore: number;
  categories: {
    technical: number;
    communication: number;
    teamwork: number;
    initiative: number;
    quality: number;
  };
  strengths: string[];
  improvements: string[];
  status: 'Pending' | 'In Progress' | 'Completed';
}

export function PerformanceReview() {
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 2025');

  const reviews: PerformanceReview[] = [
    {
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      department: 'Engineering',
      rating: 4.5,
      period: 'Q4 2025',
      overallScore: 90,
      categories: {
        technical: 95,
        communication: 85,
        teamwork: 90,
        initiative: 88,
        quality: 92,
      },
      strengths: ['Strong technical skills', 'Excellent problem-solving', 'Proactive approach'],
      improvements: ['Time management', 'Documentation'],
      status: 'Completed',
    },
    {
      employeeId: 'EMP002',
      employeeName: 'Priya Patel',
      department: 'Design',
      rating: 4.8,
      period: 'Q4 2025',
      overallScore: 96,
      categories: {
        technical: 98,
        communication: 95,
        teamwork: 96,
        initiative: 94,
        quality: 97,
      },
      strengths: ['Outstanding design skills', 'Great collaboration', 'Innovation'],
      improvements: ['Public speaking'],
      status: 'Completed',
    },
    {
      employeeId: 'EMP003',
      employeeName: 'Amit Kumar',
      department: 'Marketing',
      rating: 4.2,
      period: 'Q4 2025',
      overallScore: 84,
      categories: {
        technical: 82,
        communication: 88,
        teamwork: 85,
        initiative: 80,
        quality: 85,
      },
      strengths: ['Creative campaigns', 'Strong communication'],
      improvements: ['Analytical skills', 'Project planning'],
      status: 'Completed',
    },
    {
      employeeId: 'EMP004',
      employeeName: 'Sarah Wilson',
      department: 'Sales',
      rating: 0,
      period: 'Q4 2025',
      overallScore: 0,
      categories: {
        technical: 0,
        communication: 0,
        teamwork: 0,
        initiative: 0,
        quality: 0,
      },
      strengths: [],
      improvements: [],
      status: 'Pending',
    },
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600 dark:text-green-400';
    if (rating >= 4.0) return 'text-blue-600 dark:text-blue-400';
    if (rating >= 3.5) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30';
      case 'In Progress': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'Pending': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/20 text-green-600 dark:text-green-400';
    if (score >= 80) return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
    if (score >= 70) return 'bg-orange-500/20 text-orange-600 dark:text-orange-400';
    return 'bg-red-500/20 text-red-600 dark:text-red-400';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF9500] to-[#FF3B30] flex items-center justify-center shadow-md">
            <Award className="w-7 h-7 text-white drop-shadow-sm" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Performance Review</h2>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">Employee performance evaluations</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Q4 2025">Q4 2025</SelectItem>
              <SelectItem value="Q3 2025">Q3 2025</SelectItem>
              <SelectItem value="Q2 2025">Q2 2025</SelectItem>
              <SelectItem value="Q1 2025">Q1 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Completed</span>
          </div>
          <p className="text-3xl font-semibold text-foreground">3</p>
        </div>

        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">In Progress</span>
          </div>
          <p className="text-3xl font-semibold text-foreground">0</p>
        </div>

        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Pending</span>
          </div>
          <p className="text-3xl font-semibold text-foreground">1</p>
        </div>

        <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm text-muted-foreground font-medium">Avg Rating</span>
          </div>
          <p className="text-3xl font-semibold text-foreground">4.5</p>
        </div>
      </div>

      {/* Performance Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.employeeId} className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#007AFF] to-[#5856D6] flex items-center justify-center text-white font-medium">
                  {review.employeeName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{review.employeeName}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{review.employeeId} • {review.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={`${getStatusColor(review.status)} border`}>
                  {review.status}
                </Badge>
                {review.status === 'Completed' && (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(review.rating)
                            ? 'fill-yellow-500 text-yellow-500'
                            : i < review.rating
                            ? 'fill-yellow-500/50 text-yellow-500'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                    <span className={`ml-2 font-semibold ${getRatingColor(review.rating)}`}>
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {review.status === 'Completed' ? (
              <>
                {/* Overall Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Overall Score</span>
                    <span className={`text-2xl font-semibold ${getScoreColor(review.overallScore).split(' ')[1]}`}>
                      {review.overallScore}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getScoreColor(review.overallScore).split(' ')[0]}`}
                      style={{ width: `${review.overallScore}%` }}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-5 gap-4 mb-4">
                  {Object.entries(review.categories).map(([category, score]) => (
                    <div key={category} className="text-center">
                      <div className="text-xs text-muted-foreground font-medium mb-2 capitalize">
                        {category}
                      </div>
                      <div className={`text-lg font-semibold ${getScoreColor(score).split(' ')[1]}`}>
                        {score}%
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full ${getScoreColor(score).split(' ')[0]}`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Strengths & Improvements */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {review.strengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground font-medium flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-1">
                      {review.improvements.map((improvement, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground font-medium flex items-start gap-2">
                          <span className="text-orange-600 dark:text-orange-400 mt-0.5">•</span>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground font-medium">
                  {review.status === 'Pending' ? 'Review has not started yet' : 'Review in progress'}
                </p>
                <Button className="mt-4">
                  {review.status === 'Pending' ? 'Start Review' : 'Continue Review'}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
