import React from 'react';

/**
 * TicketQRCode - Visual representation of a ticket's validatable code
 */
const TicketQRCode = ({ value, size = "md" }) => {
    const sizeClasses = {
        sm: "w-20 h-20",
        md: "w-32 h-32",
        lg: "w-48 h-48"
    };

    return (
        <div className={`${sizeClasses[size]} bg-white rounded-2xl p-2.5 shadow-inner border border-gray-100 flex items-center justify-center relative group`}>
            {/* Visual aesthetic dots for QR look */}
            <div className="grid grid-cols-5 gap-1 w-full h-full opacity-90">
                {Array.from({ length: 25 }).map((_, i) => (
                    <div
                        key={i}
                        className={`rounded-[2px] ${Math.random() > 0.4 ? 'bg-gray-900' : 'bg-transparent'}`}
                    />
                ))}
            </div>

            {/* Scannable overlay simulation */}
            <div className="absolute inset-0 border-2 border-indigo-500/0 group-hover:border-indigo-500/20 rounded-2xl transition-all duration-500" />

            {/* Corners */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-900 rounded-tl-[4px]" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-900 rounded-tr-[4px]" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-900 rounded-bl-[4px]" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-900 rounded-br-[4px]" />
        </div>
    );
};

export default TicketQRCode;
