import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import DashboardHome from './DashboardHome'
import LessonsPage from './LessonsPage'
import NoticesPage from './NoticesPage'
import PapersPage from './PapersPage'
import NotesPage from './NotesPage'
import QuizzesPage from './QuizzesPage'
import AssignmentsPage from './AssignmentsPage'
import StudentsPage from './StudentsPage'
import IncomePage from './IncomePage'
import MarksPage from './MarksPage'
import AttendancePage from './AttendancePage'
import PaymentsPage from './PaymentsPage'
import FeedbackPage from './FeedbackPage'
import ProfilePage from './ProfilePage'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />
      case 'lessons':
        return <LessonsPage />
      case 'notices':
        return <NoticesPage />
      case 'papers':
        return <PapersPage />
      case 'notes':
        return <NotesPage />
      case 'quizzes':
        return <QuizzesPage />
      case 'assignments':
        return <AssignmentsPage />
      case 'students':
        return <StudentsPage />
      case 'income':
        return <IncomePage />
      case 'marks':
        return <MarksPage />
      case 'attendance':
        return <AttendancePage />
      case 'payments':
        return <PaymentsPage />
      case 'feedback':
        return <FeedbackPage />
      case 'profile':
        return <ProfilePage />
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <Header />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Dashboard