// src/App.jsx
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './services/supabase'
import { Clients } from './pages/Clients'
import { Login } from './pages/Login'
import { ForgotPassword } from './pages/ForgotPassword'

function App() {

    console.log('App is rendering') // ✅ Add this line
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  // Sync dark mode with localStorage on load
  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true'
    setDarkMode(saved)
    if (saved) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Listen to auth changes
  useEffect(() => {
    const {  listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
    })
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', newMode)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Nexa</h1>
          <button
            onClick={toggleDarkMode}
            className="text-sm px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/clients" replace />} />
          <Route path="/clients" element={user ? <Clients /> : <Navigate to="/login" replace />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Navigate to={user ? '/clients' : '/login'} replace />} />
        </Routes>
      </main>

      <footer className="max-w-md mx-auto px-4 py-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Nexa CRM • Made for solopreneurs
        </p>
      </footer>
    </div>
  )
}

export default App