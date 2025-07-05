import { useLanguage } from '../contexts/LanguageContext'
import { Users, BookOpen, DollarSign, ClipboardList, TrendingUp, Calendar } from 'lucide-react'

const DashboardHome = () => {
  const { t } = useLanguage()

  const stats = [
    {
      title: t('totalStudents'),
      value: '124',
      change: '+12%',
      icon: Users,
      color: '#3b82f6'
    },
    {
      title: t('totalLessons'),
      value: '45',
      change: '+5%',
      icon: BookOpen,
      color: '#10b981'
    },
    {
      title: t('monthlyIncome'),
      value: '$2,340',
      change: '+18%',
      icon: DollarSign,
      color: '#f59e0b'
    },
    {
      title: t('pendingAssignments'),
      value: '8',
      change: '-3%',
      icon: ClipboardList,
      color: '#ef4444'
    }
  ]

  const recentActivity = [
    { type: 'assignment', title: 'Math Quiz 1', student: 'John Smith', status: 'completed', time: '2 hours ago' },
    { type: 'payment', title: 'Monthly Payment', student: 'Sarah Johnson', status: 'received', time: '4 hours ago' },
    { type: 'assignment', title: 'Physics Lab Report', student: 'Mike Wilson', status: 'pending', time: '1 day ago' },
    { type: 'feedback', title: 'Course Feedback', student: 'Emma Brown', status: 'new', time: '2 days ago' }
  ]

  return (
    <div>
      <h1 className="page-title">{t('dashboard')}</h1>
      
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <span className="stat-title">{stat.title}</span>
                <Icon size={24} style={{ color: stat.color }} />
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-change">{stat.change}</div>
            </div>
          )
        })}
      </div>

      <div className="tab-container">
        <div className="tab-header">
          <button className="tab-button active">Recent Activity</button>
          <button className="tab-button">Quick Actions</button>
        </div>
        <div className="tab-content">
          <div className="data-table">
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity, index) => (
                  <tr key={index}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {activity.type === 'assignment' && <ClipboardList size={16} />}
                        {activity.type === 'payment' && <DollarSign size={16} />}
                        {activity.type === 'feedback' && <Calendar size={16} />}
                        {activity.title}
                      </div>
                    </td>
                    <td>{activity.student}</td>
                    <td>
                      <span className={`status-badge ${
                        activity.status === 'completed' || activity.status === 'received' ? 'status-completed' : 
                        activity.status === 'pending' ? 'status-pending' : 'status-badge'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                    <td>{activity.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome