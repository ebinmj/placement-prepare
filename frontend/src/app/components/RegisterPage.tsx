import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { Code2, Eye, EyeOff, CheckCircle } from 'lucide-react'

interface RegisterPageProps {
  onLogin: (user: { name: string; email: string }) => void
}

export default function RegisterPage({ onLogin }: RegisterPageProps) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    onLogin({ name: form.name, email: form.email })
    navigate('/dashboard')
  }

  const perks = [
    'Access to 500+ practice questions across 9 subjects',
    'AI-powered weak area analysis and recommendations',
    'Company-specific mock placement tests',
    'Track your progress with detailed analytics',
  ]

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Left */}
      <div
        className="hidden lg:flex flex-col justify-between w-[48%] p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #1E3A8A 100%)' }}
      >
        <div className="absolute top-[-80px] right-[-60px] w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
              <Code2 size={20} color="white" />
            </div>
            <span className="text-white text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>PlacementPro</span>
          </div>

          <h1 className="text-white mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.2 }}>
            Start your journey<br />
            <span style={{ background: 'linear-gradient(90deg, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              to your dream job
            </span>
          </h1>
          <p className="text-slate-400 mb-10">Join 50,000+ CS students already using PlacementPro</p>

          <div className="space-y-4">
            {perks.map((perk) => (
              <div key={perk} className="flex items-start gap-3">
                <CheckCircle size={18} color="#34D399" className="flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>🎓</div>
            <div>
              <p className="text-white text-sm" style={{ fontWeight: 600 }}>"Got placed at Google!"</p>
              <p className="text-slate-400 text-xs mt-1">Priya K. — PlacementPro helped me crack my interviews systematically</p>
              <div className="flex gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: '#F0F4FF' }}>
        <div className="w-full max-w-[420px]">
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
              <Code2 size={20} color="white" />
            </div>
            <span className="text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>PlacementPro</span>
          </div>

          <div className="mb-8">
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: '#0F172A', marginBottom: '0.5rem' }}>
              Create your account
            </h2>
            <p className="text-slate-500">Free forever. No credit card required.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm text-red-700" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Arjun Sharma' },
              { key: 'email', label: 'Email Address', type: 'email', placeholder: 'arjun@example.com' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block mb-2 text-sm text-slate-700" style={{ fontWeight: 500 }}>{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  required
                  className="w-full px-4 py-3 rounded-xl text-slate-800 placeholder-slate-400 outline-none"
                  style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: '0.95rem' }}
                  onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
              </div>
            ))}

            <div>
              <label className="block mb-2 text-sm text-slate-700" style={{ fontWeight: 500 }}>Password</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create a strong password"
                  required
                  className="w-full px-4 py-3 rounded-xl text-slate-800 placeholder-slate-400 outline-none pr-12"
                  style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: '0.95rem' }}
                  onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                  onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-700" style={{ fontWeight: 500 }}>Confirm Password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => { setError(''); setForm({ ...form, confirm: e.target.value }) }}
                placeholder="Re-enter your password"
                required
                className="w-full px-4 py-3 rounded-xl text-slate-800 placeholder-slate-400 outline-none"
                style={{ background: '#fff', border: '1.5px solid #E2E8F0', fontSize: '0.95rem' }}
                onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', fontWeight: 600, fontSize: '0.95rem' }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#2563EB', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
