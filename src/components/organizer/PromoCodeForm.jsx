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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave?.(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Promo Code"
                    placeholder="e.g. SUMMER20"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    required
                />

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Discount Type</label>
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'percentage' })}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.type === 'percentage' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Percentage (%)
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'fixed' })}
                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${formData.type === 'fixed' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Fixed Amount (₹)
                        </button>
                    </div>
                </div>

                <Input
                    label={formData.type === 'percentage' ? "Discount Value (%)" : "Discount Amount (₹)"}
                    type="number"
                    placeholder={formData.type === 'percentage' ? "10" : "100"}
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    required
                />

                <Input
                    label="Usage Limit"
                    type="number"
                    placeholder="Total uses allowed"
                    value={formData.limit}
                    onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                />
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg">
                Generate Promo Code
            </Button>
        </form>
    );
};

export default PromoCodeForm;
