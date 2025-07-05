import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { Play, Clock, BarChart, CheckCircle, ArrowLeft, Pizza as Quiz } from 'lucide-react';

const Lessons = () => {
  const { teacherId } = useParams();
  const { t } = useLanguage();
  const { data } = useData();

  const teacher = data.teachers.find(t => t.id === parseInt(teacherId));
  const teacherLessons = data.lessons.filter(lesson => 
    lesson.teacherId === parseInt(teacherId)
  );

  if (!teacher) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Teacher not found</h2>
          <Link to="/subjects" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Back to Subjects
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('availableLessons')}
            </h1>
            <p className="text-gray-600">
              {teacher.name} - {teacher.specialization}
            </p>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {teacherLessons.map((lesson) => (
          <div key={lesson.id} className="card card-hover">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  lesson.completed ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {lesson.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Play className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {lesson.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{lesson.duration}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getDifficultyColor(lesson.difficulty)
                    }`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {lesson.quizAvailable && (
                  <Link
                    to={`/quiz/${lesson.id}`}
                    className="btn-warning"
                  >
                    <Quiz className="w-4 h-4 mr-2" />
                    {t('takeQuiz')}
                  </Link>
                )}
                <button className="btn-primary">
                  <Play className="w-4 h-4 mr-2" />
                  {t('watchLesson')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lesson Progress */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Learning Progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {teacherLessons.length}
            </div>
            <div className="text-sm text-gray-600">
              Total Lessons
            </div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {teacherLessons.filter(lesson => lesson.completed).length}
            </div>
            <div className="text-sm text-gray-600">
              Completed
            </div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {teacherLessons.filter(lesson => lesson.quizAvailable).length}
            </div>
            <div className="text-sm text-gray-600">
              Quizzes Available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lessons;