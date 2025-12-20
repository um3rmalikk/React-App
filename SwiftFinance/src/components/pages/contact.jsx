import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    accountId: "",
    inquiryType: "General Support",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Form Data Submitted (Static):", formData);
    alert("Thank you! Your message has been sent (Simulation).");
    setFormData({
      fullName: "",
      email: "",
      accountId: "",
      inquiryType: "General Support",
      message: "",
    });
  };

  return (
    // FIXED: Removed 'bg-gray-900'. Now it matches the Dashboard/Home theme.
    <div className="min-h-screen w-full p-8 flex justify-center items-start text-white">
      
      {/* Form Card */}
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-3xl text-emerald-400 font-bold mb-6 text-center">
          Contact Support
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-emerald-500 outline-none transition text-white"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-emerald-500 outline-none transition text-white"
              placeholder="john@example.com"
              required
            />
          </div>

          {/* Account ID */}
          <div>
            <label className="block text-gray-300 mb-1">
              Account ID (Optional)
            </label>
            <input
              type="text"
              name="accountId"
              value={formData.accountId}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-emerald-500 outline-none transition text-white"
              placeholder="e.g., ACC-12345"
            />
          </div>

          {/* Inquiry Type Dropdown */}
          <div>
            <label className="block text-gray-300 mb-1">Inquiry Type</label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-emerald-500 outline-none transition text-white"
            >
              <option>General Support</option>
              <option>Billing Issue</option>
              <option>Report a Bug</option>
              <option>Feature Request</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-300 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-emerald-500 outline-none transition text-white"
              placeholder="How can we help you?"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded transition duration-200 shadow-lg"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;