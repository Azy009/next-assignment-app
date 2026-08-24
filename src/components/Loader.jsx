import React from 'react';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center p-2">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
    </div>
  );
};

export default Loader;
