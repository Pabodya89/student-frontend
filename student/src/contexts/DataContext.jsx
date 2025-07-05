import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Mock data for the platform
const mockData = {
  subjects: [
    {
      id: 1,
      name: 'Mathematics',
      description: 'Advanced Mathematics for O/L',
      color: 'bg-blue-500',
      icon: '📐',
      enrolled: true,
      lessons: 24,
      progress: 65
    },
    {
      id: 2,
      name: 'Science',
      description: 'Physical Science & Biology',
      color: 'bg-green-500',
      icon: '🔬',
      enrolled: true,
      lessons: 30,
      progress: 40
    },
    {
      id: 3,
      name: 'ICT',
      description: 'Information & Communication Technology',
      color: 'bg-purple-500',
      icon: '💻',
      enrolled: false,
      lessons: 18,
      progress: 0
    },
    {
      id: 4,
      name: 'English',
      description: 'English Language & Literature',
      color: 'bg-red-500',
      icon: '📚',
      enrolled: true,
      lessons: 20,
      progress: 80
    },
    {
      id: 5,
      name: 'History',
      description: 'Sri Lankan History',
      color: 'bg-yellow-500',
      icon: '🏛️',
      enrolled: false,
      lessons: 15,
      progress: 0
    }
  ],
  
  teachers: [
    {
      id: 1,
      name: 'Mr. Kamal Perera',
      subject: 'Mathematics',
      experience: '8 years',
      rating: 4.8,
      students: 150,
      avatar: 'https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      specialization: 'Algebra & Geometry'
    },
    {
      id: 2,
      name: 'Mrs. Sandya Silva',
      subject: 'Mathematics',
      experience: '12 years',
      rating: 4.9,
      students: 200,
      avatar: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      specialization: 'Calculus & Statistics'
    },
    {
      id: 3,
      name: 'Mr. Rohan Fernando',
      subject: 'Science',
      experience: '6 years',
      rating: 4.7,
      students: 120,
      avatar: 'https://images.pexels.com/photos/5212356/pexels-photo-5212356.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      specialization: 'Physics & Chemistry'
    }
  ],
  
  lessons: [
    {
      id: 1,
      title: 'Introduction to Algebra',
      duration: '45 min',
      difficulty: 'Beginner',
      teacherId: 1,
      completed: true,
      quizAvailable: true,
      description: 'Learn the basics of algebraic expressions and equations'
    },
    {
      id: 2,
      title: 'Linear Equations',
      duration: '60 min',
      difficulty: 'Intermediate',
      teacherId: 1,
      completed: false,
      quizAvailable: true,
      description: 'Solve linear equations and understand their applications'
    },
    {
      id: 3,
      title: 'Quadratic Functions',
      duration: '75 min',
      difficulty: 'Advanced',
      teacherId: 1,
      completed: false,
      quizAvailable: false,
      description: 'Master quadratic functions and their graphical representation'
    }
  ],
  
  assignments: [
    {
      id: 1,
      title: 'Algebra Problem Set 1',
      subject: 'Mathematics',
      dueDate: '2024-01-15',
      status: 'submitted',
      grade: 85,
      description: 'Complete exercises 1-20 from Chapter 3'
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      subject: 'Science',
      dueDate: '2024-01-20',
      status: 'pending',
      grade: null,
      description: 'Write a report on the pendulum experiment'
    },
    {
      id: 3,
      title: 'Essay on Modern Technology',
      subject: 'English',
      dueDate: '2024-01-25',
      status: 'graded',
      grade: 92,
      description: 'Write a 500-word essay on the impact of modern technology'
    }
  ],
  
  quizzes: [
    {
      id: 1,
      lessonId: 1,
      questions: [
        {
          id: 1,
          question: 'What is the value of x in the equation 2x + 5 = 13?',
          options: ['2', '4', '6', '8'],
          correct: 1
        },
        {
          id: 2,
          question: 'Simplify: 3(x + 2) - 2x',
          options: ['x + 6', 'x + 2', '3x + 6', '5x + 6'],
          correct: 0
        },
        {
          id: 3,
          question: 'Which of the following is a linear equation?',
          options: ['x² + 2x = 5', '2x + 3 = 7', 'x³ - 1 = 0', '√x = 4'],
          correct: 1
        }
      ]
    }
  ],
  
  chatMessages: [
    {
      id: 1,
      sender: 'teacher',
      teacherName: 'Mr. Kamal Perera',
      message: 'Hello! How can I help you today?',
      timestamp: '2024-01-10 10:30'
    },
    {
      id: 2,
      sender: 'student',
      message: 'I need help with quadratic equations.',
      timestamp: '2024-01-10 10:35'
    },
    {
      id: 3,
      sender: 'teacher',
      teacherName: 'Mr. Kamal Perera',
      message: 'Sure! What specific part are you having trouble with?',
      timestamp: '2024-01-10 10:37'
    }
  ],
  
  reports: {
    subjectProgress: [
      { subject: 'Mathematics', progress: 65, grade: 'B+' },
      { subject: 'Science', progress: 40, grade: 'C+' },
      { subject: 'English', progress: 80, grade: 'A-' }
    ],
    quizScores: [
      { quiz: 'Algebra Basics', score: 85, date: '2024-01-05' },
      { quiz: 'Linear Equations', score: 92, date: '2024-01-08' },
      { quiz: 'Physics Motion', score: 78, date: '2024-01-10' }
    ],
    assignmentGrades: [
      { assignment: 'Algebra Problem Set 1', grade: 85, date: '2024-01-12' },
      { assignment: 'Essay on Technology', grade: 92, date: '2024-01-14' },
      { assignment: 'Science Lab Report', grade: 88, date: '2024-01-16' }
    ]
  }
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(mockData);
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);

  useEffect(() => {
    const enrolled = data.subjects.filter(subject => subject.enrolled);
    setEnrolledSubjects(enrolled);
  }, [data.subjects]);

  const enrollInSubject = (subjectId) => {
    setData(prevData => ({
      ...prevData,
      subjects: prevData.subjects.map(subject =>
        subject.id === subjectId ? { ...subject, enrolled: true } : subject
      )
    }));
  };

  const submitAssignment = (assignmentId, submission) => {
    setData(prevData => ({
      ...prevData,
      assignments: prevData.assignments.map(assignment =>
        assignment.id === assignmentId 
          ? { ...assignment, status: 'submitted', submission }
          : assignment
      )
    }));
  };

  const submitQuiz = (quizId, answers) => {
    const quiz = data.quizzes.find(q => q.id === quizId);
    if (!quiz) return { score: 0, totalQuestions: 0 };
    
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    return { score, totalQuestions: quiz.questions.length, correctAnswers };
  };

  const sendMessage = (teacherId, message) => {
    const teacher = data.teachers.find(t => t.id === teacherId);
    const newMessage = {
      id: Date.now(),
      sender: 'student',
      message,
      timestamp: new Date().toISOString()
    };
    
    setData(prevData => ({
      ...prevData,
      chatMessages: [...prevData.chatMessages, newMessage]
    }));
  };

  const value = {
    data,
    enrolledSubjects,
    enrollInSubject,
    submitAssignment,
    submitQuiz,
    sendMessage
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};