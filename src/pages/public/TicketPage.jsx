import React from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import TicketCard from '../../components/tickets/TicketCard';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const MOCK_DATA = {
    ticket: {
        id: 'TCK-123456',
        qr_code: 'TCK-123456:1:SECURETOKEN',
        buyer_email: 'john.doe@example.com',
        status: 'unused',
    },
    event: {
        title: 'Summer Music Festival 2026',
        location: 'Central Park, New York',
        event_date: '2026-07-15T18:00:00',
    },
};

const TicketPage = () => {
    return (
        <PublicLayout>
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16">
                {/* Success Header */}
                <div className="text-center mb-10 space-y-4 animate-fade-in-up">
                    <div className="relative inline-block">
                        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-200">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">🎉</div>
                    </div>

                    <div>
                        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Booking Confirmed!</h1>
                        <p className="text-gray-500 mt-2 max-w-sm mx-auto text-lg">
                            Your ticket is ready. Show the QR code at the gate for entry.
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-semibold px-4 py-2 rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Ticket emailed to {MOCK_DATA.ticket.buyer_email}
                    </div>
                </div>

                {/* Ticket */}
                <div className="w-full max-w-sm mx-auto">
                    <TicketCard ticket={MOCK_DATA.ticket} event={MOCK_DATA.event} />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-10">
                    <Button
                        variant="outline"
                        size="lg"
                        leftIcon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        }
                        onClick={() => window.print()}
                    >
                        Download PDF
                    </Button>
                    <Button
                        variant="primary"
                        size="lg"
                        leftIcon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                        }
                        onClick={() => window.print()}
                    >
                        Print Ticket
                    </Button>
                </div>

                {/* Back Link */}
                <Link to="/" className="mt-8 text-sm text-gray-400 hover:text-indigo-600 transition-colors font-medium">
                    ← Back to events
                </Link>
            </div>
        </PublicLayout>
    );
};

export default TicketPage;
