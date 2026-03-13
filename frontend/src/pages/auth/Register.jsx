import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { authService } from '../../services/authService';
import Button from '../../components/ui/Button';

// Icons for the showcase
const TicketIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
);

const ChartIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const QRIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
    </svg>
);

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await authService.register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            navigate(ROUTES.ORGANIZER_DASHBOARD);
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="fixed inset-0 h-screen w-full flex bg-gray-50 overflow-hidden select-none font-['Outfit']">
            {/* Left Section: Visual Experience */}
            <div className="hidden lg:flex lg:w-[60%] h-full relative bg-indigo-700 overflow-hidden flex-col justify-between p-10 xl:p-16 text-white">
                {/* Energetic Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-purple-600 rounded-full blur-[150px] opacity-60 animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-500 rounded-full blur-[120px] opacity-40"></div>
                    {/* Crowd/Lights Silhouettes - Simulated with shapes */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                    {/* Logo Section */}
                    <Link to="/" className="mb-4 inline-block group cursor-pointer w-fit">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                                <span className="text-indigo-600 font-black text-2xl italic">E</span>
                            </div>
                            <span className="text-2xl font-black tracking-tight tracking-[-0.05em] group-hover:text-indigo-200 transition-colors duration-300">EventHubix</span>
                        </div>
                    </Link>

                    <div className="max-w-xl flex-grow flex flex-col justify-center">
                        <h1 className="text-4xl xl:text-6xl font-black leading-[1.05] tracking-tight mb-4">
                            Bring Your Events <br />
                            <span className="text-indigo-200">To Life 🎉</span>
                        </h1>
                        <p className="text-base xl:text-xl text-indigo-100/90 leading-relaxed mb-8 max-w-lg">
                            Create, promote and sell tickets for your events using a powerful event management platform.
                        </p>

                        {/* Feature Highlights */}
                        <div className="space-y-4 mb-8">
                            {[
                                { icon: <TicketIcon />, text: "Smart Ticketing System" },
                                { icon: <ChartIcon />, text: "Real-time Sales Analytics" },
                                { icon: <QRIcon />, text: "QR Code Event Entry" }
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-4 group cursor-default">
                                    <div className="w-10 h-10 xl:w-12 xl:h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                                        <div className="scale-75 xl:scale-100">{feature.icon}</div>
                                    </div>
                                    <span className="text-sm xl:text-lg font-bold tracking-wide">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { val: "2400+", label: "Events Hosted" },
                                { val: "180K+", label: "Tickets Sold" },
                                { val: "500+", label: "Event Organizers" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl xl:rounded-3xl p-4 xl:p-6 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="text-lg xl:text-2xl font-black mb-1">{stat.val}</div>
                                    <div className="text-[10px] xl:text-xs font-bold text-indigo-200 uppercase tracking-widest leading-tight">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 text-indigo-300/60 text-xs font-medium">
                        © {new Date().getFullYear()} EventHubix Platform. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Right Section: Register Card */}
            <div className="w-full lg:w-[40%] h-full flex items-center justify-center p-6 xl:p-12 relative bg-white">
                {/* Decorative background shapes for right side */}
                <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-50 rounded-full blur-3xl -z-10"></div>

                <div className="w-full max-w-[520px] bg-white rounded-[60px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.1)] border border-gray-100 p-12 xl:p-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="text-center mb-6 xl:mb-10">
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Create your account</h2>
                        <p className="text-gray-500 font-semibold text-base xl:text-lg leading-tight">Start hosting events for free — no credit card required</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-3">
                                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <div className="space-y-2 xl:space-y-2.5">
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => handleChange('name', e.target.value)}
                                placeholder="Jane Smith"
                                required
                                className="w-full h-14 xl:h-16 px-6 rounded-2xl bg-gray-50/50 border border-gray-100 text-gray-900 text-base focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 placeholder:text-gray-400 font-medium"
                            />
                        </div>

                        <div className="space-y-2 xl:space-y-2.5">
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => handleChange('email', e.target.value)}
                                placeholder="jane@company.com"
                                required
                                className="w-full h-14 xl:h-16 px-6 rounded-2xl bg-gray-50/50 border border-gray-100 text-gray-900 text-base focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 placeholder:text-gray-400 font-medium"
                            />
                        </div>

                        <div className="space-y-2 xl:space-y-2.5">
                            <label className="text-sm font-bold text-gray-700 ml-1 uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={e => handleChange('password', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full h-14 xl:h-16 px-6 rounded-2xl bg-gray-50/50 border border-gray-100 text-gray-900 text-base focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 placeholder:text-gray-400 font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors p-2"
                                >
                                    {showPassword ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 ml-1 py-1">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="w-4 h-4 rounded-md border-gray-200 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all mt-0.5"
                            />
                            <label htmlFor="terms" className="text-sm font-bold text-gray-500 leading-normal cursor-pointer select-none">
                                I agree to <Link to="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">Terms of Service</Link> and <Link to="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">Privacy Policy</Link>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="xl"
                            fullWidth
                            isLoading={isLoading}
                            className="h-16 xl:h-[72px] rounded-[24px] text-xl font-black shadow-[0_12px_24px_-4px_rgba(79,70,229,0.3)] hover:shadow-[0_16px_32px_-4px_rgba(79,70,229,0.4)] transition-all active:scale-[0.98] mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 border-none"
                        >
                            Start Hosting Events 🚀
                        </Button>

                        <div className="text-center pt-4 xl:pt-6">
                            <p className="text-sm text-gray-500 font-medium">
                                Already have an account?{' '}
                                <Link to="/login" className="text-indigo-600 font-black hover:text-indigo-800 transition-colors">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
