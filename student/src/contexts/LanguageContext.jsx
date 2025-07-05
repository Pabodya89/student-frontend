import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    subjects: 'Subjects',
    assignments: 'Assignments',
    pastPapers: 'Past Papers',
    chat: 'Chat',
    reports: 'Reports',
    profile: 'Profile',
    logout: 'Logout',
    
    // Common
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    submit: 'Submit',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    
    // Auth
    login: 'Login',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    welcomeBack: 'Welcome back!',
    loginToContinue: 'Sign in to your account to continue',
    
    // Dashboard
    welcome: 'Welcome',
    quickStats: 'Quick Stats',
    enrolledSubjects: 'Enrolled Subjects',
    completedAssignments: 'Completed Assignments',
    averageScore: 'Average Score',
    totalLessons: 'Total Lessons',
    recentActivity: 'Recent Activity',
    upcomingClasses: 'Upcoming Classes',
    
    // Subjects
    availableSubjects: 'Available Subjects',
    enrolledIn: 'Enrolled In',
    enroll: 'Enroll',
    viewTeachers: 'View Teachers',
    lessonPacks: 'Lesson Packs',
    
    // Teachers
    selectTeacher: 'Select Teacher',
    experience: 'Experience',
    rating: 'Rating',
    students: 'Students',
    viewLessons: 'View Lessons',
    
    // Lessons
    availableLessons: 'Available Lessons',
    duration: 'Duration',
    difficulty: 'Difficulty',
    takeQuiz: 'Take Quiz',
    watchLesson: 'Watch Lesson',
    
    // Assignments
    myAssignments: 'My Assignments',
    dueDate: 'Due Date',
    status: 'Status',
    pending: 'Pending',
    submitted: 'Submitted',
    graded: 'Graded',
    
    // Quiz
    question: 'Question',
    nextQuestion: 'Next Question',
    submitQuiz: 'Submit Quiz',
    quizCompleted: 'Quiz Completed!',
    yourScore: 'Your Score',
    
    // Chat
    chatWithTeacher: 'Chat with Teacher',
    typeMessage: 'Type your message...',
    send: 'Send',
    
    // Reports
    academicReports: 'Academic Reports',
    subjectProgress: 'Subject Progress',
    quizScores: 'Quiz Scores',
    assignmentGrades: 'Assignment Grades'
  },
  
  si: {
    // Navigation
    dashboard: 'පාලක මණ්ඩලය',
    subjects: 'විෂයයන්',
    assignments: '과제',
    pastPapers: 'පැරණි ප්‍රශ්න පත්‍ර',
    chat: 'චැට්',
    reports: 'වාර්තා',
    profile: 'පැතිකඩ',
    logout: 'ඉවත් වන්න',
    
    // Common
    loading: 'පූරණය වෙමින්...',
    save: 'සුරකින්න',
    cancel: 'අවලංගු කරන්න',
    delete: 'මකන්න',
    edit: 'සංස්කරණය කරන්න',
    view: 'බලන්න',
    submit: 'යවන්න',
    back: 'ආපසු',
    next: 'ඊළඟ',
    previous: 'පෙර',
    
    // Auth
    login: 'පිවිසෙන්න',
    email: 'විද්‍යුත් තැපෑල',
    password: 'මුර පදය',
    forgotPassword: 'මුර පදය අමතකද?',
    welcomeBack: 'ආපසු සාදරයෙන් පිළිගනිමු!',
    loginToContinue: 'ඉදිරියට යාමට ඔබේ ගිණුමට පිවිසෙන්න',
    
    // Dashboard  
    welcome: 'සාදරයෙන් පිළිගනිමු',
    quickStats: 'ඉක්මන් සංඛ්‍යාලේඛන',
    enrolledSubjects: 'ලියාපදිංචි විෂයයන්',
    completedAssignments: 'සම්පූර්ණ කළ පැවරුම්',
    averageScore: 'සාමාන්‍ය ලකුණු',
    totalLessons: 'මුළු පාඩම්',
    recentActivity: 'මෑත ක්‍රියාකාරකම්',
    upcomingClasses: 'ඉදිරි පන්ති',
    
    // Subjects
    availableSubjects: 'ලබා ගත හැකි විෂයයන්',
    enrolledIn: 'ලියාපදිංචි',
    enroll: 'ලියාපදිංචි වන්න',
    viewTeachers: 'ගුරුවරුන් බලන්න',
    lessonPacks: 'පාඩම් පැකේජ',
    
    // Teachers
    selectTeacher: 'ගුරුවරයා තෝරන්න',
    experience: 'අත්දැකීම්',
    rating: 'ශ්‍රේණිගත කිරීම',
    students: 'සිසුන්',
    viewLessons: 'පාඩම් බලන්න',
    
    // Lessons
    availableLessons: 'ලබා ගත හැකි පාඩම්',
    duration: 'කාලසීමාව',
    difficulty: 'දුෂ්කරතාවය',
    takeQuiz: 'ප්‍රශ්නාවලිය කරන්න',
    watchLesson: 'පාඩම බලන්න',
    
    // Assignments
    myAssignments: 'මගේ පැවරුම්',
    dueDate: 'අවසන් දිනය',
    status: 'තත්ත්වය',
    pending: 'අපේක්ෂාවේ',
    submitted: 'යවන ලද',
    graded: 'ශ්‍රේණිගත කළ',
    
    // Quiz
    question: 'ප්‍රශ්නය',
    nextQuestion: 'ඊළඟ ප්‍රශ්නය',
    submitQuiz: 'ප්‍රශ්නාවලිය යවන්න',
    quizCompleted: 'ප්‍රශ්නාවලිය සම්පූර්ණයි!',
    yourScore: 'ඔබේ ලකුණු',
    
    // Chat
    chatWithTeacher: 'ගුරුවරයා සමඟ කතා කරන්න',
    typeMessage: 'ඔබේ පණිවිඩය ටයිප් කරන්න...',
    send: 'යවන්න',
    
    // Reports
    academicReports: 'අධ්‍යයන වාර්තා',
    subjectProgress: 'විෂය ප්‍රගතිය',
    quizScores: 'ප්‍රශ්නාවලි ලකුණු',
    assignmentGrades: 'පැවරුම් ශ්‍රේණි'
  },
  
  ta: {
    // Navigation
    dashboard: 'டாஷ்போர்டு',
    subjects: 'பாடங்கள்',
    assignments: '과제',
    pastPapers: 'பழைய தாள்கள்',
    chat: 'அரட்டை',
    reports: 'அறிக்கைகள்',
    profile: 'விவரம்',
    logout: 'வெளியேறு',
    
    // Common
    loading: 'ஏற்றுகிறது...',
    save: 'சேமிக்கவும்',
    cancel: 'ரத்துசெய்',
    delete: 'நீக்கு',
    edit: 'திருத்து',
    view: 'பார்',
    submit: 'சமர்ப்பி',
    back: 'பின்',
    next: 'அடுத்து',
    previous: 'முந்தைய',
    
    // Auth
    login: 'உள்நுழைக',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
    welcomeBack: 'மீண்டும் வரவேற்கிறோம்!',
    loginToContinue: 'தொடர உங்கள் கணக்கில் உள்நுழையவும்',
    
    // Dashboard
    welcome: 'வரவேற்கிறோம்',
    quickStats: 'விரைவு புள்ளிவிவரங்கள்',
    enrolledSubjects: 'பதிவுசெய்த பாடங்கள்',
    completedAssignments: 'முடிக்கப்பட்ட பணிகள்',
    averageScore: 'சராசரி மதிப்பெண்',
    totalLessons: 'மொத்த பாடங்கள்',
    recentActivity: 'சமீபத்திய செயல்பாடு',
    upcomingClasses: 'வரவிருக்கும் வகுப்புகள்',
    
    // Subjects
    availableSubjects: 'கிடைக்கும் பாடங்கள்',
    enrolledIn: 'பதிவுசெய்யப்பட்டது',
    enroll: 'பதிவுசெய்யுங்கள்',
    viewTeachers: 'ஆசிரியர்களைப் பார்க்கவும்',
    lessonPacks: 'பாடம் தொகுப்புகள்',
    
    // Teachers
    selectTeacher: 'ஆசிரியரைத் தேர்ந்தெடுக்கவும்',
    experience: 'அனுபவம்',
    rating: 'மதிப்பீடு',
    students: 'மாணவர்கள்',
    viewLessons: 'பாடங்களைப் பார்க்கவும்',
    
    // Lessons
    availableLessons: 'கிடைக்கும் பாடங்கள்',
    duration: 'கால அளவு',
    difficulty: 'கடினத்தன்மை',
    takeQuiz: 'வினாவை எடுக்கவும்',
    watchLesson: 'பாடத்தைப் பார்க்கவும்',
    
    // Assignments
    myAssignments: 'எனது பணிகள்',
    dueDate: 'காலக்கெடு',
    status: 'நிலை',
    pending: 'நிலுவையில்',
    submitted: 'சமர்ப்பிக்கப்பட்டது',
    graded: 'மதிப்பிடப்பட்டது',
    
    // Quiz
    question: 'கேள்வி',
    nextQuestion: 'அடுத்த கேள்வி',
    submitQuiz: 'வினாவை சமர்ப்பிக்கவும்',
    quizCompleted: 'வினா முடிந்தது!',
    yourScore: 'உங்கள் மதிப்பெண்',
    
    // Chat
    chatWithTeacher: 'ஆசிரியருடன் அரட்டையடிக்கவும்',
    typeMessage: 'உங்கள் செய்தியைத் தட்டச்சு செய்யுங்கள்...',
    send: 'அனுப்பு',
    
    // Reports
    academicReports: 'கல்வி அறிக்கைகள்',
    subjectProgress: 'பாட முன்னேற்றம்',
    quizScores: 'வினா மதிப்பெண்கள்',
    assignmentGrades: 'பணி தரங்கள்'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};