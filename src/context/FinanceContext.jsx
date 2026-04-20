import React, { createContext, useState, useContext, useEffect } from 'react';

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  // 1. Initialisation : on essaie de récupérer les données du LocalStorage
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('money_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [debts, setDebts] = useState(() => {
    const saved = localStorage.getItem('money_debts');
    return saved ? JSON.parse(saved) : [];
  })

  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('money_subscriptions');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem('money_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('money_debts', JSON.stringify(debts));
  }, [debts]);

  useEffect(() => {
    localStorage.setItem('money_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const addTransaction = (t) => setTransactions([t, ...transactions]);
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addDebt = (debt) => setDebts([{ ...debt, id: Date.now(), status: 'active' }, ...debts]);
  const deleteDebt = (id) => setDebts(debts.filter(d => d.id !== id));
  const toggleDebtStatus = (id) => {
    setDebts(debts.map(d => 
      d.id === id ? { ...d, status: d.status === 'active' ? 'completed' : 'active' } : d
    ));
  };

  const addSubscription = (sub) => {
    setSubscriptions([...subscriptions, { ...sub, id: Date.now() }]);
  };

  const deleteSubscription = (id) => {
    setSubscriptions(subscriptions.filter(s => s.id !== id));
  };
  
  // EXPORT : Télécharge un fichier JSON
  const exportData = () => {
    const dataStr = JSON.stringify({ transactions, debts }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_money_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // IMPORT : Lit un fichier JSON et remplace les transactions
  const importData = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (json.transactions && json.debts) {
          setTransactions(json.transaction);
          setDebts(json.debts);
        }
        else if (Array.isArray(json)) {
          setTransactions(json);
        }
        alert("Restauration réussie.")
      } catch (err) {
        alert("Erreur fichier JSON invalide.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <FinanceContext.Provider value={{ 
      transactions, addTransaction, deleteTransaction,
      debts, addDebt, deleteDebt, toggleDebtStatus,
      subscriptions, addSubscription, deleteSubscription,
      exportData, importData }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);