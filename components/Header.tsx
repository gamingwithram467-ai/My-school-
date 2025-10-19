import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import MenuBar from './MenuBar';

interface HeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    isAuthenticated: boolean;
    currentUser: { name: string } | null;
    onLogout: () => void;
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, isAuthenticated, currentUser, onLogout, onLoginClick }) => {
  return (
    <header className="bg-blue-700 text-white shadow-lg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
            {/* School Title */}
            <div className="text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Guru Nanak High School</h1>
                <p className="mt-1 text-md md:text-lg text-blue-100">Mango, Jamshedpur, Jharkhand, India</p>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
                {isAuthenticated && currentUser ? (
                    <>
                        <span className="text-sm hidden sm:inline font-medium">Welcome, {currentUser.name.split(' ')[0]}!</span>
                        <button
                            onClick={onLogout}
                            className="px-3 py-2 text-sm font-medium bg-white text-blue-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white transition-colors"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={onLoginClick}
                        className="px-3 py-2 text-sm font-medium bg-white text-blue-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white transition-colors"
                    >
                        Login / Register
                    </button>
                )}
                <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>
        </div>
        <MenuBar />
    </header>
  );
};

export default Header;