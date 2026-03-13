import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../router/routes';

const OrganizerEventDetails = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyLink = () => {
        const url = `${window.location.origin}/events/${event.id}${!event.isPublic ? '?private=true' : ''}`;
        navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    useEffect(() => {
        const fetchEventDetails = async () => {
            setIsLoading(true);
            try {
                const data = await eventService.getOrganizerEventById(eventId);
                setEvent(data);
            } catch (err) {
                console.error('Error fetching event details:', err);
                if (err.response?.status === 404) {
                    setError('Event not found or may have been removed.');
                } else if (err.response?.status === 403) {
                    setError('You are not authorized to view this event.');
                } else {
                    setError('Unable to load event details. Please try again.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (eventId) {
            fetchEventDetails();
        }
    }, [eventId]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Loading event details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100 max-w-2xl mx-auto space-y-6">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Oops! Something went wrong</h2>
                    <p className="text-gray-500">{error}</p>
                </div>
                <Button variant="primary" onClick={() => navigate(ROUTES.MY_EVENTS)}>
                    Back to My Events
                </Button>
            </div>
        );
    }

    if (!event) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <button 
                        onClick={() => navigate(ROUTES.MY_EVENTS)}
                        className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2 hover:text-indigo-700 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                        Back to Events
                    </button>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">{event.title}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Link to={ROUTES.EDIT_EVENT.replace(':eventId', event.id)}>
                        <Button variant="outline" size="lg">Edit Event</Button>
                    </Link>
                    <Link to={`${ROUTES.SCANNER}?id=${event.id}`}>
                        <Button variant="primary" size="lg">Open Scanner</Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Event Banner */}
                    <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl group">
                        <img 
                            src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'} 
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-6 left-8">
                           <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md border ${event.isPublic ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-purple-500/20 text-purple-300 border-purple-500/30'}`}>
                                {event.isPublic ? '🌐 Public Event' : '🔒 Private Event'}
                           </span>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                            About the Event
                        </h3>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{event.description}</p>
                        
                        <div className="pt-6 border-t border-gray-50 grid grid-cols-2 sm:grid-cols-4 gap-6">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</p>
                                <p className="font-bold text-gray-900">{event.category}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</p>
                                <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-600">
                                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                    {event.status}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Visibility</p>
                                <p className="font-bold text-gray-900">{event.isPublic ? 'Public' : 'Private'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Created On</p>
                                <p className="font-bold text-gray-900">{new Date(event.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats & Info */}
                <div className="space-y-6">
                    {/* Performance Card */}
                    <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                        </div>
                        <h4 className="text-lg font-black tracking-tight relative z-10">Live Performance</h4>
                        
                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">Total Revenue</p>
                                    <p className="text-3xl font-black tabular-nums">${(event.ticketsSold * event.ticketPrice).toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">Tickets Sold</p>
                                    <p className="text-3xl font-black tabular-nums">{event.ticketsSold}/{event.totalTickets}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-indigo-300">Sales Progress</span>
                                    <span>{Math.round((event.ticketsSold / event.totalTickets) * 100)}%</span>
                                </div>
                                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-1000 ease-out"
                                        style={{ width: `${(event.ticketsSold / event.totalTickets) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logistics Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-8">
                        <h4 className="text-lg font-black text-gray-900 tracking-tight">Event Logistics</h4>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Date & Time</p>
                                    <p className="font-bold text-gray-900 mt-1">
                                        {new Date(event.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        {new Date(event.eventDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Location</p>
                                    <p className="font-bold text-gray-900 mt-1">{event.location}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Pricing</p>
                                    <p className="font-bold text-gray-900 mt-1">${event.ticketPrice.toLocaleString()} per ticket</p>
                                    <p className="text-sm text-gray-500 mt-0.5">Standard Admission</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Share Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="text-lg font-black text-gray-900 tracking-tight">Share Event</h4>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${event.isPublic ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'}`}>
                                {event.isPublic ? 'Public' : 'Private'}
                            </span>
                        </div>
                        
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {event.isPublic 
                                    ? 'This event is listed on the public marketplace. Share this link to drive more sales.' 
                                    : 'This is a private event. Only people with this direct link can view and book tickets.'}
                            </p>
                            
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    readOnly 
                                    value={`${window.location.origin}/events/${event.id}${!event.isPublic ? '?private=true' : ''}`}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 text-xs font-medium text-gray-400 outline-none pr-24"
                                />
                                <button 
                                    onClick={handleCopyLink}
                                    className="absolute right-2 top-1.5 bottom-1.5 px-4 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                                >
                                    {isCopied ? 'Copied!' : 'Copy Link'}
                                </button>
                            </div>

                            {isCopied && (
                                <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    Link copied to clipboard
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Quick Visibility Alert */}
                    {!event.isPublic && (
                        <div className="bg-purple-50 rounded-3xl p-6 border border-purple-100 flex gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-purple-600 flex-shrink-0 shadow-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826L10.242 10.172a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102 1.101" /></svg>
                            </div>
                            <div>
                                <h5 className="text-sm font-black text-purple-900">Private Event Access</h5>
                                <p className="text-xs text-purple-700 mt-1 leading-relaxed">
                                    This event is not visible to the public. Share the private link from your dashboard to allow bookings.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrganizerEventDetails;
