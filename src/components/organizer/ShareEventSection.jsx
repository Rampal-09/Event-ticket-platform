import React from 'react';
import Button from '../ui/Button';

/**
 * ShareEventSection - Promotion tools for organizers
 */
const ShareEventSection = ({ eventUrl }) => {
    const url = eventUrl || `${window.location.origin}/events/preview-123`;

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Promote Event</h3>

            <div className="flex flex-col md:flex-row gap-8">
                {/* QR Placeholder */}
                <div className="w-full md:w-32 flex flex-col items-center gap-2">
                    <div className="w-32 h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                    </div>
                    <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline">Download QR</button>
                </div>

                <div className="flex-1 space-y-4">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 block">Direct Sharing Link</label>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-xs font-medium text-gray-500 truncate border border-gray-100">
                                {url}
                            </div>
                            <Button size="sm" variant="secondary" onClick={() => navigator.clipboard.writeText(url)}>
                                Copy
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" size="sm" fullWidth className="text-xs">Share on WhatsApp</Button>
                        <Button variant="outline" size="sm" fullWidth className="text-xs">Post to Twitter</Button>
                    </div>

                    <p className="text-[10px] text-gray-400 font-medium italic">
                        * Use unique links to track traffic from different sources in Phase 2 analytics.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShareEventSection;
