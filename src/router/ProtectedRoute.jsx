import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './routes';

/**
 * A basic Protected Route component.
 * In a real app, this would check authentication state from a context or store.
 * For now, it uses a mock check.
 */
const ProtectedRoute = ({ allowedRoles = [] }) => {
    // Read from sessionStorage when set by demo login; fall back to mock values.
    const isAuthenticated = sessionStorage.getItem('ep_auth') === 'true' || true;
    const userRole = sessionStorage.getItem('ep_role') || 'organizer';

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        // If user doesn't have the required role, redirect to home or a generic unauthorized page
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
