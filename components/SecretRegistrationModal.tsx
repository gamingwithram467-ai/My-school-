import React, { useState, useEffect } from 'react';
import { SecretUser } from '../types';

interface SecretRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (newUser: SecretUser) => void;
}

const SecretRegistrationModal: React.FC<SecretRegistrationModalProps> = ({ isOpen, onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    secretCode: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'Admin', // Default role
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setFormData({
        secretCode: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: 'Admin',
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

    if (formData.secretCode !== 'Guru4321') {
      setError("Invalid secret code.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }

    try {
        const { confirmPassword, secretCode, ...newUser } = formData;
        onRegister(newUser);
        setSuccessMessage('Registration successful! You may now log in.');
        setTimeout(() => {
            onClose();
        }, 2000);
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
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Secret Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}
           <div>
            <label htmlFor="secretCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Secret Code</label>
            <input type="password" name="secretCode" id="secretCode" value={formData.secretCode} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
           <div>
            <label htmlFor="username-secret" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input type="text" name="username" id="username-secret" value={formData.username} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
           <div>
            <label htmlFor="password-secret" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" name="password" id="password-secret" value={formData.password} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
           <div>
            <label htmlFor="confirmPassword-secret" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword-secret" value={formData.confirmPassword} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select name="role" id="role" value={formData.role} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>Admin</option>
                <option>Supervisor</option>
                <option>Accountant</option>
            </select>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecretRegistrationModal;