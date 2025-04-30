import React from 'react';

export const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  if (type === 'card') {
    return [...Array(count)].map((_, i) => (
      <div key={i} className="animate-pulse bg-white p-4 rounded-lg shadow">
        <div className="w-32 h-32 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      </div>
    ));
  }

  if (type === 'detail') {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    );
  }

  // Default fallback
  return null;
};
