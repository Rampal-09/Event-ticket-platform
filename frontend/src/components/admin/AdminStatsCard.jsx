import React from 'react';

/**
 * AdminStatsCard - Displays summary metrics for the admin dashboard.
 */
const AdminStatsCard = ({ label, value, trend, color = 'indigo', icon }) => {
    const colorMap = {
        indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100',
        emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100',
        amber: 'text-amber-600 bg-amber-50 border-amber-100',
        rose: 'text-rose-600 bg-rose-50 border-rose-100',
        slate: 'text-slate-600 bg-slate-50 border-slate-100'
    };

    const activeColor = colorMap[color] || colorMap.indigo;

    return (
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md group">
            <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${activeColor} border transition-transform group-hover:scale-110`}>
                    {icon}
                </div>
                {trend !== undefined && (
                    <div className={`text-[10px] font-black px-2 py-1 rounded-lg ${trend >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {trend >= 0 ? '+' : ''}{trend}%
                    </div>
                )}
            </div>
            <div className="mt-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
            </div>
        </div>
    );
};

export default AdminStatsCard;
