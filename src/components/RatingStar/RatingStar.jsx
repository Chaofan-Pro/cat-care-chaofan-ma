import "./RatingStar.scss";
import { useState, useEffect } from "react";

function RatingStar({ totalStars = 5, value, onRatingChange }) {
  const [currentRating, setCurrentRating] = useState(value || 0);
  const [hoveredStar, setHoveredStar] = useState(null);

  useEffect(() => {
    if (value !== currentRating) {
      setCurrentRating(value);
    }
  }, [value]);

  const handleClick = (starValue) => {
    setCurrentRating(starValue);
    if (onRatingChange) onRatingChange(starValue);
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            className={
              starValue <= (hoveredStar || currentRating)
                ? "star filled"
                : "star"
            }
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHoveredStar(starValue)}
            onMouseLeave={() => setHoveredStar(null)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default RatingStar;
