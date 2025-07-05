import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { DataProvider } from './contexts/DataContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Subjects from './components/Subjects';
import Teachers from './components/Teachers';
import Lessons from './components/Lessons';
import Assignments from './components/Assignments';
import PastPapers from './components/PastPapers';
import Quiz from './components/Quiz';
import Chat from './components/Chat';
import Reports from './components/Reports';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import './App.css';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/teachers/:subjectId" element={<Teachers />} />
          <Route path="/lessons/:teacherId" element={<Lessons />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/past-papers" element={<PastPapers />} />
          <Route path="/quiz/:lessonId" element={<Quiz />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <DataProvider>
          <Router>
            <AppContent />
          </Router>
        </DataProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;