import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Contact from './components/Contact';
import AdmissionForm from './components/AdmissionForm';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegistrationModal from './components/RegistrationModal';
import SecretRegistrationModal from './components/SecretRegistrationModal';
import StudentRegistrationModal from './components/StudentRegistrationModal';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import Section from './components/Section';
import TermsModal from './components/TermsModal';
import Events from './components/Events';
import { User, RegisteredUser, SecretUser, StudentUser } from './types';

declare global {
  interface Window {
    google: any;
  }
}

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isSecretRegistrationModalOpen, setIsSecretRegistrationModalOpen] = useState(false);
  const [isStudentRegistrationModalOpen, setIsStudentRegistrationModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [registrationTypeForTerms, setRegistrationTypeForTerms] = useState<'teacher' | 'student' | null>(null);


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Automatically open the login modal on page load as per the user request.
    openLoginModal();
  }, []); // Empty dependency array ensures this runs only once on mount.

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsLoginModalOpen(false);
  };
  
  const handleRegister = (newUser: RegisteredUser) => {
    // NOTE: In a real application, this would be a secure API call.
    // Storing in 'registered_teachers' implicitly assigns the 'Teacher' role group.
    const users = JSON.parse(localStorage.getItem('registered_teachers') || '[]');
    const existingUser = users.find((user: RegisteredUser) => user.email === newUser.email);

    if (existingUser) {
      throw new Error("An account with this email already exists.");
    }
    
    users.push(newUser);
    localStorage.setItem('registered_teachers', JSON.stringify(users));
    
    closeRegistrationModal();
    openLoginModal();
  };

  const handleSecretRegister = (newUser: SecretUser) => {
     // Storing in 'secret_users' assigns a privileged role.
     const users = JSON.parse(localStorage.getItem('secret_users') || '[]');
     const existingUser = users.find((user: SecretUser) => user.username === newUser.username);

     if (existingUser) {
       throw new Error("An account with this username already exists.");
     }

     users.push(newUser);
     localStorage.setItem('secret_users', JSON.stringify(users));

     closeSecretRegistrationModal();
     openLoginModal();
  };
  
  const handleStudentRegister = (newUser: StudentUser) => {
     // Storing in 'registered_students' implicitly assigns the 'Student' role group.
     const users = JSON.parse(localStorage.getItem('registered_students') || '[]');
     const existingUser = users.find((user: StudentUser) => user.email === newUser.email);

     if (existingUser) {
       throw new Error("An account with this email already exists.");
     }

     users.push(newUser);
     localStorage.setItem('registered_students', JSON.stringify(users));

     closeStudentRegistrationModal();
     openLoginModal();
  };


  const handleLogout = () => {
    setCurrentUser(null);
     if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  
  const openRegistrationModal = () => setIsRegistrationModalOpen(true);
  const closeRegistrationModal = () => setIsRegistrationModalOpen(false);

  const openSecretRegistrationModal = () => setIsSecretRegistrationModalOpen(true);
  const closeSecretRegistrationModal = () => setIsSecretRegistrationModalOpen(false);
  
  const openStudentRegistrationModal = () => setIsStudentRegistrationModalOpen(true);
  const closeStudentRegistrationModal = () => setIsStudentRegistrationModalOpen(false);
  
  const openTermsModal = (type: 'teacher' | 'student') => {
    setRegistrationTypeForTerms(type);
    setIsTermsModalOpen(true);
  };

  const closeTermsModal = () => {
    setIsTermsModalOpen(false);
    setRegistrationTypeForTerms(null);
  };

  const handleAcceptTerms = () => {
    if (registrationTypeForTerms === 'teacher') {
      closeTermsModal();
      openRegistrationModal();
    } else if (registrationTypeForTerms === 'student') {
      closeTermsModal();
      openStudentRegistrationModal();
    }
  };


  const switchToRegister = () => {
    closeLoginModal();
    openTermsModal('teacher');
  };
  
  const switchToStudentRegister = () => {
    closeLoginModal();
    openTermsModal('student');
  };

  const switchToLogin = () => {
    closeRegistrationModal();
    closeStudentRegistrationModal();
    openLoginModal();
  };

  const switchToSecretRegister = () => {
    closeLoginModal();
    openSecretRegistrationModal();
  };
  
  /**
   * This function implements role-based access control by rendering different
   * components based on the current user's role.
   * - If no user is logged in, it shows a prompt to log in.
   * - 'Admin' role sees the AdminDashboard.
   * - 'Student' role sees the StudentDashboard.
   * - All other authenticated roles (e.g., 'Teacher', 'Secret') see the AdmissionForm.
   */
  const renderMainContent = () => {
    if (!currentUser) {
      return (
         <Section title="Online Admission Inquiry">
            <div className="text-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                You must be logged in to view the admission form.
              </p>
              <button
                onClick={openLoginModal}
                className="mt-4 px-6 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          </Section>
      );
    }
    
    switch (currentUser.role) {
      case 'Admin':
        return <AdminDashboard user={currentUser} />;
      case 'Student':
        return <StudentDashboard student={currentUser} />;
      default:
        return <AdmissionForm />;
    }
  };


  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans min-h-screen flex flex-col transition-colors duration-300">
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isAuthenticated={!!currentUser}
        currentUser={currentUser}
        onLogout={handleLogout}
        onLoginClick={openLoginModal}
      />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl space-y-12">
          <About />
          <Events />
          <Contact />
          <div id="admission">
            {renderMainContent()}
          </div>
        </div>
      </main>
      <Footer />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLogin={handleLogin}
        onSwitchToRegister={switchToRegister}
        onSwitchToStudentRegister={switchToStudentRegister}
        onOpenSecretRegister={switchToSecretRegister}
      />
       <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={closeRegistrationModal}
        onRegister={handleRegister}
        onSwitchToLogin={switchToLogin}
      />
      <SecretRegistrationModal
        isOpen={isSecretRegistrationModalOpen}
        onClose={closeSecretRegistrationModal}
        onRegister={handleSecretRegister}
      />
      <StudentRegistrationModal
        isOpen={isStudentRegistrationModalOpen}
        onClose={closeStudentRegistrationModal}
        onRegister={handleStudentRegister}
        onSwitchToLogin={switchToLogin}
      />
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={closeTermsModal}
        onAccept={handleAcceptTerms}
      />
    </div>
  );
};

export default App;