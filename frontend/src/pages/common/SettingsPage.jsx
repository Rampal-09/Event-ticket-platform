import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { api } from '../../services/api';
import { useCurrency, CURRENCIES } from '../../context/CurrencyContext';

const SettingsPage = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user?.role?.toUpperCase() === 'ADMIN';
    const { currency, setCurrencyCode } = useCurrency();

    const [profileData, setProfileData] = useState({
        name: user.name || '',
        email: user.email || ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    // Currency settings (admin only)
    const [selectedCurrency, setSelectedCurrency] = useState(currency.code);
    const [currencyStatus, setCurrencyStatus] = useState({ type: '', message: '' });
    const [isCurrencyLoading, setIsCurrencyLoading] = useState(false);

    // Keep selectedCurrency in sync with context
    useEffect(() => {
        setSelectedCurrency(currency.code);
    }, [currency.code]);

    const handleCurrencyUpdate = async (e) => {
        e.preventDefault();
        setIsCurrencyLoading(true);
        setCurrencyStatus({ type: '', message: '' });
        try {
            await api.patch('/admin/settings', { currency: selectedCurrency });
            setCurrencyCode(selectedCurrency);
            setCurrencyStatus({ type: 'success', message: `Platform currency updated to ${selectedCurrency}!` });
        } catch (err) {
            setCurrencyStatus({ type: 'error', message: err.message || 'Failed to update currency' });
        } finally {
            setIsCurrencyLoading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });
        try {
            await authService.updateProfile(profileData);
            setStatus({ type: 'success', message: 'Profile updated successfully!' });
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.error || 'Failed to update profile' });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return setStatus({ type: 'error', message: 'New passwords do not match' });
        }
        setIsLoading(true);
        setStatus({ type: '', message: '' });
        try {
            await authService.updatePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            setStatus({ type: 'success', message: 'Password updated successfully!' });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.error || 'Failed to update password' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">Account Settings</h1>
                <p className="text-gray-500 font-medium">Manage your personal information and security preferences.</p>
            </div>

            {status.message && (
                <div className={`p-4 rounded-2xl border ${
                    status.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'
                } flex items-center gap-3 animate-in slide-in-from-top-4`}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={status.type === 'success' ? "M5 13l4 4L19 7" : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"} />
                    </svg>
                    <p className="font-bold text-sm tracking-tight">{status.message}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Profile Information */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-6">
                    <div className="flex items-center gap-3 text-indigo-600 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Personal Details</h2>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="space-y-4 text-left">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 px-1">Full Name</label>
                            <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-sm text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 px-1">Email Address</label>
                            <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-sm text-gray-900"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-900/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {isLoading ? 'Processing...' : 'Save Profile'}
                        </button>
                    </form>
                </div>

                {/* Password Change */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-6">
                    <div className="flex items-center gap-3 text-amber-600 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Security & Password</h2>
                    </div>

                    <form onSubmit={handlePasswordUpdate} className="space-y-4 text-left">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 px-1">Current Password</label>
                            <input
                                type="password"
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-sm text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 px-1">New Password</label>
                            <input
                                type="password"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-sm text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 px-1">Confirm New Password</label>
                            <input
                                type="password"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-sm text-gray-900"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 shadow-lg shadow-gray-900/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {isLoading ? 'Processing...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Platform Currency — Admin Only */}
            {isAdmin && (
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-6">
                    <div className="flex items-center gap-3 text-emerald-600 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Platform Currency</h2>
                            <p className="text-xs text-gray-400 font-medium">Controls currency display across the entire platform</p>
                        </div>
                    </div>

                    {currencyStatus.message && (
                        <div className={`p-4 rounded-2xl border ${currencyStatus.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'} flex items-center gap-3`}>
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={currencyStatus.type === 'success' ? "M5 13l4 4L19 7" : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"} />
                            </svg>
                            <p className="font-bold text-sm">{currencyStatus.message}</p>
                        </div>
                    )}

                    <form onSubmit={handleCurrencyUpdate} className="space-y-4">
                        {/* Current currency display */}
                        <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                            <span className="text-3xl">{CURRENCIES[selectedCurrency]?.flag}</span>
                            <div>
                                <p className="font-black text-gray-900 text-sm">{CURRENCIES[selectedCurrency]?.name}</p>
                                <p className="text-xs text-gray-400 font-bold">{CURRENCIES[selectedCurrency]?.symbol} · {selectedCurrency}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 px-1">Select Currency</label>
                            <select
                                value={selectedCurrency}
                                onChange={(e) => setSelectedCurrency(e.target.value)}
                                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-sm text-gray-900 cursor-pointer"
                            >
                                {Object.values(CURRENCIES).map(c => (
                                    <option key={c.code} value={c.code}>
                                        {c.flag}  {c.name} ({c.symbol})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isCurrencyLoading || selectedCurrency === currency.code}
                            className="w-full py-3 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {isCurrencyLoading ? 'Saving...' : selectedCurrency === currency.code ? 'Already Active' : `Set to ${selectedCurrency}`}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
