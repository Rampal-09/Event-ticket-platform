import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { eventService } from '../../services/eventService';
import DashboardLoader from '../../components/ui/DashboardLoader';
import { ROUTES } from '../../router/routes';
import ShareModal from '../../components/events/ShareModal';

const STATUS_STYLES = {
    APPROVED: { label: 'Approved', dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    PENDING: { label: 'Pending Approval', dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
    DRAFT: { label: 'Draft', dot: 'bg-gray-400', badge: 'bg-gray-50 text-gray-600 border-gray-200' },
    REJECTED: { label: 'Rejected', dot: 'bg-red-500', badge: 'bg-red-50 text-red-700 border-red-200' },
};

const MyEvents = () => {
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
        <div className="space-y-8 max-w-screen-xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Events</p>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">My Events</h1>
                    <p className="text-gray-500 mt-1">{allEvents.length} events total</p>
                </div>
                <Link to="/organizer/create-event">
                    <Button variant="primary" leftIcon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>}>
                        Create Event
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100 max-w-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search events…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="flex-1 outline-none text-sm text-gray-800 placeholder:text-gray-400 bg-transparent"
                />
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Event</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Sales</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Revenue</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Event Type</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(event => {
                                const pct = Math.round((event.ticketsSold / (event.totalTickets || 1)) * 100);
                                const st = STATUS_STYLES[event.status] || STATUS_STYLES.DRAFT;
                                return (
                                    <tr key={event.id} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-sm text-gray-900 group-hover:text-indigo-700 transition-colors">{event.title}</p>
                                            <p className="text-[10px] font-mono text-gray-400 mt-0.5">ID #{event.id}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 font-medium whitespace-nowrap">
                                            {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1.5 w-40">
                                                <div className="flex justify-between text-[10px] font-bold">
                                                    <span className="text-indigo-600">{event.ticketsSold.toLocaleString()} sold</span>
                                                    <span className="text-gray-400">{event.totalTickets.toLocaleString()}</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all ${pct >= 100 ? 'bg-red-500' : pct > 75 ? 'bg-amber-500' : 'bg-indigo-500'}`}
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                                <p className="text-[10px] text-gray-400 font-medium">{pct}% capacity</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-900">${(event.ticketsSold * event.ticketPrice).toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${event.isPublic ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-purple-50 text-purple-600 border-purple-100'}`}>
                                                {event.isPublic ? (
                                                    <>🌐 Public Event</>
                                                ) : (
                                                    <>🔒 Private Event</>
                                                )}
                                            </span>
                                        </td>
                                         <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border w-fit ${st.badge}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                                                    {st.label}
                                                </span>
                                                {event.status === 'PENDING' && (
                                                    <p className="text-[9px] text-amber-600 font-bold max-w-[120px] leading-tight flex items-center gap-1">
                                                        <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        Review in progress
                                                    </p>
                                                )}
                                            </div>
                                         </td>
                                         <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.ORGANIZER_EVENT_DETAILS.replace(':eventId', event.id))}>View</Button>
                                                 {/* <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    onClick={() => setSharingEvent(event)}
                                                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                                </Button> */}
                                                <Button variant="ghost" size="sm" onClick={() => handleEditClick(event)}>Edit</Button>
                                                <Button variant="outline" size="sm" onClick={() => setSharingEvent(event)}>Access</Button>
                                             </div>
                                         </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {sharingEvent && (
                <ShareModal 
                    isOpen={!!sharingEvent}
                    onClose={() => setSharingEvent(null)}
                    eventTitle={sharingEvent.title}
                    eventUrl={`${window.location.origin}/events/${sharingEvent.id}${!sharingEvent.isPublic ? '?private=true' : ''}`}
                />
            )}
        </div>
    );
};

export default MyEvents;
