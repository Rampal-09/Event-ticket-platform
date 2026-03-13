import React from 'react';

/**
 * TicketSalesChart - Premium visual simulation of sales data
 */
const TicketSalesChart = ({ data }) => {
    // Mock data if none provided
    const salesData = data || [40, 70, 45, 90, 65, 80, 50];
    const max = Math.max(...salesData);

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Sales Velocity (24h)</h4>
            <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2">
                {salesData.map((val, i) => (
                    <div key={i} className="flex-1 group relative">
                        <div
                            className="w-full bg-indigo-50 group-hover:bg-indigo-100 transition-all duration-500 rounded-t-lg"
                            style={{ height: `${(val / max) * 100}%` }}
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {val}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>00:00</span>
            </div>
        </div>
    );
};

export default TicketSalesChart;
