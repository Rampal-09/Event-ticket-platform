import React, { useState } from 'react';
import { adminService } from '../../services/adminService';

const ReviewHistoryTable = ({ history }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [modalError, setModalError] = useState(null);

    const handleViewDetails = async (id) => {
        setIsModalLoading(true);
        setModalError(null);
        try {
            // Ensure we use the correct ID for event fetch
            const data = await adminService.getEventDetail(id);
            setSelectedEvent(data);
        } catch (err) {
            console.error('Failed to fetch event details:', err);
            setModalError('System failed to retrieve specific event data from central audit records.');
        } finally {
            setIsModalLoading(false);
        }
    };

    return (
        <div className="bg-white">
            <div className="overflow-x-auto">
                <table className="w-full text-left hidden md:table border-collapse min-w-[900px]">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Review ID</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Project Metadata</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Entity Owner</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Resolution</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Executive Audit</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Timestamp</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Verification</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {history.map((item) => (
                            <tr key={item.id} className="hover:bg-indigo-50/20 transition-all duration-300 group">
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-black text-indigo-300 font-mono tracking-tighter bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100/50">
                                        #RV-{String(item.id).padStart(3, '0')}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="space-y-1">
                                        <p className="font-black text-gray-900 leading-tight tracking-tight uppercase text-xs group-hover:text-indigo-600 transition-colors">{item.eventName}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 font-black uppercase tracking-widest">{item.category}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 border border-slate-200">
                                            {item.organizer.charAt(0)}
                                        </div>
                                        <span className="text-xs font-black text-gray-700 whitespace-nowrap uppercase tracking-tight">{item.organizer}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm transition-all ${item.decision === 'Approved'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100/20'
                                        : 'bg-rose-50 text-rose-600 border-rose-100 shadow-rose-100/20'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${item.decision === 'Approved' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                        {item.decision}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-indigo-100">
                                            {item.reviewedBy.charAt(0)}
                                        </div>
                                        <span className="text-xs font-black text-gray-900 whitespace-nowrap uppercase tracking-tighter">{item.reviewedBy}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <p className="text-[10px] font-black text-gray-900 uppercase tracking-tighter">
                                            {new Date(item.date).toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', year: 'numeric' })}
                                        </p>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                            {new Date(item.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button 
                                        onClick={() => handleViewDetails(item.eventId || item.id)}
                                        className="px-6 py-2.5 bg-white text-gray-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all transform active:scale-90 border-2 border-gray-100 hover:border-indigo-600 shadow-sm hover:shadow-xl hover:shadow-indigo-100"
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-gray-50">
                    {history.map((item) => (
                        <div key={item.id} className="p-6 space-y-5 hover:bg-gray-50/30 transition-colors">
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 font-mono">#RV-{String(item.id).padStart(3, '0')}</p>
                                    <p className="font-black text-gray-900 leading-tight block tracking-tight uppercase text-sm">{item.eventName}</p>
                                    <span className="text-[9px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 font-black uppercase tracking-widest inline-block">{item.category}</span>
                                </div>
                                <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm ${item.decision === 'Approved'
                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                    : 'bg-rose-50 text-rose-600 border-rose-100'
                                    }`}>
                                    {item.decision}
                                </span>
                            </div>

                            <button 
                                onClick={() => handleViewDetails(item.eventId || item.id)}
                                className="w-full py-4 bg-indigo-600 text-white rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-100 flex items-center justify-center gap-3"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Details Modal */}
            {(selectedEvent || isModalLoading || modalError) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-500">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={() => {setSelectedEvent(null); setModalError(null);}}></div>
                    
                    <div className="relative w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 max-h-[95vh] flex flex-col border border-white/20">
                        {isModalLoading ? (
                            <div className="py-32 flex flex-col items-center justify-center space-y-6">
                                <div className="relative w-16 h-16">
                                    <div className="absolute inset-0 border-4 border-indigo-50 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                                </div>
                                <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Loading Event Data...</p>
                            </div>
                        ) : modalError ? (
                            <div className="p-16 text-center space-y-6">
                                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto border-4 border-rose-100 shadow-inner">
                                    <svg className="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Access Failed</h3>
                                <p className="text-gray-500 font-medium leading-relaxed max-w-sm mx-auto">{modalError}</p>
                                <button onClick={() => setModalError(null)} className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">OK</button>
                            </div>
                        ) : (
                            <>
                                {/* Modal Header */}
                                <div className="p-10 border-b border-gray-100 flex items-start justify-between bg-gradient-to-br from-gray-50 to-white relative">
                                    <div className="space-y-3 relative z-10">
                                        <div className="flex items-center gap-2">
                                            <span className="px-3 py-1 bg-gray-900 text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-lg shadow-lg">Review Information</span>
                                            <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">Event #{selectedEvent.id}</span>
                                        </div>
                                        <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">{selectedEvent.title}</h2>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{selectedEvent.category}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none bg-indigo-50 px-2 py-1 rounded border border-indigo-100">{selectedEvent.user_event_organizerIdTouser?.name}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setSelectedEvent(null)}
                                        className="p-3 bg-white hover:bg-rose-50 text-gray-400 hover:text-rose-500 rounded-2xl transition-all duration-300 shadow-sm border border-gray-100 hover:rotate-90 group"
                                    >
                                        <svg className="w-6 h-6 border-2 border-transparent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>

                                {/* Modal Body - Scrollable */}
                                <div className="p-10 overflow-y-auto space-y-10 scrollbar-thin scrollbar-thumb-gray-100">
                                    {/* Resolution Info */}
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className={`p-8 rounded-[2rem] border-2 flex items-center justify-between gap-4 shadow-xl ${
                                            selectedEvent.status === 'APPROVED' ? 'bg-emerald-50 border-emerald-100 shadow-emerald-500/5' : 'bg-rose-50 border-rose-100 shadow-rose-500/5'
                                        }`}>
                                            <div className="flex items-center gap-8">
                                                <div className="space-y-1">
                                                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${selectedEvent.status === 'APPROVED' ? 'text-emerald-500' : 'text-rose-500'}`}>Review Status</p>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`w-3 h-3 rounded-full animate-pulse ${selectedEvent.status === 'APPROVED' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                                        <p className={`text-4xl font-black tracking-tighter ${selectedEvent.status === 'APPROVED' ? 'text-emerald-900' : 'text-rose-900'}`}>{selectedEvent.status}</p>
                                                    </div>
                                                </div>
                                                <div className="w-[1px] h-12 bg-black/5 hidden md:block"></div>
                                                <div className="hidden md:block">
                                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Review Date</p>
                                                    <p className="text-sm font-black text-gray-900">{new Date(selectedEvent.updatedAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="w-[1px] h-12 bg-black/5 hidden md:block"></div>
                                                <div className="hidden md:block">
                                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Review ID</p>
                                                    <p className="text-sm font-black text-gray-900">#RV-{selectedEvent.id}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 border-l border-black/5 pl-8">
                                                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-indigo-600 font-black text-xs shadow-md border border-gray-100">
                                                    {selectedEvent.user_event_reviewedByIdTouser?.name?.charAt(0) || 'A'}
                                                </div>
                                                <div className="hidden sm:block text-right">
                                                    <p className="font-black text-gray-900 text-sm">{selectedEvent.user_event_reviewedByIdTouser?.name || 'Admin Council'}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Platform Admin</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rejection Reason if any */}
                                    {selectedEvent.rejectionReason && (
                                        <div className="space-y-4">
                                            <h3 className="text-[11px] font-black text-rose-500 uppercase tracking-[0.2em] flex items-center gap-3">
                                                <span className="w-8 h-[2px] bg-rose-200"></span>
                                                Rejection Reason
                                            </h3>
                                            <div className="p-8 bg-rose-50/20 border-2 border-rose-100 border-dashed rounded-[2rem] text-base text-rose-900 font-bold leading-relaxed shadow-inner">
                                                "{selectedEvent.rejectionReason}"
                                            </div>
                                        </div>
                                    )}

                                    {/* Additional Disclosure Sections */}
                                    <div className="space-y-12">
                                        {/* Tags & Highlights */}
                                        {(selectedEvent.tags || selectedEvent.highlights) && (
                                            <div className="flex flex-wrap gap-4">
                                                {(() => {
                                                    let tagsArr = [];
                                                    try {
                                                        const parsed = typeof selectedEvent.tags === 'string' ? JSON.parse(selectedEvent.tags) : selectedEvent.tags;
                                                        tagsArr = Array.isArray(parsed) ? parsed : [selectedEvent.tags];
                                                    } catch (e) {
                                                        tagsArr = typeof selectedEvent.tags === 'string' ? selectedEvent.tags.split(',').filter(Boolean) : [];
                                                    }
                                                    const tagContexts = ['ACCESS', 'POLICY'];
                                                    const tagColors = ['text-slate-600 bg-slate-50 border-slate-100', 'text-amber-600 bg-amber-50 border-amber-100'];
                                                    return tagsArr.map((tag, i) => (
                                                        <span key={i} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border flex items-center gap-3 ${tagColors[i] || 'text-gray-400 bg-gray-50 border-gray-200'}`}>
                                                            <span className={`px-2 py-0.5 rounded text-[8px] leading-none ${i === 0 ? 'bg-slate-600/10' : 'bg-amber-600/10'}`}>{tagContexts[i] || 'META'}</span>
                                                            <span className="italic">{tag.trim()}</span>
                                                        </span>
                                                    ));
                                                })()}
                                                {(() => {
                                                    let hlArr = [];
                                                    try {
                                                        const parsed = typeof selectedEvent.highlights === 'string' ? JSON.parse(selectedEvent.highlights) : selectedEvent.highlights;
                                                        hlArr = Array.isArray(parsed) ? parsed : [selectedEvent.highlights];
                                                    } catch (e) {
                                                        hlArr = typeof selectedEvent.highlights === 'string' ? selectedEvent.highlights.split(',').filter(Boolean) : [];
                                                    }
                                                    const hlContexts = ['PARKING', 'REFUNDS'];
                                                    const hlColors = ['text-indigo-600 bg-indigo-50 border-indigo-100', 'text-rose-600 bg-rose-50 border-rose-100'];
                                                    return hlArr.map((hl, i) => (
                                                        <span key={i} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border flex items-center gap-3 ${hlColors[i] || 'text-gray-400 bg-gray-50 border-gray-200'}`}>
                                                            <span className={`px-2 py-0.5 rounded text-[8px] leading-none ${i === 0 ? 'bg-indigo-600/10' : 'bg-rose-600/10'}`}>{hlContexts[i] || 'NOTE'}</span>
                                                            <span className="italic">{hl.replace(/_/g, ' ').trim()}</span>
                                                        </span>
                                                    ));
                                                })()}
                                            </div>
                                        )}

                                        {/* Event Schedule Timeline */}
                                        {selectedEvent.eventschedule && selectedEvent.eventschedule.length > 0 && (
                                            <section className="space-y-6">
                                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                                                    Project Timeline (Schedule)
                                                </h4>
                                                <div className="relative pl-8 space-y-8 before:absolute before:inset-0 before:left-[11px] before:w-[2px] before:bg-indigo-50 before:rounded-full">
                                                    {selectedEvent.eventschedule.map((item, i) => (
                                                        <div key={i} className="relative group">
                                                            <div className="absolute -left-[27px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-indigo-600 shadow-sm group-hover:scale-125 transition-transform"></div>
                                                            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-indigo-500/5 transition-all">
                                                                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1 block">{item.time}</span>
                                                                <p className="font-black text-gray-900 text-sm uppercase tracking-tight">{item.act}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}

                                        {/* Ticket Tiers / Releases */}
                                        {selectedEvent.ticketrelease && selectedEvent.ticketrelease.length > 0 && (
                                            <section className="space-y-6">
                                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                                                    Revenue Nodes (Ticket Tiers)
                                                </h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {selectedEvent.ticketrelease.map((tier, i) => (
                                                        <div key={i} className="p-6 bg-white rounded-3xl border-2 border-gray-100 shadow-sm hover:border-indigo-600 transition-all group">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div>
                                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Tier Name</p>
                                                                    <p className="font-black text-gray-900 uppercase tracking-tight text-sm">{tier.name}</p>
                                                                </div>
                                                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg border border-indigo-100">${tier.price}</span>
                                                            </div>
                                                            <div className="flex justify-between items-end border-t border-gray-50 pt-4">
                                                                <div>
                                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Allocation</p>
                                                                    <p className="font-black text-gray-900 text-xs">{tier.quantity} Units</p>
                                                                </div>
                                                                {tier.releaseDate && (
                                                                    <div className="text-right">
                                                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Live Date</p>
                                                                        <p className="text-xs font-black text-gray-900">{new Date(tier.releaseDate).toLocaleDateString()}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}

                                        {/* Promotional Arsenal */}
                                        {selectedEvent.promocode && selectedEvent.promocode.length > 0 && (
                                            <section className="space-y-6">
                                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                                    <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                                                    Active Promotions
                                                </h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {selectedEvent.promocode.map((promo, i) => (
                                                        <div key={i} className="relative overflow-hidden p-6 bg-rose-50/30 rounded-3xl border-2 border-rose-100 group hover:bg-rose-50 transition-all">
                                                            <div className="absolute -right-4 -top-4 w-12 h-12 bg-rose-500 rounded-full opacity-10 group-hover:scale-150 transition-transform"></div>
                                                            <div className="relative z-10">
                                                                <p className="text-[18px] font-black text-rose-600 tracking-tighter mb-1 font-mono">{promo.code}</p>
                                                                <div className="flex items-center gap-2 mb-4">
                                                                    <span className="px-2 py-0.5 bg-rose-600 text-white text-[9px] font-black uppercase rounded">
                                                                        {promo.discountType === 'PERCENTAGE' ? `${promo.discountValue}% OFF` : `$${promo.discountValue} OFF`}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between items-center text-[9px] font-black text-rose-900/40 uppercase tracking-widest pt-3 border-t border-rose-100">
                                                                    <span>USAGE: {promo.currentUsage} / {promo.maxUsage === 0 ? '∞' : promo.maxUsage}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        )}
                                    </div>

                                    {/* Detailed Sections */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-gray-100">
                                        <div className="space-y-10">
                                            <section className="space-y-6">
                                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                                                    Event Description
                                                </h4>
                                                <p className="text-gray-600 font-medium leading-relaxed text-sm bg-gray-50 p-6 rounded-[2rem] border border-gray-100">{selectedEvent.description}</p>
                                            </section>

                                            <section className="space-y-6">
                                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                                                    Event Details
                                                </h4>
                                                <div className="space-y-4">
                                                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">📍</div>
                                                        <div>
                                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Location</p>
                                                            <p className="text-sm font-black text-gray-900">{selectedEvent.location}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                                        <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-sm">📅</div>
                                                        <div>
                                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Date & Time</p>
                                                            <p className="text-sm font-black text-gray-900">{new Date(selectedEvent.eventDate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                                            <p className="text-[10px] text-gray-400 font-bold">{new Date(selectedEvent.eventDate).toLocaleTimeString()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>

                                        <div className="space-y-10">
                                            <section className="space-y-6">
                                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                                                    Pricing & Capacity
                                                </h4>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="p-6 bg-white rounded-[2rem] border-2 border-gray-100 shadow-xl shadow-gray-200/20 group hover:border-indigo-600 transition-all">
                                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Ticket Price</p>
                                                        <p className="text-3xl font-black text-indigo-600 tracking-tighter group-hover:scale-110 transition-transform origin-left">${selectedEvent.ticketPrice}</p>
                                                    </div>
                                                    <div className="p-6 bg-white rounded-[2rem] border-2 border-gray-100 shadow-xl shadow-gray-200/20 group hover:border-indigo-600 transition-all">
                                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Capacity</p>
                                                        <p className="text-3xl font-black text-gray-900 tracking-tighter group-hover:scale-110 transition-transform origin-left">{selectedEvent.totalTickets}</p>
                                                    </div>
                                                </div>
                                            </section>

                                            {selectedEvent.eventimage && selectedEvent.eventimage.length > 0 && (
                                                <section className="space-y-6">
                                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                                                        Event Media
                                                    </h4>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {selectedEvent.eventimage.map((img, i) => (
                                                            <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-gray-100 shadow-md group hover:border-indigo-600 transition-all">
                                                                <img src={img.imageUrl} alt="Event Media" className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="p-10 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-4">
                                    <button 
                                        onClick={() => setSelectedEvent(null)}
                                        className="relative group px-12 py-4 bg-transparent border-2 border-rose-500 text-rose-500 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 shadow-lg shadow-rose-500/10 hover:bg-rose-50 active:scale-95"
                                    >
                                        <span className="relative z-10 transition-colors">Close</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewHistoryTable;
