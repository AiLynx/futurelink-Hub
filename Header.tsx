
import React from 'react';
import type { UserProfile } from '../types';
import { StarIcon, BadgeCheckIcon } from './icons/Icons';

interface HeaderProps {
  userProfile: UserProfile;
  onProfileClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, onProfileClick }) => {
  return (
    <header className="bg-white/20 backdrop-blur-lg sticky top-0 z-50 border-b border-white/30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">🌷</span>
          <h1 className="text-2xl font-bold text-slate-800 tracking-wider">FutureLink Hub</h1>
        </div>
        <button 
          onClick={onProfileClick}
          className="flex items-center space-x-4 bg-white/25 px-4 py-2 rounded-full transition-colors duration-200 hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
          aria-label="เปิดโปรไฟล์ผู้ใช้"
        >
          <div className="flex items-center space-x-2">
            {userProfile.badges.map(badge => (
              <div key={badge.id} className="relative group">
                <span className="text-2xl" title={badge.name}>{badge.icon}</span>
                 <span className="absolute -top-8 left-1/2 -translate-x-1/2 w-max bg-slate-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
          <div className="w-px h-6 bg-pink-200/70"></div>
          <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
            <BadgeCheckIcon className="w-5 h-5 text-blue-500" />
            <span>ระดับ {userProfile.level}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
            <StarIcon className="w-5 h-5 text-amber-500" />
            <span>{userProfile.points} คะแนน</span>
          </div>
          <div className="text-3xl ml-2 border-2 border-pink-300 rounded-full p-1 bg-pink-100">
            {userProfile.avatar}
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;