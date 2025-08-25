// src/pages/ForgotPassword.jsx
import { useState } from 'react'
import { supabase } from '../services/supabase'
import { useNavigate } from 'react-router-dom'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    })

    setLoading(false)
    if (error) {
      alert(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Forgot Password</h1>

      {sent ? (
        <>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            ✅ A password reset link has been sent to <strong>{email}</strong>.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition"
          >
            Back to Login
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Enter your email and we'll send a reset link.
          </p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg shadow transition"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/login')}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}