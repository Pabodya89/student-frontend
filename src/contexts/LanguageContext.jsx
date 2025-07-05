import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const translations = {
  en: {
    dashboard: 'Dashboard',
    lessons: 'Lessons',
    notices: 'Notices',
    papers: 'Papers',
    notes: 'Notes',
    quizzes: 'Quizzes',
    assignments: 'Assignments',
    students: 'Students',
    income: 'Income',
    marks: 'Marks',
    attendance: 'Attendance',
    payments: 'Payments',
    feedback: 'Feedback',
    profile: 'Profile',
    logout: 'Logout',
    login: 'Login',
    email: 'Email',
    password: 'Password',
    welcome: 'Welcome to EduPlatform',
    teacherPortal: 'Teacher Portal',
    totalStudents: 'Total Students',
    totalLessons: 'Total Lessons',
    monthlyIncome: 'Monthly Income',
    pendingAssignments: 'Pending Assignments',
    addNew: 'Add New',
    title: 'Title',
    description: 'Description',
    subject: 'Subject',
    grade: 'Grade',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    status: 'Status',
    completed: 'Completed',
    pending: 'Pending',
    paid: 'Paid',
    unpaid: 'Unpaid',
    present: 'Present',
    absent: 'Absent',
    date: 'Date',
    amount: 'Amount',
    student: 'Student',
    rating: 'Rating',
    comment: 'Comment'
  },
  si: {
    dashboard: 'උපකරණ පුවරුව',
    lessons: 'පාඩම්',
    notices: 'දැනුම්දීම්',
    papers: 'ප්‍රශ්න පත්‍ර',
    notes: 'සටහන්',
    quizzes: 'ප්‍රශ්නාවලි',
    assignments: 'පැවරුම්',
    students: 'සිසුන්',
    income: 'ආදායම',
    marks: 'ලකුණු',
    attendance: 'පැමිණීම',
    payments: 'ගෙවීම්',
    feedback: 'ප්‍රතිචාර',
    profile: 'පැතිකඩ',
    logout: 'ඉවත් වන්න',
    login: 'ප්‍රවේශ වන්න',
    email: 'විද්‍යුත් තැපැල',
    password: 'මුරපදය',
    welcome: 'EduPlatform වෙත සාදරයෙන් පිළිගනිමු',
    teacherPortal: 'ගුරු ද්වාරය',
    totalStudents: 'සම්පූර්ණ සිසුන්',
    totalLessons: 'සම්පූර්ණ පාඩම්',
    monthlyIncome: 'මාසික ආදායම',
    pendingAssignments: 'පොරොත්තු වන පැවරුම්',
    addNew: 'නව එකතු කරන්න',
    title: 'මාතෘකාව',
    description: 'විස්තරය',
    subject: 'විෂයය',
    grade: 'ශ්‍රේණිය',
    save: 'සුරකින්න',
    cancel: 'අවලංගු කරන්න',
    edit: 'සංස්කරණය',
    delete: 'මකන්න',
    view: 'බලන්න',
    status: 'තත්වය',
    completed: 'සම්පූර්ණ',
    pending: 'පොරොත්තු',
    paid: 'ගෙවූ',
    unpaid: 'නොගෙවූ',
    present: 'පැමිණි',
    absent: 'නොපැමිණි',
    date: 'දිනය',
    amount: 'මුදල',
    student: 'සිසුවා',
    rating: 'ශ්‍රේණිගත කිරීම',
    comment: 'අදහස'
  },
  ta: {
    dashboard: 'டாஷ்போர்டு',
    lessons: 'பாடங்கள்',
    notices: 'அறிவிப்புகள்',
    papers: 'தேர்வுத் தாள்கள்',
    notes: 'குறிப்புகள்',
    quizzes: 'வினாடி வினாக்கள்',
    assignments: 'பணிகள்',
    students: 'மாணவர்கள்',
    income: 'வருமானம்',
    marks: 'மதிப்பெண்கள்',
    attendance: 'வருகை',
    payments: 'பணம் செலுத்துதல்',
    feedback: 'கருத்து',
    profile: 'சுயவிவரம்',
    logout: 'வெளியேறு',
    login: 'உள்நுழைவு',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    welcome: 'EduPlatform க்கு வரவேற்கிறோம்',
    teacherPortal: 'ஆசிரியர் வலைத்தளம்',
    totalStudents: 'மொத்த மாணவர்கள்',
    totalLessons: 'மொத்த பாடங்கள்',
    monthlyIncome: 'மாதாந்திர வருமானம்',
    pendingAssignments: 'நிலுவையில் உள்ள பணிகள்',
    addNew: 'புதிதாக சேர்க்கவும்',
    title: 'தலைப்பு',
    description: 'விளக்கம்',
    subject: 'பாடம்',
    grade: 'வகுப்பு',
    save: 'சேமி',
    cancel: 'ரத்து செய்',
    edit: 'திருத்து',
    delete: 'நீக்கு',
    view: 'காண்க',
    status: 'நிலை',
    completed: 'முடிந்தது',
    pending: 'நிலுவையில்',
    paid: 'செலுத்தப்பட்டது',
    unpaid: 'செலுத்தப்படவில்லை',
    present: 'உள்ளது',
    absent: 'இல்லை',
    date: 'தேதி',
    amount: 'தொகை',
    student: 'மாணவர்',
    rating: 'மதிப்பீடு',
    comment: 'கருத்து'
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  const t = (key) => {
    return translations[language][key] || key
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
  }

  const value = {
    language,
    t,
    changeLanguage
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}