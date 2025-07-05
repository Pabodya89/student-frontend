import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Users, Search, Mail, Phone, Calendar, GraduationCap, DollarSign } from 'lucide-react'

const StudentsPage = () => {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGrade, setFilterGrade] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  
  const [students] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1234567890',
      grade: 'Grade 9',
      subjects: ['Mathematics', 'Science'],
      joinDate: '2024-01-15',
      lastActive: '2024-01-20',
      totalPayments: 240,
      status: 'active',
      assignments: { completed: 12, total: 15 },
      attendance: { present: 18, total: 20 }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1234567891',
      grade: 'Grade 8',
      subjects: ['Science', 'English'],
      joinDate: '2024-01-10',
      lastActive: '2024-01-19',
      totalPayments: 180,
      status: 'active',
      assignments: { completed: 8, total: 10 },
      attendance: { present: 19, total: 20 }
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      phone: '+1234567892',
      grade: 'Grade 11',
      subjects: ['ICT', 'Mathematics'],
      joinDate: '2024-01-05',
      lastActive: '2024-01-18',
      totalPayments: 320,
      status: 'active',
      assignments: { completed: 15, total: 18 },
      attendance: { present: 17, total: 20 }
    },
    {
      id: 4,
      name: 'Emma Brown',
      email: 'emma.brown@email.com',
      phone: '+1234567893',
      grade: 'Grade 10',
      subjects: ['Mathematics', 'ICT'],
      joinDate: '2024-01-01',
      lastActive: '2024-01-15',
      totalPayments: 200,
      status: 'inactive',
      assignments: { completed: 5, total: 12 },
      attendance: { present: 12, total: 20 }
    },
    {
      id: 5,
      name: 'David Lee',
      email: 'david.lee@email.com',
      phone: '+1234567894',
      grade: 'Grade 9',
      subjects: ['Science', 'Mathematics'],
      joinDate: '2024-01-12',
      lastActive: '2024-01-21',
      totalPayments: 160,
      status: 'active',
      assignments: { completed: 10, total: 15 },
      attendance: { present: 20, total: 20 }
    }
  ])

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = !filterGrade || student.grade === filterGrade
    const matchesSubject = !filterSubject || student.subjects.includes(filterSubject)
    
    return matchesSearch && matchesGrade && matchesSubject
  })

  const getStatusColor = (status) => {
    return status === 'active' ? '#10b981' : '#ef4444'
  }

  const getCompletionRate = (completed, total) => {
    return Math.round((completed / total) * 100)
  }

  const getAttendanceRate = (present, total) => {
    return Math.round((present / total) * 100)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">{t('students')}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={20} />
          <span>{filteredStudents.length} students</span>
        </div>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginBottom: '24px',
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ flex: 1 }}>
          <label className="form-label">Search Students</label>
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
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '40px' }}
            />
          </div>
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
      </div>

      {/* Students Grid */}
      <div className="card-grid">
        {filteredStudents.map(student => (
          <div key={student.id} className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                background: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>
                {student.name.charAt(0)}
              </div>
              <div>
                <div className="card-title">{student.name}</div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>{student.grade}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <span style={{ 
                background: getStatusColor(student.status), 
                color: 'white', 
                padding: '2px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                {student.status}
              </span>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Mail size={14} />
                <span style={{ fontSize: '14px' }}>{student.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Phone size={14} />
                <span style={{ fontSize: '14px' }}>{student.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Calendar size={14} />
                <span style={{ fontSize: '14px' }}>Joined: {student.joinDate}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DollarSign size={14} />
                <span style={{ fontSize: '14px' }}>Total Paid: ${student.totalPayments}</span>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <strong>Subjects:</strong>
              <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                {student.subjects.map((subject, index) => (
                  <span key={index} style={{ 
                    background: '#eff6ff', 
                    color: '#3b82f6', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '12px' 
                  }}>
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '8px', 
              marginBottom: '12px',
              fontSize: '14px'
            }}>
              <div>
                <strong>Assignments:</strong>
                <div style={{ color: '#64748b' }}>
                  {student.assignments.completed}/{student.assignments.total} 
                  ({getCompletionRate(student.assignments.completed, student.assignments.total)}%)
                </div>
              </div>
              <div>
                <strong>Attendance:</strong>
                <div style={{ color: '#64748b' }}>
                  {student.attendance.present}/{student.attendance.total} 
                  ({getAttendanceRate(student.attendance.present, student.attendance.total)}%)
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '8px', 
              marginBottom: '16px'
            }}>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Assignment Progress</div>
                <div style={{ 
                  background: '#e2e8f0', 
                  height: '4px', 
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    background: getCompletionRate(student.assignments.completed, student.assignments.total) >= 75 ? '#10b981' : '#f59e0b',
                    height: '100%',
                    width: `${getCompletionRate(student.assignments.completed, student.assignments.total)}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Attendance Rate</div>
                <div style={{ 
                  background: '#e2e8f0', 
                  height: '4px', 
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    background: getAttendanceRate(student.attendance.present, student.attendance.total) >= 80 ? '#10b981' : '#ef4444',
                    height: '100%',
                    width: `${getAttendanceRate(student.attendance.present, student.attendance.total)}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn-small btn-edit">View Profile</button>
              <button className="btn-small" style={{ background: '#10b981', color: 'white' }}>
                Send Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="empty-state">
          <h3>No students found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default StudentsPage