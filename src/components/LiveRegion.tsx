import React from 'react';

interface LiveRegionProps {
  message: string;
  type?: 'polite' | 'assertive';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}

const LiveRegion: React.FC<LiveRegionProps> = ({ 
  message, 
  type = 'polite',
  atomic = true,
  relevant = 'additions'
}) => {
  return (
    <div
      role="status"
      aria-live={type}
      aria-atomic={atomic}
      aria-relevant={relevant}
      className="sr-only"
    >
      {message}
    </div>
  );
};

export default LiveRegion;