import React from 'react';

const STEPS = [
    {
        number: '01',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
        ),
        title: 'Create Event',
        description: 'Organizers create and publish events in minutes — gallery, pricing, capacity and promo codes all included.',
        color: 'bg-indigo-100 text-indigo-600',
        accent: 'text-indigo-600',
    },
    {
        number: '02',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: 'Sell Tickets',
        description: 'Sell tickets online instantly. Track real-time sales from your dashboard with full reporting.',
        color: 'bg-violet-100 text-violet-600',
        accent: 'text-violet-600',
    },
    {
        number: '03',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
        ),
        title: 'Scan Tickets',
        description: 'Use our mobile-optimised QR code scanner for quick, secure, and frictionless entry at the gate.',
        color: 'bg-emerald-100 text-emerald-600',
        accent: 'text-emerald-600',
    },
    {
        number: '04',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: 'Manage Attendees',
        description: 'View live reports, monitor attendance, and manage your audience all from one dashboard.',
        color: 'bg-amber-100 text-amber-600',
        accent: 'text-amber-600',
    },
];

const HowPlatformWorks = () => {
    return (
        <section className="py-24 bg-gray-50 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <p className="text-indigo-600 text-xs font-black uppercase tracking-widest">Simple Process</p>
                    <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none">How It Works</h2>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed">
                        From creation to entry — everything you need in four simple steps.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connector line — desktop only */}
                    <div className="hidden lg:block absolute top-[3.25rem] left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-indigo-200 via-violet-200 to-amber-200 z-0" />

                    {STEPS.map((step, i) => (
                        <div key={step.number} className="relative z-10 flex flex-col items-center text-center group">
                            {/* Step number badge */}
                            <div className="relative mb-5">
                                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                    {step.icon}
                                </div>
                                <span className={`absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-gray-100 text-[10px] font-black flex items-center justify-center ${step.accent}`}>
                                    {i + 1}
                                </span>
                            </div>

                            <h3 className="text-xl font-black text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-[200px]">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowPlatformWorks;
