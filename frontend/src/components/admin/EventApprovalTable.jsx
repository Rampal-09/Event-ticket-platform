import React from 'react';
import StatusBadge from './StatusBadge';
import ApproveEventButton from './ApproveEventButton';
import RejectEventButton from './RejectEventButton';
import Button from '../ui/Button';

/**
 * EventApprovalTable - Table for admin moderation queue
 */
const EventApprovalTable = ({ events = [], onApprove, onReject, onReview }) => {
    return (
        <div className="bg-white">
            <div className="overflow-x-auto">
                {/* Desktop Table */}
                <table className="w-full text-left hidden md:table min-w-[700px]">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Event Details</th>
                            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Organizer</th>
                            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {events.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-2xl grayscale">✅</div>
                                        <p className="text-gray-400 font-bold">Great job! All clear in the moderation queue.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            events.map(event => (
                                <tr key={event.id} className="hover:bg-gray-50/80 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            {event.image && (
                                                <img src={event.image} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" alt="" />
                                            )}
                                            <div>
                                                <div className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors text-sm">{event.title}</div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">{event.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black ring-4 ring-white flex-shrink-0">
                                                {(typeof event.organizer === 'string' ? event.organizer : event.organizer?.name)?.[0] || 'O'}
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">{typeof event.organizer === 'string' ? event.organizer : event.organizer?.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-600 font-bold whitespace-nowrap">
                                        {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td className="px-8 py-6">
                                        <StatusBadge status={event.status || 'pending'} />
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => onReview?.(event)}
                                                className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors"
                                            >
                                                Details
                                            </button>
                                            <div className="flex items-center gap-2">
                                                <ApproveEventButton onClick={() => onApprove?.(event.id)} />
                                                <RejectEventButton onClick={() => onReject?.(event.id)} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-gray-50">
                    {events.length === 0 ? (
                        <div className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-2xl grayscale">✅</div>
                                <p className="text-gray-400 font-bold text-sm">All clear in the queue.</p>
                            </div>
                        </div>
                    ) : (
                        events.map(event => (
                            <div key={event.id} className="p-5 space-y-4 hover:bg-gray-50/50 transition-colors">
                                <div className="flex justify-between items-start gap-3">
                                    <div className="flex items-start gap-4">
                                        {event.image && (
                                            <img src={event.image} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-gray-100 shadow-sm" alt="" />
                                        )}
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm leading-tight">{event.title}</p>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1.5">{event.location}</p>
                                        </div>
                                    </div>
                                    <StatusBadge status={event.status || 'pending'} />
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-1">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Organizer</p>
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[9px] font-black flex-shrink-0">
                                                {(typeof event.organizer === 'string' ? event.organizer : event.organizer?.name)?.[0] || 'O'}
                                            </div>
                                            <span className="text-xs font-bold text-gray-700 truncate">{typeof event.organizer === 'string' ? event.organizer : event.organizer?.name}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Date</p>
                                        <span className="text-xs text-gray-600 font-bold">
                                            {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                                    <Button variant="ghost" size="sm" className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest" onClick={() => onReview?.(event)}>Details</Button>
                                    <div className="flex items-center gap-2">
                                        <ApproveEventButton onClick={() => onApprove?.(event.id)} />
                                        <RejectEventButton onClick={() => onReject?.(event.id)} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventApprovalTable;
