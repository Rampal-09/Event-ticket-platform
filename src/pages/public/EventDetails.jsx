import React from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import Button from '../../components/ui/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

const MOCK_EVENT = {
    id: 1,
    title: "Summer Music Festival 2026",
    category: "Music",
    description: "Get ready for the biggest music event of the summer! Featuring top artists from around the globe across three stages. Experience incredible live performances, local food vendors, and a vibrant community atmosphere that will keep you dancing until sunset.\n\nThis year, we've expanded our VIP area and added more interactive art installations throughout the festival grounds. Whether you're a long-time fan or a first-timer, this is the event of the year.",
    location: "Central Park, New York, NY 10024",
    event_date: "2026-07-15T18:00:00",
    ticket_price: 120,
    total_tickets: 5000,
    organizer: "Big Beat Productions",
    gradient: 'linear-gradient(135deg, #6D28D9 0%, #4F46E5 100%)',
};

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            {icon}
        </div>
        <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</p>
            <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
        </div>
    </div>
);

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <PublicLayout>
            {/* Hero Banner */}
            <div className="h-64 sm:h-80 md:h-96 w-full relative overflow-hidden" style={{ background: MOCK_EVENT.gradient }}>
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10" />
                    <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/5" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full mix-blend-overlay bg-white/5" />
                </div>
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8">
                        <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 border border-white/30">
                            {MOCK_EVENT.category}
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight max-w-2xl">
                            {MOCK_EVENT.title}
                        </h1>
                        <p className="text-white/75 mt-2 font-medium text-sm md:text-base">Organized by {MOCK_EVENT.organizer}</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left: Details */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About this Event</h2>
                            <div className="space-y-4">
                                {MOCK_EVENT.description.split('\n\n').map((para, i) => (
                                    <p key={i} className="text-gray-600 leading-relaxed text-[15px]">{para}</p>
                                ))}
                            </div>
                        </div>

                        {/* Event Details */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Event Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InfoRow
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                                    label="Date"
                                    value={new Date(MOCK_EVENT.event_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                />
                                <InfoRow
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                    label="Time"
                                    value={new Date(MOCK_EVENT.event_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                />
                                <InfoRow
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                    label="Location"
                                    value={MOCK_EVENT.location}
                                />
                                <InfoRow
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                                    label="Organizer"
                                    value={MOCK_EVENT.organizer}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Ticket Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            {/* Ticket Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Standard Ticket</p>
                                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">Available</span>
                                </div>
                                <p className="text-4xl font-black text-gray-900">${MOCK_EVENT.ticket_price}</p>
                                <p className="text-sm text-gray-500 mt-1">per ticket · inclusive of all taxes</p>
                            </div>

                            <div className="p-6 space-y-5">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    onClick={() => navigate(ROUTES.CHECKOUT)}
                                    rightIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                                >
                                    Book Tickets Now
                                </Button>

                                <div className="space-y-3">
                                    {[
                                        'Instant QR Ticket delivery',
                                        'Free cancellation within 48h',
                                        'Mobile & print-friendly ticket',
                                    ].map(point => (
                                        <div key={point} className="flex items-center gap-2.5 text-sm text-gray-600">
                                            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {point}
                                        </div>
                                    ))}
                                </div>

                                <p className="text-xs text-center text-gray-400 pt-2 border-t border-gray-50">
                                    {MOCK_EVENT.total_tickets.toLocaleString()} tickets available
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default EventDetails;
