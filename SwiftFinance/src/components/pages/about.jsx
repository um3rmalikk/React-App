import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="w-full p-6 md:p-12 text-white">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        {/* Changed text-5xl/6xl to text-4xl/5xl to match Home Page better */}
        {/* Changed text to "About Us" */}
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-400 mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
          We believe managing your money shouldn't be a chore. 
          SwiftFinance is designed to give you clarity, control, and confidence over your financial future.
        </p>
      </div>

      {/* 2. OUR MISSION CARD */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20">
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="text-3xl">🚀</span> Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Our goal is simple: <strong>Democratize financial freedom.</strong> Whether you are a student, a freelancer, or a small business owner, you deserve professional-grade tools to track your income and expenses without the complexity of traditional accounting software.
            </p>
        </div>
        
        {/* Stats Grid - Adjusted sizes to be more consistent */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center hover:border-emerald-500/50 transition shadow-lg">
                <div className="text-3xl font-bold text-emerald-400 mb-1">100%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Free to Use</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center hover:border-emerald-500/50 transition shadow-lg">
                <div className="text-3xl font-bold text-blue-400 mb-1">24/7</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Secure Access</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center hover:border-emerald-500/50 transition shadow-lg">
                <div className="text-3xl font-bold text-purple-400 mb-1">Real</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Time Analytics</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center hover:border-emerald-500/50 transition shadow-lg">
                <div className="text-3xl font-bold text-yellow-400 mb-1">Easy</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Interface</div>
            </div>
        </div>
      </div>

      {/* 3. WHY CHOOSE US */}
      <div className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-emerald-400 mb-10">Why Choose SwiftFinance?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:bg-gray-800 transition duration-300">
                <div className="w-10 h-10 bg-emerald-900/50 rounded-lg flex items-center justify-center text-xl mb-4 text-emerald-400">🛡️</div>
                <h3 className="text-lg font-bold text-white mb-2">Secure & Private</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Your data is stored securely in the cloud. We prioritize your privacy and never share your financial details.</p>
            </div>

            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:bg-gray-800 transition duration-300">
                <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center text-xl mb-4 text-blue-400">📊</div>
                <h3 className="text-lg font-bold text-white mb-2">Smart Analytics</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Visualize your spending habits with intuitive charts and graphs that update in real-time.</p>
            </div>

            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:bg-gray-800 transition duration-300">
                <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center text-xl mb-4 text-purple-400">📱</div>
                <h3 className="text-lg font-bold text-white mb-2">Access Anywhere</h3>
                <p className="text-gray-400 text-sm leading-relaxed">Manage your finances from your laptop, tablet, or phone. SwiftFinance travels with you.</p>
            </div>
        </div>
      </div>

      {/* 4. CALL TO ACTION */}
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-900/40 to-gray-900 border border-emerald-500/30 rounded-2xl p-8 text-center shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to take control?</h2>
        <p className="text-gray-300 mb-6 max-w-lg mx-auto text-sm">
            Join thousands of users who are mastering their money with SwiftFinance today.
        </p>
        <div className="flex justify-center gap-4">
            <Link to="/signup" className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-bold rounded-lg transition transform hover:scale-105 shadow-lg text-sm">
                Get Started
            </Link>
            <Link to="/contact" className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition border border-gray-600 text-sm">
                Contact Support
            </Link>
        </div>
      </div>

    </div>
  )
}

export default About