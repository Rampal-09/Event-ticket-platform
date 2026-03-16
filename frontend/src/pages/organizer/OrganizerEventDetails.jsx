import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../router/routes';
import DashboardLoader from '../../components/ui/DashboardLoader';
import ShareModal from '../../components/events/ShareModal';

const OrganizerEventDetails = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCopied, setIsCopied] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [attendees, setAttendees] = useState([]);
    const [isAttendeesLoading, setIsAttendeesLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    useEffect(() => {
        const fetchAttendees = async () => {
            if (activeTab === 'attendees' && eventId) {
                setIsAttendeesLoading(true);
                try {
                    const data = await eventService.getEventAttendees(eventId);
                    setAttendees(data);
                } catch (err) {
                    console.error('Error fetching attendees:', err);
                } finally {
                    setIsAttendeesLoading(false);
                }
            }
        };
        fetchAttendees();
    }, [activeTab, eventId]);

    if (isLoading) {
        return <DashboardLoader message="Loading event details..." />;
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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-gray-100">
                <div className="space-y-4">
                    <button 
                        onClick={() => navigate(ROUTES.MY_EVENTS)}
                        className="group text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] flex items-center gap-2 hover:text-indigo-700 transition-all"
                    >
                        <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                        </div>
                        Back to Command Center
                    </button>
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">{event.title}</h1>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100 shadow-sm self-start mt-1">
                                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[8px] font-black uppercase tracking-tighter">{event.status}</span>
                            </div>
                        </div>
                        <p className="text-gray-400 font-bold text-sm tracking-tight flex items-center gap-2">
                            <span className="uppercase tracking-widest text-[10px] text-gray-300">Instance ID</span>
                            <span className="font-mono bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{event.id}</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <Link to={ROUTES.EDIT_EVENT.replace(':eventId', event.id)}>
                        <Button variant="ghost" size="lg" className="rounded-2xl font-black text-xs uppercase tracking-widest px-8 hover:bg-gray-50">Edit Project</Button>
                    </Link>
                    <Link to={`${ROUTES.SCANNER}?id=${event.id}`}>
                        <Button variant="primary" size="lg" className="rounded-2xl font-black text-xs uppercase tracking-widest px-8 shadow-xl shadow-indigo-100">
                            Launch Scanner
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Tab Navigation - Refined */}
            <div className="flex gap-2 p-1.5 bg-gray-50/50 rounded-2xl w-fit border border-gray-100/50">
                <button 
                    onClick={() => setActiveTab('overview')}
                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-xl ${activeTab === 'overview' ? 'bg-white text-indigo-600 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    Overview
                </button>
                <button 
                    onClick={() => setActiveTab('attendees')}
                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-xl ${activeTab === 'attendees' ? 'bg-white text-indigo-600 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    Attendees
                </button>
            </div>

            {activeTab === 'overview' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Event Banner - More Premium */}
                    <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl group border-8 border-white">
                        <img 
                            src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'} 
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-10 left-10 flex items-center gap-3">
                           <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-xl border-2 ${event.isPublic ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'}`}>
                                {event.isPublic ? '🌐 Platform Discovery' : '🔒 Private Access'}
                           </span>
                           <span className="px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-xl border-2 bg-white/10 text-white border-white/20">
                                {event.category}
                           </span>
                        </div>
                    </div>

                    {/* About Section - Refined */}
                    <div className="bg-white rounded-[3rem] p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] border border-gray-100 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50/50 rounded-bl-[5rem] -mr-16 -mt-16 border border-gray-100" />
                        
                        <div className="flex items-center justify-between relative z-10">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-4">
                                <span className="w-3 h-10 bg-indigo-600 rounded-full"></span>
                                Narrative & Vision
                            </h3>
                        </div>
                        
                        <p className="text-gray-600 leading-[1.8] text-base relative z-10 font-medium whitespace-pre-wrap">{event.description}</p>
                        
                        <div className="pt-10 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                            <div className="space-y-1.5">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Classification</p>
                                <p className="font-black text-gray-900 text-sm">{event.category}</p>
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Visibility</p>
                                <p className="font-black text-gray-900 text-sm">{event.isPublic ? 'Marketplace' : 'Link Only'}</p>
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Instance Status</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    <span className="font-black text-emerald-600 text-[10px] uppercase tracking-tighter">{event.status}</span>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deployment</p>
                                <p className="font-black text-gray-900 text-sm">{new Date(event.createdAt).toLocaleDateString('en-GB')}</p>
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
                    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 space-y-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <svg className="w-24 h-24 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /></svg>
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <h4 className="text-xl font-black text-gray-900 tracking-tight">Invite Guests</h4>
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${event.isPublic ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-purple-50 text-purple-600 border border-purple-100'}`}>
                                {event.isPublic ? 'Platform Discovery' : 'Private Access'}
                            </span>
                        </div>
                        
                        <div className="space-y-6">
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                {event.isPublic 
                                    ? 'This event is public. Use our advanced sharing tools to boost your ticket sales across social platforms.' 
                                    : 'This event is hidden from the marketplace. Only invited guests with your private QR or link can book tickets.'}
                            </p>
                            
                            <Button 
                                variant="primary" 
                                fullWidth 
                                size="lg" 
                                onClick={() => setIsShareModalOpen(true)}
                                className="shadow-lg shadow-indigo-200"
                                leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>}
                            >
                                Share & Generate QR
                            </Button>
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
            ) : (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Guest List</h3>
                            <p className="text-sm text-gray-500">Track ticket purchases and check-in status.</p>
                        </div>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search by name or email..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none w-full md:w-80 focus:ring-2 focus:ring-indigo-100 transition-all"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </div>

                    {isAttendeesLoading ? (
                        <div className="py-20 flex justify-center">
                            <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                        <th className="px-4 py-4">Attendee</th>
                                        <th className="px-4 py-4">Ticket ID</th>
                                        <th className="px-4 py-4">Status</th>
                                        <th className="px-4 py-4">Purchased On</th>
                                        <th className="px-4 py-4 text-right">Scanned</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {attendees.filter(a => 
                                        a.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                        a.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase())
                                    ).map((attendee) => (
                                        <tr key={attendee.id} className="group hover:bg-slate-50/80 transition-all duration-300 border-b border-gray-50/50">
                                            <td className="px-4 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                                        {attendee.buyerName.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-900 text-sm tracking-tight">{attendee.buyerName}</p>
                                                        <p className="text-[11px] text-gray-400 font-medium">{attendee.buyerEmail}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-5">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-mono text-[10px] text-indigo-500 font-black uppercase tracking-widest bg-indigo-50/30 px-2.5 py-1 rounded-lg border border-indigo-100/50 w-fit">
                                                        {attendee.qrPayload?.includes('/verify/') 
                                                            ? attendee.qrPayload.split('/verify/')[1]?.substring(0, 10).toUpperCase() 
                                                            : attendee.qrPayload?.substring(0, 10).toUpperCase() || 'TICKET-ID'}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">Verified Order</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-5 text-sm">
                                                {attendee.status === 'USED' ? (
                                                    <div className="flex items-center gap-2 text-emerald-600">
                                                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Admitted</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-slate-400">
                                                        <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Unchecked</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-5">
                                                <p className="text-xs font-bold text-gray-700">{new Date(attendee.purchasedAt).toLocaleDateString('en-GB')}</p>
                                                <p className="text-[10px] text-gray-400 font-medium">Standard Release</p>
                                            </td>
                                            <td className="px-4 py-5 text-right">
                                                {attendee.scannedAt ? (
                                                    <div className="inline-flex flex-col items-end">
                                                        <span className="text-xs font-black text-indigo-600">{new Date(attendee.scannedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        <span className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">Live Scan</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs font-bold text-gray-300">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {attendees.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="py-20 text-center text-gray-400 font-medium">
                                                No tickets have been sold for this event yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            <ShareModal 
                isOpen={isShareModalOpen} 
                onClose={() => setIsShareModalOpen(false)}
                eventTitle={event.title}
                eventUrl={`${window.location.origin}/events/${event.id}${!event.isPublic ? '?private=true' : ''}`}
            />
        </div>
    );
};

export default OrganizerEventDetails;
