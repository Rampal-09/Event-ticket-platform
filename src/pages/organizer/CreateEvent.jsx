import React, { useState } from 'react';
import OrganizerLayout from '../../layouts/OrganizerLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [preview, setPreview] = useState({ title: '', price: '', date: '' });

    const handleCreate = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            navigate(ROUTES.MY_EVENTS);
        }, 1200);
    };

    return (
        <OrganizerLayout>
            <div className="max-w-4xl space-y-8">
                {/* Page Header */}
                <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Organizer</p>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">Create New Event</h1>
                    <p className="text-gray-500 mt-1">Fill in the details below to publish your event and start selling tickets.</p>
                </div>

                <form onSubmit={handleCreate}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* LEFT: Main Form */}
                        <div className="lg:col-span-2 space-y-5">
                            {/* Basic Details */}
                            <Card title="Basic Information" subtitle="Give your event a name and description">
                                <div className="space-y-5">
                                    <Input
                                        label="Event Name"
                                        placeholder="e.g. Annual Tech Summit 2026"
                                        required
                                        onChange={e => setPreview(p => ({ ...p, title: e.target.value }))}
                                    />
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Description <span className="text-red-500">*</span></label>
                                        <textarea
                                            placeholder="Describe what makes this event worth attending…"
                                            required
                                            rows={5}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-gray-300 transition-all resize-none placeholder:text-gray-400"
                                        />
                                        <p className="text-xs text-gray-400">Tip: Mention what's included, performers, schedule, and anything special.</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Location & Time */}
                            <Card title="Location & Schedule" subtitle="When and where is your event?">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="sm:col-span-2">
                                        <Input
                                            label="Venue / Location"
                                            placeholder="Name of venue or city"
                                            required
                                        />
                                    </div>
                                    <Input
                                        label="Event Date"
                                        type="date"
                                        required
                                        onChange={e => setPreview(p => ({ ...p, date: e.target.value }))}
                                    />
                                    <Input label="Start Time" type="time" required />
                                </div>
                            </Card>

                            {/* Tickets */}
                            <Card title="Ticket Settings" subtitle="Set your pricing and availability">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <Input
                                        label="Ticket Price ($)"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0 for free events"
                                        required
                                        hint="Enter 0 to make this a free event"
                                        onChange={e => setPreview(p => ({ ...p, price: e.target.value }))}
                                    />
                                    <Input
                                        label="Total Capacity"
                                        type="number"
                                        min="1"
                                        placeholder="Maximum attendees"
                                        required
                                    />
                                </div>
                            </Card>
                        </div>

                        {/* RIGHT: Preview + Actions */}
                        <div className="space-y-5">
                            {/* Live Preview Card */}
                            <Card title="Event Preview" subtitle="How your listing will appear">
                                <div className="rounded-xl overflow-hidden border border-gray-100">
                                    <div className="h-24 bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a1 1 0 01-1 1H3a1 1 0 01-1-1V6zm0 5a1 1 0 011-1h14a1 1 0 011 1v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3z" />
                                        </svg>
                                    </div>
                                    <div className="p-4">
                                        <p className="font-bold text-gray-900 text-sm line-clamp-2">{preview.title || 'Event Name'}</p>
                                        {preview.date && <p className="text-xs text-indigo-600 font-semibold mt-1">{new Date(preview.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>}
                                        {preview.price !== '' && (
                                            <p className="text-xs text-gray-500 mt-1">{parseFloat(preview.price) === 0 ? 'Free Event' : `From $${preview.price}`}</p>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}
                                    rightIcon={!isSubmitting && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                                >
                                    Publish Event
                                </Button>
                                <Button variant="ghost" size="md" fullWidth type="button" onClick={() => navigate(ROUTES.ORGANIZER_DASHBOARD)}>
                                    Cancel
                                </Button>
                            </div>

                            {/* Tips */}
                            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-sm text-indigo-700 space-y-2">
                                <p className="font-bold">💡 Publishing Tips</p>
                                <ul className="space-y-1 text-xs text-indigo-600 leading-relaxed list-disc list-inside">
                                    <li>Add a compelling description to attract more attendees</li>
                                    <li>Set a realistic capacity to manage entry smoothly</li>
                                    <li>Consider early-bird pricing for better conversions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </OrganizerLayout>
    );
};

export default CreateEvent;
