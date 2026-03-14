import { QRCodeSVG } from 'qrcode.react';

/**
 * TicketCard - A stunning visual representation of a digital ticket.
 */
const TicketCard = ({ ticket, event }) => {
    if (!ticket || !event) return null;

    const dateStr = new Date(event.event_date).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    });
    const timeStr = new Date(event.event_date).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit',
    });

    const qrPayload = ticket.qrPayload || ticket.id?.toString() || 'TCK-MOCK-ID';

    return (
        <div className="w-full max-w-sm mx-auto select-none group">
            {/* Main Ticket Body */}
            <div className="ticket-body rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(79,70,229,0.25)] border border-white/20 relative transition-transform duration-500 hover:-rotate-1 active:scale-[0.98]"
                style={{ background: 'linear-gradient(160deg, #1E1B4B 0%, #4338CA 50%, #6366F1 100%)' }}>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute top-1/2 -right-20 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Section */}
                <div className="px-8 pt-10 pb-8 text-white relative z-10">
                    <div className="flex items-start justify-between mb-8">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300/80">Premium Access Pass</span>
                            <h2 className="text-2xl sm:text-3xl font-black leading-[1.1] tracking-tight">{event.title}</h2>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-lg">
                            <svg className="w-8 h-8 text-indigo-200" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm0 10a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                            </svg>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        <div className="space-y-1">
                            <p className="text-indigo-300/60 text-[10px] font-black uppercase tracking-widest">Date & Time</p>
                            <p className="text-white font-bold text-sm">{dateStr}</p>
                            <p className="text-indigo-200/80 text-xs font-medium">{timeStr}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-indigo-300/60 text-[10px] font-black uppercase tracking-widest">Venue</p>
                            <p className="text-white font-bold text-sm line-clamp-2 leading-snug">{event.location}</p>
                        </div>
                    </div>
                </div>

                {/* Tear-off Effect */}
                <div className="relative flex items-center h-10 overflow-hidden">
                    <div className="absolute -left-5 w-10 h-10 bg-white rounded-full border border-indigo-100 shadow-inner z-20" />
                    <div className="flex-1 border-t-2 border-dashed border-white/20 mx-1 relative z-10" />
                    <div className="absolute -right-5 w-10 h-10 bg-white rounded-full border border-indigo-100 shadow-inner z-20" />
                </div>

                {/* QR Section */}
                <div className="px-8 py-8 bg-white relative z-10 transition-colors group-hover:bg-gray-50/50">
                    <div className="flex items-center gap-6">
                        {/* QR Code Container */}
                        <div className="qr-container flex-shrink-0 w-32 h-32 bg-gray-900 rounded-[2rem] p-4 flex items-center justify-center relative overflow-hidden shadow-xl shadow-gray-200 transition-transform group-hover:scale-105 duration-500">
                            <QRCodeSVG
                                value={qrPayload}
                                size={128}
                                level="H"
                                className="qr-code-svg w-full h-full"
                                bgColor="#FFFFFF"
                                fgColor="#000000"
                            />
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Attendee</p>
                                <p className="text-sm font-bold text-gray-900 truncate">
                                    {ticket.buyer_name || (ticket.buyer_email || 'Verified Guest').split('@')[0]}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Pass ID</p>
                                <div className="flex flex-col">
                                    <span className="text-sm font-mono font-black text-indigo-600 tracking-tight">
                                        {ticket.id?.toString().substring(0, 10) || 'TCK-882294'}
                                    </span>
                                    <span className={`mt-2 w-fit px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${ticket.status === 'unused'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                        {ticket.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Notch Decor */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-32 h-2 bg-[#F8F9FC] rounded-t-full z-20 shadow-inner" />
            </div>
        </div>
    );
};

export default TicketCard;
