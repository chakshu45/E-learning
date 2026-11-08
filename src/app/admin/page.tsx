"use client";

import Link from "next/link";
import { useState } from "react";

export default function Admin() {
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  const stats = [
    { label: "Total Revenue", value: "₹2,45,230", color: "bg-emerald-500" },
    { label: "Total Students", value: "12,402", color: "bg-indigo-500" },
    { label: "Active Courses", value: "4", color: "bg-purple-500" },
    { label: "System Health", value: "100%", color: "bg-amber-500" },
  ];

  const recentUsers = [
    { name: "Admin User", email: "admin@learnwithsky.com", role: "Admin", date: "Just now" },
    { name: "Anuj LearnWithSky", email: "anuj@learnwithsky.com", role: "Instructor", date: "10 mins ago" },
    { name: "Alice Johnson", email: "alice@example.com", role: "Student", date: "1 hour ago" },
    { name: "Bob Smith", email: "bob@example.com", role: "Student", date: "2 hours ago" },
  ];

  const triggerSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      setSeedStatus(data.message || "Seeding complete!");
    } catch {
      setSeedStatus("Seeding request failed");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            Admin Console
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage courses, student enrollments, system data, and platform settings.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <button
            onClick={triggerSeed}
            disabled={seeding}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 cursor-pointer disabled:opacity-50"
          >
            {seeding ? "Seeding..." : "⚡ Reset & Seed Database"}
          </button>
        </div>
      </div>

      {seedStatus && (
        <div className="mb-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-800 dark:text-emerald-300 font-bold">
          {seedStatus}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-wider mb-2">
              {stat.label}
            </p>
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
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Users</h2>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Live Platform Members
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50">
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">User</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Role</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {recentUsers.map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                      <div className="text-xs text-slate-500">{u.email}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          u.role === "Admin"
                            ? "bg-rose-100 text-rose-700"
                            : u.role === "Instructor"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-500 font-medium">{u.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-8">
          <div className="p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-500/20">
            <h3 className="text-xl font-bold mb-4">Quick Navigation</h3>
            <div className="space-y-3">
              <Link
                href="/courses"
                className="block w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 transition-colors font-medium text-center"
              >
                Browse All Courses
              </Link>
              <Link
                href="/practice"
                className="block w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 transition-colors font-medium text-center"
              >
                Practice Arena
              </Link>
              <Link
                href="/subjects"
                className="block w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl px-4 transition-colors font-medium text-center"
              >
                Study Materials & Roadmaps
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
