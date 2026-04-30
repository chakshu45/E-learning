"use client";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Revenue", value: "$45,231", color: "bg-emerald-500" },
        { label: "Total Students", value: "12,402", color: "bg-indigo-500" },
        { label: "Active Courses", value: "84", color: "bg-purple-500" },
        { label: "Pending Approvals", value: "12", color: "bg-amber-500" }
    ];

    const recentUsers = [
        { name: "Alice Johnson", email: "alice@example.com", role: "Student", date: "2 mins ago" },
        { name: "Bob Smith", email: "bob@example.com", role: "Instructor", date: "15 mins ago" },
        { name: "Charlie Brown", email: "charlie@example.com", role: "Student", date: "1 hour ago" }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-12">Admin Console</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, i) => (
                    <div key={i} className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider mb-2">{stat.label}</p>
                        <div className="flex items-center space-x-4">
                            <div className={`w-2 h-8 rounded-full ${stat.color}`}></div>
                            <span className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* User Management Table */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Registrations</h2>
                        <button className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50">
                                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">User</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Role</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Joined</th>
                                    <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {recentUsers.map((user, i) => (
                                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="font-bold text-slate-900 dark:text-white">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'Instructor' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-slate-500">{user.date}</td>
                                        <td className="px-8 py-6">
                                            <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-8">
                    <div className="p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-500/20">
                        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-left px-4 transition-colors font-medium">Add New Course</button>
                            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-left px-4 transition-colors font-medium">System Settings</button>
                            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-left px-4 transition-colors font-medium">Generate Report</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
