import React from 'react';

/**
 * AttendeeList - Table of recent check-ins
 */
const AttendeeList = ({ attendees }) => {
    // Fallback mock data
    const list = attendees || [
        { id: 1, name: 'Alex Thompson', ticketId: 'TCK-882291', time: '2 mins ago', status: 'Verified' },
        { id: 2, name: 'Sarah Jenkins', ticketId: 'TCK-291102', time: '5 mins ago', status: 'Verified' },
        { id: 3, name: 'Michael Chen', ticketId: 'TCK-110293', time: '12 mins ago', status: 'Invalid' },
        { id: 4, name: 'Emma Watson', ticketId: 'TCK-339910', time: '15 mins ago', status: 'Verified' },
    ];

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-400">Recent Activity</h4>
                <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                            <th className="px-6 py-3">Attendee</th>
                            <th className="px-6 py-3">Ticket ID</th>
                            <th className="px-6 py-3">Time</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {list.map((person) => (
                            <tr key={person.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-gray-900">{person.name}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs font-mono font-medium text-gray-500">{person.ticketId}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-xs text-gray-400 font-medium">{person.time}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${person.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                        }`}>
                                        {person.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendeeList;
