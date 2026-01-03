import React, { useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaTasks, FaListUl, FaTrash, FaUmbrellaBeach, FaEdit, FaTimes } from 'react-icons/fa';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../AuthContext';

const LogsTable = ({ logs, onDelete, onUpdate }) => {
    const { isDark } = useTheme();
    const { token } = useAuth();
    const [deletingId, setDeletingId] = useState(null);
    const [editingLog, setEditingLog] = useState(null);
    const [editForm, setEditForm] = useState({ date: '', work: '', isHoliday: false });
    const [updating, setUpdating] = useState(false);

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

    const handleEdit = (log) => {
        setEditingLog(log);
        setEditForm({
            date: new Date(log.date).toISOString().split('T')[0],
            work: log.work,
            isHoliday: log.isHoliday
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await axios.put(`https://daily-log-api-tan.vercel.app/api/logs/${editingLog._id}`, editForm, {
                headers: { Authorization: `Bearer ${token}` },
            });
            onUpdate(); // Refresh the logs
            setEditingLog(null);
        } catch (err) {
            alert('Failed to update the entry. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <>
            {logs.length === 0 ? (
                <div className="text-center py-12">
                    <div className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${isDark ? 'bg-gray-600' : 'bg-gray-100'}`}>
                        <FaListUl className={`text-2xl ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    </div>
                    <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No work entries yet</h3>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Start by adding your first daily work entry above.</p>
                </div>
            ) : (
                <div className={`rounded-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className={`px-4  sm:px-6 py-4 border-b ${isDark ? 'border-gray-400' : 'border-gray-700'}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-blue-100'}`}>
                                    <FaTasks className={`text-lg ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                </div>
                                <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Work History</h3>
                            </div>
                            <span className={`text-sm  font-medium px-2.5 py-0.5 rounded-full ${isDark ? 'bg-gray-600 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                                {logs.length}
                            </span>
                        </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="block md:hidden space-y-4 p-4">
                      {logs.map((log, index) => (
                            <div key={log._id} className={`p-6 rounded-xl shadow-lg border ${log.isHoliday
                                ? (isDark ? 'bg-orange-900/20 border-orange-500/50' : 'bg-orange-50 border-orange-400/50')
                                : (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')
                                } transition-all duration-200 hover:shadow-xl`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start space-x-4 flex-1">
                                        <div className={`p-3 rounded-xl flex-shrink-0 ${log.isHoliday
                                            ? (isDark ? 'bg-orange-900/50' : 'bg-orange-100')
                                            : (isDark ? 'bg-gray-600' : 'bg-blue-100')
                                            }`}>
                                            {log.isHoliday ? (
                                                <FaUmbrellaBeach className={`text-lg ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                                            ) : (
                                                <FaCalendarAlt className={`text-lg ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {new Date(log.date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                                {log.isHoliday && (
                                                    <span className={`ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-800'}`}>
                                                        Holiday
                                                    </span>
                                                )}
                                            </div>
                                            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                                                {new Date(log.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 ml-4">
                                        <button
                                            onClick={() => handleEdit(log)}
                                            className={`p-2 rounded-lg text-sm font-medium transition duration-200 ${isDark
                                                ? 'text-blue-400 hover:bg-blue-900 hover:text-blue-300'
                                                : 'text-blue-600 hover:bg-blue-50'
                                                }`}
                                            title="Edit this entry"
                                        >
                                            <FaEdit className="text-base" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(log._id)}
                                            disabled={deletingId === log._id}
                                            className={`p-2 rounded-lg text-sm font-medium transition duration-200 ${isDark
                                                ? 'text-red-400 hover:bg-red-900 hover:text-red-300 disabled:opacity-50'
                                                : 'text-red-600 hover:bg-red-50 disabled:opacity-50'
                                                }`}
                                            title="Delete this entry"
                                        >
                                            {deletingId === log._id ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                                            ) : (
                                                <FaTrash className="text-base" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className={`p-3 rounded-xl flex-shrink-0 mt-1 ${log.isHoliday
                                        ? (isDark ? 'bg-orange-900/50' : 'bg-orange-100')
                                        : (isDark ? 'bg-gray-600' : 'bg-green-100')
                                        }`}>
                                        <FaTasks className={`text-lg ${log.isHoliday
                                            ? (isDark ? 'text-orange-400' : 'text-orange-600')
                                            : (isDark ? 'text-green-400' : 'text-green-600')
                                            }`} />
                                    </div>
                                    <div className={`text-base leading-relaxed flex-1 p-3 rounded-lg ${log.isHoliday
                                        ? (isDark ? 'bg-orange-900/30 text-white' : 'bg-orange-50 text-gray-900')
                                        : (isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900')
                                        }`}>
                                        {log.work}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                                    <tr>
                                        <th className={`px-8 py-4 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                            <div className="flex items-center space-x-1">
                                                <FaCalendarAlt className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                                                <span>Date</span>
                                            </div>
                                        </th>
                                        <th className={`px-8 py-4 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                            <div className="flex items-center space-x-1">
                                                <FaTasks className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                                                <span>Work Description</span>
                                            </div>
                                        </th>
                                        <th className={`px-8 py-4 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {logs.map((log, index) => (
                                        <tr key={log._id} className={`transition-all duration-200 hover:shadow-md ${log.isHoliday
                                            ? (isDark ? 'bg-orange-900/20 border-l-4 border-orange-500' : 'bg-orange-50 border-l-4 border-orange-400')
                                            : (isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50')
                                            } ${index % 2 === 0 ? (log.isHoliday ? '' : (isDark ? 'bg-gray-800' : 'bg-white')) : (log.isHoliday ? '' : (isDark ? 'bg-gray-750' : 'bg-gray-25'))}`}>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className={`p-3 rounded-xl mr-4 ${log.isHoliday
                                                        ? (isDark ? 'bg-orange-900/50' : 'bg-orange-100')
                                                        : (isDark ? 'bg-gray-600' : 'bg-blue-100')
                                                        }`}>
                                                        {log.isHoliday ? (
                                                            <FaUmbrellaBeach className={`text-lg ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                                                        ) : (
                                                            <FaCalendarAlt className={`text-lg ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                            {new Date(log.date).toLocaleDateString('en-US', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                            {log.isHoliday && (
                                                                <span className={`ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-800'}`}>
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
                                            <td className="px-8 py-6">
                                                <div className="flex items-start">
                                                    <div className={`p-3 rounded-xl mr-4 mt-1 ${log.isHoliday
                                                        ? (isDark ? 'bg-orange-900/50' : 'bg-orange-100')
                                                        : (isDark ? 'bg-gray-600' : 'bg-green-100')
                                                        }`}>
                                                        <FaTasks className={`text-lg ${log.isHoliday
                                                            ? (isDark ? 'text-orange-400' : 'text-orange-600')
                                                            : (isDark ? 'text-green-400' : 'text-green-600')
                                                            }`} />
                                                    </div>
                                                    <div className={`text-base leading-relaxed flex-1 p-4 rounded-lg border ${log.isHoliday
                                                        ? (isDark ? 'bg-orange-900/30 text-white border-orange-500/50' : 'bg-orange-50 text-gray-900 border-orange-400/50')
                                                        : (isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-200')
                                                        }`}>
                                                        {log.work}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => handleEdit(log)}
                                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${isDark
                                                            ? 'text-blue-400 hover:bg-blue-900 hover:text-blue-300'
                                                            : 'text-blue-600 hover:bg-blue-50'
                                                            }`}
                                                        title="Edit this entry"
                                                    >
                                                        <FaEdit className="text-base" />
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(log._id)}
                                                        disabled={deletingId === log._id}
                                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${isDark
                                                            ? 'text-red-400 hover:bg-red-900 hover:text-red-300 disabled:opacity-50'
                                                            : 'text-red-600 hover:bg-red-50 disabled:opacity-50'
                                                            }`}
                                                        title="Delete this entry"
                                                    >
                                                        {deletingId === log._id ? (
                                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                                                        ) : (
                                                            <FaTrash className="text-base" />
                                                        )}
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingLog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`w-full max-w-md p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Edit Work Entry</h3>
                            <button
                                onClick={() => setEditingLog(null)}
                                className={`p-2 rounded-lg ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                                <input
                                    type="date"
                                    value={editForm.date}
                                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                                    className={`w-full px-3 py-2 border rounded-lg ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                                    required
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Work Description</label>
                                <textarea
                                    value={editForm.work}
                                    onChange={(e) => setEditForm({ ...editForm, work: e.target.value })}
                                    rows={4}
                                    className={`w-full px-3 py-2 border rounded-lg ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
                                    required
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isHoliday"
                                    checked={editForm.isHoliday}
                                    onChange={(e) => setEditForm({ ...editForm, isHoliday: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="isHoliday" className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Mark as Holiday</label>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setEditingLog(null)}
                                    className={`px-4 py-2 rounded-lg ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className={`px-4 py-2 rounded-lg text-white ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} disabled:opacity-50`}
                                >
                                    {updating ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogsTable;