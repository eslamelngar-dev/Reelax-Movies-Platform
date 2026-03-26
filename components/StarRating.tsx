"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface StarRatingProps {
  rating?: number;
  maxStars?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export default function StarRating({
  rating = 0,
  maxStars = 5,
  size = 20,
  interactive = false,
  onRate,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const displayRating = hoverRating || userRating || rating;

  const handleClick = (value: number) => {
    if (!interactive) return;
    setUserRating(value);
    onRate?.(value);
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }, (_, i) => {
        const value = i + 1;
        const filled = value <= displayRating;

        return (
          <motion.button
            key={i}
            whileHover={interactive ? { scale: 1.2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            onClick={() => handleClick(value)}
            onMouseEnter={() => interactive && setHoverRating(value)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`${
              interactive ? "cursor-pointer" : "cursor-default"
            } transition-colors`}
          >
            <Star
              size={size}
              className={`${
                filled
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-gray-600"
              } transition-colors`}
            />
          </motion.button>
        );
      })}
      {userRating > 0 && interactive && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-yellow-400 text-sm font-bold mr-2"
        >
          {userRating}/5
        </motion.span>
      )}
    </div>
  );
}
