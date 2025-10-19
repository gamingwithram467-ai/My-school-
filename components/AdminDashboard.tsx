import React, { useState, useEffect } from 'react';
import Section from './Section';
import { User, StudentUser } from '../types';

interface AdminDashboardProps {
  user: User;
}

// FIX: Replaced JSX.Element with React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-gray-700 rounded-lg p-6 flex items-center shadow">
        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
        </div>
    </div>
);


const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
    const [teacherCount, setTeacherCount] = useState(0);
    const [studentCount, setStudentCount] = useState(0);

    useEffect(() => {
        // In a real app, this would be an API call. For now, we read from localStorage.
        const teachers = JSON.parse(localStorage.getItem('registered_teachers') || '[]');
        const students = JSON.parse(localStorage.getItem('registered_students') || '[]');
        setTeacherCount(teachers.length);
        setStudentCount(students.length);
    }, []);

    const handleExportCSV = () => {
        const studentsJSON = localStorage.getItem('registered_students');
        if (!studentsJSON || studentsJSON === '[]') {
            alert('No student data to export.');
            return;
        }

        const students: StudentUser[] = JSON.parse(studentsJSON);
        
        const headers: (keyof StudentUser)[] = ['fullName', 'email', 'password', 'className', 'rollNumber'];
        const csvHeader = headers.join(',') + '\n';

        const csvRows = students.map(student => {
            return headers.map(header => {
                // Wrap each field in quotes to handle potential commas in data
                return `"${student[header]}"`;
            }).join(',');
        }).join('\n');

        const csvContent = csvHeader + csvRows;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        
        const date = new Date().toISOString().slice(0, 10);
        link.setAttribute('download', `student_data_export_${date}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Section id="admin-dashboard" title={`Welcome, ${user.name}!`}>
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">School Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <StatCard 
                            title="Registered Teachers" 
                            value={teacherCount} 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.93M9 21a6 6 0 01-6-6v-1h12v1a6 6 0 01-6 6z" /></svg>}
                        />
                        <StatCard 
                            title="Registered Students" 
                            value={studentCount} 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>}
                        />
                    </div>
                </div>
                
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                         <button onClick={handleExportCSV} className="px-4 py-3 text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Export Student Data (CSV)</button>
                         <button className="px-4 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed" disabled>Manage Teachers</button>
                         <button className="px-4 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed" disabled>Manage Students</button>
                         <button className="px-4 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed" disabled>View Reports</button>
                         <button className="px-4 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed" disabled>Event Calendar</button>
                         <button className="px-4 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed" disabled>Site Settings</button>
                    </div>
                     <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">Note: Other Quick Actions are not yet implemented.</p>
                </div>
            </div>
        </Section>
    );
};

export default AdminDashboard;