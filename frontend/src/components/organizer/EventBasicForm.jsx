import React from 'react';
import Input from '../ui/Input';
import Card from '../ui/Card';

/**
 * EventBasicForm - Pure UI component for basic event details
 * Manages event title, description, location, date, price, and capacity.
 */
const EventBasicForm = ({ data, onChange }) => {
    return (
        <div className="space-y-5">
            {/* Basic Details */}
            <Card title="Basic Information" subtitle="Give your event a name and description">
                <div className="space-y-5">
                    <Input
                        label="Event Name"
                        placeholder="e.g. Annual Tech Summit 2026"
                        required
                        value={data.title}
                        onChange={e => onChange('title', e.target.value)}
                    />
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Category <span className="text-red-500">*</span></label>
                        <select
                            required
                            value={data.category}
                            onChange={e => onChange('category', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-gray-300 transition-all cursor-pointer"
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
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">Description <span className="text-red-500">*</span></label>
                        <textarea
                            placeholder="Describe what makes this event worth attending…"
                            required
                            rows={5}
                            value={data.description}
                            onChange={e => onChange('description', e.target.value)}
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
                            value={data.location}
                            onChange={e => onChange('location', e.target.value)}
                        />
                    </div>
                    <Input
                        label="Event Date"
                        type="date"
                        required
                        value={data.date}
                        onChange={e => onChange('date', e.target.value)}
                    />
                    <Input
                        label="Start Time"
                        type="time"
                        required
                        value={data.time}
                        onChange={e => onChange('time', e.target.value)}
                    />
                </div>
            </Card>

            {/* Tickets
            <Card title="Ticket Settings" subtitle="Set your pricing and availability">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                        label="Ticket Price ($)"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0 for free events"
                        required
                        value={data.price}
                        hint="Enter 0 to make this a free event"
                        onChange={e => onChange('price', e.target.value)}
                    />
                    <Input
                        label="Total Capacity"
                        type="number"
                        min="1"
                        placeholder="Maximum attendees"
                        required
                        value={data.totalTickets}
                        onChange={e => onChange('totalTickets', e.target.value)}
                    />
                </div>
            </Card> */}

            {/* Ticket Releases */}
            <Card title="Ticket Releases" subtitle="Sell tickets in stages (e.g., Early Bird, General Admission)">
                <div className="space-y-6">
                    {data.ticketReleases?.map((release, index) => (
                        <div key={index} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                            <h4 className="font-bold text-gray-900 border-b border-gray-200 pb-2">{release.name}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Input
                                    label="Quantity"
                                    type="number"
                                    min="0"
                                    placeholder="Available tickets"
                                    value={release.quantity}
                                    onChange={e => {
                                        const newReleases = [...data.ticketReleases];
                                        newReleases[index].quantity = e.target.value;
                                        onChange('ticketReleases', newReleases);
                                    }}
                                />
                                <Input
                                    label="Price ($)"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0 for free"
                                    value={release.price}
                                    onChange={e => {
                                        const newReleases = [...data.ticketReleases];
                                        newReleases[index].price = e.target.value;
                                        onChange('ticketReleases', newReleases);
                                    }}
                                />
                                <Input
                                    label="Release Date (Optional)"
                                    type="date"
                                    value={release.releaseDate}
                                    onChange={e => {
                                        const newReleases = [...data.ticketReleases];
                                        newReleases[index].releaseDate = e.target.value;
                                        onChange('ticketReleases', newReleases);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default EventBasicForm;
