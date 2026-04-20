import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { CATEGORIES } from '../utils/categories';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

export default function Home() {
  const { transactions } = useFinance();

  // 1. Calculs des totaux
  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expense = Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0));
  const balance = income - expense;

  // 2. Données pour le graphique en barres (Revenus vs Dépenses)
  const barData = [
    { name: 'Revenus', amount: income, color: '#22c55e' },
    { name: 'Dépenses', amount: expense, color: '#ef4444' }
  ];

  // 3. Données pour le camembert (Répartition par catégorie)
  const pieData = CATEGORIES.map(cat => {
    const total = Math.abs(transactions
      .filter(t => t.categoryId === cat.id && t.amount < 0)
      .reduce((acc, t) => acc + t.amount, 0));
    return { name: cat.label, value: total, icon: cat.icon };
  }).filter(d => d.value > 0);

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10">
      <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase italic dark:text-white">Vue d'ensemble</h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-purple-600 dark:bg-purple-700 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Solde Total</p>
            <p className="text-7xl font-black mt-2 tracking-tighter">{balance.toLocaleString()} €</p>
          </div>
          {/* Décoration subtile en arrière-plan */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Entrées</p>
            <p className="text-2xl font-black text-green-500">+{income.toLocaleString()} €</p>
          </div>
          <div className="pt-4 border-t border-slate-50">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Sorties</p>
            <p className="text-2xl font-black text-red-500">-{expense.toLocaleString()} €</p>
          </div>
        </div>
      </div>

      {/* GRAPHIQUES SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Graphique de comparaison */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 shadow-sm h-[400px]">
          <h3 className="font-bold text-slate-800 mb-6 uppercase tracking-wider text-sm dark:text-white">Flux financier</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis 
                dataKey="name" 
                tick={{ fill: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b' }} 
              />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="amount" radius={[10, 10, 10, 10]} barSize={60}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition par catégorie */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 shadow-sm h-[400px] flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6 uppercase tracking-wider text-sm dark:text-white">Répartition des dépenses</h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#8b5cf6', '#ec4899', '#3b82f6', '#f59e0b', '#ef4444'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Légende rapide */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.slice(0, 4).map((d, i) => (
              <div key={i} className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase italic">
                <span>{d.icon}</span> {d.name}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}