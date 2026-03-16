import React from 'react';
import Input from '../ui/Input';
import Card from '../ui/Card';

/**
 * EventBasicForm - Pure UI component for basic event details
 * Manages event title, description, location, date, price, and capacity.
 */
const EventBasicForm = ({ data, onChange }) => {
    return (
        <div className="space-y-10">
            {/* Basic Details */}
            <Card
                title={<span className="tracking-tighter uppercase font-black text-gray-900">Event Identity</span>}
                subtitle="Define your event's core presence"
            >
                <div className="space-y-8">
                    <Input
                        label="Project Title"
                        placeholder="e.g. Annual Tech Summit 2026"
                        required
                        value={data.title}
                        onChange={e => onChange('title', e.target.value)}
                        className="group"
                        icon={<svg className="w-5 h-5 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2.5">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Category Classification <span className="text-rose-500">*</span></label>
                            <div className="relative group">
                                <select
                                    required
                                    value={data.category}
                                    onChange={e => onChange('category', e.target.value)}
                                    className="w-full h-14 px-5 rounded-[1.25rem] border border-gray-100 text-sm bg-gray-50/50 text-gray-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 hover:border-indigo-200 transition-all cursor-pointer font-bold appearance-none shadow-sm"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234F46E5' stroke-width='3'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem' }}
                                >
                                    <option value="Music">Music</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Business">Business</option>
                                    <option value="Festival">Festival</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Workshop">Workshop</option>
                                    <option value="Fundraisers">Fundraisers</option>
                                    <option value="School Events">School Events</option>
                                    <option value="Community Events">Community Events</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2.5 opacity-50 cursor-not-allowed">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Global Currency</label>
                            <div className="w-full h-14 px-5 rounded-[1.25rem] border border-gray-100 text-sm bg-gray-100/50 text-gray-500 font-bold flex items-center">
                                💵 United States Dollar (USD)
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Narrative Description <span className="text-rose-500">*</span></label>
                        <div className="relative group">
                            <textarea
                                placeholder="Describe the atmosphere, special guests, and why users can't miss it…"
                                required
                                rows={6}
                                value={data.description}
                                onChange={e => onChange('description', e.target.value)}
                                className="w-full px-6 py-5 rounded-[2rem] border border-gray-100 text-sm bg-gray-50/50 text-gray-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 hover:border-indigo-200 transition-all resize-none placeholder:text-gray-400 font-medium leading-relaxed"
                            />
                            <div className="absolute top-5 right-5 text-indigo-200 group-hover:text-indigo-400 transition-colors">
                                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                            </div>
                        </div>
                        <div className="flex items-center justify-between px-1">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
                                <span className="text-indigo-500">PRO TIP:</span> Markdown formatting is supported.
                            </p>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Min 100 Characters</span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Location & Time */}
            <Card
                title={<span className="tracking-tighter uppercase font-black text-gray-900">Event Venue</span>}
                subtitle="Temporal and spatial configuration"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="sm:col-span-2 group">
                        <Input
                            label="Physical / Virtual Venue"
                            placeholder="Full address or virtual link"
                            required
                            value={data.location}
                            onChange={e => onChange('location', e.target.value)}
                            className="h-14 !rounded-[1.25rem]"
                            icon={<svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                        />
                    </div>
                    <Input
                        label="Launch Date"
                        type="date"
                        required
                        value={data.date}
                        onChange={e => onChange('date', e.target.value)}
                        className="h-14 !rounded-[1.25rem]"
                        icon={<svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>}
                    />
                    <Input
                        label="Zero Hour (Start Time)"
                        type="time"
                        required
                        value={data.time}
                        onChange={e => onChange('time', e.target.value)}
                        className="h-14 !rounded-[1.25rem]"
                        icon={<svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    />
                </div>
            </Card>

            {/* Ticket Releases */}
            <Card
                title={<span className="tracking-tighter uppercase font-black text-gray-900">Ticket Configuration</span>}
                subtitle="Staged ticketing strategy"
            >
                <div className="space-y-8">
                    {data.ticketReleases?.map((release, index) => (
                        <div key={index} className="group p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 hover:border-indigo-200 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-200">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 uppercase tracking-tighter text-sm">
                                            {release.name}
                                        </h4>
                                        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Stage Configuration</p>
                                    </div>
                                </div>
                                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] border-2 transition-all duration-300 ${release.quantity > 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-100/50' : 'bg-gray-100 text-gray-400 border-gray-200'}`}>
                                    {release.quantity > 0 ? '• Active' : '• Inactive'}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Allocation</label>
                                    <Input
                                        type="number"
                                        min="0"
                                        placeholder="Tickets available"
                                        value={release.quantity}
                                        onChange={e => {
                                            const newReleases = [...data.ticketReleases];
                                            newReleases[index].quantity = e.target.value;
                                            onChange('ticketReleases', newReleases);
                                        }}
                                        className="h-14 !rounded-2xl border-gray-200 focus:ring-indigo-500/10 font-black text-indigo-600"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Unit Price ($)</label>
                                    <Input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={release.price}
                                        onChange={e => {
                                            const newReleases = [...data.ticketReleases];
                                            newReleases[index].price = e.target.value;
                                            onChange('ticketReleases', newReleases);
                                        }}
                                        className="h-14 !rounded-2xl border-gray-200 focus:ring-indigo-500/10 font-black text-indigo-600"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Release Date</label>
                                    <Input
                                        type="date"
                                        value={release.releaseDate}
                                        onChange={e => {
                                            const newReleases = [...data.ticketReleases];
                                            newReleases[index].releaseDate = e.target.value;
                                            onChange('ticketReleases', newReleases);
                                        }}
                                        className="h-14 !rounded-2xl border-gray-200 focus:ring-indigo-500/10 font-bold"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-100/30 border-dashed">
                        <div className="flex items-center gap-3 justify-center">
                            <span className="text-xl">💡</span>
                            <p className="text-[11px] text-indigo-600 font-black uppercase tracking-wider">
                                Recommendation: Utilize "Early Bird" staging to secure 40% of sales in the first 48 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default EventBasicForm;
