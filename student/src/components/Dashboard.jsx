import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { 
  BookOpen, 
  FileText, 
  Award, 
  PlayCircle, 
  TrendingUp, 
  Clock,
  Users,
  Star
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { data, enrolledSubjects } = useData();

  const stats = [
    {
      title: t('enrolledSubjects'),
      value: enrolledSubjects.length,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+2 this month'
    },
    {
      title: t('completedAssignments'),
      value: data.assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length,
      icon: FileText,
      color: 'bg-green-500',
      change: '+5 this week'
    },
    {
      title: t('averageScore'),
      value: '85%',
      icon: Award,
      color: 'bg-yellow-500',
      change: '+3% improvement'
    },
    {
      title: t('totalLessons'),
      value: enrolledSubjects.reduce((total, subject) => total + subject.lessons, 0),
      icon: PlayCircle,
      color: 'bg-purple-500',
      change: '+8 available'
    }
  ];

  const recentActivities = [
    {
      type: 'assignment',
      title: 'Completed Algebra Problem Set',
      time: '2 hours ago',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      type: 'quiz',
      title: 'Scored 92% in Physics Quiz',
      time: '5 hours ago',
      icon: Award,
      color: 'text-yellow-600'
    },
    {
      type: 'lesson',
      title: 'Watched Linear Equations lesson',
      time: '1 day ago',
      icon: PlayCircle,
      color: 'text-blue-600'
    },
    {
      type: 'chat',
      title: 'Messaged Mr. Kamal about homework',
      time: '2 days ago',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  const upcomingClasses = [
    {
      subject: 'Mathematics',
      teacher: 'Mr. Kamal Perera',
      time: '10:00 AM',
      date: 'Today',
      type: 'Live Class'
    },
    {
      subject: 'Science',
      teacher: 'Mr. Rohan Fernando',
      time: '2:00 PM',
      date: 'Tomorrow',
      type: 'Lab Session'
    },
    {
      subject: 'English',
      teacher: 'Mrs. Priya Jayawardena',
      time: '11:00 AM',
      date: 'Friday',
      type: 'Literature Discussion'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('welcome')}, {user.name}! 👋
        </h1>
        <p className="text-gray-600">
          Ready to continue your learning journey today?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stats-card card card-hover">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Enrolled Subjects */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {t('enrolledSubjects')}
            </h2>
            <Link to="/subjects" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {enrolledSubjects.slice(0, 3).map((subject) => (
              <div key={subject.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${subject.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-lg">{subject.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.lessons} lessons</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{subject.progress}%</div>
                  <div className="w-20 progress-bar mt-1">
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

        {/* Upcoming Classes */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {t('upcomingClasses')}
            </h2>
            <Link to="/subjects" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View Schedule
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((class_, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{class_.subject}</h3>
                    <p className="text-sm text-gray-500">{class_.teacher}</p>
                    <p className="text-xs text-blue-600">{class_.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{class_.time}</div>
                  <div className="text-xs text-gray-500">{class_.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('recentActivity')}
          </h2>
          <Link to="/reports" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 bg-white rounded-full flex items-center justify-center ${activity.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;