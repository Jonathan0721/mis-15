'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User } from 'lucide-react';

interface GuestModalProps {
  isOpen: boolean;
  initialName: string;
  onSave: (name: string) => void;
  onClose?: () => void;
}

export default function GuestModal({ isOpen, initialName, onSave, onClose }: GuestModalProps) {
  const [guestName, setGuestName] = useState(initialName);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setGuestName(initialName);
  }, [initialName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      alert('Por favor ingresa tu nombre completo');
      return;
    }

    setIsSaving(true);

    try {
      onSave(guestName.trim());
    } catch (error) {
      console.error('Error al registrar invitado:', error);
      alert('Error al guardar tu nombre. Por favor intenta nuevamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          {onClose && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
          )}

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl max-w-md w-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-pink-500/25">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {initialName ? 'Actualizar Nombre' : 'Bienvenido'}
                    </h2>
                    <p className="text-sm text-slate-400">
                      {initialName ? 'Corrige tu nombre si es necesario' : 'Regístrate para compartir recuerdos'}
                    </p>
                  </div>
                </div>
                {onClose && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Ej: María García López"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all"
                    disabled={isSaving}
                    autoFocus
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSaving}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <span>{initialName ? 'Actualizar' : 'Continuar'}</span>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
