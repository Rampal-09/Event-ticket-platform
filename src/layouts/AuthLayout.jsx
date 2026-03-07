import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #F0FDF4 100%)' }}>
            {/* Left Brand Panel — desktop only */}
            <div className="hidden lg:flex lg:w-[45%] bg-indigo-600 relative overflow-hidden flex-col justify-between p-12">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay"></div>
                    <div className="absolute bottom-16 right-8 w-96 h-96 bg-white rounded-full mix-blend-overlay"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full mix-blend-overlay"></div>
                </div>

                <Link to="/" className="relative flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a1 1 0 01-1 1H3a1 1 0 01-1-1V6zm0 5a1 1 0 011-1h14a1 1 0 011 1v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3z" />
                        </svg>
                    </div>
                    <span className="text-2xl font-extrabold text-white">EventPass</span>
                </Link>

                <div className="relative space-y-6">
                    <h1 className="text-5xl font-black text-white leading-tight">
                        Bring your events<br />to life.
                    </h1>
                    <p className="text-indigo-200 text-lg leading-relaxed max-w-sm">
                        Create, manage, and sell tickets to your events. Join thousands of organizers who trust EventPass.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        {[
                            { value: '2,400+', label: 'Events Live' },
                            { value: '180K+', label: 'Happy Attendees' },
                        ].map(stat => (
                            <div key={stat.label} className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 backdrop-blur-sm">
                                <p className="text-3xl font-black text-white">{stat.value}</p>
                                <p className="text-indigo-200 text-sm font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="relative text-indigo-300 text-sm">&copy; {new Date().getFullYear()} EventPass. All rights reserved.</p>
            </div>

            {/* Right Form Panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center">
                        <Link to="/" className="inline-flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a1 1 0 01-1 1H3a1 1 0 01-1-1V6zm0 5a1 1 0 011-1h14a1 1 0 011 1v3a2 2 0 01-2 2H4a2 2 0 01-2-2v-3z" />
                                </svg>
                            </div>
                            <span className="text-xl font-extrabold text-gray-900">Event<span className="text-indigo-600">Pass</span></span>
                        </Link>
                    </div>

                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900">{title || 'Welcome back'}</h2>
                        <p className="mt-2 text-gray-500">{subtitle || 'Sign in to your organizer account'}</p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
