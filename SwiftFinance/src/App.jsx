import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layouts/navbar'
import Footer from './components/layouts/footer'
import Sidebar from './components/layouts/sidebar'
import Home from './components/pages/home'
import About from './components/pages/about'
import Contact from './components/pages/contact'
import Dashboard from './components/pages/dashboard'
import Accounts from './components/pages/accounts'
import Transactions from './components/pages/transactions'
import Analytics from './components/pages/analytics'
import SignIn from './components/pages/signin'
import SignUp from './components/pages/signup'
import Budgets from './components/pages/budgets'
import Goals from './components/pages/goals'
import Support from './components/pages/support'

import AddTransaction from './components/pages/AddTransaction'
// 1. IMPORT THE NEW DETAILS PAGE
import TransactionDetails from './components/pages/TransactionDetails'

const App = () => {
  return (
    <div id="app-root" className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-800">
      <Navbar />
      
      <div className="flex flex-1 gap-4 overflow-y-auto">
        <Sidebar />
        <div className="flex-1 p-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />

           
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            
            {/* --- TRANSACTION ROUTES --- */}
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/add" element={<AddTransaction />} />
            
            {/* 2. ADD THIS ROUTE for the details page */}
            <Route path="/transaction/:id" element={<TransactionDetails />} />
            {/* -------------------------- */}

            <Route path="/analytics" element={<Analytics />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App