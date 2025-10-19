import React, { useState, useEffect } from 'react';
import { User, RegisteredUser, SecretUser, StudentUser } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  onSwitchToRegister: () => void;
  onSwitchToStudentRegister: () => void;
  onOpenSecretRegister: () => void;
}

declare global {
  interface Window {
    google: any;
  }
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, onSwitchToRegister, onSwitchToStudentRegister, onOpenSecretRegister }) => {
  const [username, setUsername] = useState(''); // Can be username or email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleLoginSuccess = (response: any) => {
    try {
      const token = response.credential;
      const payload = JSON.parse(atob(token.split('.')[1]));
      // By default, assign the 'Student' role to users logging in with Google.
      const user: User = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        role: 'Student', 
      };
      onLogin(user);
    } catch (e) {
      console.error("Error decoding JWT for Google login", e);
      setError("Failed to process Google login. Please try again.");
    }
  };
  
  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
      setError('');

      const clientId = document.querySelector('meta[name="google-client-id"]')?.getAttribute('content');
      if (window.google && clientId && clientId !== 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com') {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleLoginSuccess,
        });
        const googleButtonContainer = document.getElementById('google-signin-button');
        if (googleButtonContainer) {
          googleButtonContainer.innerHTML = '';
          window.google.accounts.id.renderButton(
            googleButtonContainer,
            { theme: "outline", size: "large", width: "320" }
          );
        }
      } else if (clientId === 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com') {
        console.warn("Google Client ID is not configured. Please update it in index.html.");
      }
    }
  }, [isOpen]);

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Priority 0: Check for the secret registration code to open the secret registration modal.
    if (username === 'Guru4321') {
      onOpenSecretRegister();
      return;
    }

    // Priority 1: Check for hardcoded Admin credentials.
    // If matched, log the user in with the 'Admin' role for full access.
    if (username === 'Guru Nanak High School' && password === 'Guru Nanak 321') {
      onLogin({ name: 'Admin', role: 'Admin' });
      return;
    }

    // Priority 2: Check against registered teachers in localStorage.
    // If a match is found, assign the 'Teacher' role.
    const teachers = JSON.parse(localStorage.getItem('registered_teachers') || '[]') as RegisteredUser[];
    const foundTeacher = teachers.find(user => user.email.toLowerCase() === username.toLowerCase());

    if (foundTeacher && foundTeacher.password === password) { // NOTE: Plain text password check for demo only
      onLogin({ name: foundTeacher.fullName, email: foundTeacher.email, role: 'Teacher' });
      return;
    }
    
    // Priority 3: Check against secretly registered privileged users.
    // If matched, assign the 'Secret' role, which has its own access rules.
    const secretUsers = JSON.parse(localStorage.getItem('secret_users') || '[]') as SecretUser[];
    const foundSecretUser = secretUsers.find(user => user.username.toLowerCase() === username.toLowerCase());

    if (foundSecretUser && foundSecretUser.password === password) {
        onLogin({ name: `${foundSecretUser.username} (${foundSecretUser.role})`, role: 'Secret' });
        return;
    }
    
    // Priority 4: Check against registered students in localStorage.
    // If a match is found, assign the 'Student' role.
    const students = JSON.parse(localStorage.getItem('registered_students') || '[]') as StudentUser[];
    const foundStudent = students.find(user => user.email.toLowerCase() === username.toLowerCase());
    
    if (foundStudent && foundStudent.password === password) {
        onLogin({ name: foundStudent.fullName, email: foundStudent.email, role: 'Student' });
        return;
    }

    // If no user is found in any of the above checks, display an error.
    setError('Invalid username or password.');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-sm m-4 relative transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Close login modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Login</h2>
        <form onSubmit={handleManualLogin} className="space-y-4">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <label htmlFor="username-login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username or Email
            </label>
            <input
              type="text"
              name="username"
              id="username-login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password-login"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              autoComplete="current-password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log in
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">New here? </span>
            <button onClick={onSwitchToStudentRegister} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                Student Registration
            </button>
            <span className="mx-1 text-gray-400">|</span>
            <button onClick={onSwitchToRegister} className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                Teacher Registration
            </button>
        </div>


        <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <div id="google-signin-button" className="flex justify-center"></div>

      </div>
    </div>
  );
};

export default LoginModal;