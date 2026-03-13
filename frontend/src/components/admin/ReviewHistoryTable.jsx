import React from 'react';

const ReviewHistoryTable = ({ history }) => {
    return (
        <div className="bg-white">
            <div className="overflow-x-auto">
                <table className="w-full text-left hidden md:table border-collapse min-w-[800px]">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Review ID</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Event Details</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Organizer</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Resolution</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Reviewed By</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Decision Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {history.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50/30 transition-colors animate-in fade-in duration-300">
                                <td className="px-8 py-5">
                                    <span className="text-[10px] font-black text-gray-400 font-mono tracking-tighter">
                                        #RV-{String(item.id).padStart(4, '0')}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <p className="font-bold text-gray-900 leading-tight tracking-tight">{item.eventName}</p>
                                    {item.reason && (
                                        <p className="text-[10px] text-rose-500 font-bold mt-1 max-w-xs truncate" title={item.reason}>
                                            Ref: {item.reason}
                                        </p>
                                    )}
                                </td>
                                <td className="px-8 py-5 text-sm font-medium text-gray-600">
                                    {item.organizer}
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-colors ${item.decision === 'Approved'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                        <span className={`w-1 h-1 rounded-full ${item.decision === 'Approved' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                        {item.decision}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600 transition-colors hover:bg-slate-100">
                                            {item.reviewedBy.charAt(0)}
                                        </div>
                                        <span className="text-sm font-bold text-gray-700 whitespace-nowrap">{item.reviewedBy}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-[10px] text-gray-500 font-black uppercase tracking-tighter whitespace-nowrap">
                                    {new Date(item.date).toLocaleDateString(undefined, { 
                                        month: 'short', 
                                        day: 'numeric', 
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-gray-50">
                    {history.map((item) => (
                        <div key={item.id} className="p-6 space-y-4 hover:bg-gray-50/30 transition-colors">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">#RV-{String(item.id).padStart(4, '0')}</p>
                                    <p className="font-bold text-gray-900 leading-tight block tracking-tight">{item.eventName}</p>
                                </div>
                                <span className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${item.decision === 'Approved'
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                    : 'bg-rose-50 text-rose-600 border-rose-100'
                                    }`}>
                                    {item.decision}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Organizer</p>
                                    <p className="text-xs font-bold text-gray-900">{item.organizer}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Decision Date</p>
                                    <p className="text-xs font-bold text-gray-600">{new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                            </div>

                            {item.reason && (
                                <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100 border-dashed">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-1">Rejection Reason</p>
                                    <p className="text-xs text-rose-600 font-medium leading-relaxed italic">"{item.reason}"</p>
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Reviewed By</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[9px] font-black text-slate-600">
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
