import React from 'react';

const TRUST_POINTS = [
    {
        icon: '🇦🇺',
        title: 'Australian Owned',
        desc: 'Built and operated by an Australian team — not an overseas corporation.',
    },
    {
        icon: '🔒',
        title: 'Privacy First',
        desc: 'We never sell, share, or misuse your attendee data. Full stop.',
    },
    {
        icon: '🤝',
        title: 'Community Focused',
        desc: 'Designed to support local organisers, clubs, and community groups.',
    },
    {
        icon: '⚡',
        title: 'Always Reliable',
        desc: 'Fast, stable infrastructure so your event never misses a beat.',
    },
];

const TrustBanner = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top text block */}
                <div className="text-center max-w-3xl mx-auto mb-14 space-y-5">
                    <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full">
                        <span className="text-base">🇦🇺</span>
                        <span className="text-xs font-black uppercase tracking-widest text-indigo-500">
                            Australian Owned & Operated
                        </span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                        Built for Australian Events{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                            and Communities
                        </span>
                    </h2>

                    <p className="text-gray-500 text-lg font-medium leading-relaxed">
                        An Australian-owned ticketing platform designed to help organisers create successful events while protecting attendee privacy.
                    </p>
                </div>

                {/* Trust points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TRUST_POINTS.map((point) => (
                        <div
                            key={point.title}
                            className="bg-white hover:bg-gray-50 border border-gray-100 hover:border-indigo-100 rounded-2xl p-8 space-y-4 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100/60 hover:-translate-y-1"
                        >
                            <span className="text-4xl select-none block">{point.icon}</span>
                            <h3 className="text-gray-900 font-black text-lg">{point.title}</h3>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">{point.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom divider note */}
                <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest mt-12">
                    Trusted by organizers across Australia
                </p>
            </div>
        </section>
    );
};

export default TrustBanner;
