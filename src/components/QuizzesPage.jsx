import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Plus, Edit, Trash2, Calendar, HelpCircle, Clock, Users } from 'lucide-react'

const QuizzesPage = () => {
  const { t } = useLanguage()
  const [showModal, setShowModal] = useState(false)
  const [editingQuiz, setEditingQuiz] = useState(null)
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: 'Basic Algebra Quiz',
      subject: 'Mathematics',
      grade: 'Grade 9',
      description: 'Quick quiz on basic algebraic operations',
      questions: 10,
      duration: '15 minutes',
      totalMarks: 20,
      attempts: 45,
      avgScore: 78,
      createdAt: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      title: 'Photosynthesis Quiz',
      subject: 'Science',
      grade: 'Grade 8',
      description: 'Test your knowledge of photosynthesis process',
      questions: 8,
      duration: '10 minutes',
      totalMarks: 16,
      attempts: 32,
      avgScore: 85,
      createdAt: '2024-01-14',
      status: 'active'
    },
    {
      id: 3,
      title: 'HTML Tags Quiz',
      subject: 'ICT',
      grade: 'Grade 11',
      description: 'Quiz on common HTML tags and attributes',
      questions: 12,
      duration: '20 minutes',
      totalMarks: 24,
      attempts: 28,
      avgScore: 72,
      createdAt: '2024-01-13',
      status: 'draft'
    }
  ])

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    grade: '',
    description: '',
    questions: '',
    duration: '',
    totalMarks: '',
    status: 'draft'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingQuiz) {
      setQuizzes(quizzes.map(quiz => 
        quiz.id === editingQuiz.id 
          ? { ...quiz, ...formData }
          : quiz
      ))
    } else {
      setQuizzes([...quizzes, { 
        id: Date.now(), 
        ...formData,
        attempts: 0,
        avgScore: 0,
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
      questions: '',
      duration: '',
      totalMarks: '',
      status: 'draft'
    })
    setEditingQuiz(null)
    setShowModal(false)
  }

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz)
    setFormData({
      title: quiz.title,
      subject: quiz.subject,
      grade: quiz.grade,
      description: quiz.description,
      questions: quiz.questions,
      duration: quiz.duration,
      totalMarks: quiz.totalMarks,
      status: quiz.status
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setQuizzes(quizzes.filter(quiz => quiz.id !== id))
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#10b981'
      case 'draft': return '#f59e0b'
      case 'closed': return '#ef4444'
      default: return '#64748b'
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">{t('quizzes')}</h1>
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
        {quizzes.map(quiz => (
          <div key={quiz.id} className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <HelpCircle size={16} style={{ color: '#3b82f6' }} />
              <div className="card-title">{quiz.title}</div>
            </div>
            
            <div className="card-meta">
              <span>{quiz.subject}</span>
              <span>{quiz.grade}</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <span style={{ 
                background: getStatusColor(quiz.status), 
                color: 'white', 
                padding: '2px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                {quiz.status}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b' }}>
                <Calendar size={12} />
                {quiz.createdAt}
              </div>
            </div>

            <p style={{ color: '#64748b', marginBottom: '12px', lineHeight: '1.5' }}>
              {quiz.description}
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '8px', 
              marginBottom: '12px',
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <HelpCircle size={14} />
                <span>{quiz.questions} questions</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} />
                <span>{quiz.duration}</span>
              </div>
              <div>
                <strong>Total Marks:</strong> {quiz.totalMarks}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Users size={14} />
                <span>{quiz.attempts} attempts</span>
              </div>
            </div>

            {quiz.attempts > 0 && (
              <div style={{ 
                background: '#f8fafc', 
                padding: '8px', 
                borderRadius: '6px', 
                marginBottom: '12px',
                textAlign: 'center'
              }}>
                <strong>Average Score: {quiz.avgScore}%</strong>
              </div>
            )}

            <div className="card-actions">
              <button 
                className="btn-small"
                style={{ background: '#10b981', color: 'white' }}
              >
                View Results
              </button>
              <button 
                onClick={() => handleEdit(quiz)}
                className="btn-small btn-edit"
              >
                <Edit size={12} />
                {t('edit')}
              </button>
              <button 
                onClick={() => handleDelete(quiz.id)}
                className="btn-small btn-delete"
              >
                <Trash2 size={12} />
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {quizzes.length === 0 && (
        <div className="empty-state">
          <h3>No quizzes yet</h3>
          <p>Start by creating your first quiz</p>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingQuiz ? 'Edit Quiz' : 'Add New Quiz'}
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
                  <label className="form-label">Number of Questions</label>
                  <input
                    type="number"
                    value={formData.questions}
                    onChange={(e) => setFormData({...formData, questions: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="form-input"
                    placeholder="e.g., 15 minutes"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
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

export default QuizzesPage