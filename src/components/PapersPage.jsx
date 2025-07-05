import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Plus, Edit, Trash2, Calendar, FileText, Download } from 'lucide-react'

const PapersPage = () => {
  const { t } = useLanguage()
  const [showModal, setShowModal] = useState(false)
  const [editingPaper, setEditingPaper] = useState(null)
  const [papers, setPapers] = useState([
    {
      id: 1,
      title: 'Mathematics Mid-term Exam',
      subject: 'Mathematics',
      grade: 'Grade 9',
      type: 'exam',
      duration: '2 hours',
      totalMarks: 100,
      createdAt: '2024-01-15',
      questions: 25,
      description: 'Comprehensive exam covering algebra, geometry, and statistics'
    },
    {
      id: 2,
      title: 'Science Chapter 5 Test',
      subject: 'Science',
      grade: 'Grade 8',
      type: 'test',
      duration: '1 hour',
      totalMarks: 50,
      createdAt: '2024-01-14',
      questions: 20,
      description: 'Test on photosynthesis and plant biology'
    },
    {
      id: 3,
      title: 'ICT Final Assessment',
      subject: 'ICT',
      grade: 'Grade 11',
      type: 'assessment',
      duration: '3 hours',
      totalMarks: 150,
      createdAt: '2024-01-13',
      questions: 40,
      description: 'Final assessment covering programming, networks, and databases'
    }
  ])

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    grade: '',
    type: 'test',
    duration: '',
    totalMarks: '',
    questions: '',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingPaper) {
      setPapers(papers.map(paper => 
        paper.id === editingPaper.id 
          ? { ...paper, ...formData }
          : paper
      ))
    } else {
      setPapers([...papers, { 
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
      type: 'test',
      duration: '',
      totalMarks: '',
      questions: '',
      description: ''
    })
    setEditingPaper(null)
    setShowModal(false)
  }

  const handleEdit = (paper) => {
    setEditingPaper(paper)
    setFormData({
      title: paper.title,
      subject: paper.subject,
      grade: paper.grade,
      type: paper.type,
      duration: paper.duration,
      totalMarks: paper.totalMarks,
      questions: paper.questions,
      description: paper.description
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setPapers(papers.filter(paper => paper.id !== id))
  }

  const getTypeColor = (type) => {
    switch(type) {
      case 'exam': return '#ef4444'
      case 'test': return '#f59e0b'
      case 'assessment': return '#3b82f6'
      default: return '#64748b'
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">{t('papers')}</h1>
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
        {papers.map(paper => (
          <div key={paper.id} className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <FileText size={16} style={{ color: getTypeColor(paper.type) }} />
              <div className="card-title">{paper.title}</div>
            </div>
            
            <div className="card-meta">
              <span>{paper.subject}</span>
              <span>{paper.grade}</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <span style={{ 
                background: getTypeColor(paper.type), 
                color: 'white', 
                padding: '2px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                {paper.type}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#64748b' }}>
                <Calendar size={12} />
                {paper.createdAt}
              </div>
            </div>

            <p style={{ color: '#64748b', marginBottom: '12px', lineHeight: '1.5' }}>
              {paper.description}
            </p>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '8px', 
              marginBottom: '16px',
              fontSize: '14px'
            }}>
              <div>
                <strong>Duration:</strong> {paper.duration}
              </div>
              <div>
                <strong>Total Marks:</strong> {paper.totalMarks}
              </div>
              <div>
                <strong>Questions:</strong> {paper.questions}
              </div>
              <div>
                <strong>Type:</strong> {paper.type}
              </div>
            </div>

            <div className="card-actions">
              <button 
                className="btn-small"
                style={{ background: '#10b981', color: 'white' }}
              >
                <Download size={12} />
                Download
              </button>
              <button 
                onClick={() => handleEdit(paper)}
                className="btn-small btn-edit"
              >
                <Edit size={12} />
                {t('edit')}
              </button>
              <button 
                onClick={() => handleDelete(paper.id)}
                className="btn-small btn-delete"
              >
                <Trash2 size={12} />
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {papers.length === 0 && (
        <div className="empty-state">
          <h3>No papers yet</h3>
          <p>Start by adding your first exam paper</p>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingPaper ? 'Edit Paper' : 'Add New Paper'}
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
                  <label className="form-label">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="form-select"
                    required
                  >
                    <option value="test">Test</option>
                    <option value="exam">Exam</option>
                    <option value="assessment">Assessment</option>
                    <option value="quiz">Quiz</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="form-input"
                    placeholder="e.g., 2 hours"
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
                  <label className="form-label">Number of Questions</label>
                  <input
                    type="number"
                    value={formData.questions}
                    onChange={(e) => setFormData({...formData, questions: e.target.value})}
                    className="form-input"
                    required
                  />
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

export default PapersPage