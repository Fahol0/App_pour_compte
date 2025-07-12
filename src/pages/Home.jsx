import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-green-600">Accueil</h1>
      <p className="mt-4">Bienvenue sur la page d'accueil</p>
    </motion.div>
  );
}
