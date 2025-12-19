import { useState } from 'react'

const Budgets = () => {
  // 1. Initialize state: Start with a default budget of $500
  const [limit, setLimit] = useState(500)

  // 2. Increment: Add $50 to the budget
  const increaseLimit = () => {
    setLimit(prevLimit => prevLimit + 50)
  }

  // 3. Decrement: Remove $50 from the budget (prevent negative numbers)
  const decreaseLimit = () => {
    if (limit >= 50) {
      setLimit(prevLimit => prevLimit - 50)
    }
  }

  // 4. Reset: Set back to the default $500
  const resetLimit = () => {
    setLimit(500)
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl text-emerald-300 font-semibold mb-4">Budgets</h2>
      <p className="text-gray-200 mb-6">Set your target spending limit for this month.</p>

      {/* Budget Counter Card */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 max-w-sm">
        <div className="text-center mb-6">
          <h3 className="text-gray-400 text-sm uppercase tracking-wide">Monthly Limit</h3>
          {/* Display the State Value formatted as money */}
          <div className="text-4xl font-bold text-white mt-2">
            ${limit}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <button 
            onClick={decreaseLimit}
            className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded hover:bg-red-500/30 transition"
          >
            - $50
          </button>

          <button 
            onClick={resetLimit}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
          >
            Reset
          </button>

          <button 
            onClick={increaseLimit}
            className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded hover:bg-emerald-500/30 transition"
          >
            + $50
          </button>
        </div>
      </div>
    </div>
  )
}

export default Budgets