import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  signOut, updateProfile, EmailAuthProvider, 
  reauthenticateWithCredential, updatePassword, sendPasswordResetEmail, deleteUser
} from 'firebase/auth'
import { doc, deleteDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase/config'

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // --- STATE ---
  const [showSettings, setShowSettings] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || "User")
  const [role, setRole] = useState(null) 
  const [passData, setPassData] = useState({ oldPass: '', newPass: '' })
  const [showOldPass, setShowOldPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [loading, setLoading] = useState(false)

  // --- FETCH ROLE ---
  useEffect(() => {
    const fetchRole = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const docSnap = await getDoc(doc(db, "users", user.uid));
                if (docSnap.exists()) {
                    setRole(docSnap.data().role || 'user');
                } else {
                    setRole('user');
                }
            } catch (err) {
                console.error("Failed to fetch role", err);
                setRole('user');
            }
        }
    };
    fetchRole();
  }, []);

  // LOADING SKELETON
  if (role === null) {
      return (
        <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-gray-900 border-r border-gray-800 p-6 pt-8">
            <div className="animate-pulse">
                <div className="h-4 bg-gray-800 rounded w-24 mb-6"></div>
                <div className="space-y-4">
                    <div className="h-10 bg-gray-800 rounded-lg"></div>
                    <div className="h-10 bg-gray-800 rounded-lg"></div>
                    <div className="h-10 bg-gray-800 rounded-lg"></div>
                </div>
            </div>
        </aside>
      )
  }

  const isAdmin = role === 'admin'; 
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')
  
  const linkStyle = (path) => `
    flex items-center gap-3 p-3 rounded-lg transition-all duration-200
    ${isActive(path) 
      ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-400' 
      : 'text-gray-400 hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
    }
  `

  const Icons = {
    Dashboard: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
    Transactions: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Accounts: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>,
    Budgets: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>,
    Goals: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
    Support: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>,
    Users: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
    Pencil: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>,
    Lock: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
    Envelope: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
    Trash: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>,
    Logout: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>,
    ChevronUp: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>,
    ChevronDown: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>,
    EyeOpen: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    EyeClosed: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
  }

  const handleLogout = async () => { try { await signOut(auth); navigate('/login'); } catch (error) { console.error("Logout Error:", error); } }
  const handleChangeName = async () => { const user = auth.currentUser; const newName = prompt("Enter new name:", user.displayName); if (newName) { await updateProfile(user, { displayName: newName }); setDisplayName(newName); alert("Name updated!"); } }
  const handleResetPassword = async () => {
    const user = auth.currentUser
    const isGoogleUser = user.providerData.some(p => p.providerId === 'google.com');
    if (isGoogleUser) { alert("You are logged in with Google. You cannot reset your password here."); return; }
    if (user && user.email) { if (window.confirm(`Send password reset email to ${user.email}?`)) { try { await sendPasswordResetEmail(auth, user.email); alert("Email sent! Check your Spam/Junk folder."); } catch (error) { alert("Error sending email: " + error.message); } } }
  }
  const handleChangePasswordSubmit = async (e) => { e.preventDefault(); setLoading(true); const user = auth.currentUser; try { const credential = EmailAuthProvider.credential(user.email, passData.oldPass); await reauthenticateWithCredential(user, credential); await updatePassword(user, passData.newPass); alert("Password updated."); setShowPasswordModal(false); } catch { alert("Error updating password."); } finally { setLoading(false); } }
  const handleDeleteAccount = async () => { if (window.prompt("Type 'DELETE' to confirm") === 'DELETE') { const user = auth.currentUser; await deleteDoc(doc(db, "users", user.uid)); await deleteUser(user); navigate('/'); } }

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-gray-900 border-r border-gray-800 px-6 pt-8 pb-4">
        
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-3">Main Menu</p>
          <ul className="space-y-2">
              
              {/* 👮 ADMIN: Users First */}
              {isAdmin && (
                 <li><Link to="/users" className={linkStyle('/users')}>{Icons.Users}<span className="font-medium">Users</span></Link></li>
              )}

              {/* 💸 BOTH (Admin 2nd, User 1st via display) */}
              <li><Link to="/transactions" className={linkStyle('/transactions')}>{Icons.Transactions}<span className="font-medium">Transactions</span></Link></li>

              {/* 👤 USER: Dashboard Second */}
              {!isAdmin && (
                <li><Link to="/dashboard" className={linkStyle('/dashboard')}>{Icons.Dashboard}<span className="font-medium">Dashboard</span></Link></li>
              )}

              {/* 👤 USER: Accounts Third */}
              {!isAdmin && (
                  <li><Link to="/accounts" className={linkStyle('/accounts')}>{Icons.Accounts}<span className="font-medium">Accounts</span></Link></li>
              )}
          </ul>

          {!isAdmin && (
            <>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-8 mb-4 px-3">Planning</p>
              <ul className="space-y-2">
                  <li><Link to="/budgets" className={linkStyle('/budgets')}>{Icons.Budgets}<span className="font-medium">Budgets</span></Link></li>
                  <li><Link to="/goals" className={linkStyle('/goals')}>{Icons.Goals}<span className="font-medium">Goals</span></Link></li>
              </ul>
            </>
          )}

          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-8 mb-4 px-3">Support</p>
          <ul className="space-y-2">
              <li><Link to="/support" className={linkStyle('/support')}>{Icons.Support}<span className="font-medium">Help Center</span></Link></li>
          </ul>
        </div>

        {/* 👇 UPDATED: Changed 'mb-10' to 'mb-32' for a big lift */}
        <div className="relative border-t border-gray-800 pt-4 mt-auto mb-32">
          <button onClick={() => setShowSettings(!showSettings)} className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-white">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold">
                      {auth.currentUser?.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="text-left">
                      <p className="text-sm font-bold">{displayName}</p>
                      <p className="text-xs text-gray-400">Settings</p>
                  </div>
              </div>
              <span className="text-gray-400">{showSettings ? Icons.ChevronDown : Icons.ChevronUp}</span>
          </button>
          {showSettings && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                  <button onClick={handleChangeName} className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 flex gap-2">{Icons.Pencil} Change Name</button>
                  <button onClick={() => setShowPasswordModal(true)} className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 flex gap-2">{Icons.Lock} Change Password</button>
                  <button onClick={handleResetPassword} className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 flex gap-2">{Icons.Envelope} Reset via Email</button>
                  <button onClick={handleDeleteAccount} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 flex gap-2">{Icons.Trash} Delete Account</button>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 flex gap-2 font-bold">{Icons.Logout} Sign Out</button>
              </div>
          )}
        </div>
      </aside>

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gray-800 w-full max-w-sm rounded-xl border border-gray-700 shadow-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Change Password</h2>
            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-bold uppercase">Current Password</label>
                <div className="relative mt-1">
                  <input type={showOldPass ? "text" : "password"} required className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white pr-10 focus:border-emerald-500 outline-none" value={passData.oldPass} onChange={(e) => setPassData({...passData, oldPass: e.target.value})} />
                  <button type="button" onClick={() => setShowOldPass(!showOldPass)} className="absolute right-3 top-2 text-gray-400 hover:text-white">{showOldPass ? Icons.EyeOpen : Icons.EyeClosed}</button>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 font-bold uppercase">New Password</label>
                <div className="relative mt-1">
                  <input type={showNewPass ? "text" : "password"} required className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white pr-10 focus:border-emerald-500 outline-none" value={passData.newPass} onChange={(e) => setPassData({...passData, newPass: e.target.value})} />
                   <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3 top-2 text-gray-400 hover:text-white">{showNewPass ? Icons.EyeOpen : Icons.EyeClosed}</button>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowPasswordModal(false)} className="flex-1 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 font-bold">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-500 font-bold">{loading ? 'Updating...' : 'Update'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar