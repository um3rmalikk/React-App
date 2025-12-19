import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Import Firestore functions
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/config'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTransactions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "transactions"))
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
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      
      {/* HEADER WITH ADD BUTTON */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-emerald-400">Transaction History</h2>
        
        {/* Button to go to the 'Add New' page */}
        <Link to="/transactions/add">
            <button className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-emerald-900/20">
                + Add New Transaction
            </button>
        </Link>
      </div>

      {loading && <p className="text-center text-gray-500">Loading financial data...</p>}
      
      {!loading && transactions.length === 0 && (
        <div className="text-center p-10 bg-gray-800 rounded-xl border border-gray-700">
            <p className="text-gray-400 mb-4">No transactions found.</p>
            <Link to="/transactions/add" className="text-emerald-400 hover:underline">Create your first one →</Link>
        </div>
      )}

      {/* DATA GRID */}
      <div className="grid gap-4">
        {transactions.map((t) => (
          <div key={t.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center hover:border-emerald-500 transition-colors shadow-md">
            
            {/* Left Side: Icon & Title */}
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                    t.category === 'Income' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                }`}>
                    {t.category === 'Income' ? '💰' : '💸'}
                </div>
                <div>
                    <h3 className="font-bold text-lg text-white">{t.title}</h3>
                    <p className="text-gray-400 text-sm">{t.date} • {t.category}</p>
                </div>
            </div>

            {/* Right Side: Amount & Details Link */}
            <div className="text-right">
                <p className={`text-xl font-bold ${
                    t.category === 'Income' ? 'text-green-400' : 'text-white'
                }`}>
                    {t.category === 'Expense' ? '-' : '+'}${parseFloat(t.amount || 0).toLocaleString()}
                </p>
                
                {/* 3. UPDATED LINK: Points to the new TransactionDetails page */}
                <Link to={`/transaction/${t.id}`} className="text-xs text-emerald-500 hover:underline">
                    View Details
                </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Transactions