import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { FaCalendarAlt, FaPen, FaPlus, FaUmbrellaBeach } from 'react-icons/fa';

const AddLog = ({ onAdd }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [work, setWork] = useState('');
    const [isHoliday, setIsHoliday] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const { isDark } = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!work.trim()) return;

        setLoading(true);
        try {
            await axios.post('https://daily-log-api-tan.vercel.app/api/logs', { date, work, isHoliday }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setWork('');
            setIsHoliday(false);
            setDate(new Date().toISOString().split('T')[0]); // Reset to today's date
            onAdd();
        } catch (err) {
            alert('Failed to add log. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`p-4 sm:p-6 rounded-xl border ${isDark ? 'bg-linear-to-r from-gray-800 to-gray-700 border-gray-600' : 'bg-linear-to-r from-blue-50 to-indigo-50 border-blue-100'}`}>
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-blue-100'}`}>
                    <FaPlus className={`text-lg ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Add New Work Entry</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label htmlFor="date" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Date
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaCalendarAlt className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                            </div>
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'}`}
                                required
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <label htmlFor="work" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Work Description
                        </label>
                        <div className="relative">
                            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                <FaPen className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                            </div>
                            <textarea
                                id="work"
                                placeholder="Describe what you worked on today..."
                                value={work}
                                onChange={(e) => setWork(e.target.value)}
                                rows={4}
                                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'}`}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Holiday Section */}
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
                        <FaUmbrellaBeach className={`text-lg ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                    </div>
                    <div className="flex items-center space-x-3">
                        <input
                            id="isHoliday"
                            type="checkbox"
                            checked={isHoliday}
                            onChange={(e) => setIsHoliday(e.target.checked)}
                            className={`w-4 h-4 rounded border-2 focus:ring-2 focus:ring-orange-500 transition duration-200 ${isDark
                                ? 'border-gray-600 bg-gray-700 text-orange-400 focus:border-orange-400'
                                : 'border-gray-300 bg-white text-orange-600 focus:border-orange-500'
                                }`}
                        />
                        <label htmlFor="isHoliday" className={`text-sm font-medium cursor-pointer ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Mark as Holiday
                        </label>
                    </div>
                </div>
                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={loading || !work.trim()}
                        className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base ${isDark
                            ? 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                            : 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                            }`}
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <FaPlus className="text-sm sm:text-base" />
                                <span>Add Entry</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddLog;