import React, { useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaTasks, FaListUl, FaTrash, FaUmbrellaBeach } from 'react-icons/fa';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../AuthContext';

const LogsTable = ({ logs, onDelete }) => {
    const { isDark } = useTheme();
    const { token } = useAuth();
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (logId) => {
        if (window.confirm('Are you sure you want to delete this work entry?')) {
            setDeletingId(logId);
            try {
                await axios.delete(`https://daily-log-api-tan.vercel.app/api/logs/${logId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                onDelete(); // Refresh the logs
            } catch (err) {
                alert('Failed to delete the entry. Please try again.');
            } finally {
                setDeletingId(null);
            }
        }
    };
    if (logs.length === 0) {
        return (
            <div className="text-center py-12">
                <div className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
                    <FaListUl className={`text-2xl ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No work entries yet</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Start by adding your first daily work entry above.</p>
            </div>
        );
    }

    return (
        <div className={`rounded-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`px-4 sm:px-6 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-blue-100'}`}>
                            <FaTasks className={`text-lg ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Work History</h3>
                    </div>
                    <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${isDark ? 'bg-gray-600 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                        {logs.length} entries
                    </span>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {logs.map((log, index) => (
                        <div key={log._id} className={`p-4 space-y-3 ${log.isHoliday
                            ? (isDark ? 'bg-orange-900/20 border-l-4 border-orange-500' : 'bg-orange-50 border-l-4 border-orange-400')
                            : (isDark ? 'bg-gray-800' : 'bg-white')
                            }`}>
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 flex-1">
                                    <div className={`p-2 rounded-lg flex-shrink-0 ${log.isHoliday
                                        ? (isDark ? 'bg-orange-900/50' : 'bg-orange-100')
                                        : (isDark ? 'bg-gray-600' : 'bg-blue-100')
                                        }`}>
                                        {log.isHoliday ? (
                                            <FaUmbrellaBeach className={`text-sm ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                                        ) : (
                                            <FaCalendarAlt className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {new Date(log.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                            {log.isHoliday && (
                                                <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isDark ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-800'}`}>
                                                    Holiday
                                                </span>
                                            )}
                                        </div>
                                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                                            {new Date(log.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(log._id)}
                                    disabled={deletingId === log._id}
                                    className={`flex-shrink-0 ml-2 p-2 rounded-lg text-sm font-medium transition duration-200 ${isDark
                                        ? 'text-red-400 hover:bg-red-900 hover:text-red-300 disabled:opacity-50'
                                        : 'text-red-600 hover:bg-red-50 disabled:opacity-50'
                                        }`}
                                    title="Delete this entry"
                                >
                                    {deletingId === log._id ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                                    ) : (
                                        <FaTrash className="text-sm" />
                                    )}
                                </button>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className={`p-2 rounded-lg flex-shrink-0 mt-0.5 ${log.isHoliday
                                    ? (isDark ? 'bg-orange-900/50' : 'bg-orange-100')
                                    : (isDark ? 'bg-gray-600' : 'bg-green-100')
                                    }`}>
                                    <FaTasks className={`text-sm ${log.isHoliday
                                        ? (isDark ? 'text-orange-400' : 'text-orange-600')
                                        : (isDark ? 'text-green-400' : 'text-green-600')
                                        }`} />
                                </div>
                                <div className={`text-sm leading-relaxed ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {log.work}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                            <tr>
                                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                    <div className="flex items-center space-x-1">
                                        <FaCalendarAlt className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                                        <span>Date</span>
                                    </div>
                                </th>
                                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                    <div className="flex items-center space-x-1">
                                        <FaTasks className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                                        <span>Work Description</span>
                                    </div>
                                </th>
                                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isDark ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                            {logs.map((log, index) => (
                                <tr key={log._id} className={`transition duration-150 ${log.isHoliday
                                    ? (isDark ? 'bg-orange-900/20 border-l-4 border-orange-500' : 'bg-orange-50 border-l-4 border-orange-400')
                                    : (isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50')
                                    } ${index % 2 === 0 ? (log.isHoliday ? '' : (isDark ? 'bg-gray-800' : 'bg-white')) : (log.isHoliday ? '' : (isDark ? 'bg-gray-750' : 'bg-gray-25'))}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className={`p-2 rounded-lg mr-3 ${log.isHoliday
                                                ? (isDark ? 'bg-orange-900/50' : 'bg-orange-100')
                                                : (isDark ? 'bg-gray-600' : 'bg-blue-100')
                                                }`}>
                                                {log.isHoliday ? (
                                                    <FaUmbrellaBeach className={`text-sm ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                                                ) : (
                                                    <FaCalendarAlt className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                                )}
                                            </div>
                                            <div>
                                                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                    {new Date(log.date).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                    {log.isHoliday && (
                                                        <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isDark ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-800'}`}>
                                                            Holiday
                                                        </span>
                                                    )}
                                                </div>
                                                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {new Date(log.date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-start">
                                            <div className={`p-2 rounded-lg mr-3 mt-0.5 ${log.isHoliday
                                                ? (isDark ? 'bg-orange-900/50' : 'bg-orange-100')
                                                : (isDark ? 'bg-gray-600' : 'bg-green-100')
                                                }`}>
                                                <FaTasks className={`text-sm ${log.isHoliday
                                                    ? (isDark ? 'text-orange-400' : 'text-orange-600')
                                                    : (isDark ? 'text-green-400' : 'text-green-600')
                                                    }`} />
                                            </div>
                                            <div className={`text-sm leading-relaxed ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {log.work}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleDelete(log._id)}
                                            disabled={deletingId === log._id}
                                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition duration-200 ${isDark
                                                ? 'text-red-400 hover:bg-red-900 hover:text-red-300 disabled:opacity-50'
                                                : 'text-red-600 hover:bg-red-50 disabled:opacity-50'
                                                }`}
                                            title="Delete this entry"
                                        >
                                            {deletingId === log._id ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                                            ) : (
                                                <FaTrash className="text-sm" />
                                            )}
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LogsTable;