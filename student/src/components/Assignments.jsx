import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { Calendar, Clock, FileText, CheckCircle, AlertCircle, Award } from 'lucide-react';

const Assignments = () => {
  const { t } = useLanguage();
  const { data, submitAssignment } = useData();
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submission, setSubmission] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'graded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return AlertCircle;
      case 'submitted':
        return CheckCircle;
      case 'graded':
        return Award;
      default:
        return FileText;
    }
  };

  const handleSubmit = () => {
    if (selectedAssignment && submission.trim()) {
      submitAssignment(selectedAssignment.id, submission);
      setSelectedAssignment(null);
      setSubmission('');
    }
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('myAssignments')}
        </h1>
        <p className="text-gray-600">
          Manage your assignments and track your progress
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: 'Total Assignments',
            value: data.assignments.length,
            icon: FileText,
            color: 'bg-blue-500'
          },
          {
            label: 'Pending',
            value: data.assignments.filter(a => a.status === 'pending').length,
            icon: AlertCircle,
            color: 'bg-yellow-500'
          },
          {
            label: 'Submitted',
            value: data.assignments.filter(a => a.status === 'submitted').length,
            icon: CheckCircle,
            color: 'bg-blue-500'
          },
          {
            label: 'Graded',
            value: data.assignments.filter(a => a.status === 'graded').length,
            icon: Award,
            color: 'bg-green-500'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {data.assignments.map((assignment) => {
          const StatusIcon = getStatusIcon(assignment.status);
          const overdue = isOverdue(assignment.dueDate) && assignment.status === 'pending';
          
          return (
            <div key={assignment.id} className="card card-hover">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    overdue ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    <StatusIcon className={`w-6 h-6 ${
                      overdue ? 'text-red-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {assignment.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {assignment.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{assignment.dueDate}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span>{assignment.subject}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {assignment.grade && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {assignment.grade}
                      </div>
                      <div className="text-xs text-gray-500">Grade</div>
                    </div>
                  )}
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      getStatusColor(assignment.status)
                    }`}>
                      {t(assignment.status)}
                    </span>
                    {overdue && (
                      <div className="text-xs text-red-600 mt-1">
                        Overdue
                      </div>
                    )}
                  </div>
                  {assignment.status === 'pending' && (
                    <button
                      onClick={() => setSelectedAssignment(assignment)}
                      className="btn-primary"
                    >
                      {t('submit')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Submit Assignment
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedAssignment.title}
            </p>
            <textarea
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your submission or upload file URL..."
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setSelectedAssignment(null)}
                className="btn-secondary"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleSubmit}
                className="btn-primary"
                disabled={!submission.trim()}
              >
                {t('submit')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;