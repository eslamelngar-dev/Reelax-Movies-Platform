"use client";

import { Cast } from "@/types/movie";
import { tmdb } from "@/lib/tmdb";
import { motion } from "framer-motion";
import Image from "next/image";
import { User } from "lucide-react";

interface CastSliderProps {
  cast: Cast[];
}

export default function CastSlider({ cast }: CastSliderProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {cast.slice(0, 20).map((person, i) => (
        <motion.div
          key={person.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex-shrink-0 w-28 text-center group"
        >
          <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-3 border-2 border-white/10 group-hover:border-red-500/50 transition-colors">
            {person.profile_path ? (
              <Image
                src={tmdb.getImageUrl(person.profile_path, "w185")}
                alt={person.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/5 flex items-center justify-center">
                <User className="w-10 h-10 text-gray-600" />
              </div>
            )}
          </div>
          <p className="text-xs font-bold text-white line-clamp-2">
            {person.name}
          </p>
          <p className="text-xs text-gray-500 line-clamp-1 mt-1">
            {person.character}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
