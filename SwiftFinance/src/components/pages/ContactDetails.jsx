import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config"; 

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  
  // Data States
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit Mode States
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docRef = doc(db, "contacts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setContact(data);
          setEditData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching contact details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchContact();
  }, [id]);

  // --- DELETE FUNCTION ---
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    
    setIsDeleting(true);
    try {
        await deleteDoc(doc(db, "contacts", id));
        navigate("/"); // Redirect home after delete
    } catch (error) {
        console.error("Error deleting document:", error);
        alert("Failed to delete.");
        setIsDeleting(false);
    }
  };

  // --- UPDATE FUNCTION ---
  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, {
        fullName: editData.fullName,
        email: editData.email,
        message: editData.message,
        accountId: editData.accountId || ""
      });
      setContact(editData);
      setIsEditing(false);
      alert("Updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Failed to update.");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="animate-spin h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
    </div>
  );

  if (!contact) return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Inquiry Not Found</h2>
      <button onClick={() => navigate(-1)} className="text-emerald-400 hover:underline">← Go Back</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6 md:p-12 flex justify-center">
      <div className="w-full max-w-3xl bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
        
        {/* Header Color Bar */}
        <div className="h-2 w-full bg-emerald-500"></div>

        <div className="p-8">
          
          {/* --- TOP HEADER: Go Back & Actions --- */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            
            {/* GO BACK BUTTON */}
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <span className="bg-gray-700 p-2 rounded-full group-hover:bg-gray-600 transition">
                 ←
              </span>
              <span className="text-sm font-semibold">Go Back</span>
            </button>

            {/* ACTION BUTTONS (Edit/Delete) */}
            <div className="flex gap-3">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-bold hover:bg-emerald-500 hover:text-white transition-all"
              >
                {isEditing ? "Cancel Edit" : "Edit Details"}
              </button>
              
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-bold hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Entry"}
              </button>
            </div>
          </div>
          {/* ----------------------------------- */}

          {/* Main Info Area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex-1 w-full">
              {/* EDITABLE: Full Name */}
              <div className="mb-1">
                {isEditing ? (
                  <input 
                    className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white focus:border-emerald-500 outline-none font-bold text-xl"
                    value={editData.fullName}
                    onChange={(e) => setEditData({...editData, fullName: e.target.value})}
                    placeholder="Full Name"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-white">{contact.fullName}</h1>
                )}
              </div>

              {/* EDITABLE: Email */}
              <div>
                 {isEditing ? (
                  <input 
                    className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-emerald-400 focus:border-emerald-500 outline-none font-mono text-sm mt-2"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    placeholder="Email Address"
                  />
                ) : (
                  <p className="text-emerald-400 font-mono">{contact.email}</p>
                )}
              </div>
            </div>

            <span className="px-3 py-1 bg-gray-700 rounded text-xs font-bold text-gray-300 border border-gray-600 uppercase tracking-wider whitespace-nowrap">
              {contact.inquiryType}
            </span>
          </div>

          {/* Message Box */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 mb-8">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
              Message Content
            </h3>
            
            {/* EDITABLE: Message */}
            {isEditing ? (
              <textarea 
                className="w-full bg-gray-800 border border-gray-600 rounded p-4 text-white focus:border-emerald-500 outline-none min-h-[150px]"
                value={editData.message}
                onChange={(e) => setEditData({...editData, message: e.target.value})}
              />
            ) : (
              <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                "{contact.message}"
              </p>
            )}
          </div>

          {/* SAVE BUTTON (Only visible when editing) */}
          {isEditing && (
            <div className="mb-8 animate-fade-in">
              <button 
                onClick={handleUpdate}
                className="w-full bg-emerald-600 py-3 rounded-lg font-bold text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Technical Details Footer */}
          <div className="border-t border-gray-700 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Account ID</span>
              {isEditing ? (
                  <input 
                    className="w-full bg-gray-900 border border-gray-600 rounded p-1 text-white text-sm focus:border-emerald-500 outline-none font-mono"
                    value={editData.accountId}
                    onChange={(e) => setEditData({...editData, accountId: e.target.value})}
                  />
                ) : (
                  <span className="text-white font-mono">{contact.accountId || "N/A"}</span>
                )}
            </div>
            <div>
              <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Document ID</span>
              <span className="text-gray-500 font-mono text-xs">{contact.id}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactDetails;