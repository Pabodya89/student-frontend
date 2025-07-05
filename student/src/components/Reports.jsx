import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { BarChart3, TrendingUp, Award, Calendar, Download, FileText } from 'lucide-react';

const Reports = () => {
  const { t } = useLanguage();
  const { data } = useData();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const generateReport = () => {
    alert('Report generated! Check your downloads folder.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('academicReports')}
            </h1>
            <p className="text-gray-600">
              Track your academic progress and performance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input-field"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button
              onClick={generateReport}
              className="btn-primary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Overall Average',
            value: '87%',
            icon: Award,
            color: 'bg-green-500',
            change: '+5% from last month'
          },
          {
            title: 'Assignments Done',
            value: '24',
            icon: FileText,
            color: 'bg-blue-500',
            change: '+3 this week'
          },
          {
            title: 'Quiz Average',
            value: '89%',
            icon: BarChart3,
            color: 'bg-purple-500',
            change: '+2% improvement'
          },
          {
            title: 'Study Hours',
            value: '45hrs',
            icon: Calendar,
            color: 'bg-orange-500',
            change: '+8hrs this month'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stats-card card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-600">
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject Progress */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {t('subjectProgress')}
          </h2>
          <div className="space-y-4">
            {data.reports.subjectProgress.map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{subject.subject}</h3>
                    <p className="text-sm text-gray-500">Grade: {subject.grade}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    {subject.progress}%
                  </div>
                  <div className="w-24 progress-bar mt-1">
                    <div 
                      className="progress-fill"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Scores */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {t('quizScores')}
          </h2>
          <div className="space-y-4">
            {data.reports.quizScores.map((quiz, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    quiz.score >= 80 ? 'bg-green-100' : quiz.score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    <Award className={`w-5 h-5 ${
                      quiz.score >= 80 ? 'text-green-600' : quiz.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{quiz.quiz}</h3>
                    <p className="text-sm text-gray-500">{quiz.date}</p>
                  </div>
                </div>
                <div className={`text-2xl font-bold ${
                  quiz.score >= 80 ? 'text-green-600' : quiz.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {quiz.score}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Grades */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {t('assignmentGrades')}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Assignment</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Grade</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.reports.assignmentGrades.map((assignment, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{assignment.assignment}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      assignment.grade >= 80 
                        ? 'bg-green-100 text-green-800' 
                        : assignment.grade >= 60 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {assignment.grade}%
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {assignment.date}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Graded
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Performance Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Strengths</h3>
            </div>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Consistent high performance in Mathematics (87% average)</li>
              <li>• Excellent quiz completion rate (95%)</li>
              <li>• Strong improvement in English over the past month</li>
              <li>• Regular participation in lessons and activities</li>
            </ul>
          </div>
          <div className="bg-orange-50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-orange-900">Areas for Improvement</h3>
            </div>
            <ul className="space-y-2 text-sm text-orange-800">
              <li>• Science grade could be improved (currently 78%)</li>
              <li>• Consider spending more time on assignment preparation</li>
              <li>• More active participation in discussion forums</li>
              <li>• Focus on time management during quizzes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;