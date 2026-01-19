import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ value, className }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const ref = useRef(null);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const step = (now) => {
          if (!start) start = now;
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * numericValue));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(entry.target);
      }
    });
    if (ref.current) observer.observe(ref.current);
  }, [numericValue]);

  return <div ref={ref} className={className}>{count}{suffix}</div>;
};

export default AnimatedCounter;