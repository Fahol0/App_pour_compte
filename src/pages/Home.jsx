import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { CATEGORIES } from '../utils/categories';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

export default function Home() {
  const { transactions, debts, subscriptions } = useFinance();

  // Détection réactive du mode sombre pour Recharts
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // 1. Calculs des totaux
  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expense = Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0));
  const balance = income - expense;

  // 2. Alertes (Mensualités & Dettes)
  const today = new Date().getDate();
  const upcomingSubs = subscriptions.sort((a, b) => a.day - b.day);

  const upcomingDebts = debts.filter(debt => {
    if (!debt.dueDate || debt.status === 'completed') return false;
    const diffTime = new Date(debt.dueDate) - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 30;
  });

  const hasAlerts = upcomingSubs.length > 0 || upcomingDebts.length > 0;

  // 3. Graphiques
  const barData = [
    { name: 'Revenus', amount: income, color: '#22c55e' },
    { name: 'Dépenses', amount: expense, color: '#ef4444' }
  ];

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

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Entrées</p>
            <p className="text-2xl font-black text-green-500">+{income.toLocaleString()} €</p>
          </div>
          <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Sorties</p>
            <p className="text-2xl font-black text-red-500">-{expense.toLocaleString()} €</p>
          </div>
        </div>
      </div>

      {/* ALERTES SECTION */}
      {hasAlerts && (
        <section className="mt-10 animate-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xs font-bold uppercase text-slate-400 tracking-[0.2em] mb-4 ml-2">
            📅 Échéances & Prélèvements (30 jours)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingSubs.map(sub => (
              <div key={sub.id} className="flex items-center justify-between p-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-sm">{sub.day}</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{sub.name}</p>
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase">Prélèvement</p>
                  </div>
                </div>
                <span className="font-black text-slate-900 dark:text-white">-{sub.amount}€</span>
              </div>
            ))}
            {upcomingDebts.map(debt => (
              <div key={debt.id} className="flex items-center justify-between p-4 bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/50 rounded-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center text-lg">
                    {debt.type === 'to_pay' ? '💸' : '💰'}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{debt.contact}</p>
                    <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold uppercase">Échéance : {debt.dueDate}</p>
                  </div>
                </div>
                <span className={`font-black ${debt.type === 'to_pay' ? 'text-red-500' : 'text-green-500'}`}>
                  {debt.type === 'to_pay' ? '-' : '+'}{debt.amount}€
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GRAPHIQUES SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm h-[400px]">
          <h3 className="font-bold text-slate-800 mb-6 uppercase tracking-wider text-sm dark:text-white">Flux financier</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fill: isDark ? '#94a3b8' : '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '16px', border: 'none', backgroundColor: isDark ? '#1e293b' : '#fff', color: isDark ? '#fff' : '#000'}} />
              <Bar dataKey="amount" radius={[10, 10, 10, 10]} barSize={60}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm h-[400px] flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6 uppercase tracking-wider text-sm dark:text-white">Répartition des dépenses</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#8b5cf6', '#ec4899', '#3b82f6', '#f59e0b', '#ef4444'][index % 5]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{borderRadius: '16px', border: 'none', backgroundColor: isDark ? '#1e293b' : '#fff', color: isDark ? '#fff' : '#000'}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}