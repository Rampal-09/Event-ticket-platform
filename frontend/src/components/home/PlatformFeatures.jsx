import React from 'react';

const FEATURES = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: 'Online Ticket Sales',
        description: 'Sell tickets to anyone, anywhere. Secure payments processed instantly with full confirmation.',
        color: 'bg-indigo-100 text-indigo-600',
        accent: 'group-hover:bg-indigo-600 group-hover:text-white',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
        ),
        title: 'QR Code Tickets',
        description: 'Every ticket comes with a unique, scannable QR code delivered via email — no printing needed.',
        color: 'bg-violet-100 text-violet-600',
        accent: 'group-hover:bg-violet-600 group-hover:text-white',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: 'Entry Scanning System',
        description: 'Staff can scan tickets at the gate in seconds using any camera-enabled device — fast and reliable.',
        color: 'bg-emerald-100 text-emerald-600',
        accent: 'group-hover:bg-emerald-600 group-hover:text-white',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        title: 'Organizer Dashboard',
        description: "A powerful control panel to create events, monitor sales, and manage your entire event portfolio.",
        color: 'bg-amber-100 text-amber-600',
        accent: 'group-hover:bg-amber-600 group-hover:text-white',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
        title: 'Real-time Ticket Tracking',
        description: 'Watch ticket sales update live. Know exactly how many seats are left at any moment.',
        color: 'bg-cyan-100 text-cyan-600',
        accent: 'group-hover:bg-cyan-600 group-hover:text-white',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Email Ticket Confirmation',
        description: 'Attendees instantly receive a confirmation email with their QR ticket attached — ready to use.',
        color: 'bg-rose-100 text-rose-600',
        accent: 'group-hover:bg-rose-600 group-hover:text-white',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Mobile Friendly Event Pages',
        description: 'Every event page is designed to look stunning and work flawlessly on phones, tablets, and desktops.',
        color: 'bg-fuchsia-100 text-fuchsia-600',
        accent: 'group-hover:bg-fuchsia-600 group-hover:text-white',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        title: '24/7 Australian Support',
        description: 'Local expert support available round-the-clock for organisers. We are here to help your event succeed.',
        color: 'bg-emerald-100 text-emerald-600',
        accent: 'group-hover:bg-emerald-600 group-hover:text-white',
    },
];

const PlatformFeatures = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <p className="text-indigo-600 text-xs font-black uppercase tracking-widest">
                        Everything You Need
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none">
                        Platform Features
                    </h2>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed">
                        A complete toolkit for organisers and attendees — built from the ground up for seamless event experiences.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {FEATURES.map((feature) => (
                        <div
                            key={feature.title}
                            className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default"
                        >
                            <div
                                className={`w-14 h-14 ${feature.color} ${feature.accent} rounded-xl flex items-center justify-center mb-6 transition-all duration-300`}
                            >
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-black text-gray-900 mb-2 leading-snug">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlatformFeatures;
