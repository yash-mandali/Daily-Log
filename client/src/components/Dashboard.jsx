import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import AddLog from './AddLog';
import LogsTable from './LogsTable';
import { FaSignOutAlt, FaPlus, FaList, FaUser, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
    const { token, logout, user } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const [logs, setLogs] = useState([]);
    const [activeTab, setActiveTab] = useState('logs');
    const [loading, setLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://daily-log-api-tan.vercel.app/api/logs', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLogs(res.data);
        } catch (err) {
            console.error('Failed to fetch logs', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <div className={`min-h-screen bg-linear-to-br ${isDark ? 'from-gray-900 to-gray-800' : 'from-blue-50 to-indigo-100'}`}>
            {/* Header */}
            <header className={`shadow-lg border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} sticky top-0 z-50`}>
                <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                    <div className="flex justify-between items-center py-3 sm:py-4">
                        <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                            <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${isDark ? 'bg-linear-to-r from-blue-500 to-indigo-500' : 'bg-linear-to-r from-blue-600 to-indigo-600'}`}>
                                <FaList className="text-white text-lg sm:text-xl" />
                            </div>
                            <h1 className={`hidden sm:hidden lg:text-2xl font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                DailyLog
                            </h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition duration-200 ${isDark ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                            </button>
                            <div className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                <FaUser className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                                <span className="font-medium">{user?.username}</span>
                            </div>
                            <button
                                onClick={logout}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-200 ${isDark
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-red-500 hover:bg-red-600 text-white'
                                    }`}
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </div>

                        {/* Tablet Navigation */}
                        <div className="hidden md:flex lg:hidden items-center space-x-2">
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition duration-200 ${isDark ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                            </button>
                            <div className={`flex items-center space-x-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                <FaUser className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                                <span className="font-medium text-sm">{user?.username}</span>
                            </div>
                            <button
                                onClick={logout}
                                className={`flex items-center px-3 py-2 rounded-lg transition duration-200 text-sm ${isDark
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-red-500 hover:bg-red-600 text-white'
                                    }`}
                            >
                                <FaSignOutAlt className="text-sm" />
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center space-x-1">
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
                    <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className={`border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} px-3 py-3`}>
                            <div className={`flex items-center justify-between`}>
                                <div className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <FaUser className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                                    <span className="font-medium text-sm">{user?.username}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        logout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition duration-200 text-sm ${isDark
                                        ? 'bg-red-600 hover:bg-red-700 text-white'
                                        : 'bg-red-500 hover:bg-red-600 text-white'
                                        }`}
                                >
                                    <FaSignOutAlt className="text-sm" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className={`rounded-xl shadow-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    {/* Tabs */}
                    <div className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <nav className="flex overflow-x-auto">
                            <button
                                onClick={() => setActiveTab('add')}
                                className={`flex items-center space-x-2 px-4 sm:px-6 py-4 text-sm font-medium border-b-2 transition duration-200 whitespace-nowrap min-w-max ${activeTab === 'add'
                                    ? (isDark ? 'border-blue-400 text-blue-400' : 'border-blue-500 text-blue-600')
                                    : (isDark ? 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
                                    }`}
                            >
                                <FaPlus className="text-sm sm:text-base" />
                                <span>Add Entry</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('logs')}
                                className={`flex items-center space-x-2 px-4 sm:px-6 py-4 text-sm font-medium border-b-2 transition duration-200 whitespace-nowrap min-w-max ${activeTab === 'logs'
                                    ? (isDark ? 'border-blue-400 text-blue-400' : 'border-blue-500 text-blue-600')
                                    : (isDark ? 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
                                    }`}
                            >
                                <FaList className="text-sm sm:text-base" />
                                <span>View Logs</span>
                            </button>
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6">
                        {activeTab === 'add' && <AddLog onAdd={fetchLogs} />}
                        {activeTab === 'logs' && (
                            loading ? (
                                <div className="flex justify-center items-center py-8 sm:py-12">
                                    <div className={`animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 ${isDark ? 'border-blue-400' : 'border-blue-500'}`}></div>
                                </div>
                            ) : (
                                <LogsTable logs={logs} onDelete={fetchLogs} />
                            )
                        )}
                    </div>
                </div>
            </div>

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
};

export default Dashboard;