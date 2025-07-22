
import React from 'react';

interface BadgeProps {
  name: string;
  icon: string;
}

const Badge: React.FC<BadgeProps> = ({ name, icon }) => {
  return (
    <div className="inline-flex items-center gap-2 bg-amber-300/30 border border-amber-500/50 text-amber-800 text-sm font-semibold px-4 py-2 rounded-full">
      <span className="text-lg">{icon}</span>
      <span className="font-bold">ได้รับ: {name}</span>
    </div>
  );
};

export default Badge;