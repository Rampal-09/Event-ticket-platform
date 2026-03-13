import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

/**
 * PromoCodeForm - UI for creating promotional discount codes
 */
const PromoCodeForm = ({ onSave }) => {
    const [formData, setFormData] = useState({
        code: '',
        type: 'percentage',
        value: '',
        expiry: '',
        limit: ''
    });

    const [error, setError] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.value || parseFloat(formData.value) <= 0) {
            setError(`Please enter a valid ${formData.type === 'percentage' ? 'percentage' : 'amount'}`);
            return;
        }

        if (formData.type === 'percentage' && parseFloat(formData.value) > 100) {
            setError('Percentage cannot exceed 100%');
            return;
        }
        
        // If code is empty, generate a random one
        let finalCode = formData.code;
        if (!finalCode) {
            const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
            finalCode = `EVNT-${randomStr}`;
        }

        onSave?.({ ...formData, code: finalCode });
        
        // Reset local state for next code
        setFormData({
            code: '',
            type: 'percentage',
            value: '',
            expiry: '',
            limit: ''
        });
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Promo Code (Leave blank to generate)</label>
                    <Input
                        placeholder="e.g. SUMMER20"
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Discount Type</label>
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        <button
                            type="button"
                            onClick={() => { setFormData({ ...formData, type: 'percentage' }); setError(''); }}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.type === 'percentage' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Percentage (%)
                        </button>
                        <button
                            type="button"
                            onClick={() => { setFormData({ ...formData, type: 'fixed' }); setError(''); }}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.type === 'fixed' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Fixed Amount ($)
                        </button>
                    </div>
                </div>

                <Input
                    label={formData.type === 'percentage' ? "Discount Value (%)" : "Discount Amount ($)"}
                    type="number"
                    placeholder={formData.type === 'percentage' ? "10" : "100"}
                    value={formData.value}
                    onChange={(e) => { setFormData({ ...formData, value: e.target.value }); setError(''); }}
                />

                <Input
                    label="Usage Limit"
                    type="number"
                    placeholder="Total uses allowed"
                    value={formData.limit}
                    onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                />
            </div>

            {error && <p className="text-xs font-bold text-red-500">{error}</p>}

            <Button type="button" variant="primary" fullWidth size="lg" onClick={handleAdd}>
                Add Promo Code to List
            </Button>
        </div>
    );
};

export default PromoCodeForm;
