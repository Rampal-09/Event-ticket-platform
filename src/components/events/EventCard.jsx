import React from 'react';
import Button from '../ui/Button';

const CATEGORY_COLORS = [
    'bg-violet-100 text-violet-700',
    'bg-emerald-100 text-emerald-700',
    'bg-amber-100 text-amber-700',
    'bg-sky-100 text-sky-700',
    'bg-pink-100 text-pink-700',
];

const GRADIENT_TOPS = [
    'from-violet-400 to-indigo-600',
    'from-sky-400 to-cyan-600',
    'from-amber-400 to-orange-600',
    'from-emerald-400 to-teal-600',
    'from-pink-400 to-rose-600',
];

const EventCard = ({ event, onBuyClick, index = 0 }) => {
    if (!event) return null;

    const { title, location, event_date, ticket_price, description } = event;

    const gradient = GRADIENT_TOPS[index % GRADIENT_TOPS.length];
    const catColor = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

    const dateObj = new Date(event_date);
    const monthStr = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
    const dayStr = dateObj.getDate();
    const yearStr = dateObj.getFullYear();

    return (
        <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* Image / Banner */}
            <div className={`relative h-52 bg-gradient-to-br ${gradient} flex items-end p-4 overflow-hidden`}>
                {/* Decorative circles */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
                <div className="absolute top-4 left-1/2 w-16 h-16 bg-white/10 rounded-full" />

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white text-gray-900 rounded-xl px-3 py-2 text-center shadow-lg min-w-[52px]">
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 leading-none">{monthStr}</p>
                    <p className="text-2xl font-black leading-none mt-0.5">{dayStr}</p>
                    <p className="text-[9px] text-gray-400 font-semibold">{yearStr}</p>
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white font-black text-lg px-3 py-1.5 rounded-xl border border-white/30">
                    ${ticket_price}
                </div>

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Optional: image placeholder icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <svg className="w-28 h-28 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                <div>
                    <h3 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-700 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">{description}</p>
                </div>

                <div className="flex flex-col gap-1.5 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{location}</span>
                    </div>
                </div>

                <div className="pt-3 border-t border-gray-50">
                    <Button
                        variant="primary"
                        size="md"
                        fullWidth
                        onClick={() => onBuyClick?.(event)}
                        rightIcon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        }
                    >
                        Get Tickets
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
