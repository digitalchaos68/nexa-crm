import { useState, useEffect } from 'react';

function App() {
  const [user] = useState(null); // We'll add auth later
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-200 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Nexa</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-8">
        {!user ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Welcome to Nexa</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Your clients, connected.
            </p>
            <div className="mt-6">
              <button className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition">
                Sign In
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Build your client relationships — simply.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 dark:text-gray-300">
              Signed in as {user.email}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-md mx-auto px-4 py-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Nexa CRM • Made for solopreneurs
        </p>
      </footer>
    </div>
  );
}

export default App;