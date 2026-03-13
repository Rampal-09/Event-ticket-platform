import React from 'react';

const UserTable = ({ users, onSuspend, onActivate, onVerify, updatingId, onViewDetails }) => {
    return (
        <div className="bg-white">
            <div className="overflow-x-auto">
                <table className="w-full text-left hidden md:table border-collapse min-w-[700px]">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">User Details</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Role</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Joined</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map((user) => (
                            <tr key={user.id} className={`hover:bg-gray-50/30 transition-colors ${updatingId === user.id ? 'opacity-50 pointer-events-none' : ''}`}>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-sm border border-indigo-100 flex-shrink-0 animate-in zoom-in-50">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <p className="font-bold text-gray-900 leading-tight">{user.name}</p>
                                                {user.isVerified && (
                                                    <svg className="w-3.5 h-3.5 text-sky-500 fill-sky-500" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 font-medium mt-0.5 tracking-tight">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`px-2 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit ${user.role === 'ADMIN' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                        'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${user.status === 'ACTIVE'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                        {user.status}
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-xs text-gray-500 font-black uppercase tracking-tighter whitespace-nowrap">
                                    {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onVerify && onVerify(user.id, user.isVerified)}
                                            className={`p-2.5 rounded-xl transition-all active:scale-95 border border-transparent ${user.isVerified ? 'text-sky-600 bg-sky-50 border-sky-100' : 'text-gray-400 hover:text-sky-600 hover:bg-sky-50 hover:border-sky-100'}`}
                                            title={user.isVerified ? "Unverify User" : "Verify User"}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                        <a
                                            href={`mailto:${user.email}`}
                                            className="p-2.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all active:scale-95 flex items-center justify-center"
                                            title="Contact User"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </a>
                                        <button
                                            onClick={() => onViewDetails && onViewDetails(user)}
                                            className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all active:scale-95"
                                            title="View Details"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                        {user.status === 'ACTIVE' ? (
                                            <button
                                                onClick={() => onSuspend(user.id)}
                                                className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-95 border border-transparent hover:border-rose-100"
                                                title="Suspend Account"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => onActivate(user.id)}
                                                className="p-2.5 text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all active:scale-95 border border-transparent hover:border-emerald-100"
                                                title="Reactivate Account"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-gray-50">
                    {users.map((user) => (
                        <div key={user.id} className={`p-5 space-y-4 hover:bg-gray-50/50 transition-colors ${updatingId === user.id ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-sm border border-indigo-100 flex-shrink-0">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <p className="font-bold text-gray-900 leading-tight">{user.name}</p>
                                            {user.isVerified && (
                                                <svg className="w-3.5 h-3.5 text-sky-500 fill-sky-500" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                </svg>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5 tracking-tight">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Role</p>
                                    <span className={`inline-block px-2 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${user.role === 'ADMIN' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                        'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                    }`}>
                                        {user.role}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Status</p>
                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${user.status === 'ACTIVE'
                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                        : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                        {user.status}
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Joined Platform</p>
                                    <p className="text-xs text-gray-900 font-black uppercase tracking-widest">{new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-3 border-t border-gray-50 flex-wrap">
                                <div className="grid grid-cols-2 gap-2 w-full">
                                    <button
                                        onClick={() => onVerify && onVerify(user.id, user.isVerified)}
                                        className={`flex-1 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border flex items-center justify-center gap-2 ${user.isVerified ? 'bg-sky-50 text-sky-600 border-sky-100' : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-sky-50 hover:text-sky-600'}`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {user.isVerified ? 'Verified' : 'Verify'}
                                    </button>
                                    <a
                                        href={`mailto:${user.email}`}
                                        className="flex-1 px-4 py-3 bg-gray-50 hover:bg-amber-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-amber-600 transition-all border border-gray-100 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        Contact
                                    </a>
                                    <button
                                        onClick={() => onViewDetails && onViewDetails(user)}
                                        className="flex-1 px-4 py-3 bg-gray-50 hover:bg-indigo-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-indigo-600 transition-all border border-gray-100 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        Details
                                    </button>
                                {user.status === 'ACTIVE' ? (
                                    <button
                                        onClick={() => onSuspend(user.id)}
                                        className="flex-1 px-4 py-3 bg-gray-50 hover:bg-rose-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-rose-600 transition-all border border-rose-100 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                        Suspend
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onActivate(user.id)}
                                        className="flex-1 px-4 py-3 bg-gray-50 hover:bg-emerald-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-emerald-600 transition-all border border-emerald-100 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Activate
                                    </button>
                                )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserTable;
