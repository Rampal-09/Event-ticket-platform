import React from 'react';
import { Link } from 'react-router-dom';

/**
 * TicketDetails - Breakdown of ticket info for the TicketPage
 */
const TicketDetails = ({ attendeeName, ticketId, purchaseDate, status = 'UNUSED', scannedAt }) => {
    const isUsed = status.toLowerCase() === 'used';
    const scannedTime = scannedAt ? new Date(scannedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : null;

    return (
        <div className="w-full bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Attendee</p>
                    <p className="text-base font-bold text-gray-900">{attendeeName}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Ticket ID</p>
                    <p className="text-base font-mono font-bold text-indigo-600">#{String(ticketId).padStart(6, '0')}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Purchase Date</p>
                    <p className="text-base font-bold text-gray-900">{purchaseDate}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Status</p>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isUsed ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                        <span className={`text-sm font-bold uppercase tracking-wide ${isUsed ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {status}
                            {isUsed && scannedTime && <span className="text-[10px] ml-2 text-gray-400">(at {scannedTime})</span>}
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TicketDetails;
