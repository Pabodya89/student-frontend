import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import { Send, MessageCircle, User, Bot } from 'lucide-react';

const Chat = () => {
  const { t } = useLanguage();
  const { data, sendMessage } = useData();
  const [messages, setMessages] = useState(data.chatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(data.teachers[0]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'student',
        message: newMessage,
        timestamp: new Date().toISOString()
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate teacher response
      setTimeout(() => {
        const teacherResponse = {
          id: Date.now() + 1,
          sender: 'teacher',
          teacherName: selectedTeacher.name,
          message: getTeacherResponse(newMessage),
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, teacherResponse]);
      }, 1000);
    }
  };

  const getTeacherResponse = (studentMessage) => {
    const responses = [
      "That's a great question! Let me explain...",
      "I understand your concern. Here's what you need to know:",
      "Good observation! The key concept here is...",
      "Let me break this down for you step by step:",
      "That's exactly the kind of thinking we want to see!",
      "I'd be happy to help you with that. Here's my explanation:",
      "Excellent question! This is a common area where students need clarification."
    ];
    
    if (studentMessage.toLowerCase().includes('homework') || studentMessage.toLowerCase().includes('assignment')) {
      return "For homework questions, please make sure to show your work and explain your thinking process. I'm here to guide you through the concepts.";
    }
    
    if (studentMessage.toLowerCase().includes('exam') || studentMessage.toLowerCase().includes('test')) {
      return "For exam preparation, I recommend reviewing the key concepts we've covered and practicing with past papers. Let me know if you need help with specific topics.";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Teachers List */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Teachers
            </h2>
            <div className="space-y-3">
              {data.teachers.map((teacher) => (
                <button
                  key={teacher.id}
                  onClick={() => setSelectedTeacher(teacher)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedTeacher.id === teacher.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        {teacher.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {teacher.subject}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <div className="card h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={selectedTeacher.avatar}
                  alt={selectedTeacher.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {selectedTeacher.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedTeacher.subject} Teacher
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'student'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {message.sender === 'teacher' && (
                      <div className="text-xs opacity-75 mb-1">
                        {message.teacherName}
                      </div>
                    )}
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'student' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('typeMessage')}
                  className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="2"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Guidelines */}
      <div className="mt-8 card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Chat Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">✅ Do:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Ask specific questions about lessons</li>
              <li>• Request clarification on concepts</li>
              <li>• Share your study progress</li>
              <li>• Be respectful and polite</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">❌ Don't:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Ask teachers to do your homework</li>
              <li>• Share personal information</li>
              <li>• Use inappropriate language</li>
              <li>• Spam or send irrelevant messages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;