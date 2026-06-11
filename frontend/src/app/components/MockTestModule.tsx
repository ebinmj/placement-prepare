import { useNavigate } from 'react-router'
import { Clock, BarChart2, Zap, Building2, ChevronRight, PlayCircle, Users } from 'lucide-react'

const TEST_CATEGORIES = [
  {
    id: 'category-1',
    title: 'Subject-wise Tests',
    description: 'Focus on individual subject mastery',
    tests: [
      { id: 'dsa-full', label: 'DSA Complete Test', questions: 30, time: 60, difficulty: 'Mixed', color: '#2563EB', icon: '⚡' },
      { id: 'oop-full', label: 'OOP Mastery Test', questions: 25, time: 45, difficulty: 'Mixed', color: '#7C3AED', icon: '📦' },
      { id: 'dbms-full', label: 'DBMS Full Test', questions: 25, time: 45, difficulty: 'Mixed', color: '#06B6D4', icon: '🗄️' },
      { id: 'os-full', label: 'OS Concepts Test', questions: 25, time: 45, difficulty: 'Mixed', color: '#10B981', icon: '💻' },
      { id: 'cn-full', label: 'CN Full Test', questions: 25, time: 45, difficulty: 'Mixed', color: '#F59E0B', icon: '🌐' },
      { id: 'sql-full', label: 'SQL Practice Test', questions: 20, time: 40, difficulty: 'Mixed', color: '#EF4444', icon: '📊' },
    ],
  },
]

const PLACEMENT_TESTS = [
  { id: 'placement-easy', label: 'Easy Placement Test', questions: 20, time: 30, difficulty: 'Easy', color: '#10B981', desc: 'Warm up with basic concepts' },
  { id: 'placement-medium', label: 'Medium Placement Test', questions: 25, time: 45, difficulty: 'Medium', color: '#F59E0B', desc: 'Standard placement difficulty' },
  { id: 'placement-hard', label: 'Hard Placement Test', questions: 30, time: 60, difficulty: 'Hard', color: '#EF4444', desc: 'Top company difficulty' },
  { id: 'placement-mixed', label: 'Full Mixed Test', questions: 40, time: 75, difficulty: 'Mixed', color: '#2563EB', desc: 'Real placement simulation' },
]

const COMPANY_TESTS = [
  { id: 'google', label: 'Google', icon: '🔍', color: '#4285F4', questions: 30, time: 60, level: 'Hard' },
  { id: 'amazon', label: 'Amazon', icon: '📦', color: '#FF9900', questions: 30, time: 60, level: 'Hard' },
  { id: 'microsoft', label: 'Microsoft', icon: '🪟', color: '#00A4EF', questions: 30, time: 60, level: 'Medium-Hard' },
  { id: 'tcs', label: 'TCS', icon: '🏢', color: '#4D9FEE', questions: 25, time: 50, level: 'Medium' },
  { id: 'infosys', label: 'Infosys', icon: '🌿', color: '#007CC3', questions: 25, time: 50, level: 'Medium' },
  { id: 'wipro', label: 'Wipro', icon: '💧', color: '#341C6E', questions: 25, time: 50, level: 'Easy-Medium' },
]

export default function MockTestModule() {
  const navigate = useNavigate()

  const startTest = (id: string) => {
    navigate(`/test/${id}`)
  }

  return (
    <div className="p-6 max-w-[1200px]">
      <div className="mb-8">
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.7rem', color: '#0F172A', marginBottom: '0.3rem' }}>
          Mock Tests
        </h1>
        <p className="text-slate-500">Simulate real placement test conditions. Track your performance and improve.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Tests Available', value: '24+', icon: BarChart2, color: '#2563EB', bg: '#EFF6FF' },
          { label: 'Avg Duration', value: '45 min', icon: Clock, color: '#8B5CF6', bg: '#F5F3FF' },
          { label: 'Your Best Score', value: '94%', icon: Zap, color: '#10B981', bg: '#ECFDF5' },
          { label: 'Users Today', value: '1,240', icon: Users, color: '#F59E0B', bg: '#FFFBEB' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-2xl bg-white p-4" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: bg }}>
              <Icon size={18} color={color} />
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: '#0F172A', lineHeight: 1 }}>{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Placement Tests */}
      <section className="mb-8">
        <h2 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>Placement Tests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLACEMENT_TESTS.map((test) => (
            <div key={test.id} className="rounded-2xl bg-white p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5" style={{ border: '1px solid #E2E8F0' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs px-2.5 py-1 rounded-full" style={{
                  background: test.difficulty === 'Easy' ? '#ECFDF5' : test.difficulty === 'Hard' ? '#FEF2F2' : test.difficulty === 'Medium' ? '#FFFBEB' : '#EFF6FF',
                  color: test.difficulty === 'Easy' ? '#10B981' : test.difficulty === 'Hard' ? '#EF4444' : test.difficulty === 'Medium' ? '#F59E0B' : '#2563EB',
                  fontWeight: 600,
                }}>
                  {test.difficulty}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={12} /> {test.time}m
                </div>
              </div>
              <h3 className="mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>{test.label}</h3>
              <p className="text-slate-400 text-xs mb-4">{test.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{test.questions} questions</span>
                <button
                  onClick={() => startTest(test.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white hover:opacity-90 transition-all"
                  style={{ background: test.color, fontWeight: 600 }}
                >
                  <PlayCircle size={13} /> Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subject Tests */}
      <section className="mb-8">
        <h2 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>Subject-wise Tests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEST_CATEGORIES[0].tests.map((test) => (
            <div key={test.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 hover:shadow-md transition-all cursor-pointer group" style={{ border: '1px solid #E2E8F0' }}
              onClick={() => startTest(test.id)}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: `${test.color}15` }}>
                {test.icon}
              </div>
              <div className="flex-1">
                <p className="text-slate-800 text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{test.label}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-400">{test.questions} Qs</span>
                  <span className="text-xs text-slate-400"><Clock size={10} className="inline" /> {test.time}m</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${test.color}15`, color: test.color, fontWeight: 600 }}>Mixed</span>
                </div>
              </div>
              <ChevronRight size={16} color="#94A3B8" className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          ))}
        </div>
      </section>

      {/* Company Tests */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Building2 size={20} color="#0F172A" />
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>Company-specific Tests</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {COMPANY_TESTS.map((co) => (
            <button
              key={co.id}
              onClick={() => startTest(`company-${co.id}`)}
              className="rounded-2xl bg-white p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-center"
              style={{ border: '1px solid #E2E8F0' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3" style={{ background: `${co.color}15` }}>
                {co.icon}
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>{co.label}</p>
              <p className="text-xs text-slate-400 mt-1">{co.questions} Qs · {co.time}m</p>
              <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full" style={{ background: `${co.color}15`, color: co.color, fontWeight: 600 }}>
                {co.level}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
