import React from 'react';
import { calcCheckoutBreakdown } from '../../utils/feeCalculator';

/**
 * PriceBreakdown - Displays transparent fee breakdown.
 * Free events show no processing fee.
 * Paid events show 1.5% + $0.30 per ticket.
 */
const PriceBreakdown = ({ ticketPrice, quantity, discount = null }) => {
    const { subtotal, feePerTicket, totalFee, discountAmount, total, isFree } =
        calcCheckoutBreakdown(ticketPrice, quantity, discount);

    if (isFree) {
        return (
            <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-900">Price Breakdown</h4>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center text-gray-500">
                        <span>{quantity} × Free Ticket</span>
                        <span className="font-semibold text-emerald-600">FREE</span>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 text-emerald-700 text-xs font-bold">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        No processing fee — this is a free event!
                    </div>
                    <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                        <span className="text-base font-black text-gray-900">Total</span>
                        <div className="text-right">
                            <span className="text-2xl font-black text-emerald-600">$0.00</span>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Free Registration</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-900">Price Breakdown</h4>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-gray-500">
                    <span>{quantity} × Ticket (${ticketPrice.toFixed(2)})</span>
                    <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                    <div>
                        <span>Processing Fee</span>
                        <p className="text-[10px] text-gray-400 mt-0.5">1.5% + $0.30 per ticket × {quantity}</p>
                    </div>
                    <span className="font-semibold text-gray-900">${totalFee.toFixed(2)}</span>
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
