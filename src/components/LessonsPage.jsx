import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Plus, Edit, Trash2, Calendar, Clock } from 'lucide-react'

const LessonsPage = () => {
  const { t } = useLanguage()
  const [showModal, setShowModal] = useState(false)
  const [editingLesson, setEditingLesson] = useState(null)
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      grade: 'Grade 9',
      description: 'Basic concepts of algebra including variables, expressions, and equations.',
      duration: '45 minutes',
      createdAt: '2024-01-15',
      materials: ['PDF Notes', 'Practice Exercises', 'Video Tutorial']
    },
    {
      id: 2,
      title: 'Photosynthesis',
      subject: 'Science',
      grade: 'Grade 8',
      description: 'Understanding how plants make their own food through photosynthesis.',
      duration: '50 minutes',
      createdAt: '2024-01-14',
      materials: ['Lab Manual', 'Worksheets', 'Diagrams']
    },
    {
      id: 3,
      title: 'Computer Networks',
      subject: 'ICT',
      grade: 'Grade 11',
      description: 'Introduction to computer networks, protocols, and internet basics.',
      duration: '60 minutes',
      createdAt: '2024-01-13',
      materials: ['Presentation', 'Practical Guide', 'Quiz']
    }
  ])

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    grade: '',
    description: '',
    duration: '',
    materials: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingLesson) {
      setLessons(lessons.map(lesson => 
        lesson.id === editingLesson.id 
          ? { ...lesson, ...formData }
          : lesson
      ))
    } else {
      setLessons([...lessons, { 
        id: Date.now(), 
        ...formData,
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
      duration: '',
      materials: []
    })
    setEditingLesson(null)
    setShowModal(false)
  }

  const handleEdit = (lesson) => {
    setEditingLesson(lesson)
    setFormData({
      title: lesson.title,
      subject: lesson.subject,
      grade: lesson.grade,
      description: lesson.description,
      duration: lesson.duration,
      materials: lesson.materials
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setLessons(lessons.filter(lesson => lesson.id !== id))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">{t('lessons')}</h1>
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
        {lessons.map(lesson => (
          <div key={lesson.id} className="content-card">
            <div className="card-title">{lesson.title}</div>
            <div className="card-meta">
              <span>{lesson.subject}</span>
              <span>{lesson.grade}</span>
            </div>
            <p style={{ color: '#64748b', marginBottom: '12px' }}>{lesson.description}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', fontSize: '14px', color: '#64748b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={16} />
                {lesson.duration}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={16} />
                {lesson.createdAt}
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <strong>Materials:</strong>
              <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                {lesson.materials.map((material, index) => (
                  <span key={index} style={{ 
                    background: '#eff6ff', 
                    color: '#3b82f6', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '12px' 
                  }}>
                    {material}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-actions">
              <button 
                onClick={() => handleEdit(lesson)}
                className="btn-small btn-edit"
              >
                <Edit size={12} />
                {t('edit')}
              </button>
              <button 
                onClick={() => handleDelete(lesson.id)}
                className="btn-small btn-delete"
              >
                <Trash2 size={12} />
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {lessons.length === 0 && (
        <div className="empty-state">
          <h3>No lessons yet</h3>
          <p>Start by adding your first lesson pack</p>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
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

              <div className="form-group">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="form-input"
                  placeholder="e.g., 45 minutes"
                  required
                />
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

export default LessonsPage