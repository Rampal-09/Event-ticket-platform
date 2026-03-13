import React from 'react';

const ReviewHistoryTable = ({ history }) => {
    return (
        <div className="bg-white">
            <div className="overflow-x-auto">
                <table className="w-full text-left hidden md:table border-collapse min-w-[700px]">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Review ID</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Event Name</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Organizer</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Decision</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Reviewed By</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {history.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-8 py-5 text-sm font-bold text-gray-400">
                                    #{item.id}
                                </td>
                                <td className="px-8 py-5">
                                    <p className="font-bold text-gray-900">{item.eventName}</p>
                                </td>
                                <td className="px-8 py-5 text-sm font-medium text-gray-600">
                                    {item.organizer}
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${item.decision === 'Approved'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        : item.decision === 'Rejected'
                                            ? 'bg-rose-50 text-rose-600 border-rose-100'
                                            : 'bg-amber-50 text-amber-600 border-amber-100'
                                        }`}>
                                        {item.decision}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600">
                                            {item.reviewedBy.charAt(0)}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{item.reviewedBy}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-sm text-gray-500 font-medium whitespace-nowrap">
                                    {item.date}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-gray-50">
                    {history.map((item) => (
                        <div key={item.id} className="p-5 space-y-4 hover:bg-gray-50/50 transition-colors">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">#{item.id}</p>
                                    <p className="font-bold text-gray-900 leading-tight block">{item.eventName}</p>
                                </div>
                                <span className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${item.decision === 'Approved'
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                    : item.decision === 'Rejected'
                                        ? 'bg-rose-50 text-rose-600 border-rose-100'
                                        : 'bg-amber-50 text-amber-600 border-amber-100'
                                    }`}>
                                    {item.decision}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Organizer</p>
                                    <p className="text-xs font-bold text-gray-700">{item.organizer}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Date</p>
                                    <p className="text-xs font-bold text-gray-600">{item.date}</p>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Reviewed By</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-600">
                                        {item.reviewedBy.charAt(0)}
                                    </div>
                                    <span className="text-xs font-bold text-gray-700">{item.reviewedBy}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewHistoryTable;
