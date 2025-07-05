import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { CreditCard, Search, DollarSign, Calendar, Users, AlertCircle, CheckCircle, Clock } from 'lucide-react'

const PaymentsPage = () => {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  
  const [paymentsData] = useState([
    {
      id: 1,
      studentName: 'John Smith',
      subject: 'Mathematics',
      grade: 'Grade 9',
      amount: 60,
      dueDate: '2024-01-15',
      paidDate: '2024-01-14',
      status: 'paid',
      method: 'credit_card',
      transactionId: 'TXN001'
    },
    {
      id: 2,
      studentName: 'Sarah Johnson',
      subject: 'Science',
      grade: 'Grade 8',
      amount: 45,
      dueDate: '2024-01-15',
      paidDate: '2024-01-13',
      status: 'paid',
      method: 'bank_transfer',
      transactionId: 'TXN002'
    },
    {
      id: 3,
      studentName: 'Mike Wilson',
      subject: 'ICT',
      grade: 'Grade 11',
      amount: 80,
      dueDate: '2024-01-15',
      paidDate: null,
      status: 'overdue',
      method: null,
      transactionId: null
    },
    {
      id: 4,
      studentName: 'Emma Brown',
      subject: 'Mathematics',
      grade: 'Grade 10',
      amount: 50,
      dueDate: '2024-01-25',
      paidDate: null,
      status: 'pending',
      method: null,
      transactionId: null
    },
    {
      id: 5,
      studentName: 'David Lee',
      subject: 'Science',
      grade: 'Grade 9',
      amount: 40,
      dueDate: '2024-01-15',
      paidDate: '2024-01-15',
      status: 'paid',
      method: 'cash',
      transactionId: 'TXN003'
    },
    {
      id: 6,
      studentName: 'Lisa Wang',
      subject: 'ICT',
      grade: 'Grade 11',
      amount: 75,
      dueDate: '2024-01-20',
      paidDate: null,
      status: 'pending',
      method: null,
      transactionId: null
    }
  ])

  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filterStatus || payment.status === filterStatus
    const matchesSubject = !filterSubject || payment.subject === filterSubject
    
    return matchesSearch && matchesStatus && matchesSubject
  })

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return '#10b981'
      case 'pending': return '#f59e0b'
      case 'overdue': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'paid': return <CheckCircle size={16} />
      case 'pending': return <Clock size={16} />
      case 'overdue': return <AlertCircle size={16} />
      default: return <Clock size={16} />
    }
  }

  const getMethodLabel = (method) => {
    switch(method) {
      case 'credit_card': return 'Credit Card'
      case 'bank_transfer': return 'Bank Transfer'
      case 'cash': return 'Cash'
      default: return '-'
    }
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date()
  }

  // Calculate statistics
  const totalAmount = paymentsData.reduce((sum, payment) => sum + payment.amount, 0)
  const paidAmount = paymentsData.filter(p => p.status === 'paid').reduce((sum, payment) => sum + payment.amount, 0)
  const pendingAmount = paymentsData.filter(p => p.status === 'pending').reduce((sum, payment) => sum + payment.amount, 0)
  const overdueAmount = paymentsData.filter(p => p.status === 'overdue').reduce((sum, payment) => sum + payment.amount, 0)
  const paidCount = paymentsData.filter(p => p.status === 'paid').length
  const pendingCount = paymentsData.filter(p => p.status === 'pending').length
  const overdueCount = paymentsData.filter(p => p.status === 'overdue').length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">{t('payments')}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CreditCard size={20} />
          <span>{paymentsData.length} payments</span>
        </div>
      </div>

      {/* Payment Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Amount</span>
            <DollarSign size={24} style={{ color: '#3b82f6' }} />
          </div>
          <div className="stat-value">${totalAmount}</div>
          <div className="stat-change">
            This month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Paid</span>
            <CheckCircle size={24} style={{ color: '#10b981' }} />
          </div>
          <div className="stat-value">${paidAmount}</div>
          <div className="stat-change" style={{ color: '#10b981' }}>
            {paidCount} payments
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Pending</span>
            <Clock size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div className="stat-value">${pendingAmount}</div>
          <div className="stat-change" style={{ color: '#f59e0b' }}>
            {pendingCount} payments
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Overdue</span>
            <AlertCircle size={24} style={{ color: '#ef4444' }} />
          </div>
          <div className="stat-value">${overdueAmount}</div>
          <div className="stat-change" style={{ color: '#ef4444' }}>
            {overdueCount} payments
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr 1fr', 
        gap: '16px', 
        marginBottom: '24px',
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div>
          <label className="form-label">Search</label>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#64748b'
            }} />
            <input
              type="text"
              placeholder="Search students or subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '40px' }}
            />
          </div>
        </div>
        
        <div>
          <label className="form-label">Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-select"
          >
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        
        <div>
          <label className="form-label">Subject</label>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="form-select"
          >
            <option value="">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="ICT">ICT</option>
            <option value="English">English</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="tab-container">
        <div className="tab-header">
          <button className="tab-button active">All Payments</button>
          <button className="tab-button">Overdue</button>
          <button className="tab-button">Payment Methods</button>
        </div>
        <div className="tab-content">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Paid Date</th>
                <th>Status</th>
                <th>Method</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td style={{ fontWeight: 'bold' }}>{payment.studentName}</td>
                  <td>{payment.subject}</td>
                  <td>{payment.grade}</td>
                  <td style={{ fontWeight: 'bold' }}>${payment.amount}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} />
                      <span>{payment.dueDate}</span>
                      {payment.status === 'overdue' && (
                        <span style={{ color: '#ef4444', fontSize: '12px' }}>(Overdue)</span>
                      )}
                    </div>
                  </td>
                  <td>{payment.paidDate || '-'}</td>
                  <td>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      color: getStatusColor(payment.status)
                    }}>
                      {getStatusIcon(payment.status)}
                      <span style={{ 
                        background: getStatusColor(payment.status), 
                        color: 'white', 
                        padding: '4px 8px', 
                        borderRadius: '12px',
                        fontSize: '12px',
                        textTransform: 'capitalize'
                      }}>
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td>{getMethodLabel(payment.method)}</td>
                  <td>{payment.transactionId || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPayments.length === 0 && (
        <div className="empty-state">
          <h3>No payments found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginTop: '24px',
        padding: '20px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <button className="btn-primary">Send Payment Reminders</button>
        <button className="btn-secondary">Export Payment Report</button>
        <button className="btn-secondary">Generate Invoices</button>
      </div>
    </div>
  )
}

export default PaymentsPage