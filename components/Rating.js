// components/Rating.js
import React, { useState } from 'react';
import { Star } from 'lucide-react';

const Rating = ({ rating, onRatingChange, size = 24, interactive = true, label }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseOver = (value) => {
    if (interactive) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center">
      {label && <span className="mr-2 text-sm">{label}</span>}
      <div 
        className="flex"
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`cursor-pointer ${
              star <= (hoverRating || rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'hover:text-yellow-500' : ''}`}
            onClick={() => handleClick(star)}
            onMouseOver={() => handleMouseOver(star)}
            aria-label={`Noter ${star} étoile${star > 1 ? 's' : ''}`}
            role="button"
            tabIndex={interactive ? 0 : -1}
            onKeyDown={(e) => {
              if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                handleClick(star);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;