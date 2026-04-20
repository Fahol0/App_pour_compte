import React from 'react';
import { useFinance } from '../context/FinanceContext';

export default function Settings() {
  const { exportData, importData, transactions } = useFinance();

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-10">
      <header>
        <h1 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter dark:text-white">Paramètres & Sécurité</h1>
        <p className="text-slate-400 text-sm font-medium">Gérez la sauvegarde physique de vos données.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* EXPORT */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
          <div className="text-3xl">📥</div>
          <h3 className="font-bold text-xl text-slate-800 dark:text-white">Exporter mes données</h3>
          <p className="text-sm text-slate-500">Téléchargez un fichier de sauvegarde contenant vos {transactions.length} transactions.</p>
          <button 
            onClick={exportData}
            className="w-full py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition
                      dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:hover:bg-slate-700"
          >
            Télécharger le backup
          </button>
        </div>

        {/* IMPORT */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
          <div className="text-3xl">📤</div>
          <h3 className="font-bold text-xl text-slate-800 dark:text-white">Restaurer un backup</h3>
          <p className="text-sm text-slate-500">Importez un fichier .json précédemment téléchargé pour restaurer vos comptes.</p>
          <label className="block w-full py-3 bg-purple-50 text-purple-600 text-center rounded-2xl font-bold hover:bg-purple-100 cursor-pointer transition border-2 border-dashed border-purple-200
                          dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:hover:bg-slate-700">
            Sélectionner le fichier
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              onChange={(e) => importData(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-red-600 text-sm italic dark:bg-slate-400 dark:text-red dark:placeholder-slate-500">
        <strong>Note :</strong> Puisque l'application est 100% privée, vos données ne sont pas sur internet. Pensez à faire un export de temps en temps, c'est votre seule "sécurité physique".
      </div>
    </div>
  );
}