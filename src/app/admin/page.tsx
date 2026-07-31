"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Lock, Trash2, Image as ImageIcon, Users, Heart, ShieldCheck, ArrowLeft } from "lucide-react";

interface Post {
  id: string;
  guestName: string;
  imageUrl: string;
  message: string;
  likes: number;
  createdAt: any;
}

const ADMIN_PIN = "1515";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [errorPin, setErrorPin] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      })) as Post[];
      setPosts(docs);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setErrorPin(false);
    } else {
      setErrorPin(true);
    }
  };

  const handleDeletePost = async (postId: string, imageUrl: string) => {
    if (!confirm("¿Seguro que deseas eliminar esta publicación permanentemente?")) return;

    try {
      await deleteDoc(doc(db, "posts", postId));

      if (imageUrl.includes("firebasestorage")) {
        try {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
        } catch (err) {
          console.warn("No se pudo borrar del Storage", err);
        }
      }
    } catch (err) {
      console.error("Error eliminando post:", err);
      alert("Hubo un error al eliminar.");
    }
  };

  if (!isAuthenticated) {
    return (
        <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-slate-800/80 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl text-center">
            <div className="p-3 w-12 h-12 mx-auto rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4 border border-pink-500/30">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold mb-1">Panel de Administrador</h1>
            <p className="text-xs text-slate-400 mb-6">Ingresa el PIN secreto para continuar</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                  type="password"
                  maxLength={4}
                  placeholder="PIN"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full text-center text-2xl tracking-widest px-4 py-3 rounded-2xl bg-slate-900/80 border border-white/10 text-white focus:outline-none focus:border-pink-500"
              />
              {errorPin && <p className="text-xs text-red-400">PIN Incorrecto. Intenta de nuevo.</p>}

              <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-pink-500/25 active:scale-95 transition-transform"
              >
                Entrar al Dashboard
              </button>
            </form>

            <div className="mt-6">
              <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Volver al Muro
              </Link>
            </div>
          </div>
        </main>
    );
  }

  const totalLikes = posts.reduce((acc, p) => acc + (p.likes || 0), 0);
  const uniqueGuests = Array.from(new Set(posts.map((p) => p.guestName)));

  return (
      <main className="min-h-screen bg-slate-900 text-white pb-12">
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/80 border-b border-white/10 px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-pink-500" />
            <h1 className="font-bold text-lg">Panel de Control</h1>
          </div>
          <Link
              href="/"
              className="px-3 py-1.5 rounded-full bg-slate-800 border border-white/10 text-xs text-slate-300 hover:text-white"
          >
            Ir al Muro ↗
          </Link>
        </header>

        <div className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-pink-400 mb-1">
                <ImageIcon className="w-4 h-4" />
                <span className="text-xs font-medium text-slate-400">Fotos</span>
              </div>
              <p className="text-2xl font-bold">{posts.length}</p>
            </div>

            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium text-slate-400">Autores</span>
              </div>
              <p className="text-2xl font-bold">{uniqueGuests.length}</p>
            </div>

            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-red-400 mb-1">
                <Heart className="w-4 h-4" />
                <span className="text-xs font-medium text-slate-400">Me Gusta</span>
              </div>
              <p className="text-2xl font-bold">{totalLikes}</p>
            </div>
          </div>

          <div className="bg-slate-800/40 border border-white/10 rounded-3xl p-4 sm:p-6">
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <span>Fotos Publicadas</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
              Moderación
            </span>
            </h2>

            {posts.length === 0 ? (
                <p className="text-sm text-slate-500 py-8 text-center">Aún no se ha publicado ningún recuerdo.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {posts.map((post) => (
                      <div
                          key={post.id}
                          className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-video bg-black">
                            <img
                                src={post.imageUrl}
                                alt="Recuerdo"
                                className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-semibold text-pink-400">{post.guestName}</span>
                              <span className="text-slate-500">❤️ {post.likes || 0}</span>
                            </div>
                            {post.message && (
                                <p className="text-xs text-slate-300 line-clamp-2">{post.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="p-3 pt-0 border-t border-white/5 mt-2">
                          <button
                              onClick={() => handleDeletePost(post.id, post.imageUrl)}
                              className="w-full py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Eliminar Publicación
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </main>
  );
}