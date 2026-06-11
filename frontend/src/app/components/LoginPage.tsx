import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { Code2, Eye, EyeOff, BookOpen, Trophy, Target, Zap } from 'lucide-react'

interface LoginPageProps {
  onLogin: (user: { name: string; email: string }) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    onLogin({ name: 'Arjun Sharma', email })
    navigate('/dashboard')
  }

  const features = [
    { icon: Code2, label: '500+ Coding Problems', color: '#60A5FA' },
    { icon: Trophy, label: 'Mock Placement Tests', color: '#A78BFA' },
    { icon: Target, label: 'Topic-wise Practice', color: '#34D399' },
    { icon: Zap, label: 'AI-powered Insights', color: '#FCD34D' },
  ]

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #1E3A8A 100%)' }}
      >
        {/* Background orbs */}
        <div className="absolute top-[-80px] left-[-80px] w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
        <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
              <Code2 size={20} color="white" />
            </div>
            <span className="text-white text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>PlacementPro</span>
          </div>

          <div className="mb-12">
            <h1 className="text-white mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2 }}>
              Your AI-Powered<br />
              <span style={{ background: 'linear-gradient(90deg, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Interview Success
              </span><br />
              Companion
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Prepare smarter. Practice harder.<br />Land your dream tech job.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}20` }}>
                  <Icon size={18} color={color} />
                </div>
                <span className="text-slate-300 text-sm" style={{ fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4">
            {['DSA', 'OOP', 'DBMS', 'OS', 'CN', 'SQL', 'HR'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs text-slate-400" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: '#F0F4FF' }}>
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
              <Code2 size={20} color="white" />
            </div>
            <span className="text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>PlacementPro</span>
          </div>

          <div className="mb-8">
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: '#0F172A', marginBottom: '0.5rem' }}>
              Welcome back
            </h2>
            <p className="text-slate-500">Sign in to continue your preparation journey</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm text-slate-700" style={{ fontWeight: 500 }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="arjun@example.com"
                required
                className="w-full px-4 py-3 rounded-xl text-slate-800 placeholder-slate-400 outline-none transition-all"
                style={{
                  background: '#fff',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '0.95rem',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-700" style={{ fontWeight: 500 }}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 rounded-xl text-slate-800 placeholder-slate-400 outline-none transition-all pr-12"
                  style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: '0.95rem' }}
                  onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <button type="button" className="text-sm" style={{ color: '#2563EB' }}>Forgot password?</button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', fontWeight: 600, fontSize: '0.95rem' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button
            className="mt-4 w-full py-3 rounded-xl transition-all hover:shadow-md text-slate-700"
            style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontWeight: 500, fontSize: '0.95rem' }}
          >
            <span className="flex items-center justify-center gap-2">
              <BookOpen size={18} color="#2563EB" />
              Continue as Guest
            </span>
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#2563EB', fontWeight: 600 }}>
              Create account
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-slate-400">
            By signing in, you agree to our{' '}
            <span style={{ color: '#2563EB' }}>Terms of Service</span> and{' '}
            <span style={{ color: '#2563EB' }}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  )
}
