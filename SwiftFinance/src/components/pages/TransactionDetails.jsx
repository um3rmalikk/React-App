import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
// 👇 FIXED IMPORTS
import { db } from "../../firebase/config"; 
import Sidebar from "../layouts/sidebar";

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- STATES ---
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Edit Mode
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // --- 1. FETCH DATA ---
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const docRef = doc(db, "transactions", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setTransaction(data);
          setEditData(data); // Pre-fill edit form
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching transaction:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTransaction();
  }, [id]);

  // --- 2. DELETE FUNCTION ---
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    
    setIsDeleting(true);
    try {
        await deleteDoc(doc(db, "transactions", id));
        navigate("/transactions"); // Redirect back to list
    } catch (error) {
        console.error("Error deleting:", error);
        alert("Failed to delete.");
        setIsDeleting(false);
    }
  };

  // --- 3. UPDATE FUNCTION ---
  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "transactions", id);
      await updateDoc(docRef, {
        title: editData.title,
        amount: parseFloat(editData.amount),
        date: editData.date,
        category: editData.category,
        note: editData.note
      });
      
      setTransaction(editData);
      setIsEditing(false);
      alert("Transaction updated!");
    } catch (error) {
      console.error("Error updating:", error);
      alert("Failed to update.");
    }
  };

  return (
    // --- LAYOUT WRAPPER (Sidebar + Content) ---
    <div className="flex min-h-screen bg-gray-900 text-white">
      
      {/* 1. Sidebar (Left) */}
      <div className="w-64 flex-shrink-0 hidden md:block border-r border-gray-800">
        <Sidebar />
      </div>

      {/* 2. Main Content (Right) */}
      <div className="flex-1 p-6 overflow-y-auto flex justify-center items-start pt-12">
        
        {loading ? (
             <div className="text-center text-white">Loading...</div>
        ) : !transaction ? (
             <div className="text-center text-white">Transaction not found!</div>
        ) : (
            // --- CARD CONTAINER ---
            <div className="w-full max-w-2xl bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
                
                {/* Color Bar based on Income/Expense */}
                <div className={`h-3 w-full ${transaction.category === 'Income' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

                <div className="p-8">
                
                {/* Header: Back & Actions */}
                <div className="flex justify-between items-start mb-6">
                    <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white flex items-center gap-2 transition">
                        ← Back
                    </button>

                    <div className="flex gap-2">
                    <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-3 py-1 rounded bg-gray-700 text-white text-sm hover:bg-gray-600 transition"
                    >
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                    <button 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="px-3 py-1 rounded bg-red-500/20 text-red-400 text-sm hover:bg-red-500 hover:text-white transition"
                    >
                        {isDeleting ? "..." : "Delete"}
                    </button>
                    </div>
                </div>

                {/* --- MAIN FORM CONTENT --- */}
                <div className="space-y-6">
                    
                    {/* 1. TITLE */}
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Transaction Title</label>
                        {isEditing ? (
                            <input 
                            className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white mt-1"
                            value={editData.title}
                            onChange={(e) => setEditData({...editData, title: e.target.value})}
                            />
                        ) : (
                            <h1 className="text-3xl font-bold text-white">{transaction.title}</h1>
                        )}
                    </div>

                    {/* 2. AMOUNT & DATE GRID */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Amount</label>
                            {isEditing ? (
                                <input 
                                type="number"
                                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white mt-1"
                                value={editData.amount}
                                onChange={(e) => setEditData({...editData, amount: e.target.value})}
                                />
                            ) : (
                                <p className={`text-2xl font-mono font-bold ${transaction.category === 'Income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    ${parseFloat(transaction.amount).toLocaleString()}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Date</label>
                            {isEditing ? (
                                <input 
                                type="date"
                                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white mt-1"
                                value={editData.date}
                                onChange={(e) => setEditData({...editData, date: e.target.value})}
                                />
                            ) : (
                                <p className="text-xl text-white">{transaction.date}</p>
                            )}
                        </div>
                    </div>

                    {/* 3. CATEGORY */}
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                        {isEditing ? (
                            <select 
                            className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white mt-1"
                            value={editData.category}
                            onChange={(e) => setEditData({...editData, category: e.target.value})}
                            >
                                <option value="Expense">Expense</option>
                                <option value="Income">Income</option>
                                <option value="Savings">Savings</option>
                                <option value="Investment">Investment</option>
                            </select>
                        ) : (
                            <div className="mt-1">
                                <span className="px-3 py-1 rounded bg-gray-700 text-gray-200 text-sm border border-gray-600">
                                    {transaction.category}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* 4. NOTE */}
                    <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Notes</label>
                        {isEditing ? (
                            <textarea 
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white h-24"
                            value={editData.note}
                            onChange={(e) => setEditData({...editData, note: e.target.value})}
                            />
                        ) : (
                            <p className="text-gray-300 italic">
                                {transaction.note || "No additional notes provided."}
                            </p>
                        )}
                    </div>

                    {/* SAVE BUTTON */}
                    {isEditing && (
                        <button 
                        onClick={handleUpdate}
                        className="w-full py-3 bg-emerald-600 rounded-lg text-white font-bold hover:bg-emerald-500 shadow-lg"
                        >
                            Save Changes
                        </button>
                    )}

                </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDetails;