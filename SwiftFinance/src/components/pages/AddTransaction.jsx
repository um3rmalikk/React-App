import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { collection, addDoc, getDocs, doc, updateDoc, increment } from 'firebase/firestore'
import { db } from '../../../firebase/config'

const AddTransaction = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [accounts, setAccounts] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Expense',
    date: new Date().toISOString().split('T')[0],
    note: '',
    accountId: '' 
  })

  // 1. Fetch Accounts
  useEffect(() => {
    const fetchAccounts = async () => {
        const snapshot = await getDocs(collection(db, "accounts"))
        const list = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }))
        setAccounts(list)
        if(list.length > 0) {
            setFormData(prev => ({ ...prev, accountId: list[0].id }))
        }
    }
    fetchAccounts()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const val = parseFloat(formData.amount)
      // Expense = Subtract, Income = Add
      const adjustment = formData.category === 'Income' ? val : -val

      // 1. Create Transaction
      await addDoc(collection(db, "transactions"), {
        ...formData,
        amount: val, 
        createdAt: new Date()
      })

      // 2. Update Account Balance
      if (formData.accountId) {
          const accountRef = doc(db, "accounts", formData.accountId)
          await updateDoc(accountRef, {
              balance: increment(adjustment)
          })
      }
      
      alert("Transaction Added & Balance Updated!")
      navigate('/transactions') 
    } catch (error) {
      console.error("Error: ", error)
      alert("Error saving transaction.")
    } finally {
      setLoading(false)
    }
  }

  return (
    // FIXED: Removed 'bg-gray-900'. Now it is transparent and fits the main layout.
    <div className="p-8 w-full min-h-screen text-white flex justify-center items-center">
      
      {/* Form Card (Kept bg-gray-800 to match other cards) */}
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-emerald-400">Add New Transaction</h2>
            <Link to="/transactions" className="text-gray-400 hover:text-white">✕ Cancel</Link>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Account Selection */}
          <div>
            <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Select Account</label>
            <select 
              className="w-full bg-gray-900 rounded p-3 text-white border border-gray-600 focus:border-emerald-500 outline-none"
              onChange={(e) => setFormData({...formData, accountId: e.target.value})}
              value={formData.accountId}
            >
                {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.name}</option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Title</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Grocery Shopping"
              className="w-full bg-gray-900 rounded p-3 text-white border border-gray-600 focus:border-emerald-500 outline-none"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Amount ($)</label>
                <input 
                  required
                  type="number" 
                  step="0.01"
                  placeholder="0.00"
                  className="w-full bg-gray-900 rounded p-3 text-white border border-gray-600 focus:border-emerald-500 outline-none"
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Date</label>
                <input 
                  required
                  type="date" 
                  value={formData.date}
                  className="w-full bg-gray-900 rounded p-3 text-white border border-gray-600 focus:border-emerald-500 outline-none"
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-xs uppercase font-bold mb-2">Category</label>
            <select 
              className="w-full bg-gray-900 rounded p-3 text-white border border-gray-600 focus:border-emerald-500 outline-none"
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
                <option value="Savings">Savings</option>
                <option value="Investment">Investment</option>
            </select>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 rounded-lg font-bold transition-all mt-4 shadow-lg shadow-emerald-900/50"
          >
            {loading ? "Processing..." : "Save Transaction"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddTransaction