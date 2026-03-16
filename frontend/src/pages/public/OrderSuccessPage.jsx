import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import Button from '../../components/ui/Button';
import { ticketService } from '../../services/ticketService';

/**
 * OrderSuccessPage - Shown after successful checkout
 */
const OrderSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const ticketId = searchParams.get('id');
    const [ticket, setTicket] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTicket = async () => {
            if (!ticketId) {
                setIsLoading(false);
                return;
            }
            try {
                const data = await ticketService.getTicketById(ticketId);
                setTicket(data);
            } catch (err) {
                console.error('Error fetching ticket for success page:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTicket();
    }, [ticketId]);

    const displayOrderId = ticket ? `ORD-${ticket.id.toString().padStart(6, '0')}` : `ORD-${(ticketId || '0').toString().padStart(6, '0')}`;
    const displayDate = ticket 
        ? new Date(ticket.purchasedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const displayEmail = ticket ? ticket.buyerEmail : 'Email Address';

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-3xl -z-10" />

            <div className="max-w-md w-full text-center space-y-10 animate-fade-in-up">
                {/* Success Animation Container */}
                <div className="relative inline-block">
                    {isLoading ? (
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                            <div className="w-12 h-12 bg-gray-200 rounded-full" />
                        </div>
                    ) : (
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                            <svg className="w-12 h-12 text-emerald-600 animate-check-draw" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Booking Confirmed!</h1>
                    <p className="text-gray-500 font-medium text-lg leading-relaxed">
                        {isLoading ? (
                            'Preparing your tickets...'
                        ) : (
                            <>
                                Your tickets for <span className="text-indigo-600 font-bold">{ticket?.event?.title || 'the event'}</span> are ready! 
                                We've sent a confirmation email with your digital pass.
                            </>
                        )}
                    </p>
                </div>

                {/* Order Summary Card */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-indigo-100 border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</span>
                        <span className="text-sm font-mono font-black text-gray-900">
                            {isLoading ? <div className="w-20 h-4 bg-gray-100 animate-pulse rounded" /> : displayOrderId}
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Date</span>
                        <span className="text-sm font-bold text-gray-900">
                            {isLoading ? <div className="w-24 h-4 bg-gray-100 animate-pulse rounded" /> : displayDate}
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Deliver To</span>
                        <span className="text-sm font-bold text-gray-900">
                            {isLoading ? <div className="w-32 h-4 bg-gray-100 animate-pulse rounded" /> : displayEmail}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Link to={ticketId ? ROUTES.TICKET.replace(':ticketId', ticketId) : ROUTES.HOME}>
                        <Button variant="primary" size="xl" fullWidth className="bg-indigo-600 shadow-xl shadow-indigo-100" disabled={isLoading}>
                            {isLoading ? 'Processing...' : 'Download My Tickets'}
                        </Button>
                    </Link>
                    <Link to={ROUTES.HOME}>
                        <Button variant="outline" size="xl" fullWidth>
                            Return to Homepage
                        </Button>
                    </Link>
                </div>

                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Need help? <Link to={ROUTES.FAQ} className="text-indigo-600 hover:underline">Support Center</Link>
                </p>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
