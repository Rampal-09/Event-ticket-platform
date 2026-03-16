import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

/**
 * ScannerLayout - Standalone fullscreen scanner for entry staff.
 * No nav, no sidebar. Redirects to login (not home) if unauthenticated,
 * preserving the scanner URL so they return here after logging in.
 */
const ScannerLayout = () => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const userRole = JSON.parse(localStorage.getItem('user') || '{}')?.role?.toUpperCase();
    const isAuthorized = userRole === 'ORGANIZER' || userRole === 'STAFF' || userRole === 'ADMIN';

    if (!token || !isAuthorized) {
        // Redirect to login and pass the current scanner URL as `next`
        return <Navigate to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`} replace />;
    }

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white">
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default ScannerLayout;
