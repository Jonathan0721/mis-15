"use client";

import { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  onAddPost: (newPost: { guestName: string; imageUrl: string; message: string }) => void;
}

export default function UploadModal({ isOpen, onClose, guestName, onAddPost }: UploadModalProps) {
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  // Convertir imagen seleccionada a Base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Por favor selecciona una foto.");
      return;
    }

    setSubmitting(true);
    try {
      await onAddPost({
        guestName: guestName || "Invitado Especial",
        imageUrl: image,
        message: message.trim(),
      });
      setImage(null);
      setMessage("");
      onClose();
    } catch (error) {
      console.error("Error al publicar:", error);
      alert("Hubo un error al subir tu recuerdo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-slate-900/90 border border-white/20 backdrop-blur-2xl rounded-3xl p-6 w-full max-w-md text-white relative shadow-2xl space-y-4">

          <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold flex items-center justify-center gap-2">
              <span>📸</span> Compartir Recuerdo
            </h2>
            <p className="text-xs text-slate-300">Publicando como: <span className="text-pink-400 font-semibold">{guestName || "Invitado"}</span></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Selector de Imagen */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">Selecciona una foto</label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-2xl p-6 cursor-pointer hover:border-pink-500/50 bg-white/5 transition-colors">
                {image ? (
                    <img src={image} alt="Vista previa" className="w-full h-40 object-cover rounded-xl" />
                ) : (
                    <div className="flex flex-col items-center space-y-2 text-slate-400">
                      <ImageIcon className="w-8 h-8 text-pink-400" />
                      <span className="text-xs">Toca aquí para elegir una foto</span>
                    </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>

            {/* Mensaje */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">Mensaje de felicitación</label>
              <textarea
                  placeholder="Escribe un mensaje lindo..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-black/30 border border-white/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-pink-500 resize-none"
              />
            </div>

            {/* Botón de Enviar */}
            <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {submitting ? "Publicando..." : "Publicar en el Muro"}
            </button>
          </form>
        </div>
      </div>
  );
}