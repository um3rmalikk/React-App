const Footer = () => {
  return (
    <footer className="mt-auto bg-gray-900 border-t-2 border-emerald-400 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-emerald-300 font-bold text-lg mb-2">SwiftFinance</h3>
            <p className="text-sm">Personal & small-business finance tools</p>
          </div>

          <div>
            <p className="font-semibold text-emerald-300 mb-2">Contact</p>
            <p className="text-sm">📧 contact@swiftfinance.example</p>
            <p className="text-sm">📱 +1 (555) 987-6543</p>
          </div>

          <div>
            <p className="font-semibold text-emerald-300 mb-2">Quick Links</p>
            <ul className="text-sm space-y-2">
              <li><a className="text-emerald-300 hover:opacity-90" href="#">Privacy Policy</a></li>
              <li><a className="text-emerald-300 hover:opacity-90" href="#">Terms of Service</a></li>
              <li><a className="text-emerald-300 hover:opacity-90" href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <small>© {new Date().getFullYear()} SwiftFinance. All rights reserved.</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
