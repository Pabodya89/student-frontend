import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { MessageSquare, Star, Calendar, Users, TrendingUp, Filter } from 'lucide-react'

const FeedbackPage = () => {
  const { t } = useLanguage()
  const [filterRating, setFilterRating] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  const [filterDate, setFilterDate] = useState('')
  
  const [feedbackData] = useState([
    {
      id: 1,
      studentName: 'John Smith',
      subject: 'Mathematics',
      grade: 'Grade 9',
      rating: 5,
      comment: 'Excellent teacher! The lessons are very clear and easy to understand. I improved my grades significantly.',
      date: '2024-01-20',
      category: 'teaching_quality',
      helpful: true
    },
    {
      id: 2,
      studentName: 'Sarah Johnson',
      subject: 'Science',
      grade: 'Grade 8',
      rating: 4,
      comment: 'Good explanation of biology concepts. Would like more interactive experiments.',
      date: '2024-01-19',
      category: 'content_delivery',
      helpful: true
    },
    {
      id: 3,
      studentName: 'Mike Wilson',
      subject: 'ICT',
      grade: 'Grade 11',
      rating: 5,
      comment: 'Amazing programming lessons! The practical approach really helped me understand coding better.',
      date: '2024-01-18',
      category: 'teaching_quality',
      helpful: true
    },
    {
      id: 4,
      studentName: 'Emma Brown',
      subject: 'Mathematics',
      grade: 'Grade 10',
      rating: 3,
      comment: 'The lessons are okay but sometimes go too fast. Would appreciate more time for practice.',
      date: '2024-01-17',
      category: 'pace',
      helpful: false
    },
    {
      id: 5,
      studentName: 'David Lee',
      subject: 'Science',
      grade: 'Grade 9',
      rating: 4,
      comment: 'Good teacher, but assignments could be more challenging. Overall satisfied with the progress.',
      date: '2024-01-16',
      category: 'assignments',
      helpful: true
    },
    {
      id: 6,
      studentName: 'Lisa Wang',
      subject: 'ICT',
      grade: 'Grade 11',
      rating: 5,
      comment: 'Fantastic course! The projects are very practical and relevant to real-world applications.',
      date: '2024-01-15',
      category: 'relevance',
      helpful: true
    }
  ])

  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesRating = !filterRating || feedback.rating.toString() === filterRating
    const matchesSubject = !filterSubject || feedback.subject === filterSubject
    const matchesDate = !filterDate || feedback.date === filterDate
    
    return matchesRating && matchesSubject && matchesDate
  })

  const getRatingColor = (rating) => {
    if (rating >= 4) return '#10b981'
    if (rating >= 3) return '#f59e0b'
    return '#ef4444'
  }

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'teaching_quality': return 'Teaching Quality'
      case 'content_delivery': return 'Content Delivery'
      case 'pace': return 'Lesson Pace'
      case 'assignments': return 'Assignments'
      case 'relevance': return 'Relevance'
      default: return 'General'
    }
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case 'teaching_quality': return '#3b82f6'
      case 'content_delivery': return '#10b981'
      case 'pace': return '#f59e0b'
      case 'assignments': return '#8b5cf6'
      case 'relevance': return '#06b6d4'
      default: return '#64748b'
    }
  }

  // Calculate statistics
  const totalFeedback = feedbackData.length
  const averageRating = feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0) / totalFeedback
  const positiveCount = feedbackData.filter(f => f.rating >= 4).length
  const helpfulCount = feedbackData.filter(f => f.helpful).length

  const ratingDistribution = {
    5: feedbackData.filter(f => f.rating === 5).length,
    4: feedbackData.filter(f => f.rating === 4).length,
    3: feedbackData.filter(f => f.rating === 3).length,
    2: feedbackData.filter(f => f.rating === 2).length,
    1: feedbackData.filter(f => f.rating === 1).length
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">{t('feedback')}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={20} />
          <span>{totalFeedback} reviews</span>
        </div>
      </div>

      {/* Feedback Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Average Rating</span>
            <Star size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div className="stat-value">{averageRating.toFixed(1)}</div>
          <div className="stat-change" style={{ color: '#10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  style={{ 
                    color: i < Math.floor(averageRating) ? '#f59e0b' : '#e2e8f0',
                    fill: i < Math.floor(averageRating) ? '#f59e0b' : '#e2e8f0'
                  }} 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Positive Reviews</span>
            <TrendingUp size={24} style={{ color: '#10b981' }} />
          </div>
          <div className="stat-value">{positiveCount}</div>
          <div className="stat-change" style={{ color: '#10b981' }}>
            {Math.round((positiveCount / totalFeedback) * 100)}% of total
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Helpful Reviews</span>
            <Users size={24} style={{ color: '#3b82f6' }} />
          </div>
          <div className="stat-value">{helpfulCount}</div>
          <div className="stat-change" style={{ color: '#3b82f6' }}>
            {Math.round((helpfulCount / totalFeedback) * 100)}% helpful
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Reviews</span>
            <MessageSquare size={24} style={{ color: '#8b5cf6' }} />
          </div>
          <div className="stat-value">{totalFeedback}</div>
          <div className="stat-change">
            This month
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Filters */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          gap: '16px',
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <div>
            <label className="form-label">Filter by Rating</label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="form-select"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
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
          
          <div>
            <label className="form-label">Filter by Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Rating Distribution */}
        <div style={{ 
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ marginBottom: '16px' }}>Rating Distribution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '20px' }}>{rating}</span>
                <Star size={16} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                <div style={{ 
                  flex: 1,
                  background: '#e2e8f0', 
                  height: '8px', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    background: '#f59e0b',
                    height: '100%',
                    width: `${(ratingDistribution[rating] / totalFeedback) * 100}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
                <span style={{ width: '30px', textAlign: 'right' }}>
                  {ratingDistribution[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="card-grid">
        {filteredFeedback.map(feedback => (
          <div key={feedback.id} className="content-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
              <div>
                <div className="card-title">{feedback.studentName}</div>
                <div style={{ fontSize: '14px', color: '#64748b' }}>
                  {feedback.subject} • {feedback.grade}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={16} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                <span style={{ fontWeight: 'bold' }}>{feedback.rating}</span>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <span style={{ 
                background: getCategoryColor(feedback.category), 
                color: 'white', 
                padding: '2px 8px', 
                borderRadius: '12px', 
                fontSize: '12px'
              }}>
                {getCategoryLabel(feedback.category)}
              </span>
            </div>

            <p style={{ 
              color: '#64748b', 
              marginBottom: '12px', 
              lineHeight: '1.5',
              fontStyle: 'italic'
            }}>
              "{feedback.comment}"
            </p>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              fontSize: '12px',
              color: '#64748b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={12} />
                {feedback.date}
              </div>
              {feedback.helpful && (
                <span style={{ 
                  background: '#dcfce7', 
                  color: '#16a34a', 
                  padding: '2px 6px', 
                  borderRadius: '8px',
                  fontSize: '11px'
                }}>
                  Helpful
                </span>
              )}
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              marginTop: '12px'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px'
              }}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    style={{ 
                      color: i < feedback.rating ? '#f59e0b' : '#e2e8f0',
                      fill: i < feedback.rating ? '#f59e0b' : '#e2e8f0'
                    }} 
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFeedback.length === 0 && (
        <div className="empty-state">
          <h3>No feedback found</h3>
          <p>Try adjusting your filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default FeedbackPage