import React from 'react';

const EVENT_TYPES = [
    {
        label: 'Conferences',
        emoji: '🎤',
        bg: 'bg-indigo-50 hover:bg-indigo-100',
        border: 'border-indigo-100 hover:border-indigo-200',
        text: 'text-indigo-700',
    },
    {
        label: 'Music Festivals',
        emoji: '🎵',
        bg: 'bg-violet-50 hover:bg-violet-100',
        border: 'border-violet-100 hover:border-violet-200',
        text: 'text-violet-700',
    },
    {
        label: 'Community Events',
        emoji: '🏘️',
        bg: 'bg-emerald-50 hover:bg-emerald-100',
        border: 'border-emerald-100 hover:border-emerald-200',
        text: 'text-emerald-700',
    },
    {
        label: 'Workshops',
        emoji: '🛠️',
        bg: 'bg-amber-50 hover:bg-amber-100',
        border: 'border-amber-100 hover:border-amber-200',
        text: 'text-amber-700',
    },
    {
        label: 'Sports Events',
        emoji: '⚽',
        bg: 'bg-cyan-50 hover:bg-cyan-100',
        border: 'border-cyan-100 hover:border-cyan-200',
        text: 'text-cyan-700',
    },
    {
        label: 'Fundraisers',
        emoji: '🤝',
        bg: 'bg-rose-50 hover:bg-rose-100',
        border: 'border-rose-100 hover:border-rose-200',
        text: 'text-rose-700',
    },
    {
        label: 'Corporate Events',
        emoji: '🏢',
        bg: 'bg-slate-50 hover:bg-slate-100',
        border: 'border-slate-100 hover:border-slate-200',
        text: 'text-slate-700',
    },
];

const EventTypesSection = () => {
    return (
        <section className="py-24 bg-gray-50 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
                    <p className="text-indigo-600 text-xs font-black uppercase tracking-widest">
                        Versatile Platform
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none">
                        Supported Event Types
                    </h2>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed">
                        From large-scale music festivals to intimate community gatherings — our platform handles it all.
                    </p>
                </div>

                {/* Event Type Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                    {EVENT_TYPES.map((type) => (
                        <div
                            key={type.label}
                            className={`group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border ${type.bg} ${type.border} transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default`}
                        >
                            <span className="text-4xl group-hover:scale-110 transition-transform duration-300 select-none">
                                {type.emoji}
                            </span>
                            <span className={`text-sm font-black text-center leading-snug ${type.text}`}>
                                {type.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Supporting note */}
                <p className="text-center text-gray-400 text-sm font-medium mt-10">
                    Don't see your event type?{' '}
                    <span className="text-indigo-500 font-bold cursor-pointer hover:underline">
                        We support any ticketed event.
                    </span>
                </p>
            </div>
        </section>
    );
};

export default EventTypesSection;
