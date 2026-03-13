import React, { useState } from 'react';
import Button from '../ui/Button';
import { eventService } from '../../services/eventService';

const PromoCodeInput = ({ eventId, onApply }) => {
    const [code, setCode] = useState('');
    const [isApplied, setIsApplied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleApply = async () => {
        if (!code.trim()) return;
        setIsLoading(true);
        setError('');

        try {
            const result = await eventService.validatePromo(eventId, code);
            onApply?.(result);
            setIsApplied(true);
        } catch (err) {
            setError(err.message || 'Invalid promo code');
            setIsApplied(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900">Promo Code</h4>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter code (e.g. SAVE10)"
                    disabled={isApplied}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all uppercase font-mono tracking-wider"
                />
                <Button
                    type="button"
                    variant={isApplied ? 'success' : 'primary'}
                    size="md"
                    onClick={handleApply}
                    disabled={isApplied}
                    isLoading={isLoading}
                >
                    {isApplied ? 'Applied' : 'Apply'}
                </Button>
            </div>
            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
            {isApplied && (
                <div className="flex items-center justify-between text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 animate-pulse">
                    <span>Discount applied successfully!</span>
                    <button onClick={() => { setIsApplied(false); setCode(''); onApply(null); }} className="hover:underline">Remove</button>
                </div>
            )}
        </div>
    );
};

export default PromoCodeInput;
