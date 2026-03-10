import React from 'react';

/**
 * PriceBreakdown - Component for displaying price details and calculating totals
 */
const PriceBreakdown = ({ ticketPrice, quantity, discount = null }) => {
    const subtotal = ticketPrice * quantity;
    const serviceFee = parseFloat((subtotal * 0.03).toFixed(2));

    let discountAmount = 0;
    if (discount) {
        if (discount.discountType === 'percentage') {
            discountAmount = (subtotal * discount.value) / 100;
        } else {
            discountAmount = discount.value;
        }
    }

    const total = subtotal + serviceFee - discountAmount;

    return (
        <div className="space-y-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-900">Price Breakdown</h4>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-gray-500">
                    <span>{quantity} × Standard Ticket (${ticketPrice.toFixed(2)})</span>
                    <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                    <span>Service Fee (3%)</span>
                    <span className="font-semibold text-gray-900">${serviceFee.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-emerald-600 font-bold">
                        <span>Discount ({discount.code})</span>
                        <span>−${discountAmount.toFixed(2)}</span>
                    </div>
                )}
                <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                    <span className="text-base font-black text-gray-900">Total</span>
                    <div className="text-right">
                        <span className="text-2xl font-black text-indigo-600">${total.toFixed(2)}</span>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Secure Payment</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceBreakdown;
