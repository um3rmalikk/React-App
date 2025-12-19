const HeroSection = () => {
  return (
    <section className="slide-up bg-gray-800 rounded-lg p-16 text-center mb-8">
      <h1 className="text-5xl font-bold text-emerald-300 mb-4">SwiftFinance</h1>
      <h2 className="text-2xl font-semibold text-white mb-4">Smart money management for individuals & small businesses</h2>
      <p className="text-lg max-w-4xl mx-auto mb-8 leading-relaxed text-gray-300">
        Track accounts, manage transactions, and get quick financial insights — all in one place. Start organizing your finances faster with SwiftFinance.
      </p>
      <button className="bg-emerald-300 text-gray-900 font-bold px-8 py-3 rounded hover:bg-violet-600 transition-colors">
        Get Started
      </button>
    </section>
  )
}

export default HeroSection
