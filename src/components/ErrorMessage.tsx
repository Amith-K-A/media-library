// components/ErrorMessage.tsx

import React from 'react';

interface ErrorMessageProps {
  error: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="text-center text-red-600 mb-4">
      <p>{error}</p>
    </div>
  );
};

export default ErrorMessage;
