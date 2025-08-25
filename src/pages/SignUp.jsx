// src/pages/SignUp.jsx
import { useState } from 'react'
import { supabase } from '../services/supabase'
import { useNavigate } from 'react-router-dom' // Optional: if using routing

export function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPasssword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('✅ Check your email to confirm your account!')
      // Optionally redirect:
      // window.location.href = '/'
    }
    setLoading(false)
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Create Account</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Sign up to start managing your clients with Nexa.
      </p>

      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPasssword(e.target.value)}
          required
          minLength="6"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-3"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg shadow transition"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}