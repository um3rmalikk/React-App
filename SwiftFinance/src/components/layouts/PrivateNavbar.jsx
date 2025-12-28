import { useState, useEffect } from 'react'
import { auth, db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const PrivateNavbar = () => {
  const [dashboardTitle, setDashboardTitle] = useState('Dashboard') // Default
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUserName(currentUser.displayName || 'User')
        
        try {
          // Check the Role in Database
          const docSnap = await getDoc(doc(db, "users", currentUser.uid))
          if (docSnap.exists()) {
            const role = docSnap.data().role
            
            // 👇 LOGIC: Change Title based on Role
            if (role === 'admin') {
                setDashboardTitle('Admin Dashboard')
            } else {
                setDashboardTitle('User Dashboard')
            }
          }
        } catch (error) {
          console.error("Error fetching role:", error)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <header className="bg-gray-800 border-b border-gray-700 h-20 flex items-center justify-between px-8 sticky top-0 z-40 w-full">
      
      {/* LEFT: Dynamic Title */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">
            {dashboardTitle === 'Admin Dashboard' ? '🛡️' : '💼'}
        </span>
        <h1 className="text-2xl font-bold text-white tracking-wide">
          {dashboardTitle}
        </h1>
      </div>

      {/* RIGHT: User Name & Avatar */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
            <p className="text-xs text-gray-400 uppercase font-bold">Welcome,</p>
            <p className="text-sm text-emerald-400 font-bold">{userName}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold border-2 border-gray-700 shadow-lg">
            {userName.charAt(0).toUpperCase()}
        </div>
      </div>

    </header>
  )
}

export default PrivateNavbar