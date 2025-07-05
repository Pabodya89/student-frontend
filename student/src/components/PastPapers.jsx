import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { Download, Eye, Calendar, FileText, Search, Filter } from 'lucide-react';

const PastPapers = () => {
  const { t } = useLanguage();
  const { data } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Mock past papers data
  const pastPapers = [
    {
      id: 1,
      title: 'Mathematics O/L 2023',
      subject: 'Mathematics',
      year: '2023',
      type: 'O/L',
      pages: 12,
      downloadCount: 1250,
      fileSize: '2.3 MB'
    },
    {
      id: 2,
      title: 'Science O/L 2023',
      subject: 'Science',
      year: '2023',
      type: 'O/L',
      pages: 16,
      downloadCount: 980,
      fileSize: '3.1 MB'
    },
    {
      id: 3,
      title: 'English O/L 2023',
      subject: 'English',
      year: '2023',
      type: 'O/L',
      pages: 8,
      downloadCount: 1100,
      fileSize: '1.8 MB'
    },
    {
      id: 4,
      title: 'Mathematics O/L 2022',
      subject: 'Mathematics',
      year: '2022',
      type: 'O/L',
      pages: 12,
      downloadCount: 2100,
      fileSize: '2.1 MB'
    },
    {
      id: 5,
      title: 'ICT O/L 2023',
      subject: 'ICT',
      year: '2023',
      type: 'O/L',
      pages: 10,
      downloadCount: 750,
      fileSize: '2.8 MB'
    },
    {
      id: 6,
      title: 'History O/L 2023',
      subject: 'History',
      year: '2023',
      type: 'O/L',
      pages: 14,
      downloadCount: 620,
      fileSize: '2.5 MB'
    }
  ];

  const years = ['2023', '2022', '2021', '2020', '2019'];
  const subjects = ['Mathematics', 'Science', 'English', 'ICT', 'History'];

  const filteredPapers = pastPapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || paper.subject === selectedSubject;
    const matchesYear = selectedYear === 'all' || paper.year === selectedYear;
    return matchesSearch && matchesSubject && matchesYear;
  });

  const handleDownload = (paperId) => {
    console.log(`Downloading paper ${paperId}`);
    // Simulate download
    alert('Download started!');
  };

  const handleView = (paperId) => {
    console.log(`Viewing paper ${paperId}`);
    // Simulate view
    alert('Opening paper viewer...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('pastPapers')}
        </h1>
        <p className="text-gray-600">
          Access past examination papers for practice and preparation
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search papers..."
              className="input-field pl-10"
            />
          </div>
          <div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="input-field"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="input-field"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredPapers.length} papers found
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: 'Total Papers',
            value: pastPapers.length,
            icon: FileText,
            color: 'bg-blue-500'
          },
          {
            label: 'This Year',
            value: pastPapers.filter(p => p.year === '2023').length,
            icon: Calendar,
            color: 'bg-green-500'
          },
          {
            label: 'Most Downloaded',
            value: 'Math 2022',
            icon: Download,
            color: 'bg-purple-500'
          },
          {
            label: 'Total Downloads',
            value: pastPapers.reduce((sum, p) => sum + p.downloadCount, 0),
            icon: Eye,
            color: 'bg-orange-500'
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
                  <p className="text-2xl font-bold text-gray-900">
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

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPapers.map((paper) => (
          <div key={paper.id} className="card card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {paper.type}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {paper.title}
            </h3>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center justify-between">
                <span>Subject:</span>
                <span className="font-medium">{paper.subject}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Year:</span>
                <span className="font-medium">{paper.year}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Pages:</span>
                <span className="font-medium">{paper.pages}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Size:</span>
                <span className="font-medium">{paper.fileSize}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <Download className="w-3 h-3" />
                <span>{paper.downloadCount} downloads</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleView(paper.id)}
                className="flex-1 btn-secondary flex items-center justify-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                {t('view')}
              </button>
              <button
                onClick={() => handleDownload(paper.id)}
                className="flex-1 btn-primary flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredPapers.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No papers found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or browse all papers
          </p>
        </div>
      )}
    </div>
  );
};

export default PastPapers;