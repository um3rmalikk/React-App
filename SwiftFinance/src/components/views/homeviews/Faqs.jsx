import { useState } from 'react'

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: "Is SwiftFinance free to use?",
      answer: "Yes! SwiftFinance offers a robust free tier that includes unlimited transaction tracking, basic budgeting, and goal setting. We also have a Premium plan for advanced analytics."
    },
    {
      question: "Is my financial data secure?",
      answer: "Absolutely. We use bank-grade 256-bit encryption to store your data. We never sell your personal information to third parties."
    },
    {
      question: "Can I link my bank accounts automatically?",
      answer: "Currently, SwiftFinance operates on a manual-entry system to give you complete control over your data accuracy. Automatic bank syncing is coming in our next version (v2.0)."
    },
    {
      question: "How do I reset my budget at the start of the month?",
      answer: "Budgets automatically refresh based on the dates you set. You can also manually reset or adjust them in the 'Budgets' tab at any time."
    },
    {
      question: "Can I export my transaction data?",
      answer: "Yes, you can export your entire transaction history as a CSV file from the Settings page for use in Excel or other tools."
    }
  ]

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-400 mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>
                <span className={`text-emerald-400 text-2xl transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  activeIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-gray-800">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faqs