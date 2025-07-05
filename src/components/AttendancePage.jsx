import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Calendar, Users, CheckCircle, XCircle, Clock, TrendingUp, Filter } from 'lucide-react'

const AttendancePage = () => {
  const { t } = useLanguage()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [filterSubject, setFilterSubject] = useState('')
  const [filterGrade, setFilterGrade] = useState('')
  
  const [attendanceData] = useState([
    {
      id: 1,
      studentName: 'John Smith',
      grade: 'Grade 9',
      subject: 'Mathematics',
      date: '2024-01-20',
      status: 'present',
      timeIn: '08:00',
      timeOut: '09:30',
      notes: ''
    },
    {
      id: 2,
      studentName: 'Sarah Johnson',
      grade: 'Grade 8',
      subject: 'Science',
      date: '2024-01-20',
      status: 'present',
      timeIn: '10:00',
      timeOut: '11:30',
      notes: ''
    },
    {
      id: 3,
      studentName: 'Mike Wilson',
      grade: 'Grade 11',
      subject: 'ICT',
      date: '2024-01-20',
      status: 'absent',
      timeIn: '',
      timeOut: '',
      notes: 'Sick leave'
    },
    {
      id: 4,
      studentName: 'Emma Brown',
      grade: 'Grade 10',
      subject: 'Mathematics',
      date: '2024-01-20',
      status: 'late',
      timeIn: '08:15',
      timeOut: '09:30',
      notes: 'Traffic delay'
    },
    {
      id: 5,
      studentName: 'David Lee',
      grade: 'Grade 9',
      subject: 'Science',
      date: '2024-01-20',
      status: 'present',
      timeIn: '10:00',
      timeOut: '11:30',
      notes: ''
    }
  ])

  const [attendanceStats] = useState({
    totalStudents: 45,
    presentToday: 38,
    absentToday: 5,
    lateToday: 2,
    attendanceRate: 84,
    weeklyAverage: 87,
    monthlyAverage: 89
  })

  const filteredAttendance = attendanceData.filter(record => {
    const matchesDate = record.date === selectedDate
    const matchesSubject = !filterSubject || record.subject === filterSubject
    const matchesGrade = !filterGrade || record.grade === filterGrade
    
    return matchesDate && matchesSubject && matchesGrade
  })

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return '#10b981'
      case 'absent': return '#ef4444'
      case 'late': return '#f59e0b'
      default: return '#64748b'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'present': return <CheckCircle size={16} />
      case 'absent': return <XCircle size={16} />
      case 'late': return <Clock size={16} />
      default: return <Clock size={16} />
    }
  }

  const updateAttendanceStatus = (id, newStatus) => {
    // In a real app, this would update the database
    console.log(`Updating attendance ${id} to ${newStatus}`)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">{t('attendance')}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={20} />
          <span>{selectedDate}</span>
        </div>
      </div>

      {/* Attendance Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Present Today</span>
            <CheckCircle size={24} style={{ color: '#10b981' }} />
          </div>
          <div className="stat-value">{attendanceStats.presentToday}</div>
          <div className="stat-change" style={{ color: '#10b981' }}>
            {Math.round((attendanceStats.presentToday / attendanceStats.totalStudents) * 100)}% of total
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Absent Today</span>
            <XCircle size={24} style={{ color: '#ef4444' }} />
          </div>
          <div className="stat-value">{attendanceStats.absentToday}</div>
          <div className="stat-change" style={{ color: '#ef4444' }}>
            {Math.round((attendanceStats.absentToday / attendanceStats.totalStudents) * 100)}% of total
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Late Today</span>
            <Clock size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div className="stat-value">{attendanceStats.lateToday}</div>
          <div className="stat-change" style={{ color: '#f59e0b' }}>
            {Math.round((attendanceStats.lateToday / attendanceStats.totalStudents) * 100)}% of total
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Monthly Average</span>
            <TrendingUp size={24} style={{ color: '#3b82f6' }} />
          </div>
          <div className="stat-value">{attendanceStats.monthlyAverage}%</div>
          <div className="stat-change" style={{ color: '#10b981' }}>
            +2% from last month
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr', 
        gap: '16px', 
        marginBottom: '24px',
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div>
          <label className="form-label">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="form-input"
          />
        </div>
        
        <div>
          <label className="form-label">Filter by Subject</label>
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
        
        <div>
          <label className="form-label">Filter by Grade</label>
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="form-select"
          >
            <option value="">All Grades</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
          </select>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="tab-container">
        <div className="tab-header">
          <button className="tab-button active">Daily Attendance</button>
          <button className="tab-button">Weekly Summary</button>
          <button className="tab-button">Monthly Report</button>
        </div>
        <div className="tab-content">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Grade</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map(record => (
                <tr key={record.id}>
                  <td style={{ fontWeight: 'bold' }}>{record.studentName}</td>
                  <td>{record.grade}</td>
                  <td>{record.subject}</td>
                  <td>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      color: getStatusColor(record.status)
                    }}>
                      {getStatusIcon(record.status)}
                      <span style={{ 
                        background: getStatusColor(record.status), 
                        color: 'white', 
                        padding: '4px 8px', 
                        borderRadius: '12px',
                        fontSize: '12px',
                        textTransform: 'capitalize'
                      }}>
                        {record.status}
                      </span>
                    </div>
                  </td>
                  <td>{record.timeIn || '-'}</td>
                  <td>{record.timeOut || '-'}</td>
                  <td>{record.notes || '-'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button 
                        onClick={() => updateAttendanceStatus(record.id, 'present')}
                        className="btn-small"
                        style={{ 
                          background: record.status === 'present' ? '#10b981' : '#e2e8f0',
                          color: record.status === 'present' ? 'white' : '#64748b'
                        }}
                      >
                        <CheckCircle size={12} />
                      </button>
                      <button 
                        onClick={() => updateAttendanceStatus(record.id, 'absent')}
                        className="btn-small"
                        style={{ 
                          background: record.status === 'absent' ? '#ef4444' : '#e2e8f0',
                          color: record.status === 'absent' ? 'white' : '#64748b'
                        }}
                      >
                        <XCircle size={12} />
                      </button>
                      <button 
                        onClick={() => updateAttendanceStatus(record.id, 'late')}
                        className="btn-small"
                        style={{ 
                          background: record.status === 'late' ? '#f59e0b' : '#e2e8f0',
                          color: record.status === 'late' ? 'white' : '#64748b'
                        }}
                      >
                        <Clock size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAttendance.length === 0 && (
        <div className="empty-state">
          <h3>No attendance records found</h3>
          <p>Try adjusting your date or filter criteria</p>
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
        <button className="btn-primary">Mark All Present</button>
        <button className="btn-secondary">Export Attendance</button>
        <button className="btn-secondary">Send Absence Notifications</button>
      </div>
    </div>
  )
}

export default AttendancePage