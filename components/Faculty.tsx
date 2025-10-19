import React from 'react';
import Section from './Section';

const facultyMembers = [
  { name: 'Dr. Jaswinder Kaur', role: 'Principal, M.Sc, Ph.D' },
  { name: 'Mr. Sarabjeet Singh', role: 'Vice Principal, M.Tech (Comp. Sci)' },
  { name: 'Mrs. Ritu Sharma', role: 'Head of Science Dept. (Chemistry)' },
  { name: 'Mr. Avtar Singh Bhatia', role: 'Head of Commerce Dept. (Accountancy)' },
  { name: 'Mrs. Manpreet Kaur', role: 'Head of Arts Dept. (English Literature)' },
  { name: 'Mr. Alok Kumar Jha', role: 'Physics (PGT)' },
  { name: 'Ms. Sunita Murmu', role: 'Biology (PGT)' },
  { name: 'Mr. Harpreet Singh', role: 'Mathematics (PGT)' },
  { name: 'Mrs. Simranjeet Kaur', role: 'Economics (PGT)' },
  { name: 'Mr. Balwinder Singh Saini', role: 'Informatics Practices (PGT)' },
  { name: 'Mr. Tejinder Singh', role: 'Physical Education' },
  { name: 'Ms. Anjali Verma', role: 'Fine Arts' },
];

const Faculty: React.FC = () => {
  return (
    <Section id="faculty" title="Our Faculty">
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        Meet the dedicated and experienced educators who are committed to nurturing our students.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {facultyMembers.map((member, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{member.name}</h3>
            <p className="text-blue-600 dark:text-blue-400 mt-1">{member.role}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Faculty;