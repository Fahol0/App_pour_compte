import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import TransactionForm from "../components/TransactionForm";
import { CATEGORIES } from '../utils/categories';

export default function Dashboard() {
  const { transactions, deleteTransaction } = useFinance();
  const [filter, setFilter] = useState('all');

  // 1. Filtrer selon la catégorie
  const filtered = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.categoryId === filter);

  // 2. Grouper par mois
  const groupedTransactions = filtered.reduce((acc, t) => {
    const date = new Date(t.date || t.id);
    const monthYear = date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(t);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      <header>
        <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter dark:text-white">Opérations</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TransactionForm />
        
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b dark:border-slate-800 pb-4">
            <h3 className="font-bold text-lg dark:text-white">Historique</h3>
            <select 
              className="text-xs font-bold bg-slate-100 p-2 rounded-lg dark:bg-slate-800 dark:text-white"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tout</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            </select>
          </div>

          <div className="space-y-10">
            {Object.keys(groupedTransactions).length === 0 ? (
              <p className="text-center text-slate-400 py-10">Aucune opération.</p>
            ) : (
              Object.keys(groupedTransactions).map(month => (
                <div key={month} className="space-y-4">
                  <h4 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.2em]">{month}</h4>
                  <div className="space-y-3">
                    {groupedTransactions[month].map(t => {
                      const category = CATEGORIES.find(c => c.id === t.categoryId) || CATEGORIES[CATEGORIES.length - 1];
                      return (
                        <div key={t.id} className="group bg-white dark:bg-slate-900 p-4 rounded-2xl flex justify-between items-center border border-slate-100 dark:border-slate-800 shadow-sm transition-all">
                          <div className="flex items-center gap-4">
                            <button onClick={() => deleteTransaction(t.id)} className="opacity-0 group-hover:opacity-100 bg-red-50 text-red-500 w-8 h-8 rounded-lg flex items-center justify-center transition-all">✕</button>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.color}`}>{category.icon}</div>
                            <div>
                              <p className="font-bold text-sm dark:text-white">{t.label}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase">{t.date}</p>
                            </div>
                          </div>
                          <p className={`font-black ${t.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>{t.amount.toLocaleString()} €</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}