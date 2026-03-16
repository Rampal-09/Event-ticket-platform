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
            <Card 
                title={<span className="tracking-tighter uppercase font-black text-gray-900">Access Control</span>} 
                subtitle="Control who can access this event"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { value: 'public',  label: 'Public Event',  desc: 'Visible to everyone', icon: '🌍' },
                        { value: 'private', label: 'Private Event', desc: 'Invite-only access', icon: '🔒' },
                    ].map((opt) => (
                        <label
                            key={opt.value}
                            className={`relative overflow-hidden group flex flex-col p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                                data.eventType === opt.value
                                    ? 'border-indigo-600 bg-indigo-50 shadow-md scale-[1.01]'
                                    : 'border-gray-100 hover:border-indigo-200 bg-white'
                            }`}
                        >
                            <input
                                type="radio"
                                name="eventType"
                                value={opt.value}
                                checked={data.eventType === opt.value}
                                onChange={() => onChange('eventType', opt.value)}
                                className="sr-only"
                            />
                            <div className="flex justify-between items-center mb-3">
                                <span className={`text-xl p-2 rounded-xl transition-colors ${data.eventType === opt.value ? 'bg-white shadow-sm' : 'bg-gray-50 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'}`}>
                                    {opt.icon}
                                </span>
                                {data.eventType === opt.value && (
                                    <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                )}
                            </div>
                            <p className={`font-black uppercase tracking-tight text-[11px] ${data.eventType === opt.value ? 'text-indigo-900' : 'text-gray-900'}`}>{opt.label}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{opt.desc}</p>
                        </label>
                    ))}

                    {data.eventType === 'private' && (
                        <div className="md:col-span-2 flex items-start gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800 animate-in slide-in-from-top-2">
                            <span className="p-2 bg-slate-800 rounded-xl">⚡</span>
                            <p className="text-[11px] text-slate-300 font-bold uppercase tracking-widest leading-relaxed">
                                SECURE MODE ACTIVE: Only people with your direct URL can buy tickets.
                            </p>
                        </div>
                    )}
                </div>
            </Card>

            {/* ── Extra Event Details ── */}
            <Card 
                title={<span className="tracking-tighter uppercase font-black text-gray-900">Policy Framework</span>} 
                subtitle="Set access, parking, and refund details"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* Parking */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Parking Information</label>
                        <select
                            value={data.parking || ''}
                            onChange={e => onChange('parking', e.target.value)}
                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 text-sm bg-gray-50/50 text-gray-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 hover:border-indigo-200 transition-all cursor-pointer font-bold appearance-none shadow-sm"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234F46E5' stroke-width='3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem' }}
                        >
                            <option value="">Select parking option</option>
                            <option value="available">Parking Available</option>
                            <option value="limited">Limited Parking</option>
                            <option value="street">Street Parking</option>
                            <option value="none">No Parking Available</option>
                        </select>
                    </div>

                    {/* Age Restriction */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Age Restriction</label>
                        <select
                            value={data.ageRestriction || ''}
                            onChange={e => onChange('ageRestriction', e.target.value)}
                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 text-sm bg-gray-50/50 text-gray-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 hover:border-indigo-200 transition-all cursor-pointer font-bold appearance-none shadow-sm"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234F46E5' stroke-width='3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem' }}
                        >
                            <option value="">Select age restriction</option>
                            <option value="all">All Ages</option>
                            <option value="18">18+</option>
                            <option value="21">21+</option>
                        </select>
                    </div>

                    {/* Refund Policy */}
                    <div className="sm:col-span-2 flex flex-col gap-2">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Refund Policy</label>
                        <select
                            value={data.refundPolicy || ''}
                            onChange={e => onChange('refundPolicy', e.target.value)}
                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 text-sm bg-gray-50/50 text-gray-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 hover:border-indigo-200 transition-all cursor-pointer font-bold appearance-none shadow-sm"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234F46E5' stroke-width='3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem' }}
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
            <Card 
                title={<span className="tracking-tighter uppercase font-black text-gray-900">Financial Architecture</span>} 
                subtitle="Choose who absorbs the platform fees"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { value: 'BUYER',     label: 'Buyer Covers Fee',    desc: 'Fees added to final price', icon: '🎫' },
                        { value: 'ORGANIZER', label: 'Organiser Covers Fee',   desc: 'Fees deducted from payout', icon: '🏦' },
                    ].map((opt) => (
                        <label
                            key={opt.value}
                            className={`relative overflow-hidden group flex flex-col p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                                data.serviceFeeType === opt.value
                                    ? 'border-rose-600 bg-rose-50 shadow-md scale-[1.01]'
                                    : 'border-gray-100 hover:border-rose-200 bg-white'
                            }`}
                        >
                            <input
                                type="radio"
                                name="serviceFeeType"
                                value={opt.value}
                                checked={data.serviceFeeType === opt.value}
                                onChange={() => onChange('serviceFeeType', opt.value)}
                                className="sr-only"
                            />
                            <div className="flex justify-between items-center mb-3">
                                <span className={`text-xl p-2 rounded-xl transition-colors ${data.serviceFeeType === opt.value ? 'bg-white shadow-sm' : 'bg-gray-50 text-gray-400 group-hover:bg-rose-50 group-hover:text-rose-600'}`}>
                                    {opt.icon}
                                </span>
                                {data.serviceFeeType === opt.value && (
                                    <div className="w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-200">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                )}
                            </div>
                            <p className={`font-black uppercase tracking-tight text-[11px] ${data.serviceFeeType === opt.value ? 'text-rose-900' : 'text-gray-900'}`}>{opt.label}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{opt.desc}</p>
                        </label>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default EventAdditionalSettings;
