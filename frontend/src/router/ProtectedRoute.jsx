import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './routes';

/**
 * A basic Protected Route component.
 * In a real app, this would check authentication state from a context or store.
 * For now, it uses a mock check.
 */
const ProtectedRoute = ({ allowedRoles = [] }) => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    const userRole = user?.role?.toLowerCase() || '';
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    const isAuthorized = allowedRoles.length === 0 || 
        allowedRoles.some(role => role.toLowerCase() === userRole);

    if (!isAuthorized) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
