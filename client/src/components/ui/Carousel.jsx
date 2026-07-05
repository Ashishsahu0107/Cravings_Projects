import { useEffect, useState } from 'react';

const Carousel = ({
  images = [],
  interval = 4000,
  className = '',
  showIndicators = true,
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [images.length, interval]);

  if (!images.length) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        {images.map((image, index) => {
          const src = typeof image === 'string' ? image : image.src;
          const alt = typeof image === 'string' ? 'Carousel slide' : image.alt || `Slide ${index + 1}`;

          return (
            <img
              key={src}
              src={src}
              alt={alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          );
        })}
      </div>

      {children}

      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((image, index) => (
            <button
              key={typeof image === 'string' ? image : image.src}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeIndex ? 'bg-white w-5' : 'bg-white/50'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
