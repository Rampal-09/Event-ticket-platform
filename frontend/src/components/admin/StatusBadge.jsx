import React from 'react';

/**
 * StatusBadge - Visual indicator for event lifecycle status
 */
const StatusBadge = ({ status }) => {
    const configs = {
        pending: { label: 'Pending Approval', class: 'bg-amber-50 text-amber-600 border-amber-100' },
        approved: { label: 'Approved', class: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        rejected: { label: 'Rejected', class: 'bg-rose-50 text-rose-600 border-rose-100' },
        draft: { label: 'Draft', class: 'bg-gray-50 text-gray-500 border-gray-100' }
    };

    const config = configs[status.toLowerCase()] || configs.draft;

    return (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${config.class}`}>
            {config.label}
        </div>
    );
};

export default StatusBadge;
