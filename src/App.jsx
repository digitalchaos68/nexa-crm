// src/App.jsx
import { useState, useEffect } from 'react'  // ✅ Add this line!
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './services/supabase'
import { Clients } from './pages/Clients'
import { Login } from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  const [user, setUser] = useState(null)  // ✅ Now works!

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Nexa</h1>
          <button
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="text-sm px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {document.documentElement.classList.contains('dark') ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/clients" />}
          />
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <Clients />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/forgot-password" 
            element={<ForgotPassword />} 
          />
          <Route
            path="/"
            element={<Navigate to={user ? '/clients' : '/login'} />}
          />
        </Routes>
      </main>

      <footer className="max-w-md mx-auto px-4 py-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Nexa CRM • Made for solopreneurs
        </p>
      </footer>
    </div>
  )

// Inside App() function, replace dark mode logic
const [darkMode, setDarkMode] = useState(false)

useEffect(() => {
  // Check localStorage
  const saved = localStorage.getItem('darkMode') === 'true'
  setDarkMode(saved)
  if (saved) {
    document.documentElement.classList.add('dark')
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

}

export default App