import { 
  Home, 
  BookOpen, 
  Bell, 
  FileText, 
  StickyNote, 
  HelpCircle, 
  ClipboardList, 
  Users, 
  DollarSign, 
  Award, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  User 
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage()

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: Home },
    { id: 'lessons', label: t('lessons'), icon: BookOpen },
    { id: 'notices', label: t('notices'), icon: Bell },
    { id: 'papers', label: t('papers'), icon: FileText },
    { id: 'notes', label: t('notes'), icon: StickyNote },
    { id: 'quizzes', label: t('quizzes'), icon: HelpCircle },
    { id: 'assignments', label: t('assignments'), icon: ClipboardList },
    { id: 'students', label: t('students'), icon: Users },
    { id: 'income', label: t('income'), icon: DollarSign },
    { id: 'marks', label: t('marks'), icon: Award },
    { id: 'attendance', label: t('attendance'), icon: Calendar },
    { id: 'payments', label: t('payments'), icon: CreditCard },
    { id: 'feedback', label: t('feedback'), icon: MessageSquare },
    { id: 'profile', label: t('profile'), icon: User }
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">EduPlatform</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => {
          const Icon = item.icon
          return (
            <a
              key={item.id}
              href="#"
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab(item.id)
              }}
            >
              <Icon size={20} />
              {item.label}
            </a>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar