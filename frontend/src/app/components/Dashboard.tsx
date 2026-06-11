import { useNavigate } from 'react-router'
import {
  TrendingUp, CheckCircle, ClipboardList, Target,
  Code2, Database, Cpu, Network, Table2, FolderOpen, Brain, Users, Boxes,
  ArrowRight, Clock, Star, BookOpen,
} from 'lucide-react'
import { RadialBarChart, RadialBar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface DashboardProps {
  user: { name: string; email: string }
}

const SUBJECTS = [
  { id: 'dsa', label: 'DSA', icon: Code2, color: '#3B82F6', bg: '#EFF6FF', progress: 68, questions: 124 },
  { id: 'oop', label: 'OOP', icon: Boxes, color: '#8B5CF6', bg: '#F5F3FF', progress: 82, questions: 67 },
  { id: 'dbms', label: 'DBMS', icon: Database, color: '#06B6D4', bg: '#ECFEFF', progress: 54, questions: 45 },
  { id: 'os', label: 'OS', icon: Cpu, color: '#10B981', bg: '#ECFDF5', progress: 71, questions: 89 },
  { id: 'cn', label: 'CN', icon: Network, color: '#F59E0B', bg: '#FFFBEB', progress: 43, questions: 56 },
  { id: 'sql', label: 'SQL', icon: Table2, color: '#EF4444', bg: '#FEF2F2', progress: 76, questions: 38 },
  { id: 'projects', label: 'Projects', icon: FolderOpen, color: '#EC4899', bg: '#FDF2F8', progress: 30, questions: 22 },
  { id: 'aptitude', label: 'Aptitude', icon: Brain, color: '#A78BFA', bg: '#F5F3FF', progress: 60, questions: 72 },
  { id: 'hr', label: 'HR Prep', icon: Users, color: '#14B8A6', bg: '#F0FDFA', progress: 45, questions: 33 },
]

const STATS = [
  { label: 'Overall Progress', value: '64%', icon: TrendingUp, color: '#2563EB', bg: '#EFF6FF', sub: '+4% this week' },
  { label: 'Questions Solved', value: '546', icon: CheckCircle, color: '#10B981', bg: '#ECFDF5', sub: '32 today' },
  { label: 'Tests Completed', value: '23', icon: ClipboardList, color: '#8B5CF6', bg: '#F5F3FF', sub: '3 this week' },
  { label: 'Accuracy', value: '74%', icon: Target, color: '#F59E0B', bg: '#FFFBEB', sub: '+2% vs last week' },
]

const ACTIVITY = [
  { icon: '⚡', text: 'Solved 12 DSA Array problems', time: '2h ago', color: '#3B82F6' },
  { icon: '📝', text: 'Completed OOP Mock Test — 87%', time: '5h ago', color: '#8B5CF6' },
  { icon: '🎯', text: 'Started SQL practice — GROUP BY', time: 'Yesterday', color: '#EF4444' },
  { icon: '🏆', text: 'Earned "Consistency" badge', time: '2d ago', color: '#F59E0B' },
  { icon: '📖', text: 'Revised OS Scheduling concepts', time: '2d ago', color: '#10B981' },
]

const weekData = [
  { day: 'Mon', questions: 18 },
  { day: 'Tue', questions: 25 },
  { day: 'Wed', questions: 12 },
  { day: 'Thu', questions: 30 },
  { day: 'Fri', questions: 22 },
  { day: 'Sat', questions: 35 },
  { day: 'Sun', questions: 28 },
]

const radialData = [{ value: 64, fill: '#2563EB' }]

export default function Dashboard({ user }: DashboardProps) {
  const navigate = useNavigate()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="p-6 max-w-[1400px]">
      {/* Welcome */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.7rem', color: '#0F172A', marginBottom: '0.25rem' }}>
            {greeting}, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-500">You're on a 24-day streak. Keep it up! Let's practice today.</p>
        </div>
        <button
          onClick={() => navigate('/mock-tests')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm hover:opacity-90 transition-all"
          style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', fontWeight: 600, whiteSpace: 'nowrap' }}
        >
          <ClipboardList size={16} />
          Start Mock Test
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ label, value, icon: Icon, color, bg, sub }) => (
          <div key={label} className="rounded-2xl p-5 bg-white" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={20} color={color} />
              </div>
              <span className="text-xs px-2 py-1 rounded-full" style={{ background: bg, color }}>{sub}</span>
            </div>
            <p className="text-slate-500 text-xs mb-1" style={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: '#0F172A', lineHeight: 1 }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Weekly activity chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-6" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A', marginBottom: '0.2rem' }}>Weekly Activity</h3>
              <p className="text-slate-400 text-sm">Questions solved this week</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock size={14} /> This week
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                cursor={{ stroke: '#2563EB', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area type="monotone" dataKey="questions" stroke="#2563EB" strokeWidth={2.5} fill="url(#actGrad)" dot={{ fill: '#2563EB', r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Overall progress radial + activity */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl bg-white p-5 flex flex-col items-center" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <h3 className="mb-3 self-start" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>Overall Progress</h3>
            <div className="relative w-36 h-36">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="65%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" cornerRadius={10} background={{ fill: '#F1F5F9' }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem', color: '#2563EB' }}>64%</span>
                <span className="text-xs text-slate-400">Complete</span>
              </div>
            </div>
            <div className="w-full mt-4 grid grid-cols-2 gap-3">
              {[{ label: 'Solved', v: '546' }, { label: 'Remaining', v: '354' }].map(({ label, v }) => (
                <div key={label} className="text-center p-2 rounded-lg" style={{ background: '#F8FAFF' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: '#0F172A' }}>{v}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 rounded-2xl bg-white p-5" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>Recent Activity</h3>
          <div className="space-y-3">
            {ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15`, fontSize: '1rem' }}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 text-sm leading-snug" style={{ fontWeight: 500 }}>{item.text}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-5" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>AI Recommendations</h3>
            <Star size={16} color="#F59E0B" />
          </div>
          <div className="space-y-3">
            {[
              { topic: 'Graph Traversals (BFS/DFS)', subject: 'DSA', reason: 'Low accuracy in last test', urgency: 'High', color: '#EF4444' },
              { topic: 'TCP/IP Handshake', subject: 'CN', reason: 'Not attempted yet', urgency: 'Medium', color: '#F59E0B' },
              { topic: 'ACID Properties', subject: 'DBMS', reason: 'Frequently asked in interviews', urgency: 'High', color: '#EF4444' },
              { topic: 'Behavioral Questions', subject: 'HR', reason: 'HR round is next week', urgency: 'Medium', color: '#F59E0B' },
            ].map((r) => (
              <div key={r.topic} className="flex items-center gap-4 p-3.5 rounded-xl hover:shadow-sm transition-all cursor-pointer" style={{ background: '#F8FAFF', border: '1px solid #E2E8F0' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${r.color}15` }}>
                  <BookOpen size={18} color={r.color} />
                </div>
                <div className="flex-1">
                  <p className="text-slate-800 text-sm" style={{ fontWeight: 600 }}>{r.topic}</p>
                  <p className="text-slate-400 text-xs">{r.subject} · {r.reason}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full flex-shrink-0" style={{ background: `${r.color}15`, color: r.color, fontWeight: 600 }}>{r.urgency}</span>
                <ArrowRight size={15} color="#94A3B8" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>Quick Access</h3>
          <span className="text-sm text-slate-400">9 subjects</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {SUBJECTS.map(({ id, label, icon: Icon, color, bg, progress, questions }) => (
            <button
              key={id}
              onClick={() => navigate(`/subject/${id}`)}
              className="group relative p-4 rounded-2xl bg-white hover:shadow-lg transition-all duration-200 text-left hover:-translate-y-0.5"
              style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: bg }}>
                <Icon size={22} color={color} />
              </div>
              <p className="text-slate-800 text-sm mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{label}</p>
              <p className="text-slate-400 text-xs mb-3">{questions} questions</p>
              <div className="w-full h-1.5 rounded-full" style={{ background: '#E2E8F0' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: color }} />
              </div>
              <p className="text-xs mt-1" style={{ color, fontWeight: 600 }}>{progress}%</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
