import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-green-100 text-green-700',
    Expired: 'bg-red-100 text-red-700',
    Released: 'bg-slate-100 text-slate-600',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;