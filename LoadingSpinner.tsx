
import React from 'react';
import { BrainCircuitIcon } from './icons/Icons';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'กำลังโหลด...' }) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center animate-fade-in">
      <BrainCircuitIcon className="w-16 h-16 text-pink-500 animate-pulse mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-slate-800">{message}</h2>
      <p className="text-slate-600">กรุณารอสักครู่...</p>
    </div>
  );
};

export default LoadingSpinner;