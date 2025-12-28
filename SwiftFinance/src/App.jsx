import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase/config'

// Import Components
import Navbar from './components/layouts/navbar'
import PrivateNavbar from './components/layouts/PrivateNavbar' // 👈 IMPORT THIS

// Import Pages (Public)
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import Home from './components/pages/home'
import About from './components/pages/about'
import Contact from './components/pages/contact'

// Import Pages (Private - User)
import Dashboard from './components/pages/dashboard'
import Accounts from './components/pages/accounts'
import AddTransaction from './components/pages/AddTransaction'
import Transactions from './components/pages/transactions' 
import Budgets from './components/pages/budgets'
import Goals from './components/pages/goals'
import Support from './components/pages/support'
import Analytics from './components/pages/analytics'
import TransactionDetails from './components/pages/TransactionDetails'

// Import Pages (Private - Admin)
import Users from './components/pages/admin/Users'
import UserDetails from './components/pages/admin/UserDetails'

// --- THE BOUNCER (Protected Route Component) ---
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        const userDoc = await getDoc(doc(db, "users", currentUser.uid))
        if (userDoc.exists()) {
          setRole(userDoc.data().role)
        } else {
          setRole('user')
        }
      } else {
        setUser(null)
        setRole(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  if (requireAdmin && role !== 'admin') return <div className="p-10 text-center text-red-500 bg-gray-900 h-screen font-bold text-2xl flex items-center justify-center">⛔ Access Denied: Admins Only</div>

  return children
}

// --- MAIN APP ---
function App() {
  const location = useLocation();

  // List of paths where we want the PRIVATE navbar (User/Admin Dashboard)
  const privateRoutes = [
    '/dashboard', 
    '/transactions', 
    '/transaction/',
    '/accounts', 
    '/add-transaction', 
    '/budgets', 
    '/goals', 
    '/support',
    '/analytics',
    '/users',          
    '/admin/user/'     
  ];
  
  // Logic: If current URL matches a private route, show PrivateNavbar. Otherwise, show Public Navbar.
  const isPrivatePage = privateRoutes.some(route => location.pathname.startsWith(route));

  return (
      <div className="bg-gray-900 min-h-screen text-white font-sans selection:bg-emerald-500/30">
        
        {/* 👇 SWAPPING LOGIC: Show proper header based on page type */}
        {isPrivatePage ? <PrivateNavbar /> : <Navbar />}

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* --- PRIVATE ROUTES (User) --- */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
          <Route path="/add-transaction" element={<ProtectedRoute><AddTransaction /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/budgets" element={<ProtectedRoute><Budgets /></ProtectedRoute>} />
          <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} /> 
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/transaction/:id" element={<ProtectedRoute><TransactionDetails /></ProtectedRoute>} />

          {/* --- PRIVATE ROUTES (Admin Only) --- */}
          <Route path="/users" element={<ProtectedRoute requireAdmin={true}><Users /></ProtectedRoute>} />
          <Route path="/admin/user/:id" element={<ProtectedRoute requireAdmin={true}><UserDetails /></ProtectedRoute>} />

        </Routes>
      </div>
  )
}

export default App