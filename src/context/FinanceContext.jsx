import React, { createContext, useState, useContext, useEffect } from 'react';

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  // 1. Initialisation : on essaie de récupérer les données du LocalStorage
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('money_transactions');
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  // 2. Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem('money_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t) => setTransactions([t, ...transactions]);

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // --- LES NOUVELLES FONCTIONS DOIVENT ÊTRE ICI ---
  
  // EXPORT : Télécharge un fichier JSON
  const exportData = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_money_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url); // Nettoyage mémoire
  };

  // IMPORT : Lit un fichier JSON et remplace les transactions
  const importData = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if (Array.isArray(json)) {
          setTransactions(json);
          alert("Sauvegarde restaurée avec succès !");
        }
      } catch (err) {
        alert("Erreur lors de la lecture du fichier. Assurez-vous que c'est un fichier JSON valide.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <FinanceContext.Provider value={{ transactions, addTransaction, deleteTransaction, exportData, importData }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);