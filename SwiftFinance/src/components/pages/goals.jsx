import { useState } from 'react'

const Goals = () => {
  // 1. Mock Data: Financial Goals
  const [goals, setGoals] = useState([
    { id: 1, title: 'New MacBook Pro', current: 1200, target: 2500, deadline: 'Dec 2025', icon: '💻' },
    { id: 2, title: 'Europe Vacation', current: 3500, target: 5000, deadline: 'Jun 2026', icon: '✈️' },
    { id: 3, title: 'Emergency Fund', current: 10000, target: 10000, deadline: 'Completed', icon: '🛡️' },
    { id: 4, title: 'Home Down Payment', current: 15000, target: 40000, deadline: 'Jan 2030', icon: '🏠' },
  ])

  const getProgress = (current, target) => {
    return Math.min(100, Math.round((current / target) * 100))
  }

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl text-emerald-400 font-bold">Financial Goals</h2>
          <p className="text-gray-400 text-sm mt-1">Track your savings targets.</p>
        </div>
        <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition text-sm font-bold shadow-lg w-full sm:w-auto">
          + Create New Goal
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {goals.map((goal) => {
          const progress = getProgress(goal.current, goal.target)
          const isCompleted = progress === 100

          return (
            <div 
              key={goal.id} 
              // UPDATED: Reduced padding from p-6 to p-5 for a tighter look
              className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-md relative overflow-hidden group hover:border-emerald-500/30 transition duration-300"
            >
              {/* Header: Icon & Title */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  {/* UPDATED: Smaller Icon Box (w-10 h-10) */}
                  <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center text-xl border border-gray-600">
                    {goal.icon}
                  </div>
                  <div>
                    {/* UPDATED: Smaller Title Text */}
                    <h3 className="text-lg font-bold text-white leading-tight">{goal.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Target: {goal.deadline}</p>
                  </div>
                </div>
                {/* Percentage Badge */}
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-gray-700 text-gray-400 border border-gray-600'}`}>
                  {progress}%
                </span>
              </div>

              {/* Amounts */}
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold">Saved</p>
                  {/* UPDATED: Smaller Number Text */}
                  <p className="text-xl font-bold text-emerald-400">${goal.current.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold">Goal</p>
                  <p className="text-sm font-bold text-gray-300">${goal.target.toLocaleString()}</p>
                </div>
              </div>

              {/* Progress Bar Container */}
              {/* UPDATED: Thinner bar (h-2 instead of h-3) */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-emerald-400' : 'bg-emerald-500'}`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  disabled={isCompleted}
                  className={`flex-1 py-1.5 rounded-md text-xs font-bold transition ${isCompleted 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600/20 border border-emerald-500/20'}`}
                >
                  {isCompleted ? 'Completed' : '+ Add Funds'}
                </button>
                <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-md text-xs font-bold transition border border-gray-600">
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