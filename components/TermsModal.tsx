import React from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-2xl m-4 relative transform transition-all flex flex-col" style={{ maxHeight: '90vh' }}>
        <div className="flex justify-between items-center pb-4 border-b dark:border-gray-600">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Terms and Conditions</h2>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label="Close Terms and Conditions"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <div className="my-6 overflow-y-auto pr-4 text-gray-600 dark:text-gray-300 space-y-4">
            <p>Please read these terms and conditions carefully before registering.</p>
            
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 pt-2">1. Introduction</h3>
            <p>Welcome to Guru Nanak High School's online portal. By registering for an account, you agree to be bound by these Terms and Conditions. These terms apply to all users, including students, teachers, and parents.</p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 pt-2">2. User Accounts</h3>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.</p>
            <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree not to disclose your password to any third party.</p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 pt-2">3. Code of Conduct</h3>
            <p>All users are expected to behave respectfully and responsibly. Harassment, bullying, or any form of inappropriate communication will not be tolerated and may lead to account suspension or termination.</p>
            <p>The unauthorized distribution of copyrighted materials, school documents, or personal information of other users is strictly prohibited.</p>
            
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 pt-2">4. Data Privacy</h3>
            <p>We are committed to protecting your privacy. The personal information you provide during registration and use of the portal will be stored and processed in accordance with our Privacy Policy. For the purpose of this demonstration application, all data is stored locally in your browser and is not transmitted to a server.</p>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 pt-2">5. Disclaimer</h3>
            <p>This portal is provided "as is" without any warranties. We do not guarantee that the service will be uninterrupted or error-free. The features and content are subject to change without notice.</p>
            
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 pt-2">6. Acceptance of Terms</h3>
            <p>By clicking "Accept", you signify your agreement to these Terms and Conditions. If you do not agree to these terms, please click "Decline" and do not use the service.</p>

        </div>

        <div className="pt-6 border-t dark:border-gray-600 flex justify-end space-x-4">
            <button
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            >
                Decline
            </button>
            <button
                onClick={onAccept}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Accept
            </button>
        </div>

      </div>
    </div>
  );
};

export default TermsModal;
