import { HashRouter, Routes, Route, Navigate } from 'react-router'
import { useState } from 'react'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import SubjectPage from './components/SubjectPage'
import MockTestModule from './components/MockTestModule'
import TestInterface from './components/TestInterface'
import ResultsDashboard from './components/ResultsDashboard'

export interface AppUser {
  name: string
  email: string
}

export default function App() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [testResults, setTestResults] = useState<any>(null)

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage onLogin={setUser} />}
        />
        <Route
          path="/*"
          element={
            user ? (
              <Layout user={user} onLogout={() => setUser(null)}>
                <Routes>
                  <Route path="dashboard" element={<Dashboard user={user} />} />
                  <Route path="subject/:subjectId" element={<SubjectPage />} />
                  <Route path="mock-tests" element={<MockTestModule />} />
                  <Route path="test/:testId" element={<TestInterface onComplete={setTestResults} />} />
                  <Route path="results" element={<ResultsDashboard results={testResults} />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </HashRouter>
  )
}
