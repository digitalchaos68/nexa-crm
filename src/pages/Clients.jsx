// src/pages/Clients.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

export function Clients() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching clients:', error)
    } else {
      setClients(data)
    }
    setLoading(false)
  }

  // ✅ Only one handleLogout — remove the duplicate!
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login' // Redirect to login page
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">Loading clients...</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Clients</h1>
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
          Logout
        </button>
      </header>

      {clients.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No clients yet. Add one!</p>
      ) : (
        <ul className="space-y-3">
          {clients.map((client) => (
            <li key={client.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{client.name}</h2>
              {client.industry && (
                <p className="text-sm text-indigo-600 dark:text-indigo-400">{client.industry}</p>
              )}
              {client.website && (
                <a
                  href={client.website.startsWith('http') ? client.website : `https://${client.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {client.website}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <button
          onClick={() => alert('Add client modal coming soon!')}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition"
        >
          + Add Client
        </button>
      </div>
    </div>
  )
}