// src/pages/Auth.jsx
import { useState } from 'react'
import { supabase } from '../services/supabase'

export function Auth() {
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [step, setStep] = useState('auth') // 'auth' or 'reset'

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {
      alert(error.message)
    } else {
      alert('Check your email to confirm!')
    }
  }

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      alert('Invalid login credentials')
    } else {
      alert('Login successful!')
    }
  }

  const handleResetPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail)
    if (error) {
      alert('Error sending reset link')
    } else {
      alert('Reset link sent to your email')
      setStep('auth')
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      {step === 'auth' ? (
        <>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-3"
          />

          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-3"
            />
          )}

          <button
            onClick={isSignUp ? handleSignUp : handleLogin}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition mb-3"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>

          <div className="text-center mt-4">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign in' : 'Don’t have an account? Sign up'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setStep('reset')}
              className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Reset Password</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Enter your email and we’ll send a reset link.
          </p>
          <input
            type="email"
            placeholder="Email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-3"
          />
          <button
            onClick={handleResetPassword}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition"
          >
            Send Reset Link
          </button>
          <button
            onClick={() => setStep('auth')}
            className="mt-3 text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            Back to Login
          </button>
        </>
      )}
    </div>
  )
}