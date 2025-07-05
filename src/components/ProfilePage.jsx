import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Award, Edit2, Save, X } from 'lucide-react'

const ProfilePage = () => {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Education Street, Learning City, LC 12345',
    dateOfBirth: '1985-03-15',
    joinDate: '2020-01-15',
    subjects: ['Mathematics', 'Science'],
    qualifications: ['B.Sc. Mathematics', 'M.Ed. Education'],
    experience: '8 years',
    bio: 'Passionate educator with over 8 years of experience in teaching Mathematics and Science. Committed to helping students achieve their full potential through innovative teaching methods.',
    achievements: [
      'Best Teacher Award 2023',
      'Outstanding Educator Recognition 2022',
      'Mathematics Excellence Award 2021'
    ],
    specializations: ['Algebra', 'Geometry', 'Physics', 'Chemistry'],
    languages: ['English', 'Sinhala', 'Tamil']
  })

  const [editData, setEditData] = useState(profileData)

  const handleEdit = () => {
    setIsEditing(true)
    setEditData(profileData)
  }

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
    // In a real app, this would save to a database
    console.log('Profile updated:', editData)
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    setEditData({...editData, [field]: value})
  }

  const handleArrayChange = (field, index, value) => {
    const newArray = [...editData[field]]
    newArray[index] = value
    setEditData({...editData, [field]: newArray})
  }

  const addArrayItem = (field) => {
    setEditData({...editData, [field]: [...editData[field], '']})
  }

  const removeArrayItem = (field, index) => {
    const newArray = editData[field].filter((_, i) => i !== index)
    setEditData({...editData, [field]: newArray})
  }

  const currentData = isEditing ? editData : profileData

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="page-title">{t('profile')}</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Save size={16} />
                {t('save')}
              </button>
              <button onClick={handleCancel} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <X size={16} />
                {t('cancel')}
              </button>
            </>
          ) : (
            <button onClick={handleEdit} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Edit2 size={16} />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        {/* Profile Picture and Basic Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="tab-container">
            <div className="tab-content" style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                background: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '48px',
                margin: '0 auto 20px'
              }}>
                {currentData.name.charAt(0)}
              </div>
              <h2 style={{ marginBottom: '8px' }}>{currentData.name}</h2>
              <p style={{ color: '#64748b', marginBottom: '16px' }}>{currentData.subjects.join(', ')} Teacher</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={16} />
                  <span style={{ fontSize: '14px' }}>{currentData.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} />
                  <span style={{ fontSize: '14px' }}>{currentData.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} />
                  <span style={{ fontSize: '14px' }}>Joined: {currentData.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="tab-container">
            <div className="tab-header">
              <button className="tab-button active">Quick Stats</button>
            </div>
            <div className="tab-content">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Experience:</span>
                  <strong>{currentData.experience}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subjects:</span>
                  <strong>{currentData.subjects.length}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Languages:</span>
                  <strong>{currentData.languages.length}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Achievements:</span>
                  <strong>{currentData.achievements.length}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Personal Information */}
          <div className="tab-container">
            <div className="tab-header">
              <button className="tab-button active">Personal Information</button>
            </div>
            <div className="tab-content">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="form-input"
                    />
                  ) : (
                    <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                      {currentData.name}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="form-input"
                    />
                  ) : (
                    <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                      {currentData.email}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="form-input"
                    />
                  ) : (
                    <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                      {currentData.phone}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editData.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      className="form-input"
                    />
                  ) : (
                    <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                      {currentData.dateOfBirth}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Address</label>
                {isEditing ? (
                  <textarea
                    value={editData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="form-textarea"
                    rows={3}
                  />
                ) : (
                  <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                    {currentData.address}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Bio</label>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    className="form-textarea"
                    rows={4}
                  />
                ) : (
                  <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                    {currentData.bio}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="tab-container">
            <div className="tab-header">
              <button className="tab-button active">Professional Information</button>
            </div>
            <div className="tab-content">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Experience</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.experience}
                      onChange={(e) => handleChange('experience', e.target.value)}
                      className="form-input"
                    />
                  ) : (
                    <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                      {currentData.experience}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Join Date</label>
                  <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                    {currentData.joinDate}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subjects</label>
                {isEditing ? (
                  <div>
                    {editData.subjects.map((subject, index) => (
                      <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => handleArrayChange('subjects', index, e.target.value)}
                          className="form-input"
                        />
                        <button 
                          type="button"
                          onClick={() => removeArrayItem('subjects', index)}
                          className="btn-small btn-delete"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => addArrayItem('subjects')}
                      className="btn-small btn-secondary"
                    >
                      Add Subject
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {currentData.subjects.map((subject, index) => (
                      <span key={index} style={{ 
                        background: '#3b82f6', 
                        color: 'white', 
                        padding: '4px 12px', 
                        borderRadius: '12px', 
                        fontSize: '14px' 
                      }}>
                        {subject}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Qualifications</label>
                {isEditing ? (
                  <div>
                    {editData.qualifications.map((qual, index) => (
                      <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          value={qual}
                          onChange={(e) => handleArrayChange('qualifications', index, e.target.value)}
                          className="form-input"
                        />
                        <button 
                          type="button"
                          onClick={() => removeArrayItem('qualifications', index)}
                          className="btn-small btn-delete"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => addArrayItem('qualifications')}
                      className="btn-small btn-secondary"
                    >
                      Add Qualification
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {currentData.qualifications.map((qual, index) => (
                      <div key={index} style={{ 
                        background: '#f8fafc', 
                        padding: '8px 12px', 
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0'
                      }}>
                        {qual}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Specializations</label>
                {isEditing ? (
                  <div>
                    {editData.specializations.map((spec, index) => (
                      <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                          type="text"
                          value={spec}
                          onChange={(e) => handleArrayChange('specializations', index, e.target.value)}
                          className="form-input"
                        />
                        <button 
                          type="button"
                          onClick={() => removeArrayItem('specializations', index)}
                          className="btn-small btn-delete"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    <button 
                      type="button"
                      onClick={() => addArrayItem('specializations')}
                      className="btn-small btn-secondary"
                    >
                      Add Specialization
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {currentData.specializations.map((spec, index) => (
                      <span key={index} style={{ 
                        background: '#10b981', 
                        color: 'white', 
                        padding: '4px 12px', 
                        borderRadius: '12px', 
                        fontSize: '14px' 
                      }}>
                        {spec}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="tab-container">
            <div className="tab-header">
              <button className="tab-button active">Achievements & Awards</button>
            </div>
            <div className="tab-content">
              {isEditing ? (
                <div>
                  {editData.achievements.map((achievement, index) => (
                    <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => handleArrayChange('achievements', index, e.target.value)}
                        className="form-input"
                      />
                      <button 
                        type="button"
                        onClick={() => removeArrayItem('achievements', index)}
                        className="btn-small btn-delete"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => addArrayItem('achievements')}
                    className="btn-small btn-secondary"
                  >
                    Add Achievement
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentData.achievements.map((achievement, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      background: '#fef3c7',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #f59e0b'
                    }}>
                      <Award size={20} style={{ color: '#f59e0b' }} />
                      <span style={{ fontWeight: '500' }}>{achievement}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage