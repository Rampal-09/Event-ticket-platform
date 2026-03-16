import { QRCodeCanvas } from 'qrcode.react';

/**
 * TicketCard - A professional event entry pass.
 */
const TicketCard = ({ ticket, event }) => {
    if (!ticket || !event) return null;

    // Use qrPayload from DB if it exists, otherwise fallback to ID
    // If qrPayload is a relative path (e.g. /verify/...), prepend current origin
    const rawPayload = ticket.qrPayload || String(ticket.id);
    const qrValue = rawPayload.startsWith('/') 
        ? `${window.location.origin}${rawPayload}` 
        : rawPayload;

    const dateStr = new Date(event.event_date).toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
    const timeStr = new Date(event.event_date).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit',
    });

    const purchaseDate = ticket.purchasedAt 
        ? new Date(ticket.purchasedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'N/A';

    return (
        <div className="w-full max-w-[400px] mx-auto select-none print-only:max-w-none ticket-card">
            {/* Main Ticket Body */}
            <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
                
                {/* Header Section - Gradient Background */}
                <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white p-8 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">
                                    {event.isPublic ? 'Public Event Pass' : 'Private Event Pass'}
                                </span>
                                <h2 className="text-2xl font-black leading-tight tracking-tight uppercase">{event.title}</h2>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">Pass Type</div>
                                <span className="bg-indigo-500/30 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {ticket.type || 'General Admission'}
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-6">
                            <div className="space-y-1">
                                <p className="text-indigo-300/60 text-[9px] font-black uppercase tracking-widest">Date & Time</p>
                                <p className="text-sm font-bold">{dateStr}</p>
                                <p className="text-indigo-200/80 text-xs font-medium">{timeStr}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-indigo-300/60 text-[9px] font-black uppercase tracking-widest">Venue</p>
                                <p className="text-sm font-bold line-clamp-2 leading-tight">{event.location}</p>
                            </div>
                    </div>
                </div>

                {/* Perforated Divider */}
                <div className="relative flex items-center h-8 bg-white no-print">
                    <div className="absolute -left-4 w-8 h-8 bg-gray-50 rounded-full border border-gray-100 shadow-inner z-10" />
                    <div className="flex-1 border-t-2 border-dashed border-gray-100 mx-4" />
                    <div className="absolute -right-4 w-8 h-8 bg-gray-50 rounded-full border border-gray-100 shadow-inner z-10" />
                </div>
                
                {/* Print-specific Divider (solid or higher contrast) */}
                <div className="hidden print-only:flex items-center h-8 bg-white">
                    <div className="flex-1 border-t-2 border-dashed border-gray-200 mx-4" />
                </div>

                {/* Attendee & QR Section */}
                <div className="p-8 pt-2 bg-white space-y-8">
                    <div className="flex justify-between items-end">
                        <div className="space-y-4">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Attendee</p>
                                <p className="text-base font-bold text-gray-900 leading-tight">{ticket.buyer_name}</p>
                                <p className="text-xs text-gray-500 font-medium">{ticket.buyer_email}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Organizer</p>
                                <p className="text-sm font-bold text-indigo-600 truncate max-w-[180px]">
                                    {event.organizer || 'EventHubix Verified'}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center gap-2">
                            <div className="bg-white p-3 border border-gray-50 shadow-sm rounded-2xl transition-transform hover:scale-105 duration-300">
                                <QRCodeCanvas
                                    value={qrValue}
                                    size={100}
                                    level="H"
                                    includeMargin={false}
                                />
                            </div>
                            <span className="text-[9px] font-mono font-bold text-gray-400"># {String(ticket.id).padStart(6, '0')}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                        <div className="flex flex-col gap-1">
                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400">Security Note</p>
                            <p className="text-[8px] text-gray-400 leading-relaxed font-medium italic">Scan at the entry gate. One time entry only.</p>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                ticket.status?.toLowerCase() === 'unused'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                : 'bg-rose-50 text-rose-600 border-rose-100'
                            }`}>
                                {ticket.status || 'Verified'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Watermark/Footer */}
                <div className="bg-gray-50/50 py-3 px-8 text-center border-t border-gray-100">
                    <p className="text-[7px] font-black uppercase tracking-[0.5em] text-gray-300">
                        Powered by EventHubix Platform
                    </p>
                </div>
            </div>
            
            <div className="mt-4 flex justify-center no-print">
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest animate-pulse">
                    Keep this pass ready at the entry 
                 </p>
            </div>
        </div>
    );
};

export default TicketCard;
