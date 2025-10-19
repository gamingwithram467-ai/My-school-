import React, { useState, useEffect } from 'react';
import { StudentUser } from '../types';

interface StudentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (newUser: StudentUser) => void;
  onSwitchToLogin: () => void;
}

const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({ isOpen, onClose, onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    className: '',
    rollNumber: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        className: '',
        rollNumber: '',
      });
      setError('');
      setSuccessMessage('');
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }

    try {
        const { confirmPassword, ...newUser } = formData;
        onRegister(newUser);
        setSuccessMessage('Registration successful! Please log in.');
        setTimeout(() => {
            onSwitchToLogin();
        }, 2000); // Redirect to login after 2 seconds
    } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md m-4 relative transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Close registration modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Student Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}
           <div>
            <label htmlFor="studentFullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input type="text" name="fullName" id="studentFullName" value={formData.fullName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
           <div>
            <label htmlFor="student-email-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <input type="email" name="email" id="student-email-register" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" autoComplete="email" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="studentClassName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class</label>
              <select name="className" id="studentClassName" value={formData.className} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select a class</option>
                <option>Nursery</option>
                <option>LKG</option>
                <option>UKG</option>
                {[...Array(10)].map((_, i) => <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>)}
              </select>
            </div>
             <div>
              <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Roll Number</label>
              <input type="text" name="rollNumber" id="rollNumber" value={formData.rollNumber} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
           <div>
            <label htmlFor="student-password-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" name="password" id="student-password-register" value={formData.password} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" autoComplete="new-password" />
          </div>
           <div>
            <label htmlFor="studentConfirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input type="password" name="confirmPassword" id="studentConfirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" autoComplete="new-password" />
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Register
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
            <button onClick={onSwitchToLogin} className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                Already have an account? Log in
            </button>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistrationModal;