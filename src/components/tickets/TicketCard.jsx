import React from 'react';

const TicketCard = ({ ticket, event }) => {
    if (!ticket || !event) return null;

    const dateStr = new Date(event.event_date).toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
    const timeStr = new Date(event.event_date).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit',
    });

    return (
        <div className="w-full max-w-sm mx-auto select-none">
            {/* Main Ticket Body */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20" style={{ background: 'linear-gradient(160deg, #312E81 0%, #4F46E5 60%, #7C3AED 100%)' }}>
                {/* Top Header */}
                <div className="px-5 sm:px-7 pt-8 pb-6 text-white">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">Official Ticket</p>
                            <h2 className="text-xl sm:text-2xl font-black leading-tight">{event.title}</h2>
                        </div>
                        <div className="bg-white/10 border border-white/20 rounded-xl p-2">
                            <svg className="w-6 h-6 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a1 1 0 01-1 1H3a1 1 0 01-1-1V6zm0 5a1 1 0 011-1h14a1 1 0 011 1v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3z" />
                            </svg>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">Date</p>
                            <p className="text-white font-semibold mt-0.5 text-xs leading-snug">{dateStr}</p>
                        </div>
                        <div>
                            <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">Time</p>
                            <p className="text-white font-semibold mt-0.5">{timeStr}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">Venue</p>
                            <p className="text-white font-semibold mt-0.5 text-xs truncate">{event.location}</p>
                        </div>
                    </div>
                </div>

                {/* Tear Line */}
                <div className="relative flex items-center">
                    <div className="absolute -left-5 w-10 h-10 bg-[#F8F9FC] rounded-full" />
                    <div className="flex-1 border-t-2 border-dashed border-white/20 mx-4" />
                    <div className="absolute -right-5 w-10 h-10 bg-[#F8F9FC] rounded-full" />
                </div>

                {/* QR Section */}
                <div className="px-5 sm:px-7 py-6 bg-white">
                    <div className="flex items-center gap-5">
                        {/* QR Code Placeholder */}
                        <div className="flex-shrink-0 w-28 h-28 bg-gray-900 rounded-2xl p-2 flex items-center justify-center relative overflow-hidden">
                            <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="currentColor">
                                <rect x="5" y="5" width="30" height="30" rx="3" className="fill-white" />
                                <rect x="10" y="10" width="20" height="20" rx="1" className="fill-gray-900" />
                                <rect x="13" y="13" width="14" height="14" rx="1" className="fill-white" />

                                <rect x="65" y="5" width="30" height="30" rx="3" className="fill-white" />
                                <rect x="70" y="10" width="20" height="20" rx="1" className="fill-gray-900" />
                                <rect x="73" y="13" width="14" height="14" rx="1" className="fill-white" />

                                <rect x="5" y="65" width="30" height="30" rx="3" className="fill-white" />
                                <rect x="10" y="70" width="20" height="20" rx="1" className="fill-gray-900" />
                                <rect x="13" y="73" width="14" height="14" rx="1" className="fill-white" />

                                {[40, 47, 54, 61, 68].map(y =>
                                    [40, 47, 54, 61, 68].map(x => (
                                        Math.random() > 0.4
                                            ? <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" className="fill-white" />
                                            : null
                                    ))
                                )}
                            </svg>
                        </div>

                        <div className="flex-1 space-y-3 min-w-0">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Attendee</p>
                                <p className="text-sm font-bold text-gray-900 truncate">{ticket.buyer_email}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ticket ID</p>
                                <p className="text-sm font-mono font-bold text-indigo-600">{ticket.id || ticket.qr_code?.split(':')[0]}</p>
                            </div>
                            <div>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${ticket.status === 'unused'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-red-50 text-red-700 border-red-200'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${ticket.status === 'unused' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                    {ticket.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
