import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { MOCK_EVENTS } from '../../data/mockEvents';
import CheckoutSummary from '../../components/checkout/CheckoutSummary';
import PromoCodeInput from '../../components/checkout/PromoCodeInput';
import PriceBreakdown from '../../components/checkout/PriceBreakdown';
import CheckoutButton from '../../components/checkout/CheckoutButton';
import Input from '../../components/ui/Input';
import { ROUTES } from '../../router/routes';

const CheckoutPage = () => {
    const { eventId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const initialQty = parseInt(searchParams.get('qty')) || 1;
    const event = MOCK_EVENTS[eventId] || MOCK_EVENTS[1]; // Fallback to first event if not found

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });
    const [discount, setDiscount] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalAmount = useMemo(() => {
        const subtotal = event.ticket_price * initialQty;
        const fee = subtotal * 0.03;
        let disc = 0;
        if (discount) {
            disc = discount.discountType === 'percentage'
                ? (subtotal * discount.value) / 100
                : discount.value;
        }
        return (subtotal + fee - disc).toFixed(2);
    }, [event.ticket_price, initialQty, discount]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate payment process
        setTimeout(() => {
            setIsSubmitting(false);
            navigate(ROUTES.ORDER_SUCCESS);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Complete Your Order</h1>
                    <p className="text-gray-500 mt-2 font-medium">Safe & Secure checkout experience</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* LEFT: Forms */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* 1. Attendee Info */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">1</span>
                                Attendee Information
                            </h3>
                            <div className="space-y-4">
                                <Input
                                    label="Full Name"
                                    placeholder="Enter your name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    hint="We'll send your tickets here"
                                />
                            </div>
                        </div>

                        {/* 2. Payment details */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">2</span>
                                Payment Details
                            </h3>
                            <div className="space-y-4">
                                <Input
                                    label="Card Number"
                                    placeholder="0000 0000 0000 0000"
                                    required
                                    value={formData.cardNumber}
                                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Expiry Date"
                                        placeholder="MM/YY"
                                        required
                                        value={formData.expiry}
                                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                                    />
                                    <Input
                                        label="CVC"
                                        placeholder="123"
                                        required
                                        value={formData.cvc}
                                        onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex items-center gap-2 text-xs text-gray-400 font-medium">
                                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                256-bit SSL encrypted secure payment
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Summary */}
                    <div className="space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <CheckoutSummary
                                title={event.title}
                                date={event.event_date}
                                location={event.location}
                                image={event.image}
                                quantity={initialQty}
                            />

                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
                                <PromoCodeInput onApply={setDiscount} />

                                <PriceBreakdown
                                    ticketPrice={event.ticket_price}
                                    quantity={initialQty}
                                    discount={discount}
                                />

                                <CheckoutButton
                                    isLoading={isSubmitting}
                                    totalAmount={totalAmount}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
