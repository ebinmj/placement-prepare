import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { ArrowLeft, PlayCircle, CheckCircle, Lock, BookOpen, Trophy, Clock } from 'lucide-react'

const SUBJECT_DATA: Record<string, {
  name: string; icon: string; color: string; bg: string; description: string;
  topics: { name: string; easy: number; medium: number; hard: number; solved: number; total: number }[]
}> = {
  dsa: {
    name: 'Data Structures & Algorithms', icon: '⚡', color: '#2563EB', bg: '#EFF6FF',
    description: 'Master fundamental data structures and algorithmic problem-solving for top tech companies',
    topics: [
      { name: 'Arrays', easy: 25, medium: 18, hard: 12, solved: 38, total: 55 },
      { name: 'Strings', easy: 20, medium: 15, hard: 10, solved: 22, total: 45 },
      { name: 'Linked Lists', easy: 15, medium: 12, hard: 8, solved: 20, total: 35 },
      { name: 'Stack', easy: 12, medium: 10, hard: 6, solved: 15, total: 28 },
      { name: 'Queue', easy: 10, medium: 8, hard: 5, solved: 12, total: 23 },
      { name: 'Trees', easy: 20, medium: 18, hard: 14, solved: 18, total: 52 },
      { name: 'Graphs', easy: 15, medium: 20, hard: 18, solved: 10, total: 53 },
      { name: 'Dynamic Programming', easy: 10, medium: 25, hard: 22, solved: 8, total: 57 },
    ],
  },
  oop: {
    name: 'Object-Oriented Programming', icon: '📦', color: '#7C3AED', bg: '#F5F3FF',
    description: 'Learn OOP concepts, design patterns, and best practices for software development',
    topics: [
      { name: 'Classes & Objects', easy: 20, medium: 12, hard: 6, solved: 28, total: 38 },
      { name: 'Inheritance', easy: 18, medium: 14, hard: 8, solved: 25, total: 40 },
      { name: 'Polymorphism', easy: 15, medium: 16, hard: 10, solved: 20, total: 41 },
      { name: 'Abstraction', easy: 12, medium: 10, hard: 6, solved: 18, total: 28 },
      { name: 'Encapsulation', easy: 14, medium: 10, hard: 5, solved: 22, total: 29 },
    ],
  },
  dbms: {
    name: 'Database Management Systems', icon: '🗄️', color: '#06B6D4', bg: '#ECFEFF',
    description: 'Master relational databases, SQL, and database design principles',
    topics: [
      { name: 'ER Model', easy: 15, medium: 12, hard: 6, solved: 18, total: 33 },
      { name: 'Normalization', easy: 12, medium: 15, hard: 10, solved: 14, total: 37 },
      { name: 'Transactions', easy: 10, medium: 12, hard: 8, solved: 12, total: 30 },
      { name: 'Indexing', easy: 8, medium: 10, hard: 8, solved: 8, total: 26 },
      { name: 'Joins', easy: 18, medium: 15, hard: 10, solved: 20, total: 43 },
    ],
  },
  os: {
    name: 'Operating Systems', icon: '💻', color: '#10B981', bg: '#ECFDF5',
    description: 'Understand process management, memory, scheduling, and system concepts',
    topics: [
      { name: 'Processes', easy: 20, medium: 15, hard: 8, solved: 25, total: 43 },
      { name: 'Threads', easy: 15, medium: 12, hard: 8, solved: 18, total: 35 },
      { name: 'Scheduling', easy: 18, medium: 16, hard: 10, solved: 22, total: 44 },
      { name: 'Deadlocks', easy: 12, medium: 15, hard: 12, solved: 14, total: 39 },
      { name: 'Memory Management', easy: 15, medium: 18, hard: 12, solved: 10, total: 45 },
    ],
  },
  cn: {
    name: 'Computer Networks', icon: '🌐', color: '#F59E0B', bg: '#FFFBEB',
    description: 'Explore networking protocols, architecture, and internet fundamentals',
    topics: [
      { name: 'OSI Model', easy: 20, medium: 12, hard: 6, solved: 24, total: 38 },
      { name: 'TCP/IP', easy: 18, medium: 15, hard: 10, solved: 15, total: 43 },
      { name: 'Routing', easy: 12, medium: 14, hard: 10, solved: 10, total: 36 },
      { name: 'DNS', easy: 10, medium: 8, hard: 5, solved: 12, total: 23 },
      { name: 'HTTP/HTTPS', easy: 15, medium: 12, hard: 8, solved: 8, total: 35 },
    ],
  },
  sql: {
    name: 'SQL & Databases', icon: '📊', color: '#EF4444', bg: '#FEF2F2',
    description: 'Practice SQL queries, joins, aggregations, and advanced database operations',
    topics: [
      { name: 'SELECT Queries', easy: 25, medium: 15, hard: 8, solved: 35, total: 48 },
      { name: 'JOINs', easy: 20, medium: 18, hard: 12, solved: 22, total: 50 },
      { name: 'GROUP BY & HAVING', easy: 15, medium: 12, hard: 8, solved: 18, total: 35 },
      { name: 'Subqueries', easy: 12, medium: 16, hard: 12, solved: 10, total: 40 },
      { name: 'Stored Procedures', easy: 8, medium: 12, hard: 10, solved: 5, total: 30 },
    ],
  },
  aptitude: {
    name: 'Aptitude', icon: '🧠', color: '#8B5CF6', bg: '#F5F3FF',
    description: 'Sharpen quantitative, logical, and verbal skills for placement tests',
    topics: [
      { name: 'Quantitative Aptitude', easy: 30, medium: 25, hard: 15, solved: 40, total: 70 },
      { name: 'Logical Reasoning', easy: 25, medium: 20, hard: 12, solved: 28, total: 57 },
      { name: 'Verbal Ability', easy: 20, medium: 15, hard: 8, solved: 18, total: 43 },
      { name: 'Data Interpretation', easy: 15, medium: 18, hard: 12, solved: 12, total: 45 },
    ],
  },
  hr: {
    name: 'HR Interview Preparation', icon: '🤝', color: '#14B8A6', bg: '#F0FDFA',
    description: 'Prepare for behavioral questions, company culture, and soft skills assessment',
    topics: [
      { name: 'Tell Me About Yourself', easy: 5, medium: 8, hard: 4, solved: 8, total: 17 },
      { name: 'Strengths & Weaknesses', easy: 8, medium: 10, hard: 5, solved: 10, total: 23 },
      { name: 'Leadership Questions', easy: 8, medium: 12, hard: 8, solved: 6, total: 28 },
      { name: 'Teamwork Questions', easy: 8, medium: 10, hard: 6, solved: 5, total: 24 },
      { name: 'Behavioral Questions', easy: 10, medium: 15, hard: 10, solved: 4, total: 35 },
    ],
  },
}

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'] as const
type Difficulty = typeof DIFFICULTIES[number]

const diffColors = { Easy: '#10B981', Medium: '#F59E0B', Hard: '#EF4444' }
const diffBg = { Easy: '#ECFDF5', Medium: '#FFFBEB', Hard: '#FEF2F2' }

export default function SubjectPage() {
  const { subjectId } = useParams<{ subjectId: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Difficulty>('All')

  const subject = SUBJECT_DATA[subjectId || 'dsa']

  if (!subject) return (
    <div className="p-6 text-center text-slate-400">Subject not found</div>
  )

  const totalSolved = subject.topics.reduce((s, t) => s + t.solved, 0)
  const totalQuestions = subject.topics.reduce((s, t) => s + t.total, 0)
  const overallProgress = Math.round((totalSolved / totalQuestions) * 100)

  return (
    <div className="p-6 max-w-[1200px]">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-all mb-6 text-sm"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="rounded-2xl p-6 mb-6 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${subject.color}15, ${subject.color}05)`, border: `1px solid ${subject.color}20` }}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: subject.bg }}>
            {subject.icon}
          </div>
          <div className="flex-1">
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: '#0F172A', marginBottom: '0.3rem' }}>
              {subject.name}
            </h1>
            <p className="text-slate-500 text-sm">{subject.description}</p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            {[
              { label: 'Solved', value: totalSolved, icon: CheckCircle, color: '#10B981' },
              { label: 'Total', value: totalQuestions, icon: BookOpen, color: '#2563EB' },
              { label: 'Progress', value: `${overallProgress}%`, icon: Trophy, color: subject.color },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="text-center p-3 rounded-xl bg-white" style={{ border: '1px solid #E2E8F0', minWidth: 72 }}>
                <Icon size={16} color={color} className="mx-auto mb-1" />
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>Overall Progress</span>
            <span style={{ color: subject.color, fontWeight: 600 }}>{overallProgress}%</span>
          </div>
          <div className="h-2.5 rounded-full" style={{ background: '#E2E8F0' }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${overallProgress}%`, background: `linear-gradient(90deg, ${subject.color}, ${subject.color}99)` }} />
          </div>
        </div>
      </div>

      {/* Difficulty tabs */}
      <div className="flex gap-2 mb-6">
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            onClick={() => setActiveTab(d)}
            className="px-5 py-2 rounded-xl text-sm transition-all"
            style={{
              fontWeight: activeTab === d ? 600 : 400,
              background: activeTab === d ? subject.color : '#fff',
              color: activeTab === d ? '#fff' : '#64748B',
              border: `1px solid ${activeTab === d ? subject.color : '#E2E8F0'}`,
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Topics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subject.topics.map((topic) => {
          const progress = Math.round((topic.solved / topic.total) * 100)
          return (
            <div
              key={topic.name}
              className="rounded-2xl bg-white p-5 hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
              style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-slate-800" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem' }}>{topic.name}</h3>
                {progress >= 80 && <CheckCircle size={16} color="#10B981" />}
              </div>

              <div className="flex gap-2 mb-4">
                {(['Easy', 'Medium', 'Hard'] as const).map((d) => {
                  const count = d === 'Easy' ? topic.easy : d === 'Medium' ? topic.medium : topic.hard
                  if (activeTab !== 'All' && activeTab !== d) return null
                  return (
                    <span key={d} className="text-xs px-2.5 py-1 rounded-full" style={{ background: diffBg[d], color: diffColors[d], fontWeight: 600 }}>
                      {count} {d}
                    </span>
                  )
                })}
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                  <span>{topic.solved}/{topic.total} solved</span>
                  <span style={{ color: subject.color, fontWeight: 600 }}>{progress}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: '#E2E8F0' }}>
                  <div className="h-full rounded-full" style={{ width: `${progress}%`, background: subject.color }} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={12} /> ~{Math.ceil(topic.total * 0.4)} min
                </div>
                <button
                  onClick={() => navigate(`/test/${subjectId}-${topic.name.toLowerCase().replace(/[^a-z]/g, '-')}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white transition-all hover:opacity-90"
                  style={{ background: subject.color, fontWeight: 600 }}
                >
                  <PlayCircle size={13} /> Practice
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Start full subject test CTA */}
      <div className="mt-6 rounded-2xl p-6 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${subject.color}, ${subject.color}cc)` }}>
        <div>
          <h3 className="text-white mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Ready to test your knowledge?</h3>
          <p className="text-white/70 text-sm">Take a full {subject.name} mock test with mixed difficulty questions</p>
        </div>
        <button
          onClick={() => navigate(`/test/${subjectId}-full`)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-sm hover:shadow-lg transition-all"
          style={{ color: subject.color, fontWeight: 700, whiteSpace: 'nowrap' }}
        >
          <PlayCircle size={16} /> Start Full Test
        </button>
      </div>
    </div>
  )
}
