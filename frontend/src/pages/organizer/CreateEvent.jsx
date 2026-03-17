import React, { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import EventBasicForm from '../../components/organizer/EventBasicForm';
import EventGalleryUploader from '../../components/organizer/EventGalleryUploader';
import PromoCodeForm from '../../components/organizer/PromoCodeForm';
import EventVisibilityToggle from '../../components/organizer/EventVisibilityToggle';
import SellingFastToggle from '../../components/organizer/SellingFastToggle';
import EventAdditionalSettings from '../../components/organizer/EventAdditionalSettings';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { eventService } from '../../services/eventService';
import { useToast } from '../../components/ui/Toast';

const CreateEvent = () => {
    const { formatPrice, currency } = useCurrency();
    const { addToast } = useToast();
    window._CREATE_EVENT_DEBUG = "V3-DEBUG-" + Date.now();

    // Safety function to catch and identify object-as-child errors
    const safeRender = (val, label = 'unknown') => {
        if (typeof val === 'object' && val !== null && !React.isValidElement(val)) {
            console.error(`IDENTIFIED OBJECT RENDER: [${label}]`, val);
            return `[ERROR: Object (${Object.keys(val).join(',')})]`;
        }
        return val;
    };

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [createdEventId, setCreatedEventId] = useState(null);
    const [isCopying, setIsCopying] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        price: '',
        totalTickets: '',
        ticketReleases: [
            { name: '1st Ticket Release', price: '', quantity: '', releaseDate: '' },
            { name: '2nd Ticket Release', price: '', quantity: '', releaseDate: '' },
            { name: 'Final Ticket Release', price: '', quantity: '', releaseDate: '' }
        ],
        galleryImages: [],
        promoCodes: [],
        isPublic: true,
        category: 'Music', // Added category to match backend
        eventType: 'public',
        parking: '',
        ageRestriction: '',
        refundPolicy: '',
        serviceFee: 'buyer',
        urgency: {
            enabled: false,
            threshold: 20
        }
    });

    const validateForm = () => {
        const errors = {};
        if (!formData.title.trim()) errors.title = 'Event title is required';
        if (!formData.description.trim()) errors.description = 'Description is required';
        if (!formData.location.trim()) errors.location = 'Location is required';
        if (!formData.date) errors.date = 'Date is required';

        const eventDate = new Date(`${formData.date}T${formData.time || '00:00'}:00`);
        if (eventDate < new Date()) {
            errors.date = 'Event date cannot be in the past';
        }

        let hasValidRelease = false;
        formData.ticketReleases.forEach(release => {
            if (release.quantity && parseInt(release.quantity) > 0) {
                hasValidRelease = true;
            }
        });

        if (!hasValidRelease) {
            errors.ticketReleases = 'Please configure at least one ticket release with a valid quantity.';
        }

        if (!formData.price && formData.price !== 0) errors.price = 'Ticket price could not be calculated.';
        if (!formData.totalTickets) errors.totalTickets = 'Total capacity could not be calculated.';
        if (parseInt(formData.totalTickets) <= 0) errors.totalTickets = 'Capacity must be greater than 0.';

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setShowConfirmModal(true);
        } else {
            setError('Please fix the errors before submitting.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBasicChange = (field, value) => {
        setFormData(prev => {
            const newState = { ...prev, [field]: value };

            // Sync isPublic and eventType
            if (field === 'isPublic') {
                newState.eventType = value ? 'public' : 'private';
            } else if (field === 'eventType') {
                newState.isPublic = value === 'public';
            }

            // Auto calculate totals if ticket releases changed
            if (field === 'ticketReleases') {
                let currentTotal = 0;
                let currentPrice = null;
                value.forEach(r => {
                    const qty = parseInt(r.quantity) || 0;
                    if (qty > 0) {
                        currentTotal += qty;
                        const p = parseFloat(r.price) || 0;
                        if (currentPrice === null || p < currentPrice) currentPrice = p;
                    }
                });
                newState.totalTickets = currentTotal;
                newState.price = currentPrice !== null ? currentPrice : '';
            }

            return newState;
        });
    };

    const handleCreate = async () => {
        setShowConfirmModal(false);
        setIsSubmitting(true);
        setError('');

        try {
            const backendData = {
                title: formData.title,
                description: formData.description,
                location: formData.location,
                eventDate: `${formData.date}T${formData.time || '00:00'}:00`,
                ticketPrice: formData.price,
                totalTickets: formData.totalTickets,
                image: formData.galleryImages[0] || '',
                galleryImages: formData.galleryImages,
                ticketReleases: formData.ticketReleases,
                tags: [formData.eventType, formData.ageRestriction].filter(Boolean),
                highlights: [formData.parking, formData.refundPolicy].filter(Boolean),
                category: formData.category,
                promoCodes: formData.promoCodes,
                isPublic: formData.isPublic,
                sellingFastThreshold: formData.urgency.enabled ? formData.urgency.threshold : 0
            };

            console.log('Sending Create Event Payload:', backendData);

            const response = await eventService.createEvent(backendData);
            console.log('Create Event Response:', response);
            setCreatedEventId(response?.id);
            addToast('Event created and submitted for approval!', 'success');
            setShowSuccessModal(true);
        } catch (err) {
            console.error('Create Event Error:', err);
            const errMsg = typeof err.response?.data?.error === 'string'
                ? err.response.data.error
                : (typeof err.message === 'string' ? err.message : 'Failed to create event');
            setError(errMsg);
            addToast(errMsg, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* OLD LAYOUT WRAPPER DISABLED
            <OrganizerLayout>
            */}
            <div className="max-w-5xl space-y-8">
                {/* Page Header */}
                <div className="relative overflow-hidden bg-white rounded-[40px] border border-gray-100 p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-8 h-1 bg-indigo-600 rounded-full" />
                                <p className="text-xs text-indigo-500 font-black uppercase tracking-[0.2em]">Launch Control</p>
                            </div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Create New Event</h1>
                            <p className="text-gray-500 mt-2 font-medium max-w-xl">Configure your event details, ticket releases, and visibility settings in one place.</p>
                        </div>
                        <div className="hidden lg:block">
                            <div className="px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Auto-Save Active</p>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl font-bold">
                        {String(error)}
                    </div>
                )}

                <form onSubmit={handleSubmitClick} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* LEFT: Core Configuration */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* 1. Basic Details */}
                        <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                            <EventBasicForm
                                data={formData}
                                onChange={handleBasicChange}
                            />
                        </div>

                        {/* 2. Visuals */}
                        <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
                            <Card title={<span className="tracking-tighter uppercase font-black text-gray-900">Event Media</span>} subtitle="Showcase your event with a gallery of photos">
                                <EventGalleryUploader
                                    images={formData.galleryImages}
                                    onImagesUpdate={(imgs) => handleBasicChange('galleryImages', imgs)}
                                />
                            </Card>
                        </div>

                        {/* 3. Marketing & Discounts */}
                        <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                            <Card title={<span className="tracking-tighter uppercase font-black text-gray-900">Promotional Codes</span>} subtitle="Drive sales with fixed or percentage discounts">
                                <PromoCodeForm
                                    onSave={(code) => setFormData(prev => ({ ...prev, promoCodes: [...prev.promoCodes, code] }))}
                                />
                                {formData.promoCodes.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-gray-50 uppercase font-black text-[10px] tracking-widest text-gray-400">
                                        Active Codes:
                                        <div className="w-full mt-2 flex flex-wrap gap-2">
                                            {formData.promoCodes.map((c, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 flex items-center gap-2 group hover:bg-indigo-600 hover:text-white transition-all duration-300">
                                                    {safeRender(c.code, `promo-code-${i}`)}
                                                    <span className="opacity-50 text-[8px]">/</span>
                                                    {c.type === 'percentage' ? `${safeRender(c.value, `promo-val-${i}`)}%` : formatPrice(safeRender(c.value, `promo-val-${i}`)) }
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </div>

                        {/* 4. Additional Settings */}
                        <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
                            <EventAdditionalSettings
                                data={formData}
                                onChange={handleBasicChange}
                            />
                        </div>

                        {/* Private Event link warning */}
                        {!formData.isPublic && (
                            <div className="p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl animate-in flip-in-x duration-700">
                                <div className="flex items-start gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl flex-shrink-0 border border-slate-700">
                                        🔒
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-black text-white text-lg tracking-tight uppercase">Private Stealth Mode</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">This event will not appear in the discovery hub. Only people with the direct link can view and purchase tickets once the event is approved.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Visibility & Publishing */}
                    <div className="lg:h-full self-start sticky top-24">
                        <div className="space-y-6">
                            {/* Live Preview Summary */}
                            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] space-y-8 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600" />
                                
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none">Draft Snapshot</h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">Real-time metrics</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center animate-pulse">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                </div>
                                
                                <div className="space-y-5">
                                    <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 transition-all hover:border-indigo-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 group/stat">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em] leading-none">Entry Floor</p>
                                            <svg className="w-4 h-4 text-gray-200 group-hover/stat:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <div className="flex items-baseline gap-1 mt-3">
                                            <p className="text-3xl font-black text-gray-900 tracking-tighter">
                                                {formData.price === '0' || formData.price === 0 ? 'Free' : formatPrice(safeRender(formData.price, 'price')) || '0.00'}
                                            </p>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{currency.code}</span>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 transition-all hover:border-indigo-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 group/stat">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.15em] leading-none">Event Reach</p>
                                            <svg className="w-4 h-4 text-gray-200 group-hover/stat:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        </div>
                                        <div className="flex items-baseline gap-2 mt-3">
                                            <p className="text-3xl font-black text-gray-900 tracking-tighter">
                                                {safeRender(formData.totalTickets, 'capacity') || '0'}
                                            </p>
                                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50/50 px-2 py-0.5 rounded-lg border border-indigo-100/50">Total Pax</span>
                                        </div>
                                    </div>

                                    {formData.urgency.enabled && (
                                        <div className="p-6 bg-amber-500 rounded-3xl shadow-lg shadow-amber-500/20 flex items-center justify-between animate-in zoom-in-95 duration-500 text-white border-4 border-amber-400">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-none opacity-80">Demand Driver</p>
                                                <p className="text-base font-black mt-2 flex items-center gap-2">
                                                    <span className="animate-bounce">🔥</span> SELLING FAST
                                                </p>
                                            </div>
                                            <div className="text-xs font-black bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-xl">
                                                {formData.urgency.threshold}%
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Visibility & Urgency Toggles */}
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-700 delay-400">
                                <EventVisibilityToggle
                                    isPublic={formData.isPublic}
                                    onChange={(val) => handleBasicChange('isPublic', val)}
                                />

                                <SellingFastToggle
                                    enabled={formData.urgency.enabled}
                                    threshold={formData.urgency.threshold}
                                    onChange={(val) => handleBasicChange('urgency', val)}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2 space-y-4 animate-in fade-in slide-in-from-right-4 duration-700 delay-500">
                                <div className="p-6 bg-indigo-900 rounded-[2rem] border border-indigo-800 shadow-xl flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-800 flex items-center justify-center text-xl flex-shrink-0 border border-indigo-700">
                                        🚀
                                    </div>
                                    <p className="text-[11px] font-bold text-indigo-100/80 leading-relaxed">
                                        Submission triggers automatic verification. Review cycle targets <span className="text-white font-black underline">2-4 Hours</span> standard.
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    fullWidth
                                    isLoading={isSubmitting}
                                    className="h-16 rounded-[2rem] text-lg font-black bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-500/30 border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 transition-all"
                                    rightIcon={!isSubmitting && <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>}
                                >
                                    Push to Registry
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="md"
                                    fullWidth
                                    type="button"
                                    className="font-black text-gray-400 hover:text-rose-500 uppercase tracking-widest text-[11px]"
                                    onClick={() => navigate(ROUTES.ORGANIZER_DASHBOARD)}
                                >
                                    Abort Operation
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/* </OrganizerLayout> */}

            {/* Confirmation Modal */}
            <Modal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title="Review Your Event"
                size="md"
            >
                <div className="space-y-6 py-2">
                    <p className="text-gray-500 text-sm">Please confirm your event details before submitting for approval.</p>

                    <div className="bg-gray-50 rounded-2xl p-5 space-y-4 border border-gray-100">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Event Title</span>
                            <span className="font-bold text-gray-900 truncate max-w-[200px]">{safeRender(formData.title, 'title')}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Date</span>
                            <span className="font-bold text-gray-900">{formData.date} at {formData.time}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Pricing</span>
                            <span className="font-bold text-indigo-600">{formatPrice(formData.price)} per ticket</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Capacity</span>
                            <span className="font-bold text-gray-900">{formData.totalTickets} tickets</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="ghost" fullWidth onClick={() => setShowConfirmModal(false)}>
                            Edit More
                        </Button>
                        <Button variant="primary" fullWidth onClick={handleCreate} isLoading={isSubmitting}>
                            Confirm & Submit
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Success Modal */}
            <Modal
                isOpen={showSuccessModal}
                onClose={() => navigate(ROUTES.MY_EVENTS)}
                title="Event Created Successfully"
                size="md"
            >
                <div className="flex flex-col items-center text-center space-y-6 py-4">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-gray-900">Your event is ready!</h2>
                        <p className="text-gray-500">The event has been submitted for admin approval.</p>
                    </div>

                    <div className="w-full space-y-4">
                        {!formData.isPublic && (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <span className="text-lg">🔒</span>
                                    <p className="text-xs font-bold uppercase tracking-widest">Private Access Link</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-600 overflow-hidden text-ellipsis whitespace-nowrap text-left">
                                        {safeRender(window.location.origin, 'origin')}/events/{safeRender(createdEventId, 'eventId')}?private=true
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-shrink-0"
                                        onClick={async () => {
                                            const url = `${window.location.origin}/events/${createdEventId}?private=true`;
                                            await navigator.clipboard.writeText(url);
                                            setIsCopying(true);
                                            setTimeout(() => setIsCopying(false), 2000);
                                        }}
                                    >
                                        {isCopying ? 'Copied!' : 'Copy'}
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <Button
                                variant="primary"
                                fullWidth
                                onClick={() => navigate(ROUTES.MY_EVENTS)}
                            >
                                Go to Dashboard
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CreateEvent;
