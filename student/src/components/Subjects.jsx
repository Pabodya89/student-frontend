import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { BookOpen, Users, Clock, Star, CheckCircle } from 'lucide-react';

const Subjects = () => {
  const { t } = useLanguage();
  const { data, enrollInSubject } = useData();

  const handleEnroll = (subjectId) => {
    enrollInSubject(subjectId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('availableSubjects')}
        </h1>
        <p className="text-gray-600">
          Choose from our comprehensive selection of O/L subjects
        </p>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.subjects.map((subject) => (
          <div key={subject.id} className="subject-card card card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white text-2xl">{subject.icon}</span>
              </div>
              {subject.enrolled && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('enrolledIn')}</span>
                </div>
              )}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {subject.name}
            </h3>
            <p className="text-gray-600 mb-4">
              {subject.description}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{subject.lessons} lessons</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.8</span>
              </div>
            </div>

            {subject.enrolled && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{subject.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              {subject.enrolled ? (
                <Link
                  to={`/teachers/${subject.id}`}
                  className="flex-1 btn-primary text-center"
                >
                  {t('viewTeachers')}
                </Link>
              ) : (
                <button
                  onClick={() => handleEnroll(subject.id)}
                  className="flex-1 btn-primary"
                >
                  {t('enroll')}
                </button>
              )}
              <button className="btn-secondary">
                {t('lessonPacks')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popular Subjects Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Popular This Month
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Mathematics', students: 1250, trend: '+12%' },
            { name: 'Science', students: 980, trend: '+8%' },
            { name: 'English', students: 1100, trend: '+15%' },
            { name: 'ICT', students: 750, trend: '+25%' }
          ].map((subject, index) => (
            <div key={index} className="card text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {subject.students}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {subject.name}
              </div>
              <div className="text-xs text-green-600 font-medium">
                {subject.trend} this month
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;