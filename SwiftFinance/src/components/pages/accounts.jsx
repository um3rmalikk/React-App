import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../layouts/sidebar' // 👈 Added Sidebar

const Accounts = () => {
  // Mock Data to match your screenshot
  const accounts = [
    { id: 1, name: 'Main Capital', type: 'Checking', mask: '8842', balance: 155000.00, color: 'emerald' },
    { id: 2, name: 'High-Yield Savings', type: 'Savings', mask: '9931', balance: 250000.00, color: 'emerald' },
    { id: 3, name: 'Business Expense', type: 'Checking', mask: '2219', balance: 45000.00, color: 'emerald' },
    { id: 4, name: 'Cash Reserve', type: 'Cash', mask: 'N/A', balance: 5000.00, color: 'emerald' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      
      {/* --- SIDEBAR --- */}
      <div className="w-64 flex-shrink-0 hidden md:block border-r border-gray-800">
        <Sidebar />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-400">My Accounts</h1>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-emerald-900/20 transition">
             + Add New Account
          </button>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((acc) => (
            <div key={acc.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-all">
              
              {/* Top Row: Name & Icon */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{acc.name}</h3>
                  <p className="text-gray-400 text-sm">{acc.type} • **** {acc.mask}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg">
                  $
                </div>
              </div>

              {/* Bottom Row: Balance */}
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Balance</p>
                <p className="text-3xl font-bold text-white">
                  ${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Accounts