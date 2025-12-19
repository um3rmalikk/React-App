import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // Calculate Password Strength
  const passwordStrength = useMemo(() => {
    const pwd = formData.password || ''
    if (pwd.length >= 12 && /[A-Z]/.test(pwd) && /\d/.test(pwd)) return 'Strong'
    if (pwd.length >= 8) return 'Medium'
    if (pwd.length > 0) return 'Weak'
    return ''
  }, [formData.password])

  // Get color for strength text
  const getStrengthColor = (strength) => {
    if (strength === 'Strong') return 'text-emerald-400'
    if (strength === 'Medium') return 'text-yellow-400'
    return 'text-red-400'
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.includes('@')) newErrors.email = 'Enter a valid email'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      setLoading(true)
      setTimeout(() => {
        localStorage.setItem('auth_token', 'demo_token_' + Date.now())
        setLoading(false)
        navigate('/')
      }, 1500)
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-700">
        
        {/* --- Left Side: Branding & Benefits (Hidden on Mobile) --- */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-emerald-900/40 to-gray-900 p-10 flex-col justify-center relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <h2 className="text-3xl font-bold text-emerald-400 mb-6 z-10">Join SwiftFinance</h2>
          <p className="text-gray-300 text-lg mb-8 z-10">
            Create your account to start tracking accounts, recording transactions, and getting quick financial insights.
          </p>
          
          <div className="z-10 bg-gray-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
            <strong className="text-white block mb-4 text-lg">Why join us?</strong>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
                Smart Budget Tracking
              </li>
              <li className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
                 Secure Data Encryption
              </li>
              <li className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">✓</div>
                 Visual Analytics
              </li>
            </ul>
          </div>
        </div>

        {/* --- Right Side: Sign Up Form --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400 text-sm">Start your financial journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-300 text-xs font-medium mb-1">First Name</label>
                <input 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  placeholder="John" 
                  className={`w-full p-3 rounded-lg bg-gray-700 border ${errors.firstName ? 'border-red-500' : 'border-gray-600'} text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition`} 
                />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div className="flex-1">
                <label className="block text-gray-300 text-xs font-medium mb-1">Last Name</label>
                <input 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  placeholder="Doe" 
                  className={`w-full p-3 rounded-lg bg-gray-700 border ${errors.lastName ? 'border-red-500' : 'border-gray-600'} text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition`} 
                />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 text-xs font-medium mb-1">Email Address</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="you@company.com" 
                className={`w-full p-3 rounded-lg bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition`} 
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 text-xs font-medium mb-1">Password</label>
              <input 
                name="password" 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Create a password" 
                className={`w-full p-3 rounded-lg bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'} text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition`} 
              />
              <div className="flex justify-between mt-1">
                 {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
                 {passwordStrength && (
                   <p className={`text-xs ml-auto ${getStrengthColor(passwordStrength)}`}>
                     Strength: {passwordStrength}
                   </p>
                 )}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-300 text-xs font-medium mb-1">Confirm Password</label>
              <input 
                name="confirmPassword" 
                type="password" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                placeholder="Repeat your password" 
                className={`w-full p-3 rounded-lg bg-gray-700 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition`} 
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input 
                type="checkbox" 
                name="agreeTerms" 
                checked={formData.agreeTerms} 
                onChange={handleChange} 
                className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-400">
                I agree to the <Link to="#" className="text-emerald-400 hover:text-emerald-300">Terms</Link> and <Link to="#" className="text-emerald-400 hover:text-emerald-300">Privacy Policy</Link>
              </span>
            </div>
            {errors.agreeTerms && <p className="text-red-400 text-xs">{errors.agreeTerms}</p>}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading} 
              className={`w-full py-3 mt-4 rounded-lg font-bold text-white transition duration-200 
                ${loading ? 'bg-emerald-700 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/20'}`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/signin" className="text-emerald-400 hover:text-emerald-300 font-semibold transition">
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUp