import React, { useState } from 'react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

/**
 * TicketSelector - Component for selecting ticket quantity and initiating checkout
 */
const TicketSelector = ({ eventId, ticketPrice, maxTickets = 10 }) => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const subtotal = quantity * ticketPrice;
    const serviceFee = parseFloat((subtotal * 0.03).toFixed(2));
    const total = subtotal + serviceFee;

    const handleCheckout = () => {
        // Correctly handle navigation to checkout with selection data
        // For now using the simple path, but can extend with state if needed
        navigate(`/checkout/${eventId}?qty=${quantity}`);
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* accent top bar */}
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600" />

            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Standard Ticket</p>
                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">Available</span>
                </div>
                <p className="text-4xl font-black text-gray-900">${ticketPrice}</p>
                <p className="text-xs text-gray-400 mt-1">per ticket · inclusive of all taxes</p>
            </div>

            <div className="p-6 space-y-6">
                {/* Qty stepper */}
                <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3">
                    <span className="text-sm font-semibold text-gray-700">Tickets</span>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-lg font-black border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                        >
                            −
                        </button>
                        <span className="text-lg font-black text-gray-900 w-5 text-center">{quantity}</span>
                        <button
                            onClick={() => setQuantity(q => Math.min(maxTickets, q + 1))}
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-lg font-black border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Price summary */}
                <div className="text-sm space-y-2 pt-2">
                    <div className="flex justify-between text-gray-500">
                        <span>{quantity} × ${ticketPrice}</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                        <span>Service fee (3%)</span>
                        <span>${serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-black text-gray-900 text-base pt-3 border-t border-gray-100">
                        <span>Total</span>
                        <span className="text-indigo-600">${total.toFixed(2)}</span>
                    </div>
                </div>

                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleCheckout}
                    rightIcon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    }
                >
                    Checkout Now
                </Button>

                {/* perks */}
                <div className="space-y-2.5 pt-2">
                    {['Instant QR Ticket delivery', 'Free cancellation within 48h', 'Mobile & print-friendly ticket'].map(p => (
                        <div key={p} className="flex items-center gap-2.5 text-xs text-gray-500">
                            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                            {p}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TicketSelector;
