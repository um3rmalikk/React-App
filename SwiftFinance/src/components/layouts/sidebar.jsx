import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

  // Helper to check active link for styling
  const isActive = (path) => location.pathname === path

  const linkStyle = (path) => `
    flex items-center gap-3 p-3 rounded-lg transition-all duration-200
    ${isActive(path) 
      ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-400' 
      : 'text-gray-400 hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
    }
  `

  return (
    <aside className="hidden lg:block w-64 min-h-screen bg-gray-900 border-r border-gray-800 p-6 pt-8">
      
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-3">
        Main Menu
      </p>
      
      <ul className="space-y-2">
        <li>
          <Link to="/dashboard" className={linkStyle('/dashboard')}>
            <span>📊</span> 
            <span className="font-medium">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/transactions" className={linkStyle('/transactions')}>
            <span>💸</span> 
            <span className="font-medium">Transactions</span>
          </Link>
        </li>
        <li>
          <Link to="/accounts" className={linkStyle('/accounts')}>
            <span>💳</span> 
            <span className="font-medium">Accounts</span>
          </Link>
        </li>
      </ul>

      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-8 mb-4 px-3">
        Planning
      </p>

      <ul className="space-y-2">
        <li>
          <Link to="/budgets" className={linkStyle('/budgets')}>
            <span>💰</span> 
            <span className="font-medium">Budgets</span>
          </Link>
        </li>
        <li>
          <Link to="/goals" className={linkStyle('/goals')}>
            <span>🎯</span> 
            <span className="font-medium">Goals</span>
          </Link>
        </li>
      </ul>

      <div className="mt-10 pt-6 border-t border-gray-800">
        <Link to="/contact" className={linkStyle('/contact')}>
            <span>❓</span> 
            <span className="font-medium">Help & Support</span>
        </Link>
      </div>
      
    </aside>
  )
}

export default Sidebar