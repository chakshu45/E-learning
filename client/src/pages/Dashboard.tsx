import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "@/utils/api";
import { 
    Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const [testStats, setTestStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        const getData = async () => {
            try {
                const [enrollData, statsData] = await Promise.all([
                    fetchData('/enroll/my'),
                    fetchData('/tests/stats')
                ]);
                setEnrollments(enrollData);
                setTestStats(statsData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        if (user) {
            getData();
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading]);

    const radarData = testStats?.subjectStats?.map((s: any) => ({
        subject: s._id,
        score: s.avgScore,
        fullMark: 40
    })) || [];

    if (loading) {
        return (
            <div className="flex justify-center py-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-24">
            <header className="mb-16">
                <div className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 rounded-full uppercase">
                    Student Command Center
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    Welcome, {user?.name.split(' ')[0] || "Learner"}! 👋
                </h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
                    You've mastered {enrollments.length} subjects and completed {testStats?.totalAttempts || 0} mock tests.
                </p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Performance Analytics */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass-panel p-8 rounded-[2.5rem] border-slate-100 dark:border-slate-800">
                            <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Highest Score</span>
                            <span className="text-4xl font-black text-slate-900 dark:text-white">{testStats?.highestScore || 0}</span>
                        </div>
                        <div className="glass-panel p-8 rounded-[2.5rem] border-slate-100 dark:border-slate-800">
                            <span className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Avg Accuracy</span>
                            <span className="text-4xl font-black text-emerald-600">{(testStats?.averageAccuracy || 0).toFixed(1)}%</span>
                        </div>
                    </div>

                    <div className="glass-panel p-10 rounded-[3rem] border-slate-100 dark:border-slate-800">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Subject-wise Mastery</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} />
                                    <Radar name="Performance" dataKey="score" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Active Courses</h2>
                            <Link to="/courses" className="text-indigo-600 font-bold hover:underline">Explore More</Link>
                        </div>
                        <div className="grid gap-4">
                            {enrollments.map(item => (
                                <div key={item._id} className="group p-6 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden hidden sm:block">
                                            <img src={item.course.thumbnail} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xl font-black text-slate-900 dark:text-white">{item.course.title}</h4>
                                            <div className="mt-4 flex items-center space-x-4">
                                                <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                                    <div className="bg-indigo-600 h-full" style={{ width: `${item.progress}%` }}></div>
                                                </div>
                                                <span className="text-sm font-black text-slate-900 dark:text-white">{item.progress}%</span>
                                            </div>
                                        </div>
                                        <Link to={`/courses/${item.course._id}/play`} className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Test History & Actions */}
                <div className="space-y-8">
                    <Link to="/subjects" className="block p-8 bg-fuchsia-600 rounded-[2.5rem] text-white shadow-2xl shadow-fuchsia-500/40 hover:scale-[1.02] transition-all">
                        <div className="text-4xl mb-4">📚</div>
                        <h3 className="text-2xl font-black mb-2">Study Material</h3>
                        <p className="text-fuchsia-100 text-sm font-medium">Access comprehensive roadmaps, core concepts, and cheat sheets.</p>
                    </Link>

                    <Link to="/practice" className="block p-8 bg-indigo-600 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-500/40 hover:scale-[1.02] transition-all">
                        <div className="text-4xl mb-4">🚀</div>
                        <h3 className="text-2xl font-black mb-2">Mock Test Arena</h3>
                        <p className="text-indigo-100 text-sm font-medium">Ready for your next challenge? Enter the practice arena now.</p>
                    </Link>

                    <div className="glass-panel p-8 rounded-[2.5rem] border-slate-100 dark:border-slate-800">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Recent History</h3>
                        <div className="space-y-6">
                            {testStats?.recentHistory?.map((test: any) => (
                                <div key={test._id} className="flex items-center justify-between group">
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{test.subject}</h4>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">{new Date(test.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-black text-slate-900 dark:text-white">{test.score}/40</div>
                                        <div className={`text-[10px] font-black uppercase ${test.accuracy >= 75 ? "text-emerald-500" : "text-orange-500"}`}>{test.accuracy.toFixed(0)}% Acc</div>
                                    </div>
                                </div>
                            ))}
                            {(!testStats?.recentHistory || testStats.recentHistory.length === 0) && (
                                <p className="text-sm text-slate-500 text-center py-4">No tests attempted yet.</p>
                            )}
                        </div>
                    </div>

                    <div className="glass-panel p-8 rounded-[2.5rem] border-slate-100 dark:border-slate-800">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Achievements</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {["🥇", "🚀", "🔥", "🧠"].map((emoji, i) => (
                                <div key={i} className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-2xl grayscale hover:grayscale-0 cursor-help transition-all" title="Achievement Unlocked">
                                    {emoji}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
