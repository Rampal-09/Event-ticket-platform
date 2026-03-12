import React, { useState } from 'react';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import EventBasicForm from '../../components/organizer/EventBasicForm';
import EventGalleryUploader from '../../components/organizer/EventGalleryUploader';
import PromoCodeForm from '../../components/organizer/PromoCodeForm';
import EventVisibilityToggle from '../../components/organizer/EventVisibilityToggle';
import SellingFastToggle from '../../components/organizer/SellingFastToggle';
import EventAdditionalSettings from '../../components/organizer/EventAdditionalSettings';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        is_public: true,
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

    const handleBasicChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCreate = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log('Publishing Event Data:', formData);

        setTimeout(() => {
            setIsSubmitting(false);
            navigate(ROUTES.MY_EVENTS);
        }, 1500);
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

                <form onSubmit={handleCreate} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

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
                                            {c.code} ({c.type === 'percentage' ? `${c.value}%` : `$${c.value}`})
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
                                            {formData.price === '0' || formData.price === 0 ? 'Free Entry' : `$${formData.price || '0.00'}`}
                                        </p>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Target Goal</p>
                                        <p className="text-xl font-black text-gray-900 mt-1">
                                            {formData.totalTickets || '0'} Attendees
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Visibility Toggle */}
                            <EventVisibilityToggle
                                isPublic={formData.is_public}
                                onChange={(val) => handleBasicChange('is_public', val)}
                            />

                            {/* Urgency Toggle */}
                            <SellingFastToggle
                                enabled={formData.urgency.enabled}
                                threshold={formData.urgency.threshold}
                                onChange={(val) => handleBasicChange('urgency', val)}
                            />

                            {/* Action Buttons */}
                            <div className="pt-4 space-y-3">
                                <Button
                                    type="submit"
                                    size="lg"
                                    fullWidth
                                    isLoading={isSubmitting}
                                    className="shadow-xl shadow-indigo-200"
                                    rightIcon={!isSubmitting && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>}
                                >
                                    Publish Event
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
        </>
    );
};

export default CreateEvent;
