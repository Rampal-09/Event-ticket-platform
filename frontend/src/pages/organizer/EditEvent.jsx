import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EventBasicForm from '../../components/organizer/EventBasicForm';
import Modal from '../../components/ui/Modal';
import EventGalleryUploader from '../../components/organizer/EventGalleryUploader';
import PromoCodeForm from '../../components/organizer/PromoCodeForm';
import EventVisibilityToggle from '../../components/organizer/EventVisibilityToggle';
import SellingFastToggle from '../../components/organizer/SellingFastToggle';
import EventAdditionalSettings from '../../components/organizer/EventAdditionalSettings';
import { ROUTES } from '../../router/routes';
import { eventService } from '../../services/eventService';

const EditEvent = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCopying, setIsCopying] = useState(false);

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
        category: 'Music',
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

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const event = await eventService.getOrganizerEventById(eventId);

                // Parse tags for eventType and ageRestriction
                const rawTags = event.tags || [];
                const tags = Array.isArray(rawTags) ? rawTags : [];
                const eventType = tags.includes('private') ? 'private' : 'public';
                const ageRestriction = tags.find(t => ['all', '18', '21'].includes(t)) || '';

                // Parse highlights for parking and refundPolicy
                const rawHighlights = event.highlights || [];
                const highlights = Array.isArray(rawHighlights) ? rawHighlights : [];
                const parking = highlights.find(h => ['available', 'limited', 'street', 'none'].includes(h)) || '';
                const refundPolicy = highlights.find(h => ['non_refundable', '7_days', 'partial'].includes(h)) || '';

                const eventDate = new Date(event.eventDate);

                setFormData({
                    title: event.title,
                    description: event.description,
                    location: event.location,
                    date: eventDate.toISOString().split('T')[0],
                    time: eventDate.toTimeString().split(' ')[0].slice(0, 5),
                    price: event.ticketPrice,
                    totalTickets: event.totalTickets,
                    galleryImages: event.galleryImages?.map(img => img.imageUrl) || [],
                    promoCodes: event.promoCodes || [],
                    isPublic: event.isPublic,
                    category: event.category || 'Music',
                    eventType: eventType,
                    parking: parking,
                    ageRestriction: ageRestriction,
                    refundPolicy: refundPolicy,
                    serviceFee: 'buyer', // Default or fetch if exists
                    urgency: {
                        enabled: event.sellingFastThreshold > 0,
                        threshold: event.sellingFastThreshold || 20
                    }
                });
            } catch (err) {
                setError('Failed to load event data');
            } finally {
                setIsLoading(false);
            }
        };

        if (eventId) {
            fetchEvent();
        }
    }, [eventId]);

    const handleBasicChange = (field, value) => {
        setFormData(prev => {
            const newState = { ...prev, [field]: value };
            if (field === 'isPublic') {
                newState.eventType = value ? 'public' : 'private';
            } else if (field === 'eventType') {
                newState.isPublic = value === 'public';
            }
            return newState;
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
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

            console.log('Sending Update Event Payload:', backendData);

            await eventService.updateEvent(eventId, backendData);
            setShowSuccessModal(true);
        } catch (err) {
            setError(err.message || 'Failed to update event');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="p-20 text-center font-black text-gray-400 uppercase tracking-widest">Loading Event Details...</div>;
    }

    return (
        <div className="max-w-5xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <p className="text-sm text-indigo-500 font-bold uppercase tracking-wider">Editor</p>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">Refine Your Listing</h1>
                    <p className="text-gray-500 mt-1">ID #{eventId} — Content will be re-moderated upon saving.</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl font-bold">
                    {error}
                </div>
            )}

            <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <EventBasicForm data={formData} onChange={handleBasicChange} />

                    <Card title="Event Media" subtitle="Showcase your event with a gallery of photos">
                        <EventGalleryUploader
                            images={formData.galleryImages}
                            onImagesUpdate={(imgs) => handleBasicChange('galleryImages', imgs)}
                        />
                    </Card>

                    <Card title="Promotional Codes" subtitle="Manage your discounts">
                        <PromoCodeForm
                            onSave={(code) => setFormData(prev => ({ ...prev, promoCodes: [...prev.promoCodes, code] }))}
                        />
                        {formData.promoCodes.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                                {formData.promoCodes.map((c, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold border border-indigo-100 flex items-center gap-2">
                                        {c.code} ({c.discountType || c.type})
                                    </span>
                                ))}
                            </div>
                        )}
                    </Card>

                    <EventAdditionalSettings data={formData} onChange={handleBasicChange} />

                    {!formData.isPublic && (
                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 border-dashed animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600 flex-shrink-0">🔒</div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-slate-900">Private Event Mode</h3>
                                    <p className="text-sm text-slate-600">This event remains hidden from discovery. Re-moderation is required if major changes are saved.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="sticky top-24 space-y-6">
                        <EventVisibilityToggle
                            isPublic={formData.isPublic}
                            onChange={(val) => handleBasicChange('isPublic', val)}
                        />
                        <SellingFastToggle
                            enabled={formData.urgency.enabled}
                            threshold={formData.urgency.threshold}
                            onChange={(val) => handleBasicChange('urgency', val)}
                        />

                        {/* Status Preview Card from CreateEvent pattern */}
                        <Card title="Listing Preview" subtitle="Current settings">
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 uppercase tracking-tighter">
                                    <p className="text-[10px] font-black text-gray-400">Price</p>
                                    <p className="text-xl font-black text-gray-900">${formData.price || '0.00'}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Visibility</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${formData.isPublic ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                                            {formData.isPublic ? 'Public' : 'Private'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Quick Copy for Private Events */}
                        {!formData.isPublic && (
                            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-3">
                                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Private Link</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    fullWidth
                                    onClick={() => {
                                        const url = `${window.location.origin}/events/${eventId}?private=true`;
                                        navigator.clipboard.writeText(url);
                                        alert('Private link copied!');
                                    }}
                                >
                                    Copy Link
                                </Button>
                            </div>
                        )}

                        <div className="pt-4 space-y-4">
                            <Button
                                type="submit"
                                size="lg"
                                fullWidth
                                isLoading={isSubmitting}
                                className="shadow-lg shadow-indigo-100"
                            >
                                Save Changes
                            </Button>
                            <Button
                                variant="ghost"
                                size="md"
                                fullWidth
                                type="button"
                                onClick={() => navigate(ROUTES.MY_EVENTS)}
                            >
                                Discard Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Success Modal */}
            <Modal
                isOpen={showSuccessModal}
                onClose={() => navigate(ROUTES.MY_EVENTS)}
                title={formData.isPublic ? "Event Updated Successfully" : "Private Event Updated"}
                size="md"
            >
                <div className="flex flex-col items-center text-center space-y-6 py-4">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-gray-900">Changes Saved!</h2>
                        <p className="text-gray-500">Your event details have been updated and are now live (or pending review).</p>
                    </div>

                    <div className="w-full space-y-4">
                        {!formData.isPublic && (
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <span className="text-lg">🔒</span>
                                    <p className="text-xs font-bold uppercase tracking-widest">Shareable Private Link</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-600 overflow-hidden text-ellipsis whitespace-nowrap text-left">
                                        {window.location.origin}/events/{eventId}?private=true
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-shrink-0"
                                        onClick={async () => {
                                            const url = `${window.location.origin}/events/${eventId}?private=true`;
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
                                Back to Console
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default EditEvent;
