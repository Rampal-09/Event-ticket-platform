import React, { useState } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

const EVENT_MOCK = {
    title: 'Summer Music Festival 2026',
    date: 'July 15, 2026 · 6:00 PM',
    location: 'Central Park, New York',
    price: 120,
};

const Checkout = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1 = Info, 2 = Payment
    const [formData, setFormData] = useState({ name: '', email: '', quantity: 1 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const total = formData.quantity * EVENT_MOCK.price;
    const serviceFee = parseFloat((total * 0.03).toFixed(2));

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePayment = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            navigate(ROUTES.TICKET.replace(':id', 'TCK-123456'));
        }, 1800);
    };

    return (
        <PublicLayout>
            <div style={{ background: 'linear-gradient(160deg, #EEF2FF 0%, #F8F9FC 100%)' }} className="py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb / Step Indicator */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Checkout</h1>
                        <div className="flex items-center gap-2 mt-4">
                            {['Contact Info', 'Payment'].map((label, i) => {
                                const stepNum = i + 1;
                                const isDone = step > stepNum;
                                const isActive = step === stepNum;
                                return (
                                    <React.Fragment key={label}>
                                        <div className={`flex items-center gap-2 text-sm font-semibold ${isActive ? 'text-indigo-700' : isDone ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 ${isDone ? 'bg-emerald-500 border-emerald-500 text-white'
                                                    : isActive ? 'bg-indigo-600 border-indigo-600 text-white'
                                                        : 'bg-transparent border-gray-300 text-gray-400'
                                                }`}>
                                                {isDone ? '✓' : stepNum}
                                            </div>
                                            {label}
                                        </div>
                                        {i === 0 && <div className="flex-1 h-px bg-gray-200 max-w-[60px]" />}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                        {/* Form Area */}
                        <div className="lg:col-span-3">
                            {step === 1 && (
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Your Information</h2>
                                    <form onSubmit={handleInfoSubmit} className="space-y-5">
                                        <Input
                                            label="Full Name"
                                            placeholder="e.g. Jane Smith"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        <Input
                                            label="Email Address"
                                            type="email"
                                            placeholder="you@example.com"
                                            required
                                            hint="Your ticket will be sent to this address"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-semibold text-gray-700">Number of Tickets<span className="text-red-500 ml-0.5">*</span></label>
                                            <div className="flex items-center gap-4">
                                                <button type="button" onClick={() => setFormData(d => ({ ...d, quantity: Math.max(1, d.quantity - 1) }))}
                                                    className="w-10 h-10 rounded-xl border-2 border-gray-200 hover:border-indigo-500 hover:text-indigo-600 text-xl font-bold flex items-center justify-center transition-all">
                                                    −
                                                </button>
                                                <span className="text-2xl font-black text-gray-900 w-8 text-center">{formData.quantity}</span>
                                                <button type="button" onClick={() => setFormData(d => ({ ...d, quantity: Math.min(10, d.quantity + 1) }))}
                                                    className="w-10 h-10 rounded-xl border-2 border-gray-200 hover:border-indigo-500 hover:text-indigo-600 text-xl font-bold flex items-center justify-center transition-all">
                                                    +
                                                </button>
                                                <span className="text-sm text-gray-400 font-medium">max 10 tickets</span>
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <Button type="submit" size="lg" fullWidth>Continue to Payment</Button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
                                        <button onClick={() => setStep(1)} className="text-sm text-indigo-600 font-semibold hover:underline">← Edit Info</button>
                                    </div>
                                    <form onSubmit={handlePayment} className="space-y-5">
                                        <Input label="Name on Card" placeholder="Jane Smith" required />
                                        <Input label="Card Number" placeholder="1234 5678 9012 3456" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Expiry Date" placeholder="MM / YY" required />
                                            <Input label="CVC" placeholder="123" required />
                                        </div>
                                        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3 text-sm text-indigo-700">
                                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <p>This is a simulated payment flow. No real charges are made.</p>
                                        </div>
                                        <div className="pt-4">
                                            <Button type="submit" size="xl" fullWidth isLoading={isSubmitting}
                                                rightIcon={!isSubmitting && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                                            >
                                                Pay ${(total + serviceFee).toFixed(2)}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                                <div className="h-3 w-full" style={{ background: 'linear-gradient(90deg, #4F46E5, #7C3AED)' }} />
                                <div className="p-6 space-y-5">
                                    <h3 className="font-bold text-gray-800 text-base">Order Summary</h3>

                                    <div className="bg-gray-50 rounded-2xl p-4 space-y-1">
                                        <p className="font-bold text-gray-900 text-sm">{EVENT_MOCK.title}</p>
                                        <p className="text-xs text-gray-500">{EVENT_MOCK.date}</p>
                                        <p className="text-xs text-gray-500">{EVENT_MOCK.location}</p>
                                    </div>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">{formData.quantity} × Standard Ticket</span>
                                            <span className="font-semibold">${total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Service Fee (3%)</span>
                                            <span className="font-semibold">${serviceFee.toFixed(2)}</span>
                                        </div>
                                        <div className="pt-3 border-t border-dashed border-gray-200 flex justify-between items-center">
                                            <span className="font-bold text-gray-900">Total</span>
                                            <span className="text-xl font-black text-indigo-600">${(total + serviceFee).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default Checkout;
