import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'

const Header = () => {
  const { user, logout } = useAuth()
  const { language, changeLanguage, t } = useLanguage()

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'si', label: 'සිංහල', flag: '🇱🇰' },
    { code: 'ta', label: 'தமிழ்', flag: '🇱🇰' }
  ]

  return (
    <div className="top-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span>Welcome, {user?.name}</span>
        <div className="language-selector">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`language-btn ${language === lang.code ? 'active' : ''}`}
            >
              {lang.flag} {lang.label}
            </button>
          ))}
        </div>
      </div>
      <button 
        onClick={logout}
        className="logout-btn"
      >
        {t('logout')}
      </button>
    </div>
  )
}

export default Header