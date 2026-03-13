import React, { useState } from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

import { authService } from '../../services/authService';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const passwordMismatch = formData.confirm && formData.password !== formData.confirm;

    const handleRegister = async (e) => {
        e.preventDefault();
        if (passwordMismatch) return;
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

    const field = (key) => ({
        value: formData[key],
        onChange: (e) => setFormData(d => ({ ...d, [key]: e.target.value })),
    });

    return (
        <AuthLayout title="Create your account" subtitle="Start hosting events for free — no credit card required">
            <form onSubmit={handleRegister} className="space-y-5">
                <Input label="Full Name" placeholder="Jane Smith" required {...field('name')} />
                <Input label="Email Address" type="email" placeholder="jane@yourorg.com" required {...field('email')} />
                <Input label="Password" type="password" placeholder="Min. 8 characters" required {...field('password')} />
                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Repeat your password"
                    required
                    error={passwordMismatch ? 'Passwords do not match' : undefined}
                    {...field('confirm')}
                />

                <div className="flex items-start gap-2 pt-1">
                    <input type="checkbox" id="terms" required className="w-4 h-4 mt-0.5 rounded border-gray-300 text-indigo-600 cursor-pointer flex-shrink-0" />
                    <label htmlFor="terms" className="text-sm text-gray-500 cursor-pointer select-none leading-relaxed">
                        I agree to the{' '}
                        <a href="#" className="text-indigo-600 font-semibold hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-indigo-600 font-semibold hover:underline">Privacy Policy</a>
                    </label>
                </div>

                <Button type="submit" size="lg" fullWidth isLoading={isLoading}>
                    Create Free Account
                </Button>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Register;
