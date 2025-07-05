import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const login = (credentials) => {
    // Mock login logic - in real app, this would be an API call
    if (credentials.email && credentials.password) {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: credentials.email,
        subject: 'Mathematics',
        profilePicture: null
      }
      setUser(mockUser)
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}