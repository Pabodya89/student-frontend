import { useState } from 'react'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import './App.css'

function AppContent() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="app">
      {isAuthenticated ? <Dashboard /> : <LoginForm />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App