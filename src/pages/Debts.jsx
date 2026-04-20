import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';

export default function Debts() {
  const { 
    debts, addDebt, deleteDebt, toggleDebtStatus,
    subscriptions, addSubscription, deleteSubscription
   } = useFinance();
  
  const [activeTab, setActiveTab] = useState('ponctuel');
  const [debtForm, setDebtForm] = useState({
    contact: '', amount: '', dueDate: '', type: 'to_pay'
  });
  const [subForm, setSubForm] = useState({
    name: '', amount: '', day: '1', category: 'Abonnement'
  });

  const handleDebtSubmit = (e) => {
    e.preventDefault();
    if (!debtForm.contact || !debtForm.amount) return;
    addDebt({ ...debtForm, amount: parseFloat(debtForm.amount) });
    setDebtForm({ contact: '', amount: '', dueDate: '', type: 'to_pay' });
  };

  const handleSubSubmit = (e) => {
    e.preventDefault();
    if (!subForm.name || !subForm.amount) return;
    addSubscription({ ...subForm, amount: parseFloat(subForm.amount) });
    setSubForm({ name: '', amount: '', day: '1', category: 'Abonnement' });
  };

  // Calcul du total des charges mensuelles fixes
  const totalMonthlyCharges = subscriptions.reduce((acc, sub) => acc + sub.amount, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase dark:text-white">
            Engagements
          </h1>
          <p className="text-slate-500 font-medium">Dettes uniques et prélèvements récurrents</p>
        </div>
        
        {/* Affichage du total des charges fixes */}
        {subscriptions.length > 0 && (
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl border border-purple-100 dark:border-purple-800">
            <p className="text-[10px] font-black uppercase text-purple-500 tracking-widest">Charges fixes mensuelles</p>
            <p className="text-2xl font-black text-purple-600">-{totalMonthlyCharges.toLocaleString()} € / mois</p>
          </div>
        )}
      </header>

      {/* Sélecteur d'onglets */}
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('ponctuel')}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'ponctuel' ? 'bg-white dark:bg-slate-700 shadow-sm dark:text-white' : 'text-slate-500'}`}
        >
          Dettes Ponctuelles
        </button>
        <button 
          onClick={() => setActiveTab('mensuel')}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'mensuel' ? 'bg-white dark:bg-slate-700 shadow-sm dark:text-white' : 'text-slate-500'}`}
        >
          Mensualités (Prêts/Abo)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* COLONNE GAUCHE : FORMULAIRES */}
        <section className="lg:col-span-1">
          {activeTab === 'ponctuel' ? (
            /* Formulaire Dette Unique */
            <form onSubmit={handleDebtSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="font-bold text-xl mb-4 dark:text-white">Nouvelle Dette / Créance</h2>
              <input 
                type="text" placeholder="Contact"
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                value={debtForm.contact}
                onChange={(e) => setDebtForm({...debtForm, contact: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" placeholder="Montant"
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white outline-none"
                  value={debtForm.amount}
                  onChange={(e) => setDebtForm({...debtForm, amount: e.target.value})}
                />
                <input 
                  type="date"
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white outline-none"
                  value={debtForm.dueDate}
                  onChange={(e) => setDebtForm({...debtForm, dueDate: e.target.value})}
                />
              </div>
              <select 
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white outline-none font-bold"
                value={debtForm.type}
                onChange={(e) => setDebtForm({...debtForm, type: e.target.value})}
              >
                <option value="to_pay">Je dois</option>
                <option value="to_receive">On me doit</option>
              </select>
              <button type="submit" className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold shadow-lg">Ajouter</button>
            </form>
          ) : (
            /* Formulaire Mensualité */
            <form onSubmit={handleSubSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 animate-in fade-in duration-300">
              <h2 className="font-bold text-xl mb-4 dark:text-white">Nouveau Prélèvement</h2>
              <input 
                type="text" placeholder="Ex: Loyer, Prêt Auto, Netflix..."
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                value={subForm.name}
                onChange={(e) => setSubForm({...subForm, name: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" placeholder="Montant"
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white outline-none"
                  value={subForm.amount}
                  onChange={(e) => setSubForm({...subForm, amount: e.target.value})}
                />
                <input 
                  type="number" placeholder="Jour (1-31)" min="1" max="31"
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white outline-none"
                  value={subForm.day}
                  onChange={(e) => setSubForm({...subForm, day: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg">Enregistrer le prélèvement</button>
            </form>
          )}
        </section>

        {/* COLONNE DROITE : AFFICHAGE DES LISTES */}
        <section className="lg:col-span-2 space-y-6">
          {activeTab === 'ponctuel' ? (
            /* Liste des Dettes */
            <div className="space-y-4">
              <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest ml-2">Historique des dettes</h3>
              {debts.map(debt => (
                <div key={debt.id} className={`flex items-center justify-between p-5 rounded-3xl border ${debt.status === 'completed' ? 'opacity-40 bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm'}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{debt.type === 'to_pay' ? '💸' : '💰'}</span>
                    <div>
                      <p className="font-bold dark:text-white">{debt.contact}</p>
                      <p className="text-xs text-slate-500 italic">Échéance: {debt.dueDate || 'Libre'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`font-black ${debt.type === 'to_pay' ? 'text-red-500' : 'text-green-500'}`}>{debt.type === 'to_pay' ? '-' : '+'}{debt.amount}€</span>
                    <button onClick={() => toggleDebtStatus(debt.id)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl dark:text-white">✓</button>
                    <button onClick={() => deleteDebt(debt.id)} className="p-2 text-red-500">✕</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Liste des Mensualités */
            <div className="space-y-4">
              <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest ml-2">Prélèvements automatiques actifs</h3>
              {subscriptions.map(sub => (
                <div key={sub.id} className="flex items-center justify-between p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                      {sub.day}
                    </div>
                    <div>
                      <p className="font-bold dark:text-white">{sub.name}</p>
                      <p className="text-xs text-slate-500">Le {sub.day} de chaque mois</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-black text-blue-600">-{sub.amount}€</span>
                    <button onClick={() => deleteSubscription(sub.id)} className="p-2 text-red-500">✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}