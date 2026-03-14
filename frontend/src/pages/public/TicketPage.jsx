import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import TicketCard from '../../components/tickets/TicketCard';
import TicketDetails from '../../components/tickets/TicketDetails';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../router/routes';
import { ticketService } from '../../services/ticketService';

const TicketPage = () => {
    const { ticketId } = useParams();
    const navigate = useNavigate();
    const [ticketData, setTicketData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchTicket = async () => {
            setIsLoading(true);
            try {
                const data = await ticketService.getTicketById(ticketId);
                setTicketData(data);
            } catch (err) {
                console.error('Fetch ticket error:', err);
                setError('Ticket not found or could not be loaded.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchTicket();
    }, [ticketId]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center font-black text-gray-400 tracking-widest uppercase">Fetching Your Ticket...</div>;
    }

    if (error || !ticketData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h2 className="text-2xl font-black text-gray-900">{error || 'Ticket not found'}</h2>
                <Button onClick={() => navigate(ROUTES.HOME)}>Back to Events</Button>
            </div>
        );
    }

    const { buyerName, createdAt, event, status, buyerEmail, id } = ticketData;
    const purchaseDate = new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // Normalized event data for components
    const eventInfo = {
        title: event.title,
        location: event.location,
        event_date: event.eventDate
    };

    const ticketInfo = {
        id: id,
        status: status.toLowerCase(),
        buyer_email: buyerEmail,
        buyer_name: buyerName
    };

    return (
        <div className="min-h-screen bg-[#FDFDFF] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Back Button */}
                <div className="flex items-center justify-between mb-12 no-print">
                    <button
                        onClick={() => navigate(ROUTES.HOME)}
                        className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors font-bold text-sm uppercase tracking-widest"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Events
                    </button>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" onClick={() => window.print()}>Save PDF</Button>
                        <Button variant="outline" size="sm" onClick={() => window.print()}>Print</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* LEFT: Ticket Visual */}
                    <div className="flex flex-col items-center">
                        <div className="w-full max-w-sm transform hover:rotate-1 transition-transform duration-500">
                            <TicketCard ticket={ticketInfo} event={eventInfo} />
                        </div>
                        <p className="mt-8 text-sm text-gray-400 font-medium text-center max-w-xs no-print">
                            This is your official entry pass. Scan the QR code at the event gate.
                        </p>
                    </div>

                    {/* RIGHT: Confirmation Details */}
                    <div className="space-y-10">
                        <div className="no-print">
                            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100 mb-4">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                Confirmed & Verified
                            </div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
                                Your Ticket is Ready for <span className="text-indigo-600">{eventInfo.title}</span>
                            </h1>
                            <p className="text-gray-500 mt-4 text-lg">
                                We've sent a confirmation email with your digital ticket to <b>{buyerEmail}</b>.
                            </p>
                        </div>

                        <TicketDetails
                            attendeeName={buyerName}
                            ticketId={id}
                            purchaseDate={purchaseDate}
                        />

                        {/* Helper Box */}
                        <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">Need help?</h3>
                                <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                                    If you have any issues with your ticket or need to change attendee information, please contact our support team.
                                </p>
                                <Button white className="text-indigo-600 font-black">Contact Support</Button>
                            </div>
                            {/* Decorative Circle */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketPage;
