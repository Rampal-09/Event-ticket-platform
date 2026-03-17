import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { useCurrency } from '../../context/CurrencyContext';

const PRICING_POINTS = [
    {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        text: 'No hidden fees — ever.',
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        text: 'We never sell your attendee data.',
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        text: 'You only pay when tickets are sold.',
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        text: 'No fees on Free events.',
    },
];

const PricingSection = () => {
    const { currency } = useCurrency();
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-12 sm:p-20 shadow-2xl shadow-indigo-200">

                    {/* Decorative blobs */}
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Left: Text */}
                        <div className="flex-1 space-y-8">
                            <div className="space-y-4">
                                <p className="text-indigo-200 text-xs font-black uppercase tracking-widest">
                                    Pricing Model
                                </p>
                                <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight">
                                    Simple, Transparent Pricing
                                </h2>
                                <p className="text-indigo-100 text-lg font-medium leading-relaxed max-w-lg">
                                    No upfront costs. No monthly subscriptions. No surprises. We only succeed when you do.
                                </p>
                            </div>

                            {/* Pricing points */}
                            <ul className="space-y-4">
                                {PRICING_POINTS.map((point) => (
                                    <li key={point.text} className="flex items-center gap-3">
                                        <span className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                                            {point.icon}
                                        </span>
                                        <span className="text-white font-bold text-base">{point.text}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button
                                onClick={() => navigate(ROUTES.REGISTER)}
                                className="inline-flex items-center gap-3 bg-white text-indigo-700 font-black text-base px-8 py-4 rounded-2xl hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Start Selling Tickets
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>

                        {/* Right: Visual card */}
                        <div className="flex-shrink-0 w-full lg:w-80">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 space-y-6">
                                <div className="text-center space-y-1">
                                    <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest">
                                        Per-Ticket Fee
                                    </p>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <p className="text-3xl font-black text-white">FREE</p>
                                            <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">For Free Events</p>
                                        </div>
                                        <div className="h-px bg-white/10 w-12 mx-auto" />
                                        <div className="space-y-1">
                                            <p className="text-3xl font-black text-white">1.5% + {currency.symbol}0.30</p>
                                            <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest leading-tight">
                                                Processing fee per paid ticket
                                            </p>
                                            <p className="text-indigo-300/60 text-[8px] font-medium uppercase tracking-tighter mt-1">
                                                *Payment transactions may apply
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-white/20" />

                                <ul className="space-y-3 text-sm">
                                    {['Unlimited events', 'Unlimited ticket types', 'Real-time analytics', 'Email confirmations', 'QR entry scanning', '24/7 Australian Support'].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-indigo-100 font-medium">
                                            <span className="w-5 h-5 rounded-full bg-emerald-400/30 flex items-center justify-center">
                                                <svg className="w-3 h-3 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
