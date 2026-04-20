import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { CATEGORIES } from '../utils/categories';

export default function TransactionForm() {
  const { addTransaction } = useFinance();
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('other');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label || !amount) return;
    
    const isoDate = new Date().toISOString().split('T')[0];

    addTransaction({
      id: Date.now(),
      label,
      amount: parseFloat(amount),
      date: isoDate,
      categoryId
    });
    
    setLabel(''); 
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
      <h3 className="font-bold text-lg">Nouvelle opération</h3>
      <input 
        type="text" placeholder="Nom (ex: Courses)" value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="w-full p-3 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 
                  bg-slate-50 dark:bg-slate-800 
                  text-slate-900 dark:text-white 
                  placeholder-slate-400 dark:placeholder-slate-500
                  transition-colors duration-200
                  [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#f8fafc]
                  dark:[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#1e293b]"
      />
      <input 
        type="number" placeholder="Montant (ex: -50)" value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 
                  bg-slate-50 dark:bg-slate-800 
                  text-slate-900 dark:text-white 
                  placeholder-slate-400 dark:placeholder-slate-500
                  transition-colors duration-200
                  [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#f8fafc]
                  dark:[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#1e293b]"
      />
      <select 
        value={categoryId} 
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full p-3 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 
                  bg-slate-50 dark:bg-slate-800 
                  text-slate-900 dark:text-white 
                  placeholder-slate-400 dark:placeholder-slate-500
                  transition-colors duration-200
                  [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#f8fafc]
                  dark:[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#1e293b]"
      >
        {CATEGORIES.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
        ))}
      </select>
      <button className="w-full py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition
                        dark:bg-slate-400 dark:text-white dark:placeholder-slate-500 dark:hover:bg-slate-600">
        Ajouter
      </button>
    </form>
  );
}