import { useNavigate } from 'react-router'
import { Trophy, Target, Clock, TrendingUp, ArrowRight, RotateCcw, Home, CheckCircle, XCircle, AlertTriangle, BookOpen } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

interface ResultsProps {
  results: {
    total: number; score: number; answers: Record<number, number>; questions: any[]; timeTaken: number
  } | null
}

const MOCK_RESULTS = {
  total: 15, score: 11, answers: { 0: 2, 1: 1, 2: 1, 3: 2, 4: 1, 5: 0, 6: 2, 7: 1, 8: 2, 9: 2, 10: 2, 11: 2, 12: 3, 13: 1, 14: 1 },
  questions: [], timeTaken: 1680,
}

const subjectScores = [
  { subject: 'DSA', score: 80, total: 5, correct: 4 },
  { subject: 'OOP', score: 100, total: 2, correct: 2 },
  { subject: 'DBMS', score: 50, total: 2, correct: 1 },
  { subject: 'OS', score: 50, total: 2, correct: 1 },
  { subject: 'CN', score: 100, total: 2, correct: 2 },
  { subject: 'SQL', score: 50, total: 2, correct: 1 },
  { subject: 'Aptitude', score: 100, total: 1, correct: 1 },
]

const diffData = [
  { name: 'Easy', correct: 7, total: 8, pct: 87.5 },
  { name: 'Medium', correct: 4, total: 5, pct: 80 },
  { name: 'Hard', correct: 0, total: 2, pct: 0 },
]

const accuracyData = [
  { name: 'Correct', value: 11, fill: '#10B981' },
  { name: 'Incorrect', value: 4, fill: '#EF4444' },
]

const radarData = subjectScores.map((s) => ({ subject: s.subject, score: s.score }))

const WEAK_AREAS = [
  { topic: 'Dynamic Programming', subject: 'DSA', attempts: 2, accuracy: 0, priority: 'High' },
  { topic: 'ACID Properties', subject: 'DBMS', attempts: 1, accuracy: 50, priority: 'Medium' },
  { topic: 'CPU Scheduling', subject: 'OS', attempts: 1, accuracy: 50, priority: 'Medium' },
  { topic: 'SQL Subqueries', subject: 'SQL', attempts: 1, accuracy: 50, priority: 'Low' },
]

export default function ResultsDashboard({ results }: ResultsProps) {
  const navigate = useNavigate()
  const r = results || MOCK_RESULTS
  const percentage = Math.round((r.score / r.total) * 100)
  const mins = Math.floor(r.timeTaken / 60)
  const secs = r.timeTaken % 60

  const grade = percentage >= 90 ? { label: 'Excellent', color: '#10B981', emoji: '🏆' }
    : percentage >= 75 ? { label: 'Good', color: '#2563EB', emoji: '🎯' }
    : percentage >= 60 ? { label: 'Average', color: '#F59E0B', emoji: '📈' }
    : { label: 'Needs Work', color: '#EF4444', emoji: '💪' }

  return (
    <div className="p-6 max-w-[1200px]" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.7rem', color: '#0F172A', marginBottom: '0.25rem' }}>
            Test Results
          </h1>
          <p className="text-slate-500">Here's a detailed breakdown of your performance</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/mock-tests')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-100 transition-all" style={{ border: '1.5px solid #E2E8F0', fontWeight: 600 }}>
            <RotateCcw size={15} /> Retake
          </button>
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white hover:opacity-90 transition-all" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', fontWeight: 600 }}>
            <Home size={15} /> Dashboard
          </button>
        </div>
      </div>

      {/* Score hero */}
      <div className="rounded-2xl p-8 mb-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 60%, #1E3A8A 100%)' }}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
          <div className="flex flex-col items-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="72" cy="72" r="60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                <circle
                  cx="72" cy="72" r="60" fill="none"
                  stroke={grade.color} strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - percentage / 100)}`}
                  style={{ transition: 'stroke-dashoffset 1.5s ease' }}
                />
              </svg>
              <div className="text-center">
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.2rem', color: '#fff', lineHeight: 1 }}>{percentage}%</p>
                <p className="text-white/50 text-xs mt-1">Score</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-2xl">{grade.emoji}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: grade.color, fontSize: '1.1rem' }}>{grade.label}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
            {[
              { label: 'Score', value: `${r.score}/${r.total}`, icon: Trophy, color: '#F59E0B' },
              { label: 'Accuracy', value: `${percentage}%`, icon: Target, color: '#10B981' },
              { label: 'Time Taken', value: `${mins}m ${secs}s`, icon: Clock, color: '#60A5FA' },
              { label: 'Rank', value: 'Top 22%', icon: TrendingUp, color: '#A78BFA' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Icon size={18} color={color} className="mb-2" />
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: '1.2rem' }}>{value}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Subject scores bar chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-5" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>Subject-wise Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={subjectScores} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="subject" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip
                formatter={(value: any) => [`${value}%`, 'Score']}
                contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13 }}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {subjectScores.map((entry, i) => (
                  <Cell key={i} fill={entry.score >= 75 ? '#10B981' : entry.score >= 50 ? '#F59E0B' : '#EF4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Accuracy pie */}
        <div className="rounded-2xl bg-white p-5" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>Accuracy Breakdown</h3>
          <div className="flex justify-center">
            <PieChart width={180} height={180}>
              <Pie data={accuracyData} cx={90} cy={90} innerRadius={50} outerRadius={80} dataKey="value" startAngle={90} endAngle={-270}>
                {accuracyData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
            </PieChart>
          </div>
          <div className="space-y-2 mt-2">
            {accuracyData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: d.fill }} />
                  <span className="text-sm text-slate-600">{d.name}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0F172A', fontSize: '0.9rem' }}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Difficulty breakdown */}
        <div className="rounded-2xl bg-white p-5" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <h3 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>Difficulty-wise Scores</h3>
          <div className="space-y-4">
            {diffData.map(({ name, correct, total, pct }) => {
              const color = name === 'Easy' ? '#10B981' : name === 'Medium' ? '#F59E0B' : '#EF4444'
              return (
                <div key={name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-700" style={{ fontWeight: 600 }}>{name}</span>
                      <span className="text-xs text-slate-400">{correct}/{total} correct</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color, fontSize: '0.9rem' }}>{pct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full" style={{ background: '#F1F5F9' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Radar chart */}
        <div className="rounded-2xl bg-white p-5" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <h3 className="mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>Knowledge Coverage</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748B' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <Radar name="Score" dataKey="score" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} strokeWidth={2} dot={{ fill: '#2563EB', r: 3 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weak areas */}
      <div className="rounded-2xl bg-white p-5 mb-6" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={18} color="#F59E0B" />
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>Weak Areas Analysis</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WEAK_AREAS.map((w) => (
            <div key={w.topic} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all cursor-pointer" style={{ border: '1px solid #E2E8F0' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FEF2F2' }}>
                <XCircle size={20} color="#EF4444" />
              </div>
              <div className="flex-1">
                <p className="text-slate-800 text-sm" style={{ fontWeight: 600 }}>{w.topic}</p>
                <p className="text-slate-400 text-xs">{w.subject} · {w.accuracy}% accuracy</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full flex-shrink-0" style={{
                background: w.priority === 'High' ? '#FEF2F2' : w.priority === 'Medium' ? '#FFFBEB' : '#F0FDFA',
                color: w.priority === 'High' ? '#EF4444' : w.priority === 'Medium' ? '#F59E0B' : '#14B8A6',
                fontWeight: 600,
              }}>
                {w.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, #EFF6FF, #F5F3FF)', border: '1px solid #BFDBFE' }}>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={18} color="#2563EB" />
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>AI Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: 'Practice DP Problems', desc: 'Start with memoization patterns', subject: 'DSA', color: '#2563EB' },
            { title: 'Review ACID Properties', desc: 'Focus on isolation levels', subject: 'DBMS', color: '#06B6D4' },
            { title: 'OS Scheduling Drills', desc: 'Solve 5 scheduling problems daily', subject: 'OS', color: '#10B981' },
          ].map((rec) => (
            <div key={rec.title} className="bg-white p-4 rounded-xl cursor-pointer hover:shadow-md transition-all" style={{ border: '1px solid #E2E8F0' }}>
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${rec.color}15`, color: rec.color, fontWeight: 600 }}>{rec.subject}</span>
                <ArrowRight size={14} color="#94A3B8" />
              </div>
              <p className="text-slate-800 text-sm mb-1" style={{ fontWeight: 600 }}>{rec.title}</p>
              <p className="text-slate-400 text-xs">{rec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
