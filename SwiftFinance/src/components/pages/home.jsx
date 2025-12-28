import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase/config'

import HeroSection from "../views/homeviews/HeroSection";
import Featured from "../views/homeviews/featured";
import Faqs from "../views/homeviews/Faqs";

const Home = () => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        // Check Role immediately upon loading
        try {
            const docSnap = await getDoc(doc(db, "users", currentUser.uid))
            if (docSnap.exists()) {
                setRole(docSnap.data().role || 'user')
            } else {
                setRole('user')
            }
        } catch (error) {
            console.error("Role fetch error:", error)
            setRole('user')
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Show nothing while we check authentication (prevents flickering)
  if (loading) return null 

  // 👇 SMART REDIRECT LOGIC
  if (user) {
    if (role === 'admin') {
        return <Navigate to="/users" replace />        // Admin lands on Users
    } else {
        return <Navigate to="/transactions" replace /> // User lands on Transactions
    }
  }

  // If NOT logged in, show the public Home Page
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-emerald-500/30">
      <main style={{ background: "transparent" }}>
        <HeroSection />
        <div id="featured"><Featured /></div>
        <div id="faqs"><Faqs /></div>
      </main>
    </div>
  );
};

export default Home;