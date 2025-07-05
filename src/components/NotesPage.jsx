import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Plus, Edit, Trash2, Calendar, StickyNote, Download } from 'lucide-react'

const NotesPage = () => {
  const { t } = useLanguage()
  const [showModal, setShowModal] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Algebraic Expressions',
      subject: 'Mathematics',
      grade: 'Grade 9',
      content: 'Detailed notes on algebraic expressions including variables, coefficients, and like terms.',
      tags: ['algebra', 'variables', 'expressions'],
      createdAt: '2024-01-15',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'Plant Cell Structure',
      subject: 'Science',
      grade: 'Grade 8',
      content: 'Comprehensive notes on plant cell structure, organelles, and their functions.',
      tags: ['biology', 'cells', 'plants'],
      createdAt: '2024-01-14',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      title: 'HTML Basics',
      subject: 'ICT',
      grade: 'Grade 11',
      content: 'Introduction to HTML tags, attributes, and basic web page structure.',
      tags: ['html', 'web', 'programming'],
      createdAt: '2024-01-13',
      lastUpdated: '2024-01-13'
    }
  ])

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    grade: '',
    content: '',
    tags: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const currentDate = new Date().toISOString().split('T')[0]
    if (editingNote) {
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, ...formData, lastUpdated: currentDate }
          : note
      ))
    } else {
      setNotes([...notes, { 
        id: Date.now(), 
        ...formData,
        createdAt: currentDate,
        lastUpdated: currentDate
      }])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      subject: '',
      grade: '',
      content: '',
      tags: []
    })
    setEditingNote(null)
    setShowModal(false)
  }

  const handleEdit = (note) => {
    setEditingNote(note)
    setFormData({
      title: note.title,
      subject: note.subject,
      grade: note.grade,
      content: note.content,
      tags: note.tags
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const handleTagsChange = (tagsString) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag)
    setFormData({...formData, tags})
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">{t('notes')}</h1>
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
        {notes.map(note => (
          <div key={note.id} className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <StickyNote size={16} style={{ color: '#f59e0b' }} />
              <div className="card-title">{note.title}</div>
            </div>
            
            <div className="card-meta">
              <span>{note.subject}</span>
              <span>{note.grade}</span>
            </div>

            <p style={{ 
              color: '#64748b', 
              marginBottom: '12px', 
              lineHeight: '1.5',
              display: '-webkit-box',
              '-webkit-line-clamp': 3,
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden'
            }}>
              {note.content}
            </p>

            <div style={{ marginBottom: '12px' }}>
              <strong>Tags:</strong>
              <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                {note.tags.map((tag, index) => (
                  <span key={index} style={{ 
                    background: '#fef3c7', 
                    color: '#d97706', 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '12px' 
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px', 
              marginBottom: '16px',
              fontSize: '12px', 
              color: '#64748b' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={12} />
                Created: {note.createdAt}
              </div>
              <div>
                Updated: {note.lastUpdated}
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
                onClick={() => handleEdit(note)}
                className="btn-small btn-edit"
              >
                <Edit size={12} />
                {t('edit')}
              </button>
              <button 
                onClick={() => handleDelete(note.id)}
                className="btn-small btn-delete"
              >
                <Trash2 size={12} />
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="empty-state">
          <h3>No notes yet</h3>
          <p>Start by adding your first study note</p>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingNote ? 'Edit Note' : 'Add New Note'}
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
                <label className="form-label">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="form-textarea"
                  style={{ minHeight: '200px' }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  className="form-input"
                  placeholder="e.g., algebra, variables, expressions"
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

export default NotesPage