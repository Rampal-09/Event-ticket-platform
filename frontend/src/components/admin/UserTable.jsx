import React from 'react';

const UserTable = ({ users, onSuspend, onActivate, onChangeRole, updatingId }) => {
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
                                            <p className="font-bold text-gray-900 leading-tight">{user.name}</p>
                                            <p className="text-xs text-gray-500 font-medium mt-0.5 tracking-tight">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`px-2 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-fit ${user.role === 'ADMIN' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                        user.role === 'ORGANIZER' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                                            user.role === 'STAFF' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                'bg-blue-50 text-blue-600 border border-blue-100'
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
                                            onClick={() => onChangeRole(user.id)}
                                            className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all active:scale-95"
                                            title="Cycle Role"
                                        >
                                            {updatingId === user.id ? (
                                                <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            )}
                                        </button>
                                        {user.status === 'ACTIVE' ? (
                                            <button
                                                onClick={() => onSuspend(user.id)}
                                                className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all active:scale-95"
                                                title="Suspend Account"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                                                </svg>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => onActivate(user.id)}
                                                className="p-2.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all active:scale-95"
                                                title="Reactivate Account"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                                        <p className="font-bold text-gray-900 leading-tight">{user.name}</p>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5 tracking-tight">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">Role</p>
                                    <span className={`inline-block px-2 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${user.role === 'ADMIN' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                        user.role === 'ORGANIZER' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                                            user.role === 'STAFF' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                'bg-blue-50 text-blue-600 border border-blue-100'
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
                                <button
                                    onClick={() => onChangeRole(user.id)}
                                    className="flex-1 px-4 py-3 bg-gray-50 hover:bg-indigo-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-indigo-600 transition-all border border-gray-100 flex items-center justify-center gap-2"
                                >
                                    {updatingId === user.id ? 'Syncing...' : 'Change Role'}
                                </button>
                                {user.status === 'ACTIVE' ? (
                                    <button
                                        onClick={() => onSuspend(user.id)}
                                        className="flex-1 px-4 py-3 bg-gray-50 hover:bg-rose-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-rose-600 transition-all border border-gray-100"
                                    >
                                        Suspend
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onActivate(user.id)}
                                        className="flex-1 px-4 py-3 bg-gray-50 hover:bg-emerald-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-emerald-600 transition-all border border-gray-100"
                                    >
                                        Activate
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserTable;
