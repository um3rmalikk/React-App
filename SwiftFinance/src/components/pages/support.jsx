import { useState } from "react";
import Sidebar from '../layouts/sidebar'

const Support = () => {
  // Mock FAQ Data
  const faqs = [
    { question: "How do I reset my budget limit?", answer: "Go to the Budgets page and click the 'Reset' button on the control panel." },
    { question: "Can I delete a transaction?", answer: "Yes. Click 'View Details' on any transaction, then click the Delete button." },
    { question: "Is my data secure?", answer: "Absolutely. We use Firebase security rules and encryption to keep your data safe." },
  ]

  const [formData, setFormData] = useState({
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Ticket #4029 created! We will respond shortly.");
    setFormData({ subject: "General Inquiry", message: "" });
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 hidden md:block border-r border-gray-800">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-emerald-400 mb-2">Help Center</h1>
        <p className="text-gray-400 mb-8">Find answers or contact our support team.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
            
            {/* LEFT COLUMN: FAQs */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-2">Frequently Asked Questions</h2>
                
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-sm hover:border-emerald-500/30 transition">
                        <h3 className="font-bold text-emerald-400 mb-2">Q: {faq.question}</h3>
                        <p className="text-gray-300 text-sm">{faq.answer}</p>
                    </div>
                ))}

                <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/30">
                    <h3 className="font-bold text-blue-400 mb-1">Need live chat?</h3>
                    <p className="text-gray-400 text-sm">Our agents are available Mon-Fri, 9am - 5pm EST.</p>
                </div>
            </div>

            {/* RIGHT COLUMN: Ticket Form */}
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-6">Open a Support Ticket</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">Topic</label>
                        <select 
                            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-emerald-500 outline-none"
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        >
                            <option>General Inquiry</option>
                            <option>Technical Issue</option>
                            <option>Billing Question</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">Describe the issue</label>
                        <textarea 
                            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-emerald-500 outline-none h-40 resize-none"
                            placeholder="Please provide details..."
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            required
                        ></textarea>
                    </div>

                    <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg transition">
                        Submit Ticket
                    </button>
                </form>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Support;