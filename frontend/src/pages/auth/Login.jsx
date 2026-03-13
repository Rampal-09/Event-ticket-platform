import React, { useState } from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

import { authService } from '../../services/authService';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDemoLoading, setIsDemoLoading] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDemoLogin = async () => {
        setIsDemoLoading(true);
        setError('');
        try {
            const res = await authService.login({
                email: 'organizer@eventplatform.com',
                password: 'organizer123'
            });
            navigate(ROUTES.ORGANIZER_DASHBOARD);
        } catch (err) {
            setError(err.message || 'Demo login failed');
        } finally {
            setIsDemoLoading(false);
        }
    };

    const handleAdminDemoLogin = async () => {
        setIsAdminLoading(true);
        setError('');
        try {
            const res = await authService.login({
                email: 'admin@eventplatform.com',
                password: 'admin123'
            });
            navigate(ROUTES.ADMIN_DASHBOARD);
        } catch (err) {
            setError(err.message || 'Admin login failed');
        } finally {
            setIsAdminLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await authService.login({ email, password });
            if (res.user.role === 'ADMIN') {
                navigate(ROUTES.ADMIN_DASHBOARD);
            } else {
                navigate(ROUTES.ORGANIZER_DASHBOARD);
            }
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title="Welcome back" subtitle="Sign in to your organizer account">
            <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
                        {error}
                    </div>
                )}
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="organizer@example.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-gray-700">Password <span className="text-red-500">*</span></label>
                        <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">Forgot password?</a>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm bg-white text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 hover:border-gray-300 transition-all duration-150 placeholder:text-gray-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {showPassword
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                                }
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-indigo-600 cursor-pointer" />
                    <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">Remember me for 30 days</label>
                </div>

                <Button type="submit" size="lg" fullWidth isLoading={isLoading}>
                    Sign In
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">or</span>
                    <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Demo Login */}
                <div className="space-y-2">
                    <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        fullWidth
                        isLoading={isDemoLoading}
                        onClick={handleDemoLogin}
                        leftIcon={
                            !isDemoLoading && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
                                </svg>
                            )
                        }
                    >
                        Login as Demo Organizer
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        fullWidth
                        isLoading={isAdminLoading}
                        onClick={handleAdminDemoLogin}
                        leftIcon={
                            !isAdminLoading && (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            )
                        }
                    >
                        Login as Demo Admin
                    </Button>

                    <p className="text-center text-xs text-gray-400 font-medium">
                        Demo access — no credentials needed
                    </p>
                </div>

                <p className="text-center text-sm text-gray-500">
                    Don't have an organizer account?{' '}
                    <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                        Create one free
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Login;
