import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * ScannerLayout for entry staff
 * Focuses on full-screen utility with minimal chrome
 */
const ScannerLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#0A0A0F] text-white">
            <main>
                {children || <Outlet />}
            </main>
        </div>
    );
};

export default ScannerLayout;
