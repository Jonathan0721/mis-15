"use client";

import { useState, useEffect } from "react";
import PhotoCard from "@/components/PhotoCard";
import UploadModal from "@/components/UploadModal";
import GuestModal from "@/components/GuestModal";
import { Plus, Bell, Search, Home as HomeIcon, User, X, Sparkles } from "lucide-react";

export interface Post {
    id: string;
    guestName: string;
    imageUrl: string;
    message: string;
    likes: number;
    createdAt: any;
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [guestName, setGuestName] = useState<string>("");
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const savedName = localStorage.getItem("guestName");
        if (!savedName) {
            setIsGuestModalOpen(true);
        } else {
            setGuestName(savedName);
        }

        const savedPosts = localStorage.getItem("mock_posts");
        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        }
    }, []);

    const handleSaveGuest = (name: string) => {
        setGuestName(name);
        localStorage.setItem("guestName", name);
        setIsGuestModalOpen(false);
    };

    const handleAddPost = (newPost: Omit<Post, "id" | "likes" | "createdAt">) => {
        const createdPost: Post = {
            ...newPost,
            id: Date.now().toString(),
            likes: 0,
            createdAt: new Date().toISOString(),
        };

        const updated = [createdPost, ...posts];
        setPosts(updated);
        localStorage.setItem("mock_posts", JSON.stringify(updated));
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <main className="min-h-screen text-slate-800 relative pb-28 font-sans selection:bg-pink-400/30 overflow-x-hidden">
            {/* FONDO Y LUCES CÁLIDAS */}
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center scale-105 filter blur-[2px]"
                style={{
                    backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255, 182, 193, 0.4), transparent 40%),
                            radial-gradient(circle at 80% 80%, rgba(216, 191, 216, 0.5), transparent 50%),
                            linear-gradient(to bottom, #1e293b, #0f172a)`
                }}
            />

            {/* --- NOTIFICACIÓN FLOTANTE ESTILO iOS BANNER --- */}
            {showNotification && (
                <div className="fixed top-4 left-4 right-4 z-50 max-w-md mx-auto animate-bounce-short">
                    <div className="bg-white/25 border border-white/40 backdrop-blur-3xl rounded-3xl p-4 shadow-2xl text-white relative">
                        <button
                            onClick={() => setShowNotification(false)}
                            className="absolute top-3 right-3 p-1 rounded-full bg-black/20 text-white/80 hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="flex items-start gap-3 pr-6">
                            <div className="p-2.5 rounded-2xl bg-pink-500/30 border border-white/30 backdrop-blur-md text-pink-200 shrink-0">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm tracking-wide text-white">¡Gracias por acompañarme! 💕</h4>
                                <p className="text-xs text-white/90 leading-relaxed mt-1">
                                    Muchas gracias por asistir a mis 15 años. No olvides dejarme una foto o un mensaje de recuerdo para conservar este dia especial. ✨
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- ENCABEZADO GLASS --- */}
            <header className="sticky top-0 z-40 px-4 pt-3 pb-3">
                <div className="max-w-md mx-auto rounded-3xl bg-white/20 border border-white/30 backdrop-blur-2xl p-3 flex items-center justify-between shadow-lg shadow-black/10">

                    {/* Espaciador para mantener centrado el título */}
                    <div className="w-8 h-8" />

                    {/* Título de los 15 Años */}
                    <div className="text-center">
                        <h1 className="font-extrabold text-base text-white tracking-tight drop-shadow-sm flex items-center justify-center gap-1.5">
                            <span>👑</span> Mis 15 Años
                        </h1>
                        <p className="text-[10px] text-pink-200/90 font-semibold tracking-widest uppercase">
                            MURO DE RECUERDOS
                        </p>
                    </div>

                    {/* Botón de Notificación / Mensaje de Agradecimiento */}
                    <button
                        onClick={() => setShowNotification(!showNotification)}
                        title="Mensaje especial"
                        className="w-8 h-8 rounded-full bg-pink-400/30 border border-white/30 flex items-center justify-center text-white backdrop-blur-md relative hover:bg-pink-400/40 transition-colors"
                    >
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-pink-400 rounded-full animate-ping" />
                    </button>
                </div>

                {/* Buscador */}
                <div className="max-w-md mx-auto mt-2.5">
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-2xl text-white/90 text-xs shadow-inner">
                        <Search className="w-4 h-4 text-white/70" />
                        <span className="text-white/60 font-normal">Buscar recuerdos o felicitaciones...</span>
                    </div>
                </div>
            </header>

            {/* --- LISTA DE PUBLICACIONES --- */}
            <section className="max-w-md mx-auto px-4 pt-4 space-y-5">
                {posts.length === 0 ? (
                    <div className="rounded-3xl bg-white/20 border border-white/30 backdrop-blur-2xl p-8 text-center space-y-3 shadow-xl">
                        <div className="w-12 h-12 rounded-full bg-white/20 border border-white/40 flex items-center justify-center mx-auto text-white shadow-inner">
                            ✨
                        </div>
                        <h3 className="font-bold text-lg text-white">¡Aún no hay fotos!</h3>
                        <p className="text-xs text-white/80 leading-relaxed max-w-xs mx-auto">
                            Sé el primero en publicar. Presiona el botón rosa para compartir tu recuerdo de los 15 años.
                        </p>
                    </div>
                ) : (
                    posts.map((post) => <PhotoCard key={post.id} post={post} />)
                )}
            </section>

            {/* --- BARRA DE NAVEGACIÓN INFERIOR --- */}
            <div className="fixed bottom-4 left-0 right-0 z-40 px-4 flex justify-center">
                <div className="w-full max-w-md bg-white/20 border border-white/30 backdrop-blur-2xl rounded-full p-2 flex items-center justify-between shadow-2xl shadow-black/20">

                    <button
                        onClick={scrollToTop}
                        title="Inicio"
                        className="p-3 text-white/80 hover:text-white transition-colors active:scale-90"
                    >
                        <HomeIcon className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => setIsUploadOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold text-xs shadow-lg shadow-pink-500/30 border border-white/40 active:scale-95 transition-transform"
                    >
                        <Plus className="w-4 h-4" />
                        Subir Foto
                    </button>

                    <button
                        onClick={() => setIsGuestModalOpen(true)}
                        title="Cambiar mi nombre"
                        className="p-3 text-white/80 hover:text-white transition-colors active:scale-90"
                    >
                        <User className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {isGuestModalOpen && (
                <GuestModal
                    isOpen={isGuestModalOpen}
                    initialName={guestName}
                    onSave={handleSaveGuest}
                />
            )}

            {isUploadOpen && (
                <UploadModal
                    isOpen={isUploadOpen}
                    onClose={() => setIsUploadOpen(false)}
                    guestName={guestName}
                    onAddPost={handleAddPost}
                />
            )}
        </main>
    );
}