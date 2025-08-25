// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

export function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
    })
  }, [])

  if (!user) {
    window.location.href = '/login'
    return null
  }

  return children
}