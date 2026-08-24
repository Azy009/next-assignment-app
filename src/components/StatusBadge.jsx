import React from 'react';

export const StatusBadge = ({ status }) => {
  const normalizedStatus = (status || '').toUpperCase();

  let badgeStyles = 'bg-gray-100 text-gray-700';

  if (normalizedStatus === 'COMPLETED') {
    badgeStyles = 'badge-completed';
  } else if (normalizedStatus === 'INCOMPLETE') {
    badgeStyles = 'badge-incomplete';
  } else if (normalizedStatus === 'MISSING') {
    badgeStyles = 'badge-missing';
  }

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-md ${badgeStyles}`}>
      {normalizedStatus}
    </span>
  );
};
