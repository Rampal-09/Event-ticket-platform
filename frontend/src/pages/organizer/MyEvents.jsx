import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { eventService } from '../../services/eventService';
import DashboardLoader from '../../components/ui/DashboardLoader';
import { ROUTES } from '../../router/routes';
import ShareModal from '../../components/events/ShareModal';
import { useCurrency } from '../../context/CurrencyContext';

const STATUS_STYLES = {
    APPROVED: { label: 'Approved', dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    PENDING: { label: 'Pending', dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
    DRAFT: { label: 'Draft', dot: 'bg-gray-400', badge: 'bg-gray-50 text-gray-600 border-gray-200' },
    REJECTED: { label: 'Rejected', dot: 'bg-red-500', badge: 'bg-red-50 text-red-700 border-red-200' },
};

const MyEvents = () => {
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [allEvents, setAllEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [sharingEvent, setSharingEvent] = useState(null);

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const data = await eventService.getOrganizerEvents();
            setAllEvents(data);
        } catch (err) {
            console.error('Fetch events error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const filtered = allEvents.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleEditClick = (event) => {
        navigate(ROUTES.EDIT_EVENT.replace(':eventId', event.id));
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await eventService.updateEvent(editingEvent.id, editingEvent);
            setAllEvents(prev => prev.map(ev => ev.id === editingEvent.id ? editingEvent : ev));
            setIsEditModalOpen(false);
        } catch (err) {
            alert('Failed to save changes');
        } finally {
            setIsSaving(false);
        }
    };

    const handleFieldChange = (field, value) => {
        setEditingEvent(prev => ({ ...prev, [field]: value }));
    };

    if (isLoading) {
        return <DashboardLoader message="Loading your events..." />;
    }

    return (
        <div className="space-y-10 max-w-screen-xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header section with refined typography */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Management Console</p>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Events</h1>
                    <p className="text-gray-500 font-medium tracking-tight">Manage and track performance for your <span className="text-indigo-600 font-bold">{allEvents.length}</span> active events</p>
                </div>
                <Link to="/organizer/create-event">
                    <Button 
                        variant="primary" 
                        size="lg"
                        className="shadow-[0_20px_40px_-12px_rgba(79,70,229,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.4)] transition-all active:scale-[0.98]"
                        leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>}
                    >
                        Create New Event
                    </Button>
                </Link>
            </div>

            {/* Premium Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative group max-w-md w-full">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Filter by title, ID or category..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="block w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[2rem] text-sm font-bold focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none shadow-sm transition-all placeholder:text-gray-400"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                        {filtered.length} Results
                    </span>
                </div>
            </div>

            {/* Event List - Cards for better mobile/desktop fluidity */}
            <div className="grid grid-cols-1 gap-6">
                {filtered.length > 0 ? filtered.map(event => {
                    const pct = Math.round((event.ticketsSold / (event.totalTickets || 1)) * 100);
                    const st = STATUS_STYLES[event.status] || STATUS_STYLES.DRAFT;
                    return (
                        <div key={event.id} className="group bg-white rounded-[2.5rem] p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)] transition-all duration-500 relative overflow-hidden">
                            {/* Desktop/Tablet Grid Layout */}
                            <div className="flex flex-col lg:flex-row items-center gap-8">
                                {/* 1. Visual & Identity */}
                                <div className="flex items-center gap-5 lg:w-[35%] w-full">
                                    <div className="w-20 h-20 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 border-4 border-white group-hover:scale-110 transition-transform duration-700 ease-out">
                                        <img 
                                            src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'} 
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="space-y-1.5 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border border-indigo-100 bg-indigo-50 text-indigo-500`}>
                                                {event.category}
                                            </span>
                                            <span className="text-[10px] font-bold text-gray-300">#{event.id}</span>
                                        </div>
                                        <h3 className="font-black text-gray-900 leading-tight tracking-tight group-hover:text-indigo-600 transition-colors uppercase text-base truncate">
                                            {event.title}
                                        </h3>
                                        <p className="text-[11px] font-black text-gray-400 tracking-tight flex items-center gap-1.5">
                                            <svg className="w-3.5 h-3.5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            {new Date(event.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>

                                {/* 2. Performance Stats */}
                                <div className="flex flex-wrap items-center gap-4 sm:gap-10 lg:w-[45%] w-full justify-between">
                                    <div className="space-y-3 flex-1 min-w-[120px]">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">{event.ticketsSold.toLocaleString()} / {event.totalTickets.toLocaleString()}</span>
                                            <span className="text-[10px] font-black text-indigo-600 italic">{pct}%</span>
                                        </div>
                                        <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden border border-gray-100 p-[1px]">
                                            <div
                                                className={`h-full rounded-full shadow-[0_0_8px_rgba(79,70,229,0.3)] transition-all duration-1000 ${pct >= 100 ? 'bg-rose-500' : pct > 75 ? 'bg-amber-400' : 'bg-indigo-600'}`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="px-0 sm:px-6 sm:border-x border-gray-50 flex flex-col items-center min-w-[80px]">
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Revenue</span>
                                        <span className="text-base sm:text-lg font-black text-gray-900 tracking-tighter">{formatPrice(event.ticketsSold * event.ticketPrice)}</span>
                                    </div>

                                    <div className="flex flex-col items-center min-w-[80px]">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter border shadow-sm ${st.badge}`}>
                                            <span className={`w-1 h-1 rounded-full animate-pulse ${st.dot}`} />
                                            {st.label}
                                        </span>
                                    </div>
                                </div>

                                {/* 3. Actions */}
                                <div className="lg:w-[22%] w-full flex items-center justify-end gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-50/50">
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={() => navigate(ROUTES.ORGANIZER_EVENT_DETAILS.replace(':eventId', event.id))}
                                        className="font-black text-[10px] uppercase tracking-wider hover:bg-indigo-50 hover:text-indigo-600 rounded-xl px-3 whitespace-nowrap"
                                    >
                                        Insight
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={() => handleEditClick(event)}
                                        className="font-black text-[10px] uppercase tracking-wider hover:bg-indigo-50 hover:text-indigo-600 rounded-xl px-3 whitespace-nowrap"
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="primary" 
                                        size="sm" 
                                        onClick={() => setSharingEvent(event)}
                                        className="font-black text-[10px] uppercase tracking-wider px-5 rounded-xl shadow-lg shadow-indigo-100 active:scale-95 transition-all whitespace-nowrap"
                                    >
                                        Promote
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="bg-white rounded-[3rem] border-4 border-dashed border-gray-100 py-32 text-center">
                        <div className="max-w-xs mx-auto space-y-6">
                            <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto rotate-12 group hover:rotate-0 transition-transform duration-500">
                                <svg className="w-12 h-12 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Zero Events Detected</h3>
                                <p className="text-gray-400 font-bold text-sm leading-relaxed px-4">Initialization required. Launch your first project to start tracking engagement metrics.</p>
                            </div>
                            <Link to="/organizer/create-event" className="inline-block mt-4">
                                <Button variant="primary" className="rounded-2xl px-8 shadow-xl shadow-indigo-100">Primary Launch</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {sharingEvent && (
                <ShareModal 
                    isOpen={!!sharingEvent}
                    onClose={() => setSharingEvent(null)}
                    eventTitle={sharingEvent.title}
                    eventId={sharingEvent.id}
                    isPublic={sharingEvent.isPublic}
                />
            )}
        </div>
    );
};

export default MyEvents;
