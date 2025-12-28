import { Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-800 border-b-2 border-emerald-400 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 h-20">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-emerald-300 hover:text-white transition-colors flex items-center gap-2">
          💼 SwiftFinance
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm font-medium">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm font-medium">About</Link>
          <Link to="/contact" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm font-medium">Contact</Link>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
            {/* FIXED: Changed /signin to /login to match App.jsx */}
            <Link to="/login" className="px-4 py-2 border border-emerald-400 rounded text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 transition-colors text-sm font-bold">Log In</Link>
            <Link to="/signup" className="px-4 py-2 bg-emerald-400 text-gray-900 font-bold rounded hover:bg-emerald-300 transition-colors text-sm">Get Started</Link>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-emerald-300 text-2xl bg-transparent border-0"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-700 bg-gray-800 absolute w-full left-0 px-6 pt-4 pb-6 shadow-xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="block py-3 text-white hover:text-emerald-300 border-b border-gray-700">Home</Link>
          
          {/* ADDED MISSING ABOUT LINK */}
          <Link to="/about" onClick={() => setIsOpen(false)} className="block py-3 text-white hover:text-emerald-300 border-b border-gray-700">About</Link>
          
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-3 text-white hover:text-emerald-300 border-b border-gray-700">Contact</Link>
          
          {/* Login Links for Mobile */}
          <Link to="/login" onClick={() => setIsOpen(false)} className="block py-3 text-emerald-400 font-bold border-b border-gray-700">Log In</Link>
          <Link to="/signup" onClick={() => setIsOpen(false)} className="block py-3 text-emerald-400 font-bold">Get Started</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar