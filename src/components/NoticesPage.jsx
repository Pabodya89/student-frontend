import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Plus, Edit, Trash2, Calendar, Bell } from 'lucide-react'

const NoticesPage = () => {
  const { t } = useLanguage()
  const [showModal, setShowModal] = useState(false)
  const [editingNotice, setEditingNotice] = useState(null)
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Mid-term Exam Schedule',
      content: 'Mid-term examinations will be held from March 15-22, 2024. Please check your individual timetables.',
      priority: 'high',
      publishDate: '2024-01-15',
      targetGrades: ['Grade 9', 'Grade 10', 'Grade 11']
    },
    {
      id: 2,
      title: 'New Assignment Guidelines',
      content: 'Please note the new format for submitting assignments. All submissions must be in PDF format.',
      priority: 'medium',
      publishDate: '2024-01-14',
      targetGrades: ['Grade 8', 'Grade 9']
    },
    {
      id: 3,
      title: 'Holiday Schedule',
      content: 'Classes will be suspended from December 20, 2024 to January 5, 2025 for winter holidays.',
      priority: 'low',
      publishDate: '2024-01-13',
      targetGrades: ['All Grades']
    }
  ])

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium',
    publishDate: '',
    targetGrades: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingNotice) {
      setNotices(notices.map(notice => 
        notice.id === editingNotice.id 
          ? { ...notice, ...formData }
          : notice
      ))
    } else {
      setNotices([...notices, { 
        id: Date.now(), 
        ...formData,
        publishDate: formData.publishDate || new Date().toISOString().split('T')[0]
      }])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      priority: 'medium',
      publishDate: '',
      targetGrades: []
    })
    setEditingNotice(null)
    setShowModal(false)
  }

  const handleEdit = (notice) => {
    setEditingNotice(notice)
    setFormData({
      title: notice.title,
      content: notice.content,
      priority: notice.priority,
      publishDate: notice.publishDate,
      targetGrades: notice.targetGrades
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setNotices(notices.filter(notice => notice.id !== id))
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ef4444'
      case 'medium': return '#f59e0b'
      case 'low': return '#10b981'
      default: return '#64748b'
    }
  }

  const handleGradeChange = (grade) => {
    setFormData({
      ...formData,
      targetGrades: formData.targetGrades.includes(grade)
        ? formData.targetGrades.filter(g => g !== grade)
        : [...formData.targetGrades, grade]
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">{t('notices')}</h1>
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
        {notices.map(notice => (
          <div key={notice.id} className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Bell size={16} style={{ color: getPriorityColor(notice.priority) }} />
              <div className="card-title">{notice.title}</div>
            </div>
            
            <div className="card-meta">
              <span style={{ 
                background: getPriorityColor(notice.priority), 
                color: 'white', 
                padding: '2px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                {notice.priority}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={16} />
                {notice.publishDate}
              </div>
            </div>

            <p style={{ color: '#64748b', marginBottom: '12px', lineHeight: '1.5' }}>
              {notice.content}
            </p>

            <div style={{ marginBottom: '12px' }}>
              <strong>Target Grades:</strong>
              <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                {notice.targetGrades.map((grade, index) => (
                  <span key={index} style={{ 
                    background: '#eff6ff', 
                    color: '#3b82f6', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '12px' 
                  }}>
                    {grade}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-actions">
              <button 
                onClick={() => handleEdit(notice)}
                className="btn-small btn-edit"
              >
                <Edit size={12} />
                {t('edit')}
              </button>
              <button 
                onClick={() => handleDelete(notice.id)}
                className="btn-small btn-delete"
              >
                <Trash2 size={12} />
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {notices.length === 0 && (
        <div className="empty-state">
          <h3>No notices yet</h3>
          <p>Start by adding your first notice</p>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingNotice ? 'Edit Notice' : 'Add New Notice'}
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
                  <label className="form-label">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="form-select"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Publish Date</label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="form-textarea"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Grades</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'All Grades'].map(grade => (
                    <label key={grade} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input
                        type="checkbox"
                        checked={formData.targetGrades.includes(grade)}
                        onChange={() => handleGradeChange(grade)}
                      />
                      {grade}
                    </label>
                  ))}
                </div>
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

export default NoticesPage