import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import Button from '../../components/ui/Button';

/**
 * OrderSuccessPage - Shown after successful checkout
 */
const OrderSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('id') || `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-3xl -z-10" />

            <div className="max-w-md w-full text-center space-y-10 animate-fade-in-up">
                {/* Success Animation Container */}
                <div className="relative inline-block">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                        <svg className="w-12 h-12 text-emerald-600 animate-check-draw" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    {/* Confetti simulation (visual only) */}
                    <div className="absolute -top-4 -right-4 w-4 h-4 bg-indigo-400 rounded-full animate-ping" />
                    <div className="absolute top-12 -left-8 w-3 h-3 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Booking Confirmed!</h1>
                    <p className="text-gray-500 font-medium text-lg leading-relaxed">
                        Your tickets are ready! We've sent a confirmation email with your digital pass.
                    </p>
                </div>

                {/* Order Summary Card */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-indigo-100 border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</span>
                        <span className="text-sm font-mono font-black text-gray-900">{orderId}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Date</span>
                        <span className="text-sm font-bold text-gray-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Deliver To</span>
                        <span className="text-sm font-bold text-gray-900">Email Address</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Link to={ROUTES.TICKET.replace(':ticketId', 'TCK-882291')}>
                        <Button variant="primary" size="xl" fullWidth className="bg-indigo-600 shadow-xl shadow-indigo-100">
                            Download My Tickets
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
