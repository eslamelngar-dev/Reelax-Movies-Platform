"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import TrailerModal from "@/components/TrailerModal";
import StarRating from "@/components/StarRating";

interface Props {
  trailerKey: string | null;
}

export default function MovieDetailsClient({ trailerKey }: Props) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [rated, setRated] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        {trailerKey && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTrailer(true)}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-red-600/30"
          >
            <Play className="w-5 h-5 fill-white" />
            مشاهدة الإعلان
          </motion.button>
        )}

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">قيّم الفيلم:</span>
          <StarRating interactive size={24} onRate={() => setRated(true)} />
          {rated && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-green-400 text-xs font-bold"
            >
              ✓ تم التقييم
            </motion.span>
          )}
        </div>
      </div>

      <TrailerModal
        videoKey={showTrailer ? trailerKey : null}
        onClose={() => setShowTrailer(false)}
      />
    </>
  );
}
