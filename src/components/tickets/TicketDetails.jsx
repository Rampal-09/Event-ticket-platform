import React from 'react';

/**
 * TicketDetails - Breakdown of ticket info for the TicketPage
 */
const TicketDetails = ({ attendeeName, ticketId, purchaseDate, status = 'Verified' }) => {
    return (
        <div className="w-full bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Attendee</p>
                    <p className="text-base font-bold text-gray-900">{attendeeName}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Ticket ID</p>
                    <p className="text-base font-mono font-bold text-indigo-600">{ticketId}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Purchase Date</p>
                    <p className="text-base font-bold text-gray-900">{purchaseDate}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Status</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-sm font-bold text-emerald-600 uppercase tracking-wide">{status}</span>
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-50">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Entry Instructions</h4>
                <ul className="space-y-3">
                    {[
                        'Please arrive 30 minutes before the event starts.',
                        'Keep your QR code ready on your mobile device.',
                        'Physical ID might be required at the entrance.'
                    ].map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-600 font-medium">
                            <span className="text-indigo-500 font-black">{i + 1}.</span>
                            {step}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TicketDetails;
