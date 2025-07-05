import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Plus, Edit, Trash2, Calendar, ClipboardList, Clock, Users, CheckCircle, XCircle } from 'lucide-react'

const AssignmentsPage = () => {
  const { t } = useLanguage()
  const [showModal, setShowModal] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState(null)
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Algebra Problem Set 1',
      subject: 'Mathematics',
      grade: 'Grade 9',
      description: 'Solve the given algebraic equations and show your work',
      dueDate: '2024-02-01',
      totalMarks: 50,
      submissions: 35,
      totalStudents: 45,
      createdAt: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      title: 'Plant Biology Report',
      subject: 'Science',
      grade: 'Grade 8',
      description: 'Write a detailed report on plant reproduction',
      dueDate: '2024-01-30',
      totalMarks: 40,
      submissions: 28,
      totalStudents: 32,
      createdAt: '2024-01-14',
      status: 'active'
    },
    {
      id: 3,
      title: 'Website Project',
      subject: 'ICT',
      grade: 'Grade 11',
      description: 'Create a simple website using HTML, CSS, and JavaScript',
      dueDate: '2024-02-15',
      totalMarks: 100,
      submissions: 15,
      totalStudents: 28,
      createdAt: '2024-01-13',
      status: 'active'
    }
  ])

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    grade: '',
    description: '',
    dueDate: '',
    totalMarks: '',
    status: 'draft'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingAssignment) {
      setAssignments(assignments.map(assignment => 
        assignment.id === editingAssignment.id 
          ? { ...assignment, ...formData }
          : assignment
      ))
    } else {
      setAssignments([...assignments, { 
        id: Date.now(), 
        ...formData,
        submissions: 0,
        totalStudents: 45, // Mock value
        createdAt: new Date().toISOString().split('T')[0]
      }])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      subject: '',
      grade: '',
      description: '',
      dueDate: '',
      totalMarks: '',
      status: 'draft'
    })
    setEditingAssignment(null)
    setShowModal(false)
  }

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment)
    setFormData({
      title: assignment.title,
      subject: assignment.subject,
      grade: assignment.grade,
      description: assignment.description,
      dueDate: assignment.dueDate,
      totalMarks: assignment.totalMarks,
      status: assignment.status
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id))
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#10b981'
      case 'draft': return '#f59e0b'
      case 'closed': return '#ef4444'
      default: return '#64748b'
    }
  }

  const getCompletionRate = (submissions, total) => {
    return Math.round((submissions / total) * 100)
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">{t('assignments')}</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={16} />
          {t('addNew')}
        </button>
      </div>

      <div className="card-grid">
        {assignments.map(assignment => (
          <div key={assignment.id} className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <ClipboardList size={16} style={{ color: '#3b82f6' }} />
              <div className="card-title">{assignment.title}</div>
            </div>
            
            <div className="card-meta">
              <span>{assignment.subject}</span>
              <span>{assignment.grade}</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <span style={{ 
                background: getStatusColor(assignment.status), 
                color: 'white', 
                padding: '2px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                {assignment.status}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b' }}>
                <Calendar size={12} />
                Created: {assignment.createdAt}
              </div>
            </div>

            <p style={{ color: '#64748b', marginBottom: '12px', lineHeight: '1.5' }}>
              {assignment.description}
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '8px', 
              marginBottom: '12px',
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} />
                <span>Due: {assignment.dueDate}</span>
                {isOverdue(assignment.dueDate) && (
                  <span style={{ color: '#ef4444', fontSize: '12px' }}>(Overdue)</span>
                )}
              </div>
              <div>
                <strong>Total Marks:</strong> {assignment.totalMarks}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Users size={14} />
                <span>{assignment.submissions}/{assignment.totalStudents} submitted</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {getCompletionRate(assignment.submissions, assignment.totalStudents) >= 50 ? (
                  <CheckCircle size={14} style={{ color: '#10b981' }} />
                ) : (
                  <XCircle size={14} style={{ color: '#ef4444' }} />
                )}
                <span>{getCompletionRate(assignment.submissions, assignment.totalStudents)}% complete</span>
              </div>
            </div>

            <div style={{ 
              background: '#f8fafc', 
              padding: '8px', 
              borderRadius: '6px', 
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              <strong>Completion Rate: {getCompletionRate(assignment.submissions, assignment.totalStudents)}%</strong>
              <div style={{ 
                background: '#e2e8f0', 
                height: '4px', 
                borderRadius: '2px', 
                marginTop: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  background: getCompletionRate(assignment.submissions, assignment.totalStudents) >= 50 ? '#10b981' : '#ef4444',
                  height: '100%',
                  width: `${getCompletionRate(assignment.submissions, assignment.totalStudents)}%`,
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            <div className="card-actions">
              <button 
                className="btn-small"
                style={{ background: '#10b981', color: 'white' }}
              >
                View Submissions
              </button>
              <button 
                onClick={() => handleEdit(assignment)}
                className="btn-small btn-edit"
              >
                <Edit size={12} />
                {t('edit')}
              </button>
              <button 
                onClick={() => handleDelete(assignment.id)}
                className="btn-small btn-delete"
              >
                <Trash2 size={12} />
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {assignments.length === 0 && (
        <div className="empty-state">
          <h3>No assignments yet</h3>
          <p>Start by creating your first assignment</p>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingAssignment ? 'Edit Assignment' : 'Add New Assignment'}
              </h2>
              <button 
                onClick={resetForm}
                className="modal-close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">{t('title')}</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t('subject')}</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="form-select"
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="ICT">ICT</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('grade')}</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    className="form-select"
                    required
                  >
                    <option value="">Select Grade</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Total Marks</label>
                  <input
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({...formData, totalMarks: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="form-select"
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t('description')}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="form-textarea"
                  required
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary"
                >
                  {t('cancel')}
                </button>
                <button 
                  type="submit"
                  className="btn-primary"
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssignmentsPage