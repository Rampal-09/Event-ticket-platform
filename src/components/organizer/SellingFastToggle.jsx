import React from 'react';

/**
 * SellingFastToggle - Toggle for urgency indicators
 */
const SellingFastToggle = ({ enabled, threshold, onChange }) => {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-xl">🔥</span>
                    <div>
                        <p className="text-sm font-bold text-gray-900">Urgency Indicator</p>
                        <p className="text-xs text-gray-500">Enable Scarcity messages for buyers</p>
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
                <div className="pt-4 border-t border-gray-50 flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest min-w-[120px]">Threshold (%)</span>
                    <input
                        type="range"
                        min="5"
                        max="50"
                        step="5"
                        value={threshold}
                        onChange={(e) => onChange?.({ enabled, threshold: parseInt(e.target.value) })}
                        className="flex-1 accent-amber-500"
                    />
                    <span className="text-sm font-black text-amber-600 w-8">{threshold}%</span>
                </div>
            )}
        </div>
    );
};

export default SellingFastToggle;
