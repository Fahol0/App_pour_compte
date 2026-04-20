import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <nav className="p-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-black italic tracking-tighter dark:text-white">MONEY.</Link>
          <div className="flex gap-4 font-bold text-sm text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-purple-600">Accueil</Link>
            <Link to="/dashboard" className="hover:text-purple-600">Dashboard</Link>
            <Link to="/debts" className="hover:text-purple-600">Dettes</Link>
            <Link to="/settings" className="hover:text-purple-600">Paramètres</Link>
          </div>
        </div>
        <DarkModeToggle />
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}