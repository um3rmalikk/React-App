import { useState } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  // --- STATIC DATA (Hardcoded) ---
  // Matches the sum of accounts from the Accounts page (155k + 250k + 45k + 5k = 455k)
  const [stats] = useState({
    balance: 455000, 
    income: 12000,   // Mock monthly income
    expenses: 4500   // Mock monthly expense
  })

  // Mock Recent Transactions
  const [recentTransactions] = useState([
    { id: 1, title: 'Freelance Payment', date: '2025-12-20', amount: 1200, category: 'Income' },
    { id: 2, title: 'Grocery Shopping', date: '2025-12-19', amount: 150.50, category: 'Expense' },
    { id: 3, title: 'Monthly Rent', date: '2025-12-01', amount: 1200, category: 'Expense' },
    { id: 4, title: 'Stock Dividend', date: '2025-11-28', amount: 450, category: 'Income' },
    { id: 5, title: 'Gym Membership', date: '2025-11-25', amount: 60, category: 'Expense' }
  ])

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl text-emerald-400 font-bold mb-6">Overview</h2>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Total Balance Card */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Balance</h4>
          <p className="text-3xl font-bold text-white mt-2">
            ${stats.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Income Card */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Income</h4>
          <p className="text-3xl font-bold text-emerald-400 mt-2">
            +${stats.income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Expenses Card */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Total Expenses</h4>
          <p className="text-3xl font-bold text-red-400 mt-2">
            -${stats.expenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* --- Recent Transactions Section --- */}
      <section className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
            <h3 className="text-xl text-emerald-400 font-semibold">
              Recent Activity
            </h3>
            <Link to="/transactions" className="text-sm text-gray-400 hover:text-white transition-colors">
                View All History →
            </Link>
        </div>
        
        <div className="space-y-4">
          {recentTransactions.length === 0 ? (
             <p className="text-gray-500 text-center py-4">No transactions yet.</p>
          ) : (
            recentTransactions.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center p-3 hover:bg-gray-700/50 rounded transition duration-200">
                  <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        tx.category === 'Income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                          {tx.category === 'Income' ? '↓' : '↑'}
                      </div>
                      <div>
                        <p className="text-white font-medium text-lg">{tx.title}</p>
                        <p className="text-gray-500 text-sm">{tx.date}</p>
                      </div>
                  </div>
                  <span className={`font-bold text-lg ${tx.category === 'Income' ? 'text-emerald-400' : 'text-white'}`}>
                    {tx.category === 'Income' ? '+' : '-'}${parseFloat(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default Dashboard