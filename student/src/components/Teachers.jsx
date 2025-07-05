import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { Star, Users, BookOpen, MessageCircle, ArrowLeft } from 'lucide-react';

const Teachers = () => {
  const { subjectId } = useParams();
  const { t } = useLanguage();
  const { data } = useData();

  const subject = data.subjects.find(s => s.id === parseInt(subjectId));
  const subjectTeachers = data.teachers.filter(teacher => 
    teacher.subject === subject?.name
  );

  if (!subject) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Subject not found</h2>
          <Link to="/subjects" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Back to Subjects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to="/subjects"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('back')}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('selectTeacher')} - {subject.name}
        </h1>
        <p className="text-gray-600">
          Choose from our experienced teachers for {subject.name}
        </p>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectTeachers.map((teacher) => (
          <div key={teacher.id} className="card card-hover">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {teacher.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {teacher.specialization}
              </p>
              <div className="flex items-center justify-center space-x-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium text-gray-900">
                  {teacher.rating}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t('experience')}</span>
                <span className="text-sm font-medium text-gray-900">
                  {teacher.experience}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t('students')}</span>
                <span className="text-sm font-medium text-gray-900">
                  {teacher.students}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t('rating')}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-900">
                    {teacher.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Link
                to={`/lessons/${teacher.id}`}
                className="flex-1 btn-primary text-center"
              >
                {t('viewLessons')}
              </Link>
              <Link
                to="/chat"
                className="btn-secondary"
              >
                <MessageCircle className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Teacher Stats */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Teacher Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {subjectTeachers.length}
            </div>
            <div className="text-sm text-gray-600">
              Available Teachers
            </div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {subjectTeachers.reduce((avg, teacher) => avg + teacher.rating, 0) / subjectTeachers.length || 0}
            </div>
            <div className="text-sm text-gray-600">
              Average Rating
            </div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {subjectTeachers.reduce((total, teacher) => total + teacher.students, 0)}
            </div>
            <div className="text-sm text-gray-600">
              Total Students
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;