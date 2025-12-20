import { useState } from 'react'

const Budgets = () => {
  // 1. Initialize state: Start with default $30,000
  const [limit, setLimit] = useState(30000)
  
  // MOCK DATA: Simulate that we have already spent $18,500 this month
  const [spent] = useState(18500)

  // 2. Increment: Add $1000
  const increaseLimit = () => {
    setLimit(prevLimit => prevLimit + 1000)
  }

  // 3. Decrement: Remove $1000
  const decreaseLimit = () => {
    if (limit >= 1000) {
      setLimit(prevLimit => prevLimit - 1000)
    }
  }

  // 4. Reset: Set back to default
  const resetLimit = () => {
    setLimit(30000)
  }

  // CALCULATION LOGIC
  const remaining = limit - spent
  const percentage = Math.min(100, Math.max(0, Math.round((spent / limit) * 100)))
  const isOverBudget = remaining < 0

  return (
    <div className="p-6 w-full text-white">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl text-emerald-400 font-bold">Monthly Budgets</h2>
        <p className="text-gray-400 mt-1">Set your spending limits and track progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        
        {/* CARD 1: SET LIMIT (The Controls) */}
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl flex flex-col justify-center items-center relative overflow-hidden">
           {/* Background Decoration */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>

           <h3 className="text-gray-400 text-sm uppercase tracking-widest font-semibold mb-2">Target Monthly Limit</h3>
           <div className="text-5xl font-bold text-white mb-8">
             ${limit.toLocaleString()}
           </div>

           <div className="flex gap-4">
             <button 
               onClick={decreaseLimit}
               className="px-6 py-3 bg-gray-700 text-red-400 border border-gray-600 rounded-lg hover:bg-red-500/10 hover:border-red-500/50 transition font-bold"
             >
               - $1k
             </button>

             <button 
               onClick={resetLimit}
               className="px-6 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg hover:bg-gray-600 transition font-bold"
             >
               Reset
             </button>

             <button 
               onClick={increaseLimit}
               className="px-6 py-3 bg-gray-700 text-emerald-400 border border-gray-600 rounded-lg hover:bg-emerald-500/10 hover:border-emerald-500/50 transition font-bold"
             >
               + $1k
             </button>
           </div>
        </div>

        {/* CARD 2: ANALYSIS (The New Feature) */}
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl flex flex-col justify-center relative overflow-hidden">
            {/* Dynamic Background Glow based on status */}
            <div className={`absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl -ml-10 -mt-10 transition-colors duration-500 ${isOverBudget ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}></div>

            <h3 className="text-gray-400 text-sm uppercase tracking-widest font-semibold mb-6">Budget Health</h3>

            {/* Progress Bar */}
            <div className="mb-2 flex justify-between text-sm font-bold">
                <span className={isOverBudget ? 'text-red-400' : 'text-emerald-400'}>{percentage}% Used</span>
                <span className="text-gray-500">${spent.toLocaleString()} spent</span>
            </div>
            
            <div className="w-full bg-gray-900 rounded-full h-4 mb-8 overflow-hidden border border-gray-700">
                <div 
                    className={`h-full rounded-full transition-all duration-500 ${isOverBudget ? 'bg-red-500' : 'bg-emerald-500'}`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            {/* Summary Text */}
            <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-1">Remaining Budget</p>
                <p className={`text-3xl font-bold ${isOverBudget ? 'text-red-500' : 'text-emerald-400'}`}>
                    {isOverBudget ? '-' : ''}${Math.abs(remaining).toLocaleString()}
                </p>
                {isOverBudget && <p className="text-red-400 text-xs mt-2 font-bold animate-pulse">⚠️ You have exceeded your limit!</p>}
            </div>
        </div>

      </div>
    </div>
  )
}

export default Budgets