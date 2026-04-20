import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import TransactionForm from "../components/TransactionForm";
import { CATEGORIES } from '../utils/categories';

export default function Dashboard() {
  const { transactions, deleteTransaction } = useFinance();
  const [filter, setFilter] = useState('all');

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.categoryId === filter);

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter dark:text-white">Gestion des opérations</h1>
        <p className="text-slate-400 text-sm font-medium">Ajoutez ou supprimez vos transactions</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* COLONNE GAUCHE : FORMULAIRE */}
        <TransactionForm />
        
        {/* COLONNE DROITE : HISTORIQUE */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-700 dark:text-white">Historique</h3>
            
            {/* LE FILTRE */}
            <select 
              className="text-xs font-bold bg-slate-100 p-2 rounded-lg outline-none border-r-8 border-transparent cursor-pointer hover:bg-slate-200 transition dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Toutes les catégories</option>
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            </select>
          </div>
          
          <div className="space-y-3">
            {filteredTransactions.map(t => {
               const category = CATEGORIES.find(c => c.id === t.categoryId) || CATEGORIES[CATEGORIES.length - 1];
               
               return (
                <div 
                  key={t.id} 
                  className="group bg-white dark:bg-slate-900 p-4 rounded-2xl flex justify-between items-center border border-slate-100 shadow-sm hover:border-purple-200 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => deleteTransaction(t.id)}
                      className="opacity-0 group-hover:opacity-100 bg-red-50 text-red-500 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      ✕
                    </button>
                    
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${category.color}`}>
                      {category.icon}
                    </div>

                    <div>
                      <p className="font-bold text-slate-800 dark:text-white">{t.label}</p>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                        {category.label} • {t.date}
                      </p>
                    </div>
                  </div>

                  <p className={`font-black ${t.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()} €
                  </p>
                </div>
               )
            })}

            {filteredTransactions.length === 0 && (
              <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-3xl">
                <p className="text-slate-400 font-medium">Aucune opération trouvée.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}