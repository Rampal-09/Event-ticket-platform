import React, { useState } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import Button from '../../components/ui/Button';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

// ─── unique images already in /assets/images ────────────────────────────────
import imgMusic from '../../assets/images/event-music.png';
import imgTech from '../../assets/images/event-tech.png';
import imgFood from '../../assets/images/event-food.png';
import imgArt from '../../assets/images/event-art.png';
import imgJazz from '../../assets/images/event-jazz.png';
import imgStartup from '../../assets/images/event-startup.png';

// ─── per-event mock data store ────────────────────────────────────────────────
const EVENTS = {
    1: {
        id: 1, category: 'Music', accentColor: '#7C3AED', accentLight: '#EDE9FE',
        image: imgMusic,
        title: 'Summer Music Festival 2026',
        organizer: 'Big Beat Productions',
        location: 'Central Park, New York, NY 10024',
        event_date: '2026-07-15T18:00:00',
        ticket_price: 120, total_tickets: 5000, tickets_sold: 4200,
        description: `Get ready for the biggest music event of the summer! Featuring top artists from around the globe across three stages. Experience incredible live performances, local food vendors, and a vibrant community atmosphere that will keep you dancing until sunset.\n\nThis year, we've expanded our VIP area and added more interactive art installations throughout the festival grounds. Whether you're a long-time fan or a first-timer, this is the event of the year.`,
        highlights: ['3 Live Stages', '40+ Artists', 'Food Village', 'Art Installations', 'VIP Lounge'],
        schedule: [
            { time: '4:00 PM', act: 'Gates Open' },
            { time: '5:00 PM', act: 'Opening Act — The Waves' },
            { time: '7:00 PM', act: 'Main Stage — Neon Pulse' },
            { time: '9:30 PM', act: 'Headliner — Aurora Sky' },
        ],
        tags: ['Outdoor', 'All Ages', 'Food Stalls', 'Merchandise'],
    },
    2: {
        id: 2, category: 'Tech', accentColor: '#2563EB', accentLight: '#DBEAFE',
        image: imgTech,
        title: 'Tech Innovators Conference',
        organizer: 'FutureLab Events',
        location: 'Moscone Center, San Francisco, CA',
        event_date: '2026-09-22T09:00:00',
        ticket_price: 250, total_tickets: 1200, tickets_sold: 850,
        description: `Explore the future of AI, robotics, and biotechnology with industry leaders and visionaries. The Tech Innovators Conference brings together the brightest minds shaping tomorrow, offering deep-dive workshops, headline keynotes, and curated networking sessions.\n\nExpect exclusive product reveals, live demos from frontier startups, and panel discussions that challenge conventional thinking. This isn't just a conference — it's where the future is written.`,
        highlights: ['50+ Speakers', 'Live Demos', 'Startup Pitches', 'Networking Dinner', 'Workshops'],
        schedule: [
            { time: '9:00 AM', act: 'Registration & Breakfast' },
            { time: '10:00 AM', act: 'Keynote — The AI Decade' },
            { time: '1:00 PM', act: 'Panel: Robotics & Society' },
            { time: '4:00 PM', act: 'Startup Demo Showcase' },
            { time: '7:00 PM', act: 'Networking Dinner & Awards' },
        ],
        tags: ['Professional', 'Networking', 'Workshop', 'Indoor'],
    },
    3: {
        id: 3, category: 'Food', accentColor: '#D97706', accentLight: '#FEF3C7',
        image: imgFood,
        title: 'Culinary Arts Expo 2026',
        organizer: 'Savor Events Co.',
        location: 'Bayside Convention Hall, Miami, FL',
        event_date: '2026-05-30T10:00:00',
        ticket_price: 75, total_tickets: 800, tickets_sold: 640,
        description: `A taste adventure featuring world-class chefs, wine tasting, and interactive cooking workshops. The Culinary Arts Expo is a celebration of global flavours, bringing together Michelin-starred talent and passionate home cooks under one roof.\n\nSample dishes from 20+ cuisines, attend live technique masterclasses, and meet the chefs behind the plates. Pair everything with an expertly curated wine and cocktail selection — it's an experience for every sense.`,
        highlights: ['20+ Cuisines', 'Wine Pairing', 'Live Cookoffs', 'Masterclasses', 'Meet the Chefs'],
        schedule: [
            { time: '10:00 AM', act: 'Doors Open & Tasting Begins' },
            { time: '11:30 AM', act: 'Masterclass: French Technique' },
            { time: '1:00 PM', act: 'Live Cook-Off: Farm to Table' },
            { time: '3:30 PM', act: 'Wine & Dessert Pairing Session' },
        ],
        tags: ['Family Friendly', 'Indoor', 'Tasting', '18+ for Wine'],
    },
    4: {
        id: 4, category: 'Art', accentColor: '#059669', accentLight: '#D1FAE5',
        image: imgArt,
        title: 'Street Art Workshop',
        organizer: 'Urban Canvas Collective',
        location: 'Dumbo Arts District, Brooklyn, NY',
        event_date: '2026-06-10T11:00:00',
        ticket_price: 45, total_tickets: 100, tickets_sold: 88,
        description: `Learn the basics of graffiti and mural techniques from renowned urban artists in an open-air studio setting. This immersive workshop is designed for all skill levels — from curious beginners to aspiring muralists ready to find their style.\n\nParticipants will work with professional-grade spray paint and mixed media on 4×8 ft panels, guided step-by-step by artists who have painted cities across the world. Walk away with your finished piece and some real street cred.`,
        highlights: ['All Skill Levels', 'Materials Provided', 'Take Home Your Art', 'Outdoor Studio', 'Certification'],
        schedule: [
            { time: '11:00 AM', act: 'Introduction & Safety Briefing' },
            { time: '11:30 AM', act: 'Technique Demos by Artists' },
            { time: '12:30 PM', act: 'Open Studio — Create Your Piece' },
            { time: '3:00 PM', act: 'Gallery Walk & Group Photo' },
        ],
        tags: ['Workshop', 'Outdoor', 'All Ages', 'Materials Included'],
    },
    5: {
        id: 5, category: 'Music', accentColor: '#7C3AED', accentLight: '#EDE9FE',
        image: imgJazz,
        title: 'Jazz under the Stars',
        organizer: 'Crescent Moon Events',
        location: 'Audubon Park, New Orleans, LA',
        event_date: '2026-10-05T19:30:00',
        ticket_price: 60, total_tickets: 600, tickets_sold: 600,
        description: `An enchanting evening of smooth jazz performed under the open sky. Bring a blanket and a friend for an intimate night with a handpicked roster of local and touring jazz artists performing on a beautifully lit outdoor stage.\n\nThe atmosphere is relaxed, the music is extraordinary, and the Louisiana night air makes everything feel a little magical. Food trucks and a craft cocktail bar line the perimeter — settle in and let the music carry you.`,
        highlights: ['Outdoor Seating', 'Craft Cocktail Bar', 'Food Trucks', '6 Jazz Acts', 'Blanket Area'],
        schedule: [
            { time: '7:00 PM', act: 'Gates Open' },
            { time: '7:30 PM', act: 'Opening Set — Clara & The Keys' },
            { time: '8:30 PM', act: 'Feature Act — The Bayou Quartet' },
            { time: '9:45 PM', act: 'Headliner — Marcus Bell Trio' },
        ],
        tags: ['Outdoor', 'Sold Out', 'Adults', 'Seated'],
    },
    6: {
        id: 6, category: 'Tech', accentColor: '#2563EB', accentLight: '#DBEAFE',
        image: imgStartup,
        title: 'Startup Networking Mixer',
        organizer: 'Founders Circle Austin',
        location: 'The Domain, Austin, TX',
        event_date: '2026-08-12T18:00:00',
        ticket_price: 30, total_tickets: 250, tickets_sold: 110,
        description: `Meet founders, investors, and future co-founders at the most vibrant startup mixer in Austin. The Startup Networking Mixer is built for meaningful connections — curated table introductions, structured speed networking, and open mingling in a stunning loft venue overlooking the city.\n\nPitch your idea in our informal "30-second founder intro" round, find co-founders, discover your next investment opportunity, or simply expand your network with Austin's most ambitious builders.`,
        highlights: ['Speed Networking', 'Investor Attendance', 'Pitching Round', 'Open Bar', 'City Views'],
        schedule: [
            { time: '6:00 PM', act: 'Doors Open — Welcome Drinks' },
            { time: '6:30 PM', act: 'Structured Table Intros' },
            { time: '7:15 PM', act: '30-Second Founder Pitch Round' },
            { time: '8:00 PM', act: 'Open Networking & Bar' },
        ],
        tags: ['Networking', 'Startup', 'Indoor', 'Evening'],
    },
};

// ─── sub-components ───────────────────────────────────────────────────────────
const InfoRow = ({ icon, label, value, accent }) => (
    <div className="flex items-center sm:items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0 w-10 sm:w-11 h-10 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-base" style={{ background: accent + '20', color: accent }}>
            {icon}
        </div>
        <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none">{label}</p>
            <p className="text-sm font-semibold text-gray-800 mt-1 sm:mt-0.5 break-words">{value}</p>
        </div>
    </div>
);

// ─── main component ───────────────────────────────────────────────────────────
const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);

    const event = EVENTS[parseInt(id)] || null;

    // 404 state
    if (!event) {
        return (
            <PublicLayout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4">
                    <div className="text-6xl">🎟️</div>
                    <h1 className="text-3xl font-black text-gray-900">Event Not Found</h1>
                    <p className="text-gray-500 max-w-sm">The event you're looking for doesn't exist or may have been removed.</p>
                    <Button onClick={() => navigate(ROUTES.EVENT_LIST)} variant="primary">Browse All Events</Button>
                </div>
            </PublicLayout>
        );
    }

    const { accentColor, accentLight, image, title, category, organizer, location,
        event_date, ticket_price, total_tickets, tickets_sold, description,
        highlights, schedule, tags } = event;

    const dateObj = new Date(event_date);
    const isSoldOut = tickets_sold >= total_tickets;
    const pctSold = Math.round((tickets_sold / total_tickets) * 100);
    const total = qty * ticket_price;
    const fee = parseFloat((total * 0.03).toFixed(2));

    return (
        <PublicLayout>
            {/* ── HERO ── */}
            <div className="relative w-full h-72 sm:h-80 md:h-[420px] overflow-hidden">
                <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover object-center" />
                {/* scrim */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }} />
                {/* back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-5 left-5 flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-black/50 transition-all"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back
                </button>
                {/* title block */}
                <div className="absolute inset-x-0 bottom-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-7">
                    <span className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-3 border border-white/30"
                        style={{ background: accentColor + 'CC', color: '#fff' }}>
                        {category}
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-xl max-w-3xl">{title}</h1>
                    <p className="text-white/70 mt-1.5 text-sm font-medium">by {organizer}</p>
                </div>
            </div>

            {/* ── HIGHLIGHTS STRIP ── */}
            <div className="border-b border-gray-100" style={{ background: accentLight }}>
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
                                        {/* timeline spine */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0 ring-2 ring-offset-2 transition-all"
                                                style={{ background: accentColor, ringColor: accentColor }}>
                                            </div>
                                            {i < schedule.length - 1 && <div className="w-px flex-1 my-1" style={{ background: accentColor + '30' }} />}
                                        </div>
                                        <div className={`pb-5 ${i < schedule.length - 1 ? '' : ''}`}>
                                            <p className="text-xs font-black uppercase tracking-widest" style={{ color: accentColor }}>{item.time}</p>
                                            <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.act}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT ── sticky ticket card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                            {/* accent top bar */}
                            <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)` }} />

                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Standard Ticket</p>
                                    {isSoldOut
                                        ? <span className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-bold">Sold Out</span>
                                        : <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">Available</span>
                                    }
                                </div>
                                <p className="text-4xl font-black text-gray-900">${ticket_price}</p>
                                <p className="text-xs text-gray-400 mt-1">per ticket · inclusive of all taxes</p>

                                {/* capacity bar */}
                                <div className="mt-4 space-y-1.5">
                                    <div className="flex justify-between text-xs font-bold text-gray-400">
                                        <span>{tickets_sold.toLocaleString()} sold</span>
                                        <span>{(total_tickets - tickets_sold).toLocaleString()} left</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full transition-all duration-500"
                                            style={{ width: `${pctSold}%`, background: accentColor }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-semibold">{pctSold}% capacity filled</p>
                                </div>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Qty stepper */}
                                {!isSoldOut && (
                                    <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3">
                                        <span className="text-sm font-semibold text-gray-700">Tickets</span>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => setQty(q => Math.max(1, q - 1))}
                                                className="w-8 h-8 rounded-xl flex items-center justify-center text-lg font-black border border-gray-200 hover:border-gray-400 transition-colors">−</button>
                                            <span className="text-lg font-black text-gray-900 w-5 text-center">{qty}</span>
                                            <button onClick={() => setQty(q => Math.min(10, q + 1))}
                                                className="w-8 h-8 rounded-xl flex items-center justify-center text-lg font-black border border-gray-200 hover:border-gray-400 transition-colors">+</button>
                                        </div>
                                    </div>
                                )}

                                {/* Price summary */}
                                {!isSoldOut && (
                                    <div className="text-sm space-y-2">
                                        <div className="flex justify-between text-gray-500">
                                            <span>{qty} × ${ticket_price}</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-500">
                                            <span>Service fee (3%)</span>
                                            <span>${fee.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between font-black text-gray-900 text-base pt-2 border-t border-gray-100">
                                            <span>Total</span>
                                            <span style={{ color: accentColor }}>${(total + fee).toFixed(2)}</span>
                                        </div>
                                    </div>
                                )}

                                <Button
                                    variant={isSoldOut ? 'secondary' : 'primary'}
                                    size="lg"
                                    fullWidth
                                    disabled={isSoldOut}
                                    onClick={() => !isSoldOut && navigate(ROUTES.CHECKOUT)}
                                    rightIcon={!isSoldOut && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                                    style={!isSoldOut ? { background: accentColor } : {}}
                                >
                                    {isSoldOut ? 'Sold Out' : 'Book Tickets Now'}
                                </Button>

                                {/* perks */}
                                {!isSoldOut && (
                                    <div className="space-y-2.5">
                                        {['Instant QR Ticket delivery', 'Free cancellation within 48h', 'Mobile & print-friendly ticket'].map(p => (
                                            <div key={p} className="flex items-center gap-2.5 text-xs text-gray-500">
                                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accentColor }}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                                </svg>
                                                {p}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {isSoldOut && (
                                    <p className="text-center text-xs text-gray-400 font-medium">
                                        Join the waitlist — we'll notify you if tickets become available.
                                    </p>
                                )}
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
        </PublicLayout>
    );
};

export default EventDetails;
