import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase/config' 
import Sidebar from '../layouts/sidebar'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const fetchTransactions = async () => {
    try {
      const user = auth.currentUser
      if (!user) return

      // 1. Check User Role (Admin vs User)
      const userDoc = await getDoc(doc(db, "users", user.uid))
      const role = userDoc.data()?.role
      const adminStatus = role === 'admin'
      setIsAdmin(adminStatus) // Save status to state

      // 2. Build Query based on Role
      let q;
      if (adminStatus) {
         // 👮 ADMIN: Get ALL transactions
         console.log("Admin View: Fetching all records")
         q = query(
            collection(db, "transactions"),
            orderBy("date", "desc")
         )
      } else {
         // 👤 USER: Get ONLY my transactions
         console.log("User View: Fetching personal records")
         q = query(
            collection(db, "transactions"),
            where("uid", "==", user.uid), 
            orderBy("date", "desc")
         )
      }

      const querySnapshot = await getDocs(q)
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      setTransactions(list)
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      
      {/* 1. Sidebar */}
      <div className="w-64 flex-shrink-0 hidden md:block border-r border-gray-800">
        <Sidebar />
      </div>

      {/* 2. Main Content */}
      <div className="flex-1 p-8 overflow-y-auto w-full">
      
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            {/* Dynamic Title based on Role */}
            <h2 className="text-3xl font-bold text-emerald-400">
                {isAdmin ? "All Transactions (Admin)" : "My Transaction History"}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
                {isAdmin ? "Viewing records for all users." : "Manage your income and expenses."}
            </p>
          </div>
          
          {/* 👇 KEY CHANGE: Hide 'Add' button if Admin */}
          {!isAdmin && (
            <Link to="/add-transaction"> 
                <button className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-emerald-900/20">
                    + Add New Transaction
                </button>
            </Link>
          )}
        </div>

        {loading && <p className="text-center text-gray-500 animate-pulse">Loading financial data...</p>}
        
        {!loading && transactions.length === 0 && (
          <div className="text-center p-10 bg-gray-800 rounded-xl border border-gray-700 shadow-xl">
              <p className="text-gray-400 mb-4">No transactions found.</p>
              {!isAdmin && (
                <Link to="/add-transaction" className="text-emerald-400 hover:underline">Create your first one →</Link>
              )}
          </div>
        )}

        {/* DATA GRID */}
        <div className="grid gap-4">
          {transactions.map((t) => (
            <div key={t.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center hover:border-emerald-500 transition-colors shadow-md group">
              
              <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                      t.category === 'Income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                      {t.category === 'Income' ? '💰' : '💸'}
                  </div>
                  <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">{t.title}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-400 text-sm">{t.date} • {t.category}</p>
                        
                        {/* 👮 ADMIN BADGE: Shows the Owner's ID */}
                        {isAdmin && (
                            <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded border border-yellow-500/30">
                                UID: {t.uid?.slice(0, 5)}...
                            </span>
                        )}
                      </div>
                  </div>
              </div>

              <div className="text-right">
                  <p className={`text-xl font-bold ${
                      t.category === 'Income' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                      {t.category === 'Expense' ? '-' : '+'}${parseFloat(t.amount || 0).toLocaleString()}
                  </p>
                  
                  <Link to={`/transaction/${t.id}`} className="text-xs text-gray-500 hover:text-emerald-400 transition-colors">
                      View Details &rarr;
                  </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Transactions