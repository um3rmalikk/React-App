import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, googleProvider, db } from '../../firebase/config'

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('') 
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const navigate = useNavigate()

  // --- ICONS ---
  const EyeOpen = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  const EyeClosed = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>

  // 👇 HELPER: Decides where to go based on Role
  const handleRedirect = async (userId) => {
    try {
        const docSnap = await getDoc(doc(db, "users", userId))
        const role = docSnap.data()?.role || 'user'
        
        if (role === 'admin') {
            navigate('/users')       // Admin lands on Users
        } else {
            navigate('/transactions') // User lands on Transactions
        }
    } catch (err) {
        console.error("Redirect Error:", err)
        navigate('/transactions') // Safety fallback
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
    setMsg('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      // Check role and redirect
      await handleRedirect(result.user.uid)
    } catch (err) {
      console.error("Login Error:", err.code)
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      
      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (!userDoc.exists()) {
        // New Google User -> Create Doc -> Force Role 'user' -> Go to Transactions
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: "user",
          createdAt: new Date()
        })
        navigate('/transactions') 
      } else {
        // Existing User -> Check Role -> Redirect appropriately
        await handleRedirect(user.uid)
      }
    } catch (err) {
      console.error("Google Sign-In Error:", err)
      setError("Google Sign-In failed.")
    }
  }

  const handleResetPassword = async () => {
    if (!formData.email) {
      setError("Please enter your email address to reset password.")
      return
    }
    try {
      await sendPasswordResetEmail(auth, formData.email)
      setMsg("Password reset email sent! Check your inbox.")
      setError("")
    } catch (error) {
      setError("Failed to send reset email. Check if the email is correct.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-gray-400 text-sm">Access your SwiftFinance dashboard</p>
        </div>

        {msg && <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/50 rounded text-emerald-400 text-sm text-center">{msg}</div>}
        {error && <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-gray-300 text-xs font-medium mb-1">Email Address</label>
            <input 
              name="email" 
              type="email"
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500 transition"
              placeholder="you@company.com"
            />
          </div>

          {/* Password with Eye Icon */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-gray-300 text-xs font-medium">Password</label>
              <button type="button" onClick={handleResetPassword} className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline">Forgot Password?</button>
            </div>
            
            <div className="relative">
              <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                value={formData.password} 
                onChange={handleChange} 
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-emerald-500 transition pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? EyeOpen : EyeClosed}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition shadow-lg">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <button type="button" onClick={handleGoogleSignIn} className="w-full py-3 bg-white text-gray-900 font-bold rounded-lg transition hover:bg-gray-100 flex items-center justify-center gap-2">
            <span className="text-lg">G</span> Sign in with Google
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 font-semibold transition">Create Account</Link>
        </div>

      </div>
    </div>
  )
}

export default SignIn