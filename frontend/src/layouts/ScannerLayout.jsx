import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

/**
 * ScannerLayout for entry staff
 * Focuses on full-screen utility with minimal chrome
 */
const ScannerLayout = ({ children }) => {
    // Auth Guard
    const token = localStorage.getItem('token');
    const userRole = JSON.parse(localStorage.getItem('user') || '{}')?.role?.toUpperCase();
    const isAuthorized = userRole === 'ORGANIZER' || userRole === 'STAFF';

    if (!token || !isAuthorized) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white">
            <main>
                {children || <Outlet />}
            </main>
        </div>
    );
};

export default ScannerLayout;
