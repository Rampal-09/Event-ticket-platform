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
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isBuyerCovering = (EVENT_MOCK.serviceFeeType || 'BUYER') === 'BUYER';
    const feeRate = EVENT_MOCK.serviceFeeRate || 0.03;
    
    const total = formData.quantity * EVENT_MOCK.price;
    const serviceFee = isBuyerCovering ? parseFloat((total * feeRate).toFixed(2)) : 0;

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="min-h-screen bg-[#F8F9FC] relative overflow-hidden font-['Inter'] selection:bg-indigo-100 selection:text-indigo-900">
            {/* Background Aesthetic Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-blue-100/50 rounded-full blur-[100px]" />
            </div>

            <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24">
                {/* Header Section */}
                <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                    <div className="space-y-4 max-w-2xl animate-in fade-in slide-in-from-top-4 duration-1000">
                        <div className="flex items-center justify-center lg:justify-start gap-2.5">
                            <span className="w-10 h-1 bg-indigo-600 rounded-full" />
                            <p className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.3em]">Checkout Protocol</p>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-none">
                            Complete Your <span className="gradient-text">Order</span>
                        </h1>
                        <p className="text-gray-500 font-medium text-lg lg:text-xl">Secure your spot at the most anticipated event of the season.</p>
                    </div>

                    {/* Step Indicator - Premium Redesign */}
                    <div className="inline-flex bg-white/50 backdrop-blur-xl p-2 rounded-[2rem] border border-white/80 shadow-2xl shadow-indigo-500/5 self-center lg:self-end animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
                        {[
                            { label: 'Attendee', step: 1 },
                            { label: 'Payment', step: 2 }
                        ].map((s, i) => (
                            <div key={s.label} className="flex items-center">
                                <div className={`flex items-center gap-3 px-6 py-3 rounded-[1.5rem] transition-all duration-500 ${step === s.step ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/30' : 'text-gray-400'}`}>
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all duration-500 ${step === s.step ? 'bg-white text-indigo-600 border-white' : 'border-gray-200'}`}>
                                        {step > s.step ? '✓' : i + 1}
                                    </span>
                                    <span className="text-[11px] font-black uppercase tracking-widest">{s.label}</span>
                                </div>
                                {i === 0 && <div className="w-8 flex justify-center opacity-20"><div className="w-1 h-1 bg-gray-400 rounded-full" /></div>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Panel: Form Sections */}
                    <div className="lg:col-span-7 space-y-10">
                        {step === 1 && (
                            <div className="group transition-all duration-500 animate-in fade-in slide-in-from-left-8 duration-1000">
                                <div className="glass rounded-[3rem] p-10 lg:p-14 shadow-2xl shadow-indigo-500/5 border-white/50 hover:border-indigo-200 transition-colors">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-xl shadow-indigo-600/30">1</div>
                                        <div>
                                            <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Attendee Information</h2>
                                            <p className="text-gray-400 text-sm font-medium mt-1">Provide your details for ticket delivery.</p>
                                        </div>
                                    </div>
                                    
                                    <form onSubmit={handleInfoSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2.5">
                                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] ml-2">Full Name</label>
                                                <input 
                                                    required 
                                                    className="w-full bg-gray-50/50 border border-gray-100 h-16 rounded-[1.5rem] px-6 text-gray-900 font-bold placeholder:text-gray-300 focus:bg-white focus:border-indigo-600 transition-all outline-none focus:ring-4 focus:ring-indigo-600/5"
                                                    placeholder="Jane Smith"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2.5">
                                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] ml-2">Email Identity</label>
                                                <input 
                                                    type="email" 
                                                    required 
                                                    className="w-full bg-gray-50/50 border border-gray-100 h-16 rounded-[1.5rem] px-6 text-gray-900 font-bold placeholder:text-gray-300 focus:bg-white focus:border-indigo-600 transition-all outline-none focus:ring-4 focus:ring-indigo-600/5"
                                                    placeholder="you@agency.com"
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] ml-2">Ticket Manifest</label>
                                            <div className="flex items-center gap-4 bg-gray-50/80 p-3 rounded-[2rem] border border-gray-100 w-fit">
                                                <button type="button" onClick={() => setFormData(d => ({ ...d, quantity: Math.max(1, d.quantity - 1) }))}
                                                    className="w-12 h-12 rounded-2xl bg-white text-gray-900 hover:bg-indigo-600 hover:text-white shadow-sm border border-gray-100 transition-all active:scale-95 flex items-center justify-center text-xl font-bold">
                                                    −
                                                </button>
                                                <div className="px-6 text-center">
                                                    <span className="block text-2xl font-black text-gray-900">{formData.quantity}</span>
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Quantity</span>
                                                </div>
                                                <button type="button" onClick={() => setFormData(d => ({ ...d, quantity: Math.min(10, d.quantity + 1) }))}
                                                    className="w-12 h-12 rounded-2xl bg-white text-gray-900 hover:bg-indigo-600 hover:text-white shadow-sm border border-gray-100 transition-all active:scale-95 flex items-center justify-center text-xl font-bold">
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pt-6">
                                            <Button type="submit" size="xl" className="h-16 rounded-[1.8rem] text-[15px] font-black uppercase tracking-widest shadow-2xl shadow-indigo-600/20" fullWidth>
                                                Proceed to Payment
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-1000">
                                <div className="glass rounded-[3rem] p-10 lg:p-14 shadow-2xl shadow-indigo-500/5 border-white/50">
                                    <div className="flex items-center justify-between mb-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black shadow-xl shadow-indigo-600/30">2</div>
                                            <div>
                                                <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Payment Engine</h2>
                                                <p className="text-gray-400 text-sm font-medium mt-1">Encrypted and secure transaction.</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setStep(1)} className="px-5 py-2.5 rounded-xl bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95">← Edit Info</button>
                                    </div>

                                    <form onSubmit={handlePayment} className="space-y-8">
                                        <div className="space-y-2.5">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] ml-2">Name on Card</label>
                                            <input required className="w-full bg-gray-50/50 border border-gray-100 h-16 rounded-[1.5rem] px-6 text-gray-900 font-bold outline-none focus:bg-white focus:border-indigo-600 transition-all" placeholder="Jane Smith" />
                                        </div>
                                        <div className="space-y-2.5">
                                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] ml-2">Secure Card Number</label>
                                            <input required className="w-full bg-gray-50/50 border border-gray-100 h-16 rounded-[1.5rem] px-6 text-gray-900 font-bold outline-none focus:bg-white focus:border-indigo-600 transition-all font-mono tracking-widest" placeholder="●●●● ●●●● ●●●● 1234" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2.5">
                                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] ml-2">Expiry</label>
                                                <input required className="w-full bg-gray-50/50 border border-gray-100 h-16 rounded-[1.5rem] px-6 text-gray-900 font-bold outline-none focus:bg-white focus:border-indigo-600 transition-all" placeholder="MM / YY" />
                                            </div>
                                            <div className="space-y-2.5">
                                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] ml-2">CVC</label>
                                                <input required className="w-full bg-gray-50/50 border border-gray-100 h-16 rounded-[1.5rem] px-6 text-gray-900 font-bold outline-none focus:bg-white focus:border-indigo-600 transition-all" placeholder="•••" />
                                            </div>
                                        </div>

                                        <div className="p-6 bg-indigo-900 rounded-[2rem] border border-indigo-800 shadow-xl flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-800 flex items-center justify-center text-white flex-shrink-0 animate-pulse">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                            </div>
                                            <p className="text-[11px] font-black text-indigo-100/60 uppercase tracking-widest leading-relaxed">
                                                Protocol Secured: <span className="text-white">256-bit AES Encryption</span> active. No local data stored.
                                            </p>
                                        </div>

                                        <div className="pt-6">
                                            <Button type="submit" size="xl" fullWidth isLoading={isSubmitting} className="h-20 rounded-[2rem] text-[16px] font-black uppercase tracking-[0.3em] bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-600/20 border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 transition-all">
                                                Finalize Transaction
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Panel: Digital Invoice Order Summary */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        <div className="glass rounded-[3rem] p-4 shadow-2xl shadow-indigo-500/10 border-white/50">
                            <div className="bg-gray-900 rounded-[2.5rem] p-10 lg:p-12 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                                
                                <div className="relative space-y-10">
                                    <div>
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3">Investment Details</p>
                                        <h3 className="text-3xl font-black tracking-tight">{EVENT_MOCK.title}</h3>
                                        <div className="mt-6 space-y-2 text-gray-400 text-sm font-medium">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                {EVENT_MOCK.date}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                {EVENT_MOCK.location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-10 border-t border-white/10">
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Promotion Protocol</p>
                                            <div className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    placeholder="Enter Code"
                                                    value={promoCode}
                                                    onChange={e => setPromoCode(e.target.value.toUpperCase())}
                                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-black tracking-widest outline-none focus:border-indigo-500 transition-all"
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        if(promoCode === 'SAVE20') {
                                                            setAppliedPromo({ code: 'SAVE20', discount: 20 });
                                                            setPromoCode('');
                                                        }
                                                    }}
                                                    className="px-6 py-3 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                            {appliedPromo && (
                                                <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Code Applied: {appliedPromo.code}</span>
                                                    <span className="text-emerald-400 font-black">-${appliedPromo.discount.toFixed(2)}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-6 pt-6 border-t border-white/5">
                                            <div className="flex justify-between items-center">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-black uppercase tracking-widest text-white">General Access</p>
                                                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{formData.quantity} × ${EVENT_MOCK.price}.00</p>
                                                </div>
                                                <span className="text-xl font-black tracking-tighter">${total.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-black uppercase tracking-widest text-white">Service Protocol</p>
                                                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{isBuyerCovering ? 'Platform Processing Fee' : 'Covered by Organiser'}</p>
                                                </div>
                                                <span className={`text-xl font-black tracking-tighter ${!isBuyerCovering && 'text-emerald-500'}`}>
                                                    {isBuyerCovering ? `$${serviceFee.toFixed(2)}` : 'FREE'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t border-white/10">
                                        <div className="flex justify-between items-end mb-8">
                                            <div>
                                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] mb-2">Total Exposure</p>
                                                <span className="text-5xl font-black tracking-tighter">
                                                    ${(total + serviceFee - (appliedPromo?.discount || 0)).toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-1.5 underline decoration-2">USD</p>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Guaranteeing Price Integrity for 04:59s</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
