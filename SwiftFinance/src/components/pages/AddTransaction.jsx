import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../firebase/config'

const AddTransaction = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // Form States
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('Expense')
  const [account, setAccount] = useState('Main Capital') // Restored "Account" state
  const [note, setNote] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addDoc(collection(db, "transactions"), {
        title,
        amount: parseFloat(amount),
        date,
        category,
        account, // Saving the account name directly
        note,
        createdAt: new Date()
      })

      navigate('/transactions')
      
    } catch (error) {
      console.error("Error adding transaction:", error)
      alert("Failed to add transaction.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-6">
      <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-lg">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-400">Add New Transaction</h2>
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">✕ Cancel</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* 1. SELECT ACCOUNT (Restored Hardcoded Dropdown) */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Select Account</label>
            <select 
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none transition"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            >
              <option value="Main Capital">Main Capital</option>
              <option value="Personal Savings">Personal Savings</option>
              <option value="Business Account">Business Account</option>
              <option value="Cash Wallet">Cash Wallet</option>
            </select>
          </div>

          {/* 2. TITLE */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Title</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Grocery Shopping"
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 3. AMOUNT & DATE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Amount ($)</label>
              <input 
                required
                type="number" 
                placeholder="0.00"
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none transition"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Date</label>
              <input 
                required
                type="date" 
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none transition"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* 4. CATEGORY */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Category</label>
            <select 
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none transition"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
              <option value="Savings">Savings</option>
              <option value="Investment">Investment</option>
            </select>
          </div>

          {/* 5. NOTE (Optional) */}
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Note (Optional)</label>
            <textarea 
              rows="3"
              placeholder="Add details..."
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none transition"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Transaction"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddTransaction