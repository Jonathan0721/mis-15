"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface PostProps {
  post: {
    id: string;
    guestName: string;
    imageUrl: string;
    message: string;
    likes: number;
  };
}

export default function PhotoCard({ post }: PostProps) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
      <div className="rounded-[32px] bg-white/20 border border-white/35 backdrop-blur-2xl p-4 shadow-xl shadow-black/10 text-white transition-all">
        {/* Imagen Principal */}
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-black/20 border border-white/20 shadow-inner">
          <img
              src={post.imageUrl}
              alt="Recuerdo"
              className="w-full h-full object-cover"
          />
        </div>

        {/* Info del Autor */}
        <div className="mt-3 px-1">
          <h4 className="font-bold text-base text-white drop-shadow-sm">
            {post.message || "Birthday Bash! 🥳"}
          </h4>
          <p className="text-[11px] text-white/80 font-medium">
            Publicado por: <span className="font-semibold text-white">{post.guestName || "Invitado"}</span>
          </p>
        </div>

        {/* Acciones de la Tarjeta */}
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-semibold text-white/90">
          <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                  isLiked
                      ? "bg-pink-500/40 text-white border border-pink-300/50"
                      : "bg-white/10 hover:bg-white/20 border border-white/20"
              }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-pink-400 text-pink-400" : ""}`} />
            <span>Like {likes > 0 && `(${likes})`}</span>
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20">
            <MessageCircle className="w-4 h-4" />
            <span>Comentar</span>
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20">
            <Share2 className="w-4 h-4" />
            <span>Compartir</span>
          </button>
        </div>
      </div>
  );
}