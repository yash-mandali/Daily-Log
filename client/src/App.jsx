import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { ThemeProvider, useTheme } from './ThemeContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isLogin, setIsLogin] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className={`min-h-screen bg-linear-to-br ${isDark ? 'from-gray-900 to-gray-800' : 'from-gray-50 to-gray-100'}`}>
      {/* Navigation Bar */}
      <nav className={`shadow-sm border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${isDark ? 'bg-linear-to-r from-blue-500 to-indigo-500' : 'bg-linear-to-r from-blue-600 to-indigo-600'}`}>
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className={`hidden md:block text-lg sm:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                DailyLog
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition duration-200 ${isDark ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>
              <div className={`flex space-x-1 p-1 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setIsLogin(true)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition duration-200 ${isLogin
                    ? (isDark ? 'bg-gray-600 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm')
                    : (isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')
                    }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition duration-200 ${!isLogin
                    ? (isDark ? 'bg-gray-600 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm')
                    : (isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')
                    }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Tablet Navigation */}
            <div className="hidden sm:flex md:hidden items-center space-x-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition duration-200 ${isDark ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>
              <div className={`flex space-x-1 p-1 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setIsLogin(true)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition duration-200 ${isLogin
                    ? (isDark ? 'bg-gray-600 text-white' : 'bg-white text-gray-900 shadow-sm')
                    : (isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')
                    }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition duration-200 ${!isLogin
                    ? (isDark ? 'bg-gray-600 text-white' : 'bg-white text-gray-900 shadow-sm')
                    : (isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')
                    }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center space-x-1">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition duration-200 ${isDark ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition duration-200 ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className={`border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} px-3 py-3`}>
              <div className={`flex space-x-1 p-1 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition duration-200 ${isLogin
                    ? (isDark ? 'bg-gray-600 text-white' : 'bg-white text-gray-900 shadow-sm')
                    : (isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')
                    }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition duration-200 ${!isLogin
                    ? (isDark ? 'bg-gray-600 text-white' : 'bg-white text-gray-900 shadow-sm')
                    : (isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')
                    }`}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {isLogin ? <Login /> : <Signup />}
      </main>

      {/* Footer */}
      <footer className={`border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} mt-auto`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} Daily Work Log. All rights reserved.
            </div>
            <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Created by <span className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Yash Mandali</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
