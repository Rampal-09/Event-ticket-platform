import React, { useState } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import Button from '../../components/ui/Button';
import EventGallery from '../../components/events/EventGallery';
import TicketSelector from '../../components/tickets/TicketSelector';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { MOCK_EVENTS as EVENTS } from '../../data/mockEvents';

const InfoRow = ({ icon, label, value, accent }) => (
    <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: accent + '15', color: accent }}>
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
            <p className="text-sm font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const event = EVENTS[id] || EVENTS[1];
    const {
        title, category, organizer, location, event_date, ticket_price,
        total_tickets, tickets_sold, description, highlights, schedule,
        tags, accentColor, accentLight, galleryImages
    } = event;

    const dateObj = new Date(event_date);
    const isSoldOut = tickets_sold >= total_tickets;
    const ticketsRemaining = total_tickets - tickets_sold;
    const soldPercent = Math.min(Math.round((tickets_sold / total_tickets) * 100), 100);
    const isSellingFast = !isSoldOut && ticketsRemaining <= total_tickets * 0.2 && ticketsRemaining > total_tickets * 0.1;
    const isAlmostGone  = !isSoldOut && ticketsRemaining <= total_tickets * 0.1;

    return (
        <div className="bg-white">
            {/* Gallery at top */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors text-sm font-medium mb-6"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to browse
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                        <EventGallery images={galleryImages} />
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                                style={{ background: accentColor + '20', color: accentColor }}>
                                {category}
                            </span>
                            {isSoldOut && <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-red-100 text-red-600">Sold Out</span>}
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">{title}</h1>
                        <p className="text-gray-500 mt-2 text-lg font-medium">by {organizer}</p>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InfoRow accent={accentColor}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                                label="Date"
                                value={dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                            />
                            <InfoRow accent={accentColor}
                                icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                label="Location"
                                value={location}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── HIGHLIGHTS STRIP ── */}
            <div className="border-b border-gray-100 mt-10" style={{ background: accentLight }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-6 overflow-x-auto scrollbar-hide">
                    {highlights.map(h => (
                        <div key={h} className="flex items-center gap-1.5 flex-shrink-0 text-xs font-bold" style={{ color: accentColor }}>
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            {h}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* LEFT ── description + info + schedule */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* About */}
                        <div>
                            <h2 className="text-xl font-black text-gray-900 mb-4">About this Event</h2>
                            {description.split('\n\n').map((para, i) => (
                                <p key={i} className="text-gray-600 leading-relaxed text-[15px] mb-3">{para}</p>
                            ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {tags.map(t => (
                                <span key={t} className="text-xs font-bold px-3 py-1.5 rounded-full border"
                                    style={{ background: accentLight, color: accentColor, borderColor: accentColor + '30' }}>
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Info Grid */}
                        <div>
                            <h2 className="text-xl font-black text-gray-900 mb-6">Event Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InfoRow accent={accentColor}
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                                    label="Date"
                                    value={dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                />
                                <InfoRow accent={accentColor}
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                    label="Time"
                                    value={dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                />
                                <InfoRow accent={accentColor}
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                    label="Location"
                                    value={location}
                                />
                                <InfoRow accent={accentColor}
                                    icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                                    label="Organizer"
                                    value={organizer}
                                />
                            </div>
                        </div>

                        {/* Schedule */}
                        <div>
                            <h2 className="text-xl font-black text-gray-900 mb-6">Schedule</h2>
                            <div className="space-y-0">
                                {schedule.map((item, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0 ring-2 ring-offset-2 transition-all"
                                                style={{ background: accentColor, ringColor: accentColor }}>
                                            </div>
                                            {i < schedule.length - 1 && <div className="w-px flex-1 my-1" style={{ background: accentColor + '30' }} />}
                                        </div>
                                        <div className="pb-5">
                                            <p className="text-xs font-black uppercase tracking-widest" style={{ color: accentColor }}>{item.time}</p>
                                            <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.act}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ticket Selector Integration */}
                        <div className="pt-10 border-t border-gray-100">
                            <h2 className="text-2xl font-black text-gray-900 mb-6">Select Your Tickets</h2>
                            {!isSoldOut ? (
                                <div className="max-w-md">
                                    <TicketSelector
                                        eventId={id}
                                        ticketPrice={ticket_price}
                                        maxTickets={total_tickets - tickets_sold}
                                    />
                                </div>
                            ) : (
                                <div className="bg-red-50 border border-red-100 p-6 rounded-3xl text-center">
                                    <p className="text-red-700 font-bold">This event is currently sold out.</p>
                                    <p className="text-red-600/70 text-sm mt-1">Join the waitlist to be notified of cancellations.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT ── sticky ticket card (Simplified) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)` }} />

                            <div className="p-6 border-b border-gray-100">
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Price Starts At</p>
                                <p className="text-4xl font-black text-gray-900">${ticket_price}</p>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Urgency badges */}
                                {isAlmostGone && (
                                    <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-100 rounded-xl">
                                        <span className="text-base">⚠️</span>
                                        <p className="text-xs font-black text-red-600">
                                            Only {ticketsRemaining} ticket{ticketsRemaining !== 1 ? 's' : ''} left!
                                        </p>
                                    </div>
                                )}
                                {isSellingFast && !isAlmostGone && (
                                    <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-100 rounded-xl">
                                        <span className="text-base">🔥</span>
                                        <p className="text-xs font-black text-amber-600">Selling Fast</p>
                                    </div>
                                )}

                                {/* Progress bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-bold text-gray-500">Tickets Sold</p>
                                        <p className="text-xs font-black text-gray-700">{soldPercent}% Sold</p>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ${
                                                isSoldOut ? 'bg-red-500'
                                                : isAlmostGone ? 'bg-red-400'
                                                : isSellingFast ? 'bg-amber-400'
                                                : 'bg-indigo-500'
                                            }`}
                                            style={{ width: `${soldPercent}%` }}
                                        />
                                    </div>
                                    <p className="text-[11px] text-gray-400 font-medium">
                                        {tickets_sold} sold · {ticketsRemaining} remaining
                                    </p>
                                </div>

                                {/* Perks */}
                                <div className="space-y-2.5 pt-1">
                                    {['Instant QR Ticket delivery', 'Free cancellation within 48h'].map(p => (
                                        <div key={p} className="flex items-center gap-2.5 text-xs text-gray-500 font-medium">
                                            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {p}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── OTHER EVENTS ── */}
                <div className="mt-16 pt-10 border-t border-gray-100">
                    <h2 className="text-xl font-black text-gray-900 mb-6">More Events You May Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {Object.values(EVENTS).filter(e => e.id !== parseInt(id)).slice(0, 3).map(e => (
                            <Link key={e.id} to={`/events/${e.id}`}
                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden">
                                <div className="h-36 overflow-hidden">
                                    <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: e.accentColor }}>{e.category}</span>
                                    <p className="text-sm font-bold text-gray-900 mt-1 line-clamp-1">{e.title}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">${e.ticket_price} · {new Date(e.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
