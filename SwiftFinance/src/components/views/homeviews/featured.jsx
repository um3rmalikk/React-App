const Featured = () => {
  const features = [
    { icon: '📄', title: 'Smart Contract Review', desc: 'Automated analysis of legal documents with AI precision' },
    { icon: '🔍', title: 'Legal Research Engine', desc: 'Fast, accurate legal precedent and case law discovery' },
    { icon: '⚖️', title: 'Compliance Check', desc: 'Ensure regulatory compliance across jurisdictions' },
    { icon: '💼', title: 'Due Diligence', desc: 'Comprehensive document analysis for M&A transactions' },
  ]

  return (
    <section className="pop-in bg-gray-800 rounded-lg p-12 mb-8">
      <h2 className="text-center text-emerald-300 text-2xl font-bold mb-12">Core Features</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-gray-800 border-l-4 border-emerald-400 rounded p-6">
            <div className="text-2xl mb-4">{feature.icon}</div>
            <h3 className="text-emerald-300 font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Featured
