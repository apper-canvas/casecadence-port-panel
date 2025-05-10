import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import getIcon from './utils/iconUtils'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()
  
  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])
  
  // Create icon components
  const MoonIcon = getIcon('Moon')
  const SunIcon = getIcon('Sun')
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with dark mode toggle */}
      <header className="sticky top-0 z-30 w-full h-16 px-4 md:px-6 lg:px-8 border-b border-surface-200 dark:border-surface-800 bg-surface-50/90 dark:bg-surface-900/90 backdrop-blur-sm">
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-lg md:text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CaseCadence
            </div>
          </div>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      {/* Toast notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="rounded-lg shadow-soft"
      />
    </div>
  )
}

export default App