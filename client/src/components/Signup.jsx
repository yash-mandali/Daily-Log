import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signup(username, email, password);
            navigate('/login');
        } catch (err) {
            setError('Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-linear-to-br from-gray-900 to-gray-800' : 'bg-linear-to-br from-green-50 to-emerald-100'}`}>
            <div className="max-w-md w-full space-y-6 sm:space-y-8">
                <div className="text-center">
                    <div className={`p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${isDark ? 'bg-linear-to-r from-green-500 to-emerald-500' : 'bg-linear-to-r from-green-600 to-emerald-600'}`}>
                        <FaUserPlus className="text-white text-2xl" />
                    </div>
                    <h2 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Create Account</h2>
                    <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Join us to start logging your daily work</p>
                </div>
                <form onSubmit={handleSubmit} className={`mt-6 sm:mt-8 space-y-6 p-6 sm:p-8 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center space-x-2 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <FaUserPlus />
                                <span>Create Account</span>
                            </>
                        )}
                    </button>
                    <div className="text-center">
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Already have an account?{' '}
                            <Link to="/login" className={`font-medium ${isDark ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-500'}`}>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;