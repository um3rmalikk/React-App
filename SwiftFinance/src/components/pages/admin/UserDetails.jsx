import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../../../firebase/config'
import Sidebar from '../../layouts/sidebar'

const UserDetails = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", id))
        if (userDoc.exists()) setProfile(userDoc.data())

        const q = query(collection(db, "transactions"), where("uid", "==", id), orderBy("date", "desc"))
        const snap = await getDocs(q)
        setTransactions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      } catch (e) { console.error(e) } finally { setLoading(false) }
    }
    fetchData()
  }, [id])

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-64 hidden md:block border-r border-gray-800"><Sidebar /></div>
      <div className="flex-1 p-8 overflow-y-auto">
        <Link to="/users" className="text-gray-400 hover:text-white mb-6 inline-block">← Back to Users</Link>
        {loading ? <p>Loading...</p> : (
          <>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
              <h2 className="text-2xl font-bold">{profile?.name}</h2>
              <p className="text-gray-400">{profile?.email}</p>
              <p className="text-xs text-gray-500 mt-1">UID: {id}</p>
            </div>
            <h3 className="text-xl font-bold text-emerald-400 mb-4">Transactions</h3>
            {transactions.length === 0 ? <p className="text-gray-500">No transactions found.</p> : (
              <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                <table className="w-full text-left">
                   <thead className="bg-gray-900/50 text-gray-400 text-sm"><tr ><th className="p-4">Title</th><th className="p-4">Date</th><th className="p-4 text-right">Amount</th></tr></thead>
                   <tbody className="divide-y divide-gray-700">
                     {transactions.map(t => (
                       <tr key={t.id}><td className="p-4">{t.title}</td><td className="p-4 text-gray-400">{t.date}</td><td className={`p-4 font-bold text-right ${t.category==='Income'?'text-emerald-400':'text-red-400'}`}>${t.amount}</td></tr>
                     ))}
                   </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
export default UserDetails