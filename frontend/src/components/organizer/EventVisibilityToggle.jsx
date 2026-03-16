import React from 'react';

/**
 * EventVisibilityToggle - Switch for Public/Private event status
 */
const EventVisibilityToggle = ({ isPublic, onChange }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-col gap-1.5 px-2">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none">
                    {isPublic ? 'Public Visibility' : 'Private Visibility'}
                </p>
                <p className="text-xs text-gray-500 font-medium leading-tight">
                    {isPublic ? 'Matches everyone in browse results' : 'Only accessible via direct link'}
                </p>
            </div>

            <button
                type="button"
                onClick={() => onChange?.(!isPublic)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isPublic ? 'bg-indigo-600' : 'bg-gray-200'}`}
            >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isPublic ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
        </div>
    );
};

export default EventVisibilityToggle;
