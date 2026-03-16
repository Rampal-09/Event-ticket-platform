import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import Button from '../../components/ui/Button';

const ClockIcon = () => (
    <svg className="w-20 h-20 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const AccountPendingPage = () => {
    return (
        <div className="fixed inset-0 h-screen w-full flex bg-gray-50 overflow-hidden select-none font-['Outfit']">
            {/* Left Section: Visual Experience (Reused from Register) */}
            <div className="hidden lg:flex lg:w-[60%] h-full relative bg-indigo-700 overflow-hidden flex-col justify-between p-10 xl:p-16 text-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-purple-600 rounded-full blur-[150px] opacity-60 animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-500 rounded-full blur-[120px] opacity-40"></div>
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between">
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
                            Trust and <br />
                            <span className="text-indigo-200">Quality First 🛡️</span>
                        </h1>
                        <p className="text-base xl:text-xl text-indigo-100/90 leading-relaxed mb-8 max-w-lg">
                            We manually verify every organizer to ensure the highest quality events on our platform.
                        </p>
                    </div>

                    <div className="pt-4 text-indigo-300/60 text-xs font-medium">
                        © {new Date().getFullYear()} EventHubix Platform. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Right Section: Pending Status Card */}
            <div className="w-full lg:w-[40%] h-full flex items-center justify-center p-6 xl:p-12 relative bg-white">
                <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-50 rounded-full blur-3xl -z-10"></div>

                <div className="w-full max-w-[520px] bg-white rounded-[60px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.1)] border border-gray-100 p-12 xl:p-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex justify-center mb-8">
                        <div className="w-32 h-32 bg-indigo-600 rounded-[40px] shadow-[0_20px_40px_-12px_rgba(79,70,229,0.4)] flex items-center justify-center p-4">
                            <ClockIcon />
                        </div>
                    </div>

                    <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Account Pending</h2>
                    
                    <div className="space-y-6 mb-10 text-left bg-gray-50/50 rounded-3xl p-8 border border-gray-100">
                        <p className="text-gray-600 font-bold text-lg leading-relaxed">
                            Your organizer account request has been submitted successfully!
                        </p>
                        <p className="text-gray-500 font-medium text-base leading-relaxed">
                            Our admin team will review your organization details. You will receive full access to the dashboard once your account is approved.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm font-bold text-indigo-600">
                                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                                Verification typically takes 24-48h
                            </li>
                            <li className="flex items-center gap-3 text-sm font-bold text-indigo-600">
                                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                                Check your email for updates
                            </li>
                        </ul>
                    </div>

                    <Link to={ROUTES.HOME}>
                        <Button
                            variant="primary"
                            size="xl"
                            fullWidth
                            className="h-16 xl:h-[72px] rounded-[24px] text-xl font-black shadow-[0_12px_24px_-4px_rgba(79,70,229,0.3)] hover:shadow-[0_16px_32px_-4px_rgba(79,70,229,0.4)] transition-all bg-gradient-to-r from-indigo-600 to-purple-600 border-none"
                        >
                            Return to Homepage
                        </Button>
                    </Link>

                    <div className="mt-8">
                        <p className="text-sm text-gray-400 font-medium italic">
                            Need help? Contact our <Link to="#" className="text-indigo-400 hover:text-indigo-600 underline font-bold transition-colors">support team</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPendingPage;
