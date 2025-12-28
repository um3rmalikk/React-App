import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../../../firebase/config' // 👈 Make sure 'auth' is imported
import { Link } from 'react-router-dom'
import Sidebar from '../../layouts/sidebar'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const currentAdminId = auth.currentUser?.uid // 👈 Get your Admin ID
        
        const querySnapshot = await getDocs(collection(db, "users"))
        
        const list = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() })) // 1. Convert to List
            .filter(user => user.id !== currentAdminId)   // 2. 👈 REMOVE YOURSELF
            
        setUsers(list)
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-64 hidden md:block border-r border-gray-800"><Sidebar /></div>
      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">User Management</h2>
        
        {loading ? <p className="text-center animate-pulse">Loading users...</p> : (
          <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-900/50 text-gray-400 text-sm uppercase">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="p-4 text-center text-gray-500">No other users found.</td>
                    </tr>
                ) : (
                    users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-700/50 transition">
                        <td className="p-4 font-bold">{user.name}</td>
                        <td className="p-4 text-gray-400">{user.email}</td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                {user.role || 'user'}
                            </span>
                        </td>
                        <td className="p-4">
                        <Link to={`/admin/user/${user.uid}`} className="text-emerald-400 hover:underline text-sm font-bold">
                            View Details →
                        </Link>
                        </td>
                    </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
export default Users