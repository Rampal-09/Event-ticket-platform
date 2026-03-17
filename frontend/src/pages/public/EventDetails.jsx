import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import EventGallery from '../../components/events/EventGallery';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { eventService } from '../../services/eventService';
import DashboardLoader from '../../components/ui/DashboardLoader';
import { useToast } from '../../components/ui/Toast';
import { useCurrency } from '../../context/CurrencyContext';

// ── MODERN INFO CHIP COMPONENT (Icon + Label + Description) ──
const HighlightChip = ({ icon, label, description }) => (
    <div className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
            {icon}
        </div>
        <div className="flex flex-col">
            <span className="text-sm font-black text-gray-900 leading-tight">{label}</span>
            {description && <span className="text-[11px] font-medium text-gray-400 mt-0.5 leading-tight">{description}</span>}
        </div>
    </div>
);

// ── COMPACT METADATA ROW (Date, Time, Location) ──
const MetaIconRow = ({ icon, label, value }) => (
    <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-50 text-gray-400">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-0.5">{label}</p>
            <p className="text-sm font-bold text-gray-700">{value}</p>
        </div>
    </div>
);

const EventDetails = () => {
    const { addToast } = useToast();
    const { id } = useParams();
    const navigate = useNavigate();
    const pageLocation = useLocation();
    const { formatPrice } = useCurrency();
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAboutExpanded, setIsAboutExpanded] = useState(false);
    
    // Checkout State for Sidebar
    const [quantity, setQuantity] = useState(1);

    const queryParams = new URLSearchParams(pageLocation.search);
    const isPreview = queryParams.get('preview') === 'true';
    const isPrivateFlag = queryParams.get('private') === 'true';

    useEffect(() => {
        if (!id) return;
        const fetchEvent = async () => {
            setIsLoading(true);
            try {
                const data = await eventService.getPublicEventById(id, { 
                    preview: isPreview, 
                    private: isPrivateFlag 
                });
                setEvent(data);
            } catch (err) {
                console.error('Fetch event detail error:', err);
                const msg = err.message || 'Event not found or failed to load.';
                setError(msg);
                addToast(msg, 'error');
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvent();
    }, [id, isPreview, isPrivateFlag]);

    if (isLoading) return <DashboardLoader message="Fetching event details..." />;

    if (error || !event) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-black text-gray-900">{error || 'Event not found'}</h2>
                <Button variant="primary" className="mt-4" onClick={() => navigate(ROUTES.EVENT_LIST)}>Back to Events</Button>
            </div>
        );
    }

    const {
        title, category, organizer, location, eventDate, ticketPrice,
        totalTickets, ticketsSold = 0, description, tags = [], highlights = [], image,
        schedule = [], galleryImages = []
    } = event;

    const accentColor = '#6366f1'; 
    const dateObj = new Date(eventDate);
    const isSoldOut = ticketsSold >= totalTickets;
    const ticketsRemaining = totalTickets - ticketsSold;
    const soldPercent = Math.min(Math.round((ticketsSold / totalTickets) * 100), 100);
    
    const activeGallery = galleryImages.length > 0 
        ? galleryImages.map(img => img.imageUrl) 
        : [image].filter(Boolean);

    // Dynamic urgencies
    const threshold = event.sellingFastThreshold || 0;
    const isSellingFast = threshold > 0 && !isSoldOut && ticketsRemaining <= (totalTickets * (threshold / 100));
    const isAlmostGone  = threshold > 0 && !isSoldOut && ticketsRemaining <= (totalTickets * (threshold / 200));

    // Checkout Calculations
    const feeRate = event.serviceFeeRate || 0.03;
    const subtotal = quantity * ticketPrice;
    const serviceFee = parseFloat((subtotal * feeRate).toFixed(2));
    const total = subtotal + serviceFee;

    const handleCheckout = () => {
        let url = `/checkout/${id}?qty=${quantity}`;
        if (isPrivateFlag) url += '&private=true';
        navigate(url);
    };

    // Structured Highlights Mapping
    const structuredHighlights = [
        {
            condition: true,
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>,
            label: isPrivateFlag ? "Private Event" : "Public Event",
            description: isPrivateFlag ? "Access restricted to link holders" : "Open for everyone to purchase"
        },
        {
            condition: highlights.some(h => h.toLowerCase().includes('18')),
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
            label: "Age Restricted",
            description: "Attendees must be 18+ years old"
        },
        {
            condition: highlights.some(h => h.toLowerCase().includes('refund')),
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            label: "Non-refundable",
            description: "Tickets cannot be canceled later"
        },
        {
            condition: totalTickets > 0,
            icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>,
            label: isSoldOut ? "Sold Out" : "Limited Tickets",
            description: isSoldOut ? "All tickets have been claimed" : "Fewer than 100 tickets available"
        }
    ].filter(h => h.condition);

    return (
        <div className="bg-slate-50/30 min-h-screen">
            {/* ── ALERTS ── */}
            {isPreview && (
                <div className="bg-amber-500 text-white py-2.5 px-4 text-center text-[10px] font-black uppercase tracking-[0.2em] sticky top-0 z-50 shadow-lg">
                    Preview Mode: This event is hidden from the public
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
                
                {/* ── BACK NAVIGATION ── */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-all text-xs font-black uppercase tracking-widest mb-10 group"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to browse
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* ── LEFT CONTENT (8/12) ── */}
                    <div className="lg:col-span-8 space-y-16">
                        
                        {/* 1. Gallery Section */}
                        <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-100/50 hover:shadow-indigo-200/60 transition-all duration-700">
                            <EventGallery images={activeGallery} />
                        </div>

                        {/* 2. Title & Metadata Header */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                <span className="text-[11px] font-black uppercase tracking-widest text-indigo-600">{category}</span>
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
                                {title}
                            </h1>

                            <div className="flex flex-wrap gap-x-10 gap-y-6 pt-4">
                                <MetaIconRow 
                                    label="Date from"
                                    value={dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                                />
                                <MetaIconRow 
                                    label="Starts at"
                                    value={dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                                />
                                <MetaIconRow 
                                    label="Location"
                                    value={location}
                                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>}
                                />
                                <MetaIconRow 
                                    label="Organizer"
                                    value={organizer?.name || (typeof organizer === 'string' ? organizer : 'Verified Organizer')}
                                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                                />
                            </div>
                        </div>

                        {/* 3. Structured Highlights Grid */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Event Highlights</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {structuredHighlights.map((chip, idx) => (
                                    <HighlightChip key={idx} {...chip} />
                                ))}
                            </div>
                        </div>

                        {/* 4. About this Event */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">About this Event</h3>
                            <div className={`relative ${!isAboutExpanded && description.length > 500 ? 'max-h-60 overflow-hidden' : ''}`}>
                                <div className="space-y-4">
                                    {description.split('\n\n').map((para, i) => (
                                        <p key={i} className="text-gray-500 leading-relaxed text-base font-medium">
                                            {para}
                                        </p>
                                    ))}
                                </div>
                                
                                {!isAboutExpanded && description.length > 500 && (
                                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                                )}
                            </div>
                            
                            {description.length > 500 && (
                                <button 
                                    onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                                    className="text-indigo-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                                >
                                    {isAboutExpanded ? 'Read Less' : 'Read More About the Event'}
                                    <svg className={`w-4 h-4 transition-transform ${isAboutExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            )}
                        </div>

                        {/* 5. Schedule Visualization */}
                        {schedule.length > 0 && (
                            <div className="space-y-10 pt-4">
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Event Schedule</h3>
                                <div className="space-y-0 relative ml-4">
                                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-100" />
                                    {schedule.map((item, i) => (
                                        <div key={i} className="flex gap-8 group relative pb-10">
                                            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-[3px] border-indigo-500 transition-all group-hover:scale-125 z-10" />
                                            <div>
                                                <div className="px-3 py-1 bg-gray-50 rounded-lg inline-block mb-3">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{item.time}</p>
                                                </div>
                                                <p className="text-lg font-black text-gray-800 tracking-tight">{item.act}</p>
                                                <p className="text-sm text-gray-400 mt-1 font-medium">Verified by Organizer</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Tags / Topics Section (Dynamic Context) */}
                        {tags.length > 0 && (
                            <div className="pt-12 border-t border-gray-100 space-y-8">
                                <div className="space-y-1">
                                    <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] font-black">Event Metadata</h3>
                                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Platform Keywords</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {tags.map(t => {
                                        const tagUpper = t.toUpperCase();
                                        const contexts = {
                                            'PUBLIC': {
                                                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>,
                                                desc: 'This event is listed publicly on the discovery page.'
                                            },
                                            '18': {
                                                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                                                desc: 'Verification of age will be required at venue entry.'
                                            },
                                            'LIMITED': {
                                                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>,
                                                desc: 'Only a restricted number of tickets are available.'
                                            },
                                            'NON-REFUNDABLE': {
                                                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                                                desc: 'Tickets are final sale and non-refundable.'
                                            }
                                        };
                                        const ctx = contexts[tagUpper] || {
                                            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
                                            desc: 'Relevant event keyword and category tagging.'
                                        };
                                        
                                        return (
                                            <div key={t} className="flex items-start gap-4 p-5 rounded-3xl bg-white border border-slate-100 hover:border-indigo-100 hover:shadow-sm transition-all group">
                                                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                    {ctx.icon}
                                                </div>
                                                <div className="space-y-0.5">
                                                    <p className="text-xs font-black text-gray-900 uppercase tracking-widest">{t}</p>
                                                    <p className="text-xs text-gray-400 font-medium leading-relaxed">{ctx.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT SIDEBAR (4/12) ── */}
                    <div className="lg:col-span-4 sticky top-12 pb-12">
                        <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                            <div className="p-10 space-y-10">
                                
                                {/* Price Header */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Tickets Starts from</p>
                                        {!isSoldOut && <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full font-black uppercase tracking-widest">Available</span>}
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-black text-gray-900 tracking-tighter">{formatPrice(ticketPrice)}</span>
                                        <span className="text-sm font-bold text-gray-400">/ ticket</span>
                                    </div>
                                </div>

                                {/* Availability & Progress */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Tickets Sold</p>
                                            <p className="text-[11px] font-bold text-gray-400">{ticketsSold} of {totalTickets} seats filled</p>
                                        </div>
                                        <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                                            soldPercent > 80 ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'
                                        }`}>
                                            {soldPercent}% Capacity
                                        </span>
                                    </div>

                                    {/* Large Progress Bar */}
                                    <div className="h-4 bg-gray-50 rounded-full overflow-hidden p-1 border border-gray-100">
                                        <div 
                                            className="h-full rounded-full bg-indigo-600 transition-all duration-1000 ease-out shadow-lg shadow-indigo-200"
                                            style={{ width: `${soldPercent}%` }}
                                        />
                                    </div>
                                </div>

                                {/* ── INTEGRATED TICKET SELECTOR ── */}
                                <div className="bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-100 space-y-8">
                                    {!isSoldOut ? (
                                        <>
                                            {/* Qty Stepper */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Select Quantity</span>
                                                <div className="flex items-center gap-4 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
                                                    <button
                                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="text-lg font-black text-gray-900 w-6 text-center">{quantity}</span>
                                                    <button
                                                        onClick={() => setQuantity(q => Math.min(ticketsRemaining, q + 1))}
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Final Calculation Table */}
                                            <div className="space-y-4">
                                                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                    <span>{quantity} × Ticket</span>
                                                    <span className="text-gray-900">{formatPrice(subtotal)}</span>
                                                </div>
                                                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                    <span>Service Fee ({Math.round(feeRate * 100)}%)</span>
                                                    <span className="text-emerald-500 font-black">{formatPrice(serviceFee)}</span>
                                                </div>
                                                <div className="h-px bg-slate-200 border-dashed border-t" />
                                                <div className="flex justify-between items-center pt-2">
                                                    <span className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Final Total</span>
                                                    <span className="text-3xl font-black text-indigo-600 tracking-tighter">{formatPrice(total)}</span>
                                                </div>
                                            </div>

                                            {/* Immediate Checkout CTA */}
                                            <Button 
                                                className="w-full py-6 rounded-3xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xl shadow-indigo-100 transition-all active:scale-95 font-black uppercase tracking-[0.2em] text-[11px]"
                                                onClick={handleCheckout}
                                                rightIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                                            >
                                                Proceed to Checkout
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="text-center py-6 space-y-4">
                                            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </div>
                                            <p className="text-xs font-black text-gray-900 uppercase tracking-widest leading-relaxed">Join Waitlist<br/><span className="text-[10px] text-gray-400">Sold out recently</span></p>
                                        </div>
                                    )}
                                </div>

                                {/* Fast Selling Alerts */}
                                {isAlmostGone && !isSoldOut && (
                                    <div className="p-5 bg-red-50 rounded-[2.5rem] border border-red-100 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        </div>
                                        <p className="text-xs font-black text-red-700 leading-tight uppercase tracking-wider">
                                            Only {ticketsRemaining} tickets left!
                                        </p>
                                    </div>
                                )}

                                {/* Trusted Info */}
                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    {['Mobile Entry Supported', 'Instant QR confirmation', 'Verified by Admin'].map((text, i) => (
                                        <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-300">
                                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            {text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Secondary Explorer CTA */}
                        <div className="mt-8 text-center px-10">
                            <Link to={ROUTES.EVENT_LIST} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-indigo-600 transition-colors">
                                Browse More Events
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
