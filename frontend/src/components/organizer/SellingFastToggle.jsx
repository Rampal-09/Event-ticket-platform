import React from 'react';

/**
 * SellingFastToggle - Toggle for urgency indicators
 */
const SellingFastToggle = ({ enabled, threshold, onChange }) => {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">Urgency Indicator</p>
                        <p className="text-xs text-gray-500 font-medium">Enable Scarcity messages for buyers</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => onChange?.({ enabled: !enabled, threshold })}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-amber-500' : 'bg-gray-200'}`}
                >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
            </div>

            {enabled && (
                <div className="pt-4 border-t border-gray-50 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100/50 space-y-4 overflow-hidden max-w-full">
                        <div className="flex items-center justify-between gap-2 px-1">
                            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest truncate">Urgency Threshold (%)</span>
                            <span className="text-sm font-black text-amber-600 bg-white border border-amber-100 px-2.5 py-1 rounded-lg shadow-sm whitespace-nowrap">{threshold}%</span>
                        </div>
                        <div className="relative px-1 w-full">
                            <input
                                type="range"
                                min="5"
                                max="50"
                                step="5"
                                value={threshold}
                                onChange={(e) => onChange?.({ enabled, threshold: parseInt(e.target.value) })}
                                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-500/10"
                            />
                        </div>
                        <div className="flex justify-between text-[9px] font-black text-amber-400 uppercase tracking-widest px-1">
                            <span>05%</span>
                            <span>25%</span>
                            <span>50%</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 text-[10px] text-amber-600 font-bold leading-relaxed px-1">
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Buyers will see the "Selling Fast" badge once the event reaches {threshold}% capacity.
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellingFastToggle;
