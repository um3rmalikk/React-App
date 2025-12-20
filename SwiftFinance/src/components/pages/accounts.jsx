import { useState, useEffect, useRef } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase/config'

const Accounts = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const effectRan = useRef(false) 

  const fetchAccounts = async () => {
    try {
      const accountsRef = collection(db, "accounts")
      const querySnapshot = await getDocs(accountsRef)
      
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      // --- SMART SEEDING LOGIC ---
      if (list.length === 0 && effectRan.current === false) {
          console.log("No accounts found. Creating defaults...")
          effectRan.current = true; 

          const seedData = [
              { name: 'Main Capital', balance: 150000.00, type: 'Checking', number: '**** 8842' },
              { name: 'High-Yield Savings', balance: 250000.00, type: 'Savings', number: '**** 9931' }
          ]
          
          for (const acc of seedData) {
              await addDoc(accountsRef, acc)
          }
          
          window.location.reload()
          return
      }
      // ---------------------------

      setAccounts(list)
    } catch (error) {
      console.error("Error fetching accounts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this account?")) return;

    try {
        await deleteDoc(doc(db, "accounts", id))
        setAccounts(accounts.filter(acc => acc.id !== id))
    } catch (error) {
        console.error("Error deleting account:", error)
        alert("Could not delete account")
    }
  }

  return (
    <div className="p-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl text-emerald-400 font-bold">My Accounts</h2>
        <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition text-sm font-bold shadow-lg w-full sm:w-auto">
          + Add New Account
        </button>
      </div>

      {loading && <p className="text-gray-500 text-center">Loading accounts...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {accounts.map(account => (
          <div 
            key={account.id} 
            // UPDATED: Reduced padding from p-8 to p-6
            className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl hover:border-emerald-500/50 transition duration-300 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none"></div>

            {/* UPDATED: Reduced bottom margin from mb-8 to mb-4 */}
            <div className="flex justify-between items-start mb-4">
              <div>
                {/* UPDATED: Reduced title size from text-2xl to text-xl */}
                <h4 className="text-xl font-bold text-white group-hover:text-emerald-300 transition">
                  {account.name}
                </h4>
                <p className="text-gray-500 mt-1 text-sm">
                  {account.type} • <span className="tracking-widest font-mono text-gray-400">{account.number}</span>
                </p>
              </div>
              
              {/* UPDATED: Reduced icon size from w-12 to w-10 */}
              <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center text-emerald-400 font-bold border border-gray-600 text-lg">
                $
              </div>
            </div>

            {/* UPDATED: Reduced margin */}
            <div className="mb-4">
              <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">Total Balance</p>
              {/* UPDATED: Reduced balance size from text-4xl to text-3xl */}
              <p className="text-3xl font-bold text-white mt-1">
                ${parseFloat(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>

            {/* UPDATED: Reduced padding-top */}
            <div className="pt-4 border-t border-gray-700 flex justify-between items-center">
              <button 
                onClick={() => handleDelete(account.id)}
                className="text-red-400 hover:text-red-300 text-xs font-medium transition flex items-center gap-1 px-3 py-1 rounded bg-red-500/10 border border-red-500/20"
              >
                Delete
              </button>

              <button className="text-gray-400 hover:text-white text-xs font-medium transition flex items-center gap-1 hover:gap-2 duration-200">
                View History &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Accounts