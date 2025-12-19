import { useState } from 'react'

const Goals = () => {
  // 1. Mock Data: Financial Goals
  const [goals, setGoals] = useState([
    { id: 1, title: 'New MacBook Pro', current: 1200, target: 2500, deadline: 'Dec 2025', icon: '💻' },
    { id: 2, title: 'Europe Vacation', current: 3500, target: 5000, deadline: 'Jun 2026', icon: '✈️' },
    { id: 3, title: 'Emergency Fund', current: 10000, target: 10000, deadline: 'Completed', icon: '🛡️' },
    { id: 4, title: 'Home Down Payment', current: 15000, target: 40000, deadline: 'Jan 2030', icon: '🏠' },
  ])

  // Helper function to calculate progress percentage
  const getProgress = (current, target) => {
    return Math.min(100, Math.round((current / target) * 100))
  }

  return (
    <div className="p-6 w-full min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl text-emerald-400 font-bold">Financial Goals</h2>
          <p className="text-gray-400 mt-1">Track your savings targets.</p>
        </div>
        <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition text-sm font-bold shadow-lg w-full sm:w-auto">
          + Create New Goal
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = getProgress(goal.current, goal.target)
          const isCompleted = progress === 100

          return (
            <div 
              key={goal.id} 
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition duration-300"
            >
              {/* Header: Icon & Title */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-700 flex items-center justify-center text-2xl">
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{goal.title}</h3>
                    <p className="text-sm text-gray-500">Target: {goal.deadline}</p>
                  </div>
                </div>
                {/* Percentage Badge */}
                <span className={`px-2 py-1 rounded text-xs font-bold ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-emerald-400'}`}>
                  {progress}%
                </span>
              </div>

              {/* Amounts */}
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Saved</p>
                  <p className="text-2xl font-bold text-emerald-400">${goal.current.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Goal</p>
                  <p className="text-lg font-bold text-white">${goal.target.toLocaleString()}</p>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-emerald-400' : 'bg-emerald-500'}`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  disabled={isCompleted}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${isCompleted 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-600/30'}`}
                >
                  {isCompleted ? 'Completed' : '+ Add Funds'}
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-bold transition">
                  Edit
                </button>
              </div>
              
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Goals