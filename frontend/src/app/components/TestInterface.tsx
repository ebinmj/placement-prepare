import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Clock, Flag, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, Bookmark } from 'lucide-react'

const QUESTION_BANK = [
  { id: 1, subject: 'DSA', difficulty: 'Easy', question: 'What is the time complexity of accessing an element in an array by index?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], correct: 2, explanation: 'Direct index access in an array is O(1) — memory address is computed instantly.' },
  { id: 2, subject: 'DSA', difficulty: 'Easy', question: 'Which data structure follows LIFO (Last In First Out) principle?', options: ['Queue', 'Stack', 'Array', 'Linked List'], correct: 1, explanation: 'Stack follows LIFO — the last element pushed is the first popped.' },
  { id: 3, subject: 'DSA', difficulty: 'Medium', question: 'What is the worst-case time complexity of Quick Sort?', options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'], correct: 1, explanation: "Quick Sort's worst case O(n²) occurs when pivot is always min or max element." },
  { id: 4, subject: 'OOP', difficulty: 'Easy', question: 'Which OOP principle bundles data and methods and hides internal implementation?', options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'], correct: 2, explanation: 'Encapsulation wraps data and methods in a class, exposing only what is necessary.' },
  { id: 5, subject: 'OOP', difficulty: 'Medium', question: 'What is method overriding?', options: ['Defining multiple methods with same name but different params', 'A subclass providing its own implementation of a parent method', 'Hiding parent class methods', 'Calling a parent class constructor'], correct: 1, explanation: 'Method overriding allows subclass to provide specific implementation for inherited method.' },
  { id: 6, subject: 'DBMS', difficulty: 'Easy', question: 'What does ACID in databases stand for?', options: ['Atomicity, Consistency, Isolation, Durability', 'Accuracy, Consistency, Independence, Data', 'Atomicity, Clarity, Isolation, Dependence', 'None of the above'], correct: 0, explanation: 'ACID properties ensure reliable database transactions.' },
  { id: 7, subject: 'DBMS', difficulty: 'Medium', question: 'Which normal form eliminates transitive functional dependencies?', options: ['1NF', '2NF', '3NF', 'BCNF'], correct: 2, explanation: '3NF requires no non-prime attribute depends transitively on any key.' },
  { id: 8, subject: 'OS', difficulty: 'Easy', question: 'What is a deadlock in operating systems?', options: ['When CPU usage is 100%', 'When two or more processes wait indefinitely for resources held by each other', 'When memory is exhausted', 'When a process crashes'], correct: 1, explanation: 'Deadlock: circular waiting for resources leads to infinite block.' },
  { id: 9, subject: 'OS', difficulty: 'Medium', question: 'Which CPU scheduling algorithm provides minimum average waiting time for a given set of processes?', options: ['FCFS', 'Round Robin', 'Shortest Job First (SJF)', 'Priority Scheduling'], correct: 2, explanation: 'SJF minimizes average waiting time by always executing the shortest available job.' },
  { id: 10, subject: 'CN', difficulty: 'Easy', question: 'How many layers does the OSI model have?', options: ['4', '5', '7', '6'], correct: 2, explanation: 'OSI model: Physical, Data Link, Network, Transport, Session, Presentation, Application — 7 layers.' },
  { id: 11, subject: 'CN', difficulty: 'Medium', question: 'Which protocol provides reliable, ordered, and error-checked delivery of data?', options: ['UDP', 'IP', 'TCP', 'ICMP'], correct: 2, explanation: 'TCP provides reliability through connection establishment, acknowledgments, and retransmission.' },
  { id: 12, subject: 'SQL', difficulty: 'Easy', question: 'Which SQL clause is used to filter rows in a query result?', options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'], correct: 2, explanation: 'WHERE filters individual rows before any grouping takes place.' },
  { id: 13, subject: 'SQL', difficulty: 'Medium', question: 'What type of JOIN returns all records from both tables, with NULLs where no match?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'], correct: 3, explanation: 'FULL OUTER JOIN returns all rows from both tables regardless of matching.' },
  { id: 14, subject: 'Aptitude', difficulty: 'Easy', question: 'If 6 workers complete a task in 8 days, how many days will 4 workers take to complete the same task?', options: ['10 days', '12 days', '14 days', '16 days'], correct: 1, explanation: '6 × 8 = 48 man-days. 48 ÷ 4 = 12 days.' },
  { id: 15, subject: 'DSA', difficulty: 'Hard', question: "What is the time complexity of Dijkstra's algorithm using a binary min-heap?", options: ['O(V²)', 'O((V + E) log V)', 'O(V log E)', 'O(VE)'], correct: 1, explanation: "With a min-heap, Dijkstra's runs in O((V + E) log V) — each vertex and edge is processed with log-factor priority queue operations." },
]

const OPTION_LABELS = ['A', 'B', 'C', 'D']

interface TestInterfaceProps {
  onComplete: (results: any) => void
}

export default function TestInterface({ onComplete }: TestInterfaceProps) {
  const { testId } = useParams<{ testId: string }>()
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [flagged, setFlagged] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes
  const [submitted, setSubmitted] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const questions = QUESTION_BANK

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleSubmit()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0)
    const results = {
      testId,
      total: questions.length,
      score,
      answers,
      questions,
      timeTaken: 30 * 60 - timeLeft,
    }
    onComplete(results)
    navigate('/results')
  }

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const isLowTime = timeLeft < 5 * 60

  const toggleFlag = (i: number) => {
    setFlagged((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const q = questions[current]
  const answered = Object.keys(answers).length
  const attempted = answers[current] !== undefined

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Top bar */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between gap-4" style={{ borderColor: '#E2E8F0', flexShrink: 0 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A', fontSize: '1rem' }}>
            Placement Mock Test
          </h2>
          <p className="text-xs text-slate-400">{testId?.replace(/-/g, ' ')}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <CheckCircle size={14} color="#10B981" />
            <span>{answered} answered</span>
            <span className="text-slate-300">|</span>
            <Flag size={14} color="#F59E0B" />
            <span>{flagged.size} flagged</span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: isLowTime ? '#FEF2F2' : '#F0F4FF', border: `1px solid ${isLowTime ? '#FECACA' : '#BFDBFE'}` }}>
            <Clock size={16} color={isLowTime ? '#DC2626' : '#2563EB'} />
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: isLowTime ? '#DC2626' : '#2563EB', fontSize: '1rem' }}>
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            className="px-4 py-2 rounded-xl text-white text-sm hover:opacity-90 transition-all"
            style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', fontWeight: 600 }}
          >
            Submit Test
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Question nav panel */}
        <aside className="w-56 bg-white border-r p-4 overflow-y-auto flex-shrink-0" style={{ borderColor: '#E2E8F0' }}>
          <p className="text-xs text-slate-500 mb-3" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Questions</p>
          <div className="grid grid-cols-4 gap-2">
            {questions.map((_, i) => {
              const isAnswered = answers[i] !== undefined
              const isFlagged = flagged.has(i)
              const isCurrent = i === current
              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-10 h-10 rounded-lg text-sm transition-all"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    background: isCurrent ? '#2563EB' : isAnswered ? '#DCFCE7' : isFlagged ? '#FFFBEB' : '#F8FAFF',
                    color: isCurrent ? '#fff' : isAnswered ? '#16A34A' : isFlagged ? '#D97706' : '#64748B',
                    border: isCurrent ? '2px solid #2563EB' : isFlagged ? '1.5px solid #FCD34D' : '1.5px solid #E2E8F0',
                  }}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>

          <div className="mt-6 space-y-2">
            {[
              { color: '#DCFCE7', border: '#86EFAC', text: '#16A34A', label: 'Answered' },
              { color: '#FFFBEB', border: '#FCD34D', text: '#D97706', label: 'Flagged' },
              { color: '#F8FAFF', border: '#E2E8F0', text: '#64748B', label: 'Not visited' },
            ].map(({ color, border, text, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded" style={{ background: color, border: `1.5px solid ${border}` }} />
                <span className="text-xs text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Question area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl">
            {/* Question header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: '#EFF6FF', color: '#2563EB', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                Q{current + 1} / {questions.length}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full" style={{
                background: q.difficulty === 'Easy' ? '#ECFDF5' : q.difficulty === 'Hard' ? '#FEF2F2' : '#FFFBEB',
                color: q.difficulty === 'Easy' ? '#10B981' : q.difficulty === 'Hard' ? '#EF4444' : '#F59E0B',
                fontWeight: 600,
              }}>
                {q.difficulty}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: '#F5F3FF', color: '#7C3AED', fontWeight: 600 }}>{q.subject}</span>
              <button
                onClick={() => toggleFlag(current)}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
                style={{
                  background: flagged.has(current) ? '#FFFBEB' : '#F8FAFF',
                  color: flagged.has(current) ? '#D97706' : '#94A3B8',
                  border: `1px solid ${flagged.has(current) ? '#FCD34D' : '#E2E8F0'}`,
                  fontWeight: 500,
                }}
              >
                <Flag size={12} /> {flagged.has(current) ? 'Flagged' : 'Flag'}
              </button>
            </div>

            {/* Question text */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: '#fff', border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p className="text-slate-800 leading-relaxed" style={{ fontSize: '1.05rem', fontWeight: 500 }}>
                {q.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {q.options.map((opt, oi) => {
                const selected = answers[current] === oi
                return (
                  <button
                    key={oi}
                    onClick={() => setAnswers({ ...answers, [current]: oi })}
                    className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-150 hover:shadow-sm"
                    style={{
                      background: selected ? '#EFF6FF' : '#fff',
                      border: `2px solid ${selected ? '#2563EB' : '#E2E8F0'}`,
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: selected ? '#2563EB' : '#F8FAFF',
                        color: selected ? '#fff' : '#64748B',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        border: `1.5px solid ${selected ? '#2563EB' : '#E2E8F0'}`,
                      }}
                    >
                      {OPTION_LABELS[oi]}
                    </div>
                    <span className="text-slate-700" style={{ fontWeight: selected ? 600 : 400 }}>{opt}</span>
                    {selected && <CheckCircle size={18} color="#2563EB" className="ml-auto flex-shrink-0" />}
                  </button>
                )
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrent(Math.max(0, current - 1))}
                disabled={current === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all disabled:opacity-40"
                style={{ background: '#fff', border: '1.5px solid #E2E8F0', color: '#475569', fontWeight: 600 }}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <span className="text-sm text-slate-400">
                {current + 1} of {questions.length}
              </span>

              {current === questions.length - 1 ? (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', fontWeight: 600 }}
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={() => setCurrent(Math.min(questions.length - 1, current + 1))}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-md"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', color: '#fff', fontWeight: 600 }}
                >
                  Next <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Submit confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#FFFBEB' }}>
                <AlertTriangle size={22} color="#F59E0B" />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0F172A' }}>Submit Test?</h3>
                <p className="text-sm text-slate-400">This action cannot be undone</p>
              </div>
            </div>
            <div className="rounded-xl p-4 mb-5" style={{ background: '#F8FAFF', border: '1px solid #E2E8F0' }}>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#10B981', fontSize: '1.3rem' }}>{answered}</p>
                  <p className="text-xs text-slate-400">Answered</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#EF4444', fontSize: '1.3rem' }}>{questions.length - answered}</p>
                  <p className="text-xs text-slate-400">Unanswered</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#F59E0B', fontSize: '1.3rem' }}>{flagged.size}</p>
                  <p className="text-xs text-slate-400">Flagged</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 rounded-xl text-sm text-slate-600" style={{ border: '1.5px solid #E2E8F0', fontWeight: 600 }}>
                Review
              </button>
              <button onClick={handleSubmit} className="flex-1 py-2.5 rounded-xl text-sm text-white" style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)', fontWeight: 600 }}>
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
