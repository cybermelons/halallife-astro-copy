import React from 'react';

interface FormErrorProps {
  id: string;
  message: string;
  visible: boolean;
}

const FormError: React.FC<FormErrorProps> = ({ id, message, visible }) => {
  if (!visible) return null;

  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      className="text-red-600 text-sm mt-1"
    >
      <span className="sr-only">Error:</span>
      {message}
    </div>
  );
};

export default FormError;