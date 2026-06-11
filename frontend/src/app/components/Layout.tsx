import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import {
  LayoutDashboard, Code2, Database, Cpu, Network, Table2,
  FolderOpen, Brain, Users, ClipboardList, LogOut, Menu, X,
  ChevronRight, Settings, Boxes, BookOpen,
} from 'lucide-react'

interface LayoutProps {
  user: { name: string; email: string }
  onLogout: () => void
  children: React.ReactNode
}

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'DSA', icon: Code2, path: '/subject/dsa', color: '#3B82F6' },
  { label: 'OOP', icon: Boxes, path: '/subject/oop', color: '#8B5CF6' },
  { label: 'DBMS', icon: Database, path: '/subject/dbms', color: '#06B6D4' },
  { label: 'OS', icon: Cpu, path: '/subject/os', color: '#10B981' },
  { label: 'CN', icon: Network, path: '/subject/cn', color: '#F59E0B' },
  { label: 'SQL', icon: Table2, path: '/subject/sql', color: '#EF4444' },
  { label: 'Aptitude', icon: Brain, path: '/subject/aptitude', color: '#A78BFA' },
  { label: 'HR Prep', icon: Users, path: '/subject/hr', color: '#14B8A6' },
]

export default function Layout({ user, onLogout, children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  const initials = user.name.split(' ').map((n) => n[0]).join('').toUpperCase()

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F0F4FF', fontFamily: 'var(--font-body)' }}>
      {/* Backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-30 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: 256, background: '#0F172A', flexShrink: 0 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
            <Code2 size={18} color="white" />
          </div>
          <span className="text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem' }}>PlacementPro</span>
          <button className="ml-auto lg:hidden text-slate-400" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="px-2 mb-2 text-slate-600" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Main</p>

          <NavLink
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all text-sm ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`
            }
            style={({ isActive }) => isActive ? { background: 'linear-gradient(135deg, #2563EB22, #7C3AED22)', border: '1px solid rgba(99,102,241,0.25)' } : {}}
          >
            {({ isActive }) => (
              <>
                <LayoutDashboard size={17} color={isActive ? '#60A5FA' : undefined} />
                <span style={{ fontWeight: isActive ? 600 : 400 }}>Dashboard</span>
                {isActive && <ChevronRight size={14} className="ml-auto" color="#60A5FA" />}
              </>
            )}
          </NavLink>

          <p className="px-2 mt-4 mb-2 text-slate-600" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Subjects</p>

          {NAV_ITEMS.slice(1).map(({ label, icon: Icon, path, color }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all text-sm ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`
              }
              style={({ isActive }) => isActive ? { background: `${color}15`, border: `1px solid ${color}30` } : {}}
            >
              {({ isActive }) => (
                <>
                  <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: isActive ? `${color}25` : 'transparent' }}>
                    <Icon size={15} color={isActive ? color : '#64748B'} />
                  </div>
                  <span style={{ fontWeight: isActive ? 600 : 400, color: isActive ? '#E2E8F0' : undefined }}>{label}</span>
                </>
              )}
            </NavLink>
          ))}

          <p className="px-2 mt-4 mb-2 text-slate-600" style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Testing</p>

          <NavLink
            to="/mock-tests"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all text-sm ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`
            }
            style={({ isActive }) => isActive ? { background: '#F9731615', border: '1px solid #F9731630' } : {}}
          >
            {({ isActive }) => (
              <>
                <ClipboardList size={17} color={isActive ? '#F97316' : '#64748B'} />
                <span style={{ fontWeight: isActive ? 600 : 400 }}>Mock Tests</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/results"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all text-sm ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`
            }
          >
            {() => (
              <>
                <BookOpen size={17} color="#64748B" />
                <span>Results & Reports</span>
              </>
            )}
          </NavLink>
        </nav>

        {/* User section */}
        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl mb-2 hover:bg-white/5 cursor-pointer transition-all">
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', color: 'white', fontWeight: 700 }}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-sm truncate" style={{ fontWeight: 600 }}>{user.name}</p>
              <p className="text-slate-500 text-xs truncate">{user.email}</p>
            </div>
            <Settings size={15} color="#475569" />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm"
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-4 px-6 py-4 bg-white border-b" style={{ borderColor: '#E2E8F0', flexShrink: 0 }}>
          <button className="lg:hidden text-slate-600" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="px-4 py-1.5 rounded-full text-sm" style={{ background: 'linear-gradient(135deg, #EFF6FF, #EDE9FE)', color: '#4338CA', fontWeight: 600 }}>
              🔥 Day 24 Streak
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm cursor-pointer" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', color: 'white', fontWeight: 700 }}>
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
