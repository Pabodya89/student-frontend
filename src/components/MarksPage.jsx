import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Award, Search, Filter, TrendingUp, TrendingDown, Users, BookOpen } from 'lucide-react'

const MarksPage = () => {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  const [filterGrade, setFilterGrade] = useState('')
  const [filterAssessment, setFilterAssessment] = useState('')
  
  const [marksData] = useState([
    {
      id: 1,
      studentName: 'John Smith',
      grade: 'Grade 9',
      subject: 'Mathematics',
      assessment: 'Mid-term Exam',
      marks: 85,
      totalMarks: 100,
      date: '2024-01-20',
      status: 'graded'
    },
    {
      id: 2,
      studentName: 'Sarah Johnson',
      grade: 'Grade 8',
      subject: 'Science',
      assessment: 'Biology Quiz',
      marks: 42,
      totalMarks: 50,
      date: '2024-01-19',
      status: 'graded'
    },
    {
      id: 3,
      studentName: 'Mike Wilson',
      grade: 'Grade 11',
      subject: 'ICT',
      assessment: 'Programming Assignment',
      marks: 78,
      totalMarks: 80,
      date: '2024-01-18',
      status: 'graded'
    },
    {
      id: 4,
      studentName: 'Emma Brown',
      grade: 'Grade 10',
      subject: 'Mathematics',
      assessment: 'Algebra Test',
      marks: 0,
      totalMarks: 60,
      date: '2024-01-17',
      status: 'pending'
    },
    {
      id: 5,
      studentName: 'David Lee',
      grade: 'Grade 9',
      subject: 'Science',
      assessment: 'Chemistry Lab Report',
      marks: 55,
      totalMarks: 60,
      date: '2024-01-16',
      status: 'graded'
    },
    {
      id: 6,
      studentName: 'Lisa Wang',
      grade: 'Grade 11',
      subject: 'ICT',
      assessment: 'Database Project',
      marks: 0,
      totalMarks: 100,
      date: '2024-01-15',
      status: 'pending'
    }
  ])

  const filteredMarks = marksData.filter(mark => {
    const matchesSearch = mark.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mark.assessment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = !filterSubject || mark.subject === filterSubject
    const matchesGrade = !filterGrade || mark.grade === filterGrade
    const matchesAssessment = !filterAssessment || mark.assessment.toLowerCase().includes(filterAssessment.toLowerCase())
    
    return matchesSearch && matchesSubject && matchesGrade && matchesAssessment
  })

  const getPercentage = (marks, total) => {
    if (total === 0) return 0
    return Math.round((marks / total) * 100)
  }

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return '#10b981'
    if (percentage >= 80) return '#3b82f6'
    if (percentage >= 70) return '#f59e0b'
    if (percentage >= 60) return '#f97316'
    return '#ef4444'
  }

  const getGradeLetter = (percentage) => {
    if (percentage >= 90) return 'A'
    if (percentage >= 80) return 'B'
    if (percentage >= 70) return 'C'
    if (percentage >= 60) return 'D'
    return 'F'
  }

  const getStatusColor = (status) => {
    return status === 'graded' ? '#10b981' : '#f59e0b'
  }

  // Calculate statistics
  const gradedMarks = marksData.filter(mark => mark.status === 'graded')
  const averageScore = gradedMarks.length > 0 
    ? Math.round(gradedMarks.reduce((sum, mark) => sum + getPercentage(mark.marks, mark.totalMarks), 0) / gradedMarks.length)
    : 0
  const pendingCount = marksData.filter(mark => mark.status === 'pending').length
  const totalAssessments = marksData.length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">{t('marks')}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={20} />
          <span>{totalAssessments} assessments</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Average Score</span>
            <TrendingUp size={24} style={{ color: '#10b981' }} />
          </div>
          <div className="stat-value">{averageScore}%</div>
          <div className="stat-change" style={{ color: '#10b981' }}>
            Class Average
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Pending Grading</span>
            <BookOpen size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-change">
            Need attention
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Assessments</span>
            <Users size={24} style={{ color: '#3b82f6' }} />
          </div>
          <div className="stat-value">{totalAssessments}</div>
          <div className="stat-change">
            This month
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Completion Rate</span>
            <Award size={24} style={{ color: '#10b981' }} />
          </div>
          <div className="stat-value">{Math.round(((totalAssessments - pendingCount) / totalAssessments) * 100)}%</div>
          <div className="stat-change" style={{ color: '#10b981' }}>
            Graded
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr 1fr 1fr', 
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
              placeholder="Search students or assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '40px' }}
            />
          </div>
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
        
        <div>
          <label className="form-label">Grade</label>
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
          <label className="form-label">Assessment</label>
          <input
            type="text"
            placeholder="Filter by assessment..."
            value={filterAssessment}
            onChange={(e) => setFilterAssessment(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      {/* Marks Table */}
      <div className="tab-container">
        <div className="tab-header">
          <button className="tab-button active">All Marks</button>
          <button className="tab-button">Pending Grading</button>
          <button className="tab-button">Grade Distribution</button>
        </div>
        <div className="tab-content">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Grade</th>
                <th>Subject</th>
                <th>Assessment</th>
                <th>Marks</th>
                <th>Percentage</th>
                <th>Letter Grade</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMarks.map(mark => {
                const percentage = getPercentage(mark.marks, mark.totalMarks)
                const letterGrade = getGradeLetter(percentage)
                const gradeColor = getGradeColor(percentage)
                
                return (
                  <tr key={mark.id}>
                    <td style={{ fontWeight: 'bold' }}>{mark.studentName}</td>
                    <td>{mark.grade}</td>
                    <td>{mark.subject}</td>
                    <td>{mark.assessment}</td>
                    <td style={{ fontWeight: 'bold' }}>
                      {mark.status === 'graded' ? `${mark.marks}/${mark.totalMarks}` : 'Not graded'}
                    </td>
                    <td>
                      {mark.status === 'graded' && (
                        <span style={{ 
                          background: gradeColor, 
                          color: 'white', 
                          padding: '4px 8px', 
                          borderRadius: '4px',
                          fontWeight: 'bold'
                        }}>
                          {percentage}%
                        </span>
                      )}
                    </td>
                    <td>
                      {mark.status === 'graded' && (
                        <span style={{ 
                          background: gradeColor, 
                          color: 'white', 
                          padding: '4px 8px', 
                          borderRadius: '4px',
                          fontWeight: 'bold',
                          fontSize: '18px'
                        }}>
                          {letterGrade}
                        </span>
                      )}
                    </td>
                    <td>{mark.date}</td>
                    <td>
                      <span className={`status-badge ${
                        mark.status === 'graded' ? 'status-completed' : 'status-pending'
                      }`}>
                        {mark.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredMarks.length === 0 && (
        <div className="empty-state">
          <h3>No marks found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default MarksPage