
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

const LazyImage = ({ src, alt, className = "", placeholderClassName = "" }: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  
  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoading(false);
      setImageSrc(src);
    };
    
    img.onerror = () => {
      setIsLoading(false);
      setError(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  
  if (isLoading) {
    return <Skeleton className={`${className} ${placeholderClassName}`} />;
  }
  
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
        <svg 
          className="w-12 h-12 text-gray-400" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
      </div>
    );
  }
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

export default LazyImage;
