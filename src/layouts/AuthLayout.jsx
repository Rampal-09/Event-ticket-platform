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

                <Link to="/" className="relative inline-flex bg-white/10 p-3 rounded-2xl border border-white/20 backdrop-blur-sm shadow-xl items-center justify-center max-w-fit mb-6">
                    <img
                        src="/logo/eventhubix-logo.png"
                        alt="EventHubix Logo"
                        className="h-32 lg:h-20 w-auto object-contain drop-shadow-lg"
                    />
                </Link>

                <div className="relative space-y-6">
                    <h1 className="text-5xl font-black text-white leading-tight">
                        Bring your events<br />to life.
                    </h1>
                    <p className="text-indigo-200 text-lg leading-relaxed max-w-sm">
                        Create, manage, and sell tickets to your events. Join thousands of organizers who trust EventHubix.
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

                <p className="relative text-indigo-300 text-sm">&copy; {new Date().getFullYear()} EventHubix. All rights reserved.</p>
            </div>

            {/* Right Form Panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center">
                        <Link to="/" className="inline-flex items-center justify-center bg-gray-50 px-5 py-3 rounded-2xl shadow-sm border border-gray-100 mb-6 w-full sm:w-auto">
                            <img
                                src="/logo/eventhubix-logo.png"
                                alt="EventHubix Logo"
                                className="h-12 w-auto object-contain block mx-auto"
                            />
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
