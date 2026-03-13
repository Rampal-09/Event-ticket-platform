import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

const CATEGORIES = [
    { label: 'Music',    emoji: '🎵', color: 'bg-violet-50 hover:bg-violet-100 border-violet-100 hover:border-violet-200', text: 'text-violet-700' },
    { label: 'Sports',   emoji: '🏆', color: 'bg-amber-50  hover:bg-amber-100  border-amber-100  hover:border-amber-200',  text: 'text-amber-700'  },
    { label: 'Business', emoji: '💼', color: 'bg-slate-50  hover:bg-slate-100  border-slate-100  hover:border-slate-200',  text: 'text-slate-700'  },
    { label: 'Festival', emoji: '🎉', color: 'bg-rose-50   hover:bg-rose-100   border-rose-100   hover:border-rose-200',   text: 'text-rose-700'   },
    { label: 'Comedy',   emoji: '🎤', color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-100 hover:border-indigo-200', text: 'text-indigo-700' },
    { label: 'Workshop', emoji: '🧠', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-100 hover:border-emerald-200', text: 'text-emerald-700' },
    { label: 'Fundraisers', emoji: '🤝', color: 'bg-orange-50 hover:bg-orange-100 border-orange-100 hover:border-orange-200', text: 'text-orange-700' },
    { label: 'School Events', emoji: '🏫', color: 'bg-blue-50 hover:bg-blue-100 border-blue-100 hover:border-blue-200', text: 'text-blue-700' },
    { label: 'Community Events', emoji: '🏡', color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-100 hover:border-cyan-200', text: 'text-cyan-700' },
];

const EventCategories = () => {
    const navigate = useNavigate();

    const handleCategory = (label) => {
        navigate(`${ROUTES.EVENT_LIST}?category=${encodeURIComponent(label)}`);
    };

    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div className="space-y-2">
                        <p className="text-indigo-600 text-xs font-black uppercase tracking-widest">Browse by Category</p>
                        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-none">Event Categories</h2>
                    </div>
                    <button
                        onClick={() => navigate(ROUTES.EVENT_LIST)}
                        className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                    >
                        View all events →
                    </button>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.label}
                            onClick={() => handleCategory(cat.label)}
                            className={`group flex flex-col items-center justify-center gap-3 px-4 py-8 rounded-2xl border ${cat.color} transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer`}
                        >
                            <span className="text-4xl group-hover:scale-110 transition-transform duration-300 select-none">
                                {cat.emoji}
                            </span>
                            <span className={`text-sm font-black ${cat.text}`}>{cat.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventCategories;
