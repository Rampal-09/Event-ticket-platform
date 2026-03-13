import React, { useState } from 'react';
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

const CreateEvent = () => {
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

        if (!formData.price && formData.price !== 0) errors.price = 'Ticket price is required';
        if (!formData.totalTickets) errors.totalTickets = 'Total capacity is required';
        if (parseInt(formData.totalTickets) <= 0) errors.totalTickets = 'Capacity must be greater than 0';

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
            setShowSuccessModal(true);
        } catch (err) {
            console.error('Create Event Error:', err);
            const errMsg = typeof err.response?.data?.error === 'string'
                ? err.response.data.error
                : (typeof err.message === 'string' ? err.message : 'Failed to create event');
            setError(errMsg);
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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <p className="text-sm text-indigo-500 font-bold uppercase tracking-wider">Event Creation</p>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">Design Your Experience</h1>
                        <p className="text-gray-500 mt-1">Set the stage, define your tickets, and go live.</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl font-bold">
                        {String(error)}
                    </div>
                )}

                <form onSubmit={handleSubmitClick} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: Core Configuration */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* 1. Basic Details */}
                        <EventBasicForm
                            data={formData}
                            onChange={handleBasicChange}
                        />

                        {/* 2. Visuals */}
                        <Card title="Event Media" subtitle="Showcase your event with a gallery of photos">
                            <EventGalleryUploader
                                images={formData.galleryImages}
                                onImagesUpdate={(imgs) => handleBasicChange('galleryImages', imgs)}
                            />
                        </Card>

                        {/* 3. Marketing & Discounts */}
                        <Card title="Promotional Codes" subtitle="Drive sales with fixed or percentage discounts">
                            <PromoCodeForm
                                onSave={(code) => setFormData(prev => ({ ...prev, promoCodes: [...prev.promoCodes, code] }))}
                            />
                            {formData.promoCodes.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                                    {formData.promoCodes.map((c, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100 flex items-center gap-2">
                                            {safeRender(c.code, `promo-code-${i}`)} ({c.type === 'percentage' ? `${safeRender(c.value, `promo-val-${i}`)}%` : `$${safeRender(c.value, `promo-val-${i}`)}`})
                                        </span>
                                    ))}
                                </div>
                            )}
                        </Card>

                        {/* 4. Additional Settings */}
                        <EventAdditionalSettings
                            data={formData}
                            onChange={handleBasicChange}
                        />

                        {/* Private Event link warning */}
                        {!formData.isPublic && (
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 border-dashed animate-in fade-in slide-in-from-bottom-2">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600 flex-shrink-0">
                                        🔒
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-slate-900">Private Event Mode</h3>
                                        <p className="text-sm text-slate-600">This event will not appear in the discovery hub. Only people with the direct link can view and purchase tickets once the event is approved.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Visibility & Publishing */}
                    <div className="space-y-6">
                        <div className="sticky top-24 space-y-6">
                            {/* Live Preview Summary */}
                            <Card title="Status Preview" subtitle="How your listing is configured">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Price Point</p>
                                        <p className="text-xl font-black text-gray-900 mt-1">
                                            {formData.price === '0' || formData.price === 0 ? 'Free Entry' : `$${safeRender(formData.price, 'price') || '0.00'}`}
                                        </p>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Target Goal</p>
                                        <p className="text-xl font-black text-gray-900 mt-1">
                                            {safeRender(formData.totalTickets, 'capacity') || '0'} Attendees
                                        </p>
                                    </div>

                                    {formData.urgency.enabled && (
                                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-amber-600 tracking-widest leading-none">Urgency Indicator</p>
                                                <p className="text-sm font-bold text-gray-900 mt-1">🔥 Selling Fast</p>
                                            </div>
                                            <div className="text-xs font-black text-amber-600">
                                                {formData.urgency.threshold}%
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Visibility Toggle */}
                            <EventVisibilityToggle
                                isPublic={formData.isPublic}
                                onChange={(val) => handleBasicChange('isPublic', val)}
                            />

                            {/* Urgency Toggle */}
                            <SellingFastToggle
                                enabled={formData.urgency.enabled}
                                threshold={formData.urgency.threshold}
                                onChange={(val) => handleBasicChange('urgency', val)}
                            />

                            {/* Action Buttons */}
                            <div className="pt-4 space-y-4">
                                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex gap-3">
                                    <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-xs font-bold text-indigo-900 leading-relaxed">
                                        All events undergo admin review. This typically takes 2-4 hours. You'll receive an email once approved.
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    fullWidth
                                    isLoading={isSubmitting}
                                    className="shadow-xl shadow-indigo-200"
                                    rightIcon={!isSubmitting && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>}
                                >
                                    Submit for Approval
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="md"
                                    fullWidth
                                    type="button"
                                    onClick={() => navigate(ROUTES.ORGANIZER_DASHBOARD)}
                                >
                                    Cancel & Discard
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
                            <span className="font-bold text-indigo-600">${formData.price} per ticket</span>
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
