import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingContainerProps {
  isLoading: boolean;
  loadingMessage?: string;
  children: React.ReactNode;
  className?: string;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({ 
  isLoading, 
  loadingMessage = 'Loading content...', 
  children,
  className = ''
}) => {
  if (isLoading) {
    return (
      <div 
        className={`relative min-h-[200px] ${className}`}
        aria-busy="true"
        aria-label={loadingMessage}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <LoadingSpinner message={loadingMessage} />
        </div>
        <div className="invisible" aria-hidden="true">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={className} aria-busy="false">
      {children}
    </div>
  );
};

export default LoadingContainer;