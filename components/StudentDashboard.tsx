import React from 'react';
import Section from './Section';
import { User } from '../types';

interface StudentDashboardProps {
  student: User;
}

interface Book {
  subject: string;
  url: string; // Placeholder URL
}

const jcertBooks: { [className: string]: Book[] } = {
  'Nursery': [
    { subject: 'My First Picture Book', url: '#' },
    { subject: 'Fun with Letters & Numbers', url: '#' },
  ],
  'LKG': [
    { subject: 'Rhymes and Stories', url: '#' },
    { subject: 'Early Maths Concepts', url: '#' },
  ],
  'UKG': [
    { subject: 'Environmental Science - Part 1', url: '#' },
    { subject: 'Introduction to English Grammar', url: '#' },
  ],
  'Class 1': [ { subject: 'Mathematics - Ganit', url: '#' }, { subject: 'Hindi - Bhashanjali', url: '#' }, { subject: 'English - Sunflower', url: '#' }, ],
  'Class 2': [ { subject: 'Mathematics - Ganit', url: '#' }, { subject: 'Hindi - Bhashanjali', url: '#' }, { subject: 'English - Sunflower', url: '#' }, ],
  'Class 3': [ { subject: 'Mathematics - Ganit', url: '#' }, { subject: 'Hindi - Bhashanjali', url: '#' }, { subject: 'English - Sunflower', url: '#' }, { subject: 'Environmental Studies - Hamara Parivesh', url: '#' } ],
  'Class 4': [ { subject: 'Mathematics - Ganit', url: '#' }, { subject: 'Hindi - Bhashanjali', url: '#' }, { subject: 'English - Sunflower', url: '#' }, { subject: 'Environmental Studies - Hamara Parivesh', url: '#' } ],
  'Class 5': [ { subject: 'Mathematics - Ganit', url: '#' }, { subject: 'Hindi - Bhashanjali', url: '#' }, { subject: 'English - Sunflower', url: '#' }, { subject: 'Environmental Studies - Hamara Parivesh', url: '#' } ],
  'Class 6': [ { subject: 'Mathematics', url: '#' }, { subject: 'Science', url: '#' }, { subject: 'Social Science - History', url: '#' }, { subject: 'Social Science - Civics', url: '#' }, { subject: 'Social Science - Geography', url: '#' }, { subject: 'Hindi - Vasant', url: '#' }, { subject: 'English - Honeysuckle', url: '#' }, { subject: 'Sanskrit - Ruchira', url: '#' } ],
  'Class 7': [ { subject: 'Mathematics', url: '#' }, { subject: 'Science', url: '#' }, { subject: 'Social Science - History', url: '#' }, { subject: 'Social Science - Civics', url: '#' }, { subject: 'Social Science - Geography', url: '#' }, { subject: 'Hindi - Vasant', url: '#' }, { subject: 'English - Honeycomb', url: '#' }, { subject: 'Sanskrit - Ruchira', url: '#' } ],
  'Class 8': [ { subject: 'Mathematics', url: '#' }, { subject: 'Science', url: '#' }, { subject: 'Social Science - History', url: '#' }, { subject: 'Social Science - Civics', url: '#' }, { subject: 'Social Science - Geography', url: '#' }, { subject: 'Hindi - Vasant', url: '#' }, { subject: 'English - Honeydew', url: '#' }, { subject: 'Sanskrit - Ruchira', url: '#' } ],
  'Class 9': [ { subject: 'Mathematics', url: '#' }, { subject: 'Science', url: '#' }, { subject: 'Social Science - India and the Contemporary World-I', url: '#' }, { subject: 'Social Science - Contemporary India-I', url: '#' }, { subject: 'Social Science - Democratic Politics-I', url: '#' }, { subject: 'Social Science - Economics', url: '#' }, { subject: 'Hindi - Kshitij', url: '#' }, { subject: 'English - Beehive', url: '#' }, { subject: 'Sanskrit - Shemushi', url: '#' } ],
  'Class 10': [ { subject: 'Mathematics', url: '#' }, { subject: 'Science', url: '#' }, { subject: 'Social Science - India and the Contemporary World-II', url: '#' }, { subject: 'Social Science - Contemporary India-II', url: '#' }, { subject: 'Social Science - Democratic Politics-II', url: '#' }, { subject: 'Social Science - Understanding Economic Development', url: '#' }, { subject: 'Hindi - Kshitij-2', url: '#' }, { subject: 'English - First Flight', url: '#' }, { subject: 'Sanskrit - Shemushi', url: '#' } ],
};


const StudentDashboard: React.FC<StudentDashboardProps> = ({ student }) => {

  const getStudentDetailsFromStorage = (email: string) => {
    const students = JSON.parse(localStorage.getItem('registered_students') || '[]');
    return students.find((s: any) => s.email === email);
  }

  const studentDetails = student.email ? getStudentDetailsFromStorage(student.email) : null;
  const studentClass = studentDetails?.className;
  const booksForClass = studentClass ? jcertBooks[studentClass] : [];

  return (
    <Section id="student-dashboard" title={`Welcome, ${student.name}!`}>
      <div className="space-y-8">
        <div className="p-6 bg-blue-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Your Dashboard</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Here you can find information about your academic progress and resources.</p>
          
          {studentDetails && (
            <div className="mt-6 border-t border-gray-200 dark:border-gray-600 pt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</dt>
                  <dd className="mt-1 text-lg text-gray-900 dark:text-gray-100">{studentDetails.fullName}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</dt>
                  <dd className="mt-1 text-lg text-gray-900 dark:text-gray-100">{studentDetails.email}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Class</dt>
                  <dd className="mt-1 text-lg text-gray-900 dark:text-gray-100">{studentDetails.className}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Roll Number</dt>
                  <dd className="mt-1 text-lg text-gray-900 dark:text-gray-100">{studentDetails.rollNumber}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>

        {/* JCERT Books Section */}
        <div className="p-6 bg-green-50 dark:bg-gray-700 rounded-lg">
           <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Download JCERT Textbooks</h3>
           {booksForClass && booksForClass.length > 0 ? (
             <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Here are the available textbooks for <strong>{studentClass}</strong>.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {booksForClass.map((book) => (
                        <div key={book.subject} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex justify-between items-center">
                            <span className="font-medium text-gray-700 dark:text-gray-200">{book.subject}</span>
                            <a 
                                href={book.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download PDF
                            </a>
                        </div>
                    ))}
                </div>
                 <p className="mt-4 text-sm text-gray-500 italic">Note: Book download links are for demonstration purposes.</p>
             </div>
           ) : (
             <p className="mt-4 text-gray-500 dark:text-gray-400">
                No textbooks found for your class, or your class information is not available.
             </p>
           )}
        </div>
        
        <div className="p-6 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h4 className="text-xl font-medium text-gray-800 dark:text-gray-100">Quick Actions</h4>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                 <button className="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400" disabled>View Grades</button>
                 <button className="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400" disabled>Assignments</button>
                 <button className="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400" disabled>Attendance</button>
            </div>
             <p className="mt-4 text-sm text-gray-500 italic">Note: Quick Actions are not yet implemented.</p>
        </div>
      </div>
    </Section>
  );
};

export default StudentDashboard;
