import React from 'react';

const DashboardLoader = ({ message = "Loading data..." }) => {
    return (
        <div className="py-24 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-100 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="font-black text-xs text-gray-400 uppercase tracking-[0.2em] animate-pulse">
                {message}
            </p>
        </div>
    );
};

export default DashboardLoader;
