import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { Clock, CheckCircle, XCircle, Award, ArrowLeft } from 'lucide-react';

const Quiz = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data, submitQuiz } = useData();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  const quiz = data.quizzes.find(q => q.lessonId === parseInt(lessonId));
  const lesson = data.lessons.find(l => l.id === parseInt(lessonId));

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizStarted, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const results = submitQuiz(quiz.id, selectedAnswers);
    setQuizResults(results);
    setShowResults(true);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quiz || !lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Quiz not found</h2>
          <button
            onClick={() => navigate('/subjects')}
            className="btn-primary mt-4"
          >
            Back to Subjects
          </button>
        </div>
      </div>
    );
  }

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Quiz: {lesson.title}
          </h1>
          <p className="text-gray-600 mb-8">
            Test your knowledge on {lesson.title}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {quiz.questions.length}
              </div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-600">Time Limit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                100%
              </div>
              <div className="text-sm text-gray-600">Passing Score</div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Quiz Instructions:</h3>
            <ul className="text-sm text-yellow-700 text-left space-y-1">
              <li>• You have 10 minutes to complete this quiz</li>
              <li>• Each question has only one correct answer</li>
              <li>• You can navigate between questions before submitting</li>
              <li>• Once submitted, you cannot change your answers</li>
            </ul>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('back')}
            </button>
            <button
              onClick={startQuiz}
              className="btn-primary"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Results Screen
  if (showResults) {
    const percentage = Math.round((quizResults.correctAnswers / quizResults.totalQuestions) * 100);
    const passed = percentage >= 60;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('quizCompleted')}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${
                passed ? 'text-green-600' : 'text-red-600'
              }`}>
                {percentage}%
              </div>
              <div className="text-sm text-gray-600">{t('yourScore')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {quizResults.correctAnswers}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-600 mb-2">
                {quizResults.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
          </div>

          <div className={`rounded-lg p-4 mb-6 ${
            passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`font-semibold ${
              passed ? 'text-green-800' : 'text-red-800'
            }`}>
              {passed ? 'Congratulations! You passed the quiz.' : 'You need to score at least 60% to pass.'}
            </p>
            <p className={`text-sm mt-1 ${
              passed ? 'text-green-600' : 'text-red-600'
            }`}>
              {passed ? 'Great job on understanding the lesson!' : 'Review the lesson material and try again.'}
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="btn-secondary"
            >
              Back to Lessons
            </button>
            {!passed && (
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Retake Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Quiz Question Screen
  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Quiz Header */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">
            {lesson.title} - Quiz
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span className={timeLeft < 60 ? 'text-red-600 font-medium' : ''}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h2>

        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion] === index;
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
                className={`quiz-option w-full text-left ${
                  isSelected ? 'quiz-option-selected' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('previous')}
          </button>
          
          <div className="flex space-x-2">
            {isLastQuestion ? (
              <button
                onClick={handleSubmitQuiz}
                className="btn-success"
                disabled={Object.keys(selectedAnswers).length < quiz.questions.length}
              >
                {t('submitQuiz')}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="btn-primary"
              >
                {t('nextQuestion')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Question Navigator */}
      <div className="card mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Question Navigator
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {quiz.questions.map((_, index) => {
            const isAnswered = selectedAnswers.hasOwnProperty(index);
            const isCurrent = index === currentQuestion;
            
            return (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  isCurrent
                    ? 'bg-blue-600 text-white'
                    : isAnswered
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;