import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import CheckoutSummary from '../../components/checkout/CheckoutSummary';
import PromoCodeInput from '../../components/checkout/PromoCodeInput';
import PriceBreakdown from '../../components/checkout/PriceBreakdown';
import CheckoutButton from '../../components/checkout/CheckoutButton';
import { calcCheckoutBreakdown } from '../../utils/feeCalculator';
import Input from '../../components/ui/Input';
import { ROUTES } from '../../router/routes';
import { eventService } from '../../services/eventService';
import { ticketService } from '../../services/ticketService';
import { useToast } from '../../components/ui/Toast';

const CheckoutPage = () => {
    const { addToast } = useToast();
    const { eventId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const initialQty = parseInt(searchParams.get('qty')) || 1;
    const [event, setEvent] = useState(null);
    const [isLoadingEvent, setIsLoadingEvent] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });
    const [discount, setDiscount] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            setIsLoadingEvent(true);
            try {
                const data = await eventService.getPublicEventById(eventId);
                setEvent(data);
            } catch (err) {
                console.error('Fetch event detail error:', err);
            } finally {
                setIsLoadingEvent(false);
            }
        };
        fetchEvent();
    }, [eventId]);

    const { total: totalAmount, isFree } = useMemo(() => {
        return calcCheckoutBreakdown(event?.ticketPrice, initialQty, discount);
    }, [event, initialQty, discount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await ticketService.purchaseTickets({
                eventId: parseInt(eventId),
                quantity: initialQty,
                attendeeName: formData.name,
                attendeeEmail: formData.email,
                promoCode: discount?.code,
                paymentMethod: 'STRIPE' 
            });
            
            // Navigate to success page with the first ticket ID as reference
            // The backend returns an array of tickets
            if (response.tickets && response.tickets.length > 0) {
                const firstTicketId = response.tickets[0].id;
                addToast('Tickets purchased successfully! Redirecting...', 'success');
                navigate(`${ROUTES.ORDER_SUCCESS}?id=${firstTicketId}`);
            } else {
                throw new Error('Purchase completed but no ticket ID was returned.');
            }
        } catch (err) {
            addToast(err.message || 'Payment failed. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoadingEvent) {
        return <div className="py-20 text-center font-black text-gray-400 uppercase tracking-widest">Initialising Checkout...</div>;
    }

    if (!event) {
        return <div className="py-20 text-center font-bold">Event not found.</div>;
    }

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
                            {isFree ? (
                                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-emerald-900">Zero Payment Required</h4>
                                        <p className="text-sm text-emerald-700 font-medium">This is a free event. No card details are needed. Just confirm your info and get your tickets!</p>
                                    </div>
                                </div>
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Summary */}
                    <div className="space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <CheckoutSummary
                                title={event.title}
                                date={event.eventDate}
                                location={event.location}
                                image={event.image}
                                quantity={initialQty}
                            />

                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
                                <PromoCodeInput eventId={eventId} onApply={setDiscount} />

                                <PriceBreakdown
                                    ticketPrice={event.ticketPrice}
                                    quantity={initialQty}
                                    discount={discount}
                                />

                                <CheckoutButton
                                    isLoading={isSubmitting}
                                    totalAmount={totalAmount}
                                    isFree={isFree}
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
