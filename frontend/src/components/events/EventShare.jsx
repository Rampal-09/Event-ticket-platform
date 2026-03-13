import React, { useState } from 'react';
import Button from '../ui/Button';

/**
 * EventShare - Allows copying event link and social sharing placeholders
 */
const EventShare = ({ eventTitle, eventUrl }) => {
    const [copied, setCopied] = useState(false);
    const url = eventUrl || window.location.href;

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Share with friends</h3>

            <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 truncate border border-gray-100 italic">
                    {url}
                </div>
                <Button
                    variant={copied ? "success" : "secondary"}
                    onClick={handleCopy}
                    className="min-w-[100px]"
                >
                    {copied ? 'Copied!' : 'Copy Link'}
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {['WhatsApp', 'Twitter', 'Telegram'].map(platform => (
                    <button
                        key={platform}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 hover:bg-indigo-50 hover:border-indigo-100 transition-all group"
                    >
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-indigo-600">{platform}</span>
                    </button>
                ))}
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Event QR Code</span>
                <button className="text-indigo-600 text-xs font-bold hover:underline">Download QR</button>
            </div>
        </div>
    );
};

export default EventShare;
