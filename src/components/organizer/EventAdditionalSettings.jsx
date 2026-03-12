import React from 'react';
import Card from '../ui/Card';

/**
 * EventAdditionalSettings
 * Adds: Event Type, Parking, Age Restriction, Refund Policy, Service Fee
 * These are NEW fields that don't exist in EventBasicForm.
 */
const EventAdditionalSettings = ({ data, onChange }) => {
    const fieldClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-gray-300 transition-all";
    const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
    const hintClass  = "text-xs text-gray-400 mt-1";

    return (
        <div className="space-y-5">

            {/* ── Event Type ── */}
            <Card title="Event Type" subtitle="Control who can access this event">
                <div className="space-y-3">
                    {[
                        { value: 'public',  label: 'Public Event',  desc: 'Visible to everyone in the event listings.' },
                        { value: 'private', label: 'Private Event', desc: 'Only accessible via a direct private link.' },
                    ].map((opt) => (
                        <label
                            key={opt.value}
                            className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                                data.eventType === opt.value
                                    ? 'border-indigo-500 bg-indigo-50'
                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                        >
                            <input
                                type="radio"
                                name="eventType"
                                value={opt.value}
                                checked={data.eventType === opt.value}
                                onChange={() => onChange('eventType', opt.value)}
                                className="mt-0.5 accent-indigo-600"
                            />
                            <div>
                                <p className="text-sm font-bold text-gray-900">{opt.label}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                            </div>
                        </label>
                    ))}

                    {data.eventType === 'private' && (
                        <div className="flex items-start gap-2 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl">
                            <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-amber-700 font-medium">
                                This event will only be accessible via private link.
                            </p>
                        </div>
                    )}
                </div>
            </Card>

            {/* ── Extra Event Details ── */}
            <Card title="Event Policies" subtitle="Set access, parking, and refund details">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Parking */}
                    <div>
                        <label className={labelClass}>Parking Information</label>
                        <select
                            value={data.parking || ''}
                            onChange={e => onChange('parking', e.target.value)}
                            className={fieldClass}
                        >
                            <option value="">Select parking option</option>
                            <option value="available">Parking Available</option>
                            <option value="limited">Limited Parking</option>
                            <option value="street">Street Parking</option>
                            <option value="none">No Parking Available</option>
                        </select>
                    </div>

                    {/* Age Restriction */}
                    <div>
                        <label className={labelClass}>Age Restriction</label>
                        <select
                            value={data.ageRestriction || ''}
                            onChange={e => onChange('ageRestriction', e.target.value)}
                            className={fieldClass}
                        >
                            <option value="">Select age restriction</option>
                            <option value="all">All Ages</option>
                            <option value="18">18+</option>
                            <option value="21">21+</option>
                        </select>
                    </div>

                    {/* Refund Policy */}
                    <div className="sm:col-span-2">
                        <label className={labelClass}>Refund Policy</label>
                        <select
                            value={data.refundPolicy || ''}
                            onChange={e => onChange('refundPolicy', e.target.value)}
                            className={fieldClass}
                        >
                            <option value="">Select refund policy</option>
                            <option value="non_refundable">Non Refundable</option>
                            <option value="7_days">Refundable until 7 days before event</option>
                            <option value="partial">Partially Refundable</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* ── Service Fee ── */}
            <Card title="Service Fee" subtitle="Who covers the platform service fee?">
                <div className="space-y-3">
                    {[
                        { value: 'buyer',     label: 'Pass fee to buyer',    desc: 'The service fee is added on top of the ticket price for the buyer.' },
                        { value: 'organizer', label: 'Organiser pays fee',   desc: 'The service fee is deducted from your payout. Buyers see the listed price.' },
                    ].map((opt) => (
                        <label
                            key={opt.value}
                            className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                                data.serviceFee === opt.value
                                    ? 'border-indigo-500 bg-indigo-50'
                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                        >
                            <input
                                type="radio"
                                name="serviceFee"
                                value={opt.value}
                                checked={data.serviceFee === opt.value}
                                onChange={() => onChange('serviceFee', opt.value)}
                                className="mt-0.5 accent-indigo-600"
                            />
                            <div>
                                <p className="text-sm font-bold text-gray-900">{opt.label}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                            </div>
                        </label>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default EventAdditionalSettings;
