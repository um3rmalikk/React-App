import React from 'react'

const Accounts = () => {
  // --- STATIC DATA (Hardcoded List) ---
  const accounts = [
    { id: 1, name: 'Main Capital', balance: 155000.00, type: 'Checking', number: '**** 8842' },
    { id: 2, name: 'High-Yield Savings', balance: 250000.00, type: 'Savings', number: '**** 9931' },
    { id: 3, name: 'Business Expense', balance: 45000.00, type: 'Checking', number: '**** 2219' },
    { id: 4, name: 'Cash Reserve', balance: 5000.00, type: 'Cash', number: 'N/A' }
  ]

  return (
    <div className="p-6 w-full">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl text-emerald-400 font-bold">My Accounts</h2>
        <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition text-sm font-bold shadow-lg w-full sm:w-auto">
          + Add New Account
        </button>
      </div>

      {/* ACCOUNTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {accounts.map(account => (
          <div 
            key={account.id} 
            className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl hover:border-emerald-500/50 transition duration-300 group relative overflow-hidden"
          >
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none"></div>

            {/* Header: Name & Icon */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold text-white group-hover:text-emerald-300 transition">
                  {account.name}
                </h4>
                <p className="text-gray-500 mt-1 text-sm">
                  {account.type} • <span className="tracking-widest font-mono text-gray-400">{account.number}</span>
                </p>
              </div>
              
              <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center text-emerald-400 font-bold border border-gray-600 text-lg">
                $
              </div>
            </div>

            {/* Balance Section */}
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">Total Balance</p>
              <p className="text-3xl font-bold text-white mt-1">
                ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Accounts