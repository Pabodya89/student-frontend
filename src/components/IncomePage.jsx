import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { DollarSign, TrendingUp, TrendingDown, Calendar, Users, CreditCard } from 'lucide-react'

const IncomePage = () => {
  const { t } = useLanguage()
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  
  const incomeData = {
    month: {
      total: 2340,
      growth: '+18%',
      transactions: 45,
      avgPerStudent: 52
    },
    year: {
      total: 28080,
      growth: '+22%',
      transactions: 540,
      avgPerStudent: 624
    },
    week: {
      total: 580,
      growth: '+12%',
      transactions: 12,
      avgPerStudent: 48
    }
  }

  const recentTransactions = [
    {
      id: 1,
      studentName: 'John Smith',
      amount: 60,
      subject: 'Mathematics',
      date: '2024-01-20',
      type: 'monthly_fee',
      status: 'completed'
    },
    {
      id: 2,
      studentName: 'Sarah Johnson',
      amount: 45,
      subject: 'Science',
      date: '2024-01-19',
      type: 'monthly_fee',
      status: 'completed'
    },
    {
      id: 3,
      studentName: 'Mike Wilson',
      amount: 80,
      subject: 'ICT',
      date: '2024-01-18',
      type: 'monthly_fee',
      status: 'completed'
    },
    {
      id: 4,
      studentName: 'Emma Brown',
      amount: 50,
      subject: 'Mathematics',
      date: '2024-01-17',
      type: 'monthly_fee',
      status: 'pending'
    },
    {
      id: 5,
      studentName: 'David Lee',
      amount: 40,
      subject: 'Science',
      date: '2024-01-16',
      type: 'monthly_fee',
      status: 'completed'
    }
  ]

  const monthlyBreakdown = [
    { month: 'Jan', amount: 2340, students: 45 },
    { month: 'Dec', amount: 2180, students: 43 },
    { month: 'Nov', amount: 2450, students: 49 },
    { month: 'Oct', amount: 2200, students: 44 },
    { month: 'Sep', amount: 2600, students: 52 },
    { month: 'Aug', amount: 2380, students: 48 }
  ]

  const subjectBreakdown = [
    { subject: 'Mathematics', income: 980, students: 18, percentage: 42 },
    { subject: 'Science', income: 720, students: 16, percentage: 31 },
    { subject: 'ICT', income: 640, students: 11, percentage: 27 }
  ]

  const currentData = incomeData[selectedPeriod]

  const getStatusColor = (status) => {
    return status === 'completed' ? '#10b981' : '#f59e0b'
  }

  const getTypeLabel = (type) => {
    return type === 'monthly_fee' ? 'Monthly Fee' : 'One-time Payment'
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">{t('income')}</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['week', 'month', 'year'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`language-btn ${selectedPeriod === period ? 'active' : ''}`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Income Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Income</span>
            <DollarSign size={24} style={{ color: '#10b981' }} />
          </div>
          <div className="stat-value">${currentData.total.toLocaleString()}</div>
          <div className="stat-change" style={{ color: '#10b981' }}>
            <TrendingUp size={16} />
            {currentData.growth}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Transactions</span>
            <CreditCard size={24} style={{ color: '#3b82f6' }} />
          </div>
          <div className="stat-value">{currentData.transactions}</div>
          <div className="stat-change">This {selectedPeriod}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Average per Student</span>
            <Users size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div className="stat-value">${currentData.avgPerStudent}</div>
          <div className="stat-change">Per {selectedPeriod}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Payment Rate</span>
            <TrendingUp size={24} style={{ color: '#10b981' }} />
          </div>
          <div className="stat-value">94%</div>
          <div className="stat-change" style={{ color: '#10b981' }}>+2% from last {selectedPeriod}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Recent Transactions */}
        <div className="tab-container">
          <div className="tab-header">
            <button className="tab-button active">Recent Transactions</button>
            <button className="tab-button">Monthly Breakdown</button>
          </div>
          <div className="tab-content">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>{transaction.studentName}</td>
                    <td style={{ fontWeight: 'bold' }}>${transaction.amount}</td>
                    <td>{transaction.subject}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} />
                        {transaction.date}
                      </div>
                    </td>
                    <td>{getTypeLabel(transaction.type)}</td>
                    <td>
                      <span className={`status-badge ${
                        transaction.status === 'completed' ? 'status-completed' : 'status-pending'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="tab-container">
          <div className="tab-header">
            <button className="tab-button active">Subject Breakdown</button>
          </div>
          <div className="tab-content">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {subjectBreakdown.map((item, index) => (
                <div key={index} style={{ 
                  padding: '16px', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px',
                  background: '#f8fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>{item.subject}</h3>
                    <span style={{ fontWeight: 'bold', fontSize: '18px' }}>${item.income}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>
                    <span>{item.students} students</span>
                    <span>{item.percentage}% of total</span>
                  </div>
                  <div style={{ 
                    background: '#e2e8f0', 
                    height: '8px', 
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      background: '#3b82f6',
                      height: '100%',
                      width: `${item.percentage}%`,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="tab-container" style={{ marginTop: '24px' }}>
        <div className="tab-header">
          <button className="tab-button active">Monthly Trend</button>
        </div>
        <div className="tab-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
            {monthlyBreakdown.map((month, index) => (
              <div key={index} style={{ 
                padding: '16px', 
                border: '1px solid #e2e8f0', 
                borderRadius: '8px',
                textAlign: 'center',
                background: index === 0 ? '#eff6ff' : 'white'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {month.month}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '4px' }}>
                  ${month.amount.toLocaleString()}
                </div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>
                  {month.students} students
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncomePage