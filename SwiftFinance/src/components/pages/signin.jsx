import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please provide both email and password')
      return
    }

    setLoading(true)
    
    // Simulating an API call
    setTimeout(() => {
      // Create a fake token
      localStorage.setItem('auth_token', 'demo_token_' + Date.now())
      setLoading(false)
      navigate('/') // Redirect to Dashboard
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-700">
        
        {/* --- Left Side: Branding & Info (Hidden on mobile) --- */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-emerald-900/40 to-gray-900 p-10 flex-col justify-center relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <h2 className="text-3xl font-bold text-emerald-400 mb-4 z-10">Welcome Back</h2>
          <p className="text-gray-300 text-lg mb-6 z-10">
            Log in to track your wealth, manage budgets, and achieve financial freedom with SwiftFinance.
          </p>
          
          <ul className="space-y-3 text-gray-400 z-10">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Real-time Analytics
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Secure Transactions
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Budget Planning
            </li>
          </ul>
        </div>

        {/* --- Right Side: Login Form --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
            <p className="text-gray-400 text-sm">Access your SwiftFinance dashboard</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-300 text-sm font-medium">Password</label>
                <Link to="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-white transition duration-200 
                ${loading ? 'bg-emerald-700 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/20'}`}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 font-semibold transition">
              Create Account
            </Link>
          </div>

          <div className="mt-6 text-center">
             <span className="text-xs text-gray-600 bg-gray-800 px-2 py-1 border border-gray-700 rounded">
               Demo: admin@swiftfinance.com / password123
             </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignIn