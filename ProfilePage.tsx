
import React, { useState, useEffect } from 'react';
import type { UserProfile, EducationLevel } from '../types';
import { HomeIcon, UserCircleIcon, LightBulbIcon } from './icons/Icons';
import { POINTS_PER_LEVEL } from '../constants';

const calculateAge = (birthDateString?: string): number | null => {
  if (!birthDateString) return null;
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return isNaN(age) ? null : age;
};

const educationLevels: { value: EducationLevel; label: string }[] = [
    { value: 'มัธยม', label: 'มัธยมศึกษา' },
];

const educationYearOptions: Record<EducationLevel | string, string[]> = {
    'มัธยม': ['1', '2', '3', '4', '5', '6'],
    '': []
};

interface ProfilePageProps {
  userProfile: UserProfile;
  onBackToHome: () => void;
  onUpdateProfile: (updatedData: Partial<UserProfile>) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile, onBackToHome, onUpdateProfile }) => {
    const [formData, setFormData] = useState<UserProfile>(userProfile);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setFormData(userProfile);
    }, [userProfile]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdateProfile(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };
    
    const age = calculateAge(formData.birthDate);

    const pointsForCurrentLevelStart = (userProfile.level - 1) * POINTS_PER_LEVEL;
    const pointsForNextLevel = userProfile.level * POINTS_PER_LEVEL;
    const progressInLevel = userProfile.points - pointsForCurrentLevelStart;
    const pointsNeededForLevel = pointsForNextLevel - pointsForCurrentLevelStart;
    const progressPercentage = pointsNeededForLevel > 0 ? (progressInLevel / pointsNeededForLevel) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-fade-in">
        <div className="theme-card text-center mb-10">
            <div className="text-8xl mx-auto mb-4 w-32 h-32 flex items-center justify-center bg-pink-100 rounded-full border-4 border-white shadow-lg">
                {userProfile.avatar}
            </div>
            <h2 className="text-4xl font-bold text-slate-800">{formData.firstName || userProfile.name}</h2>
            
            <div className="mt-8 max-w-lg mx-auto">
                <div className="flex justify-between items-center text-slate-600 mb-2 font-semibold">
                    <span className="text-blue-600">ระดับ {userProfile.level}</span>
                    <span className="text-amber-600">{userProfile.points.toLocaleString()} / {pointsForNextLevel.toLocaleString()} คะแนน</span>
                </div>
                <div className="w-full bg-pink-100/50 rounded-full h-4 border border-white/80">
                    <div
                        className="bg-gradient-to-r from-pink-400 to-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                        role="progressbar"
                        aria-valuenow={progressPercentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`ความคืบหน้าระดับ ${userProfile.level}`}
                    ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  ต้องการอีก {Math.max(0, pointsForNextLevel - userProfile.points).toLocaleString()} คะแนนเพื่อไปยังระดับถัดไป!
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
                <div className="theme-card">
                    <div className="flex items-center mb-6">
                        <UserCircleIcon className="w-8 h-8 text-pink-500 mr-3"/>
                        <h3 className="text-2xl font-bold text-slate-800">ข้อมูลส่วนตัว</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <InputField label="ชื่อจริง" name="firstName" value={formData.firstName || ''} onChange={handleInputChange} />
                           <InputField label="นามสกุล" name="lastName" value={formData.lastName || ''} onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputField label="ชื่อเล่น" name="nickname" value={formData.nickname || ''} onChange={handleInputChange} />
                           <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">วันเกิด</label>
                                <input type="date" name="birthDate" value={formData.birthDate || ''} onChange={handleInputChange} className="theme-input" />
                                {age !== null && <p className="text-xs text-slate-500 mt-1">อายุ: {age} ปี</p>}
                           </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SelectField label="ระดับการศึกษา" name="educationLevel" value={formData.educationLevel || ''} onChange={handleInputChange} options={educationLevels} isBaseSelect />
                            <SelectField label="ชั้นปี" name="educationYear" value={formData.educationYear || ''} onChange={handleInputChange} options={(educationYearOptions[formData.educationLevel || ''] || []).map(y => ({value: y, label: `ม.${y}`}))} disabled={!formData.educationLevel} />
                        </div>
                    </div>
                     <div className="mt-6 text-right">
                        <button onClick={handleSave} className="theme-button-primary">
                            {isSaved ? "บันทึกแล้ว!" : "บันทึกข้อมูล"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-2">
                <div className="theme-card sticky top-24">
                     <div className="flex items-center mb-6">
                        <LightBulbIcon className="w-8 h-8 text-amber-500 mr-3"/>
                        <h3 className="text-2xl font-bold text-slate-800">ข้อมูลเชิงลึกจาก AI</h3>
                    </div>
                    <div className="space-y-6">
                        <InsightSection title="ความถนัด" items={userProfile.aptitudes} color="blue" />
                        <InsightSection title="ความสนใจ" items={userProfile.interests} color="pink" />
                        <InsightSection title="สิ่งที่ชอบ" items={userProfile.likes} color="amber" />
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-10">
            <h3 className="text-3xl font-bold mb-6 text-center text-slate-800">เหรียญตราที่ได้รับ</h3>
            {userProfile.badges.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-4">
                    {userProfile.badges.map(badge => (
                        <div key={badge.id} className="bg-white/30 p-4 rounded-lg flex flex-col items-center justify-center border border-white/50 transform transition-transform hover:scale-105 hover:border-amber-400 w-32 text-center">
                            <span className="text-5xl mb-2">{badge.icon}</span>
                            <span className="text-sm font-semibold text-slate-700">{badge.name}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center p-8 bg-white/20 rounded-lg border border-dashed border-white/40">
                    <p className="text-slate-500">ยังไม่มีเหรียญตรา... เริ่มทำแบบทดสอบเพื่อสะสมเลย!</p>
                </div>
            )}
        </div>
        
        <div className="text-center mt-12">
            <button
              onClick={onBackToHome}
              className="theme-button-secondary inline-flex items-center gap-2"
            >
              <HomeIcon className="w-5 h-5" />
              กลับสู่หน้าหลัก
            </button>
      </div>
    </div>
  );
};

const InputField: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, name, value, onChange}) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input type="text" id={name} name={name} value={value} onChange={onChange} className="theme-input" />
    </div>
);

const SelectField: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: {value: string, label: string}[], disabled?: boolean, isBaseSelect?: boolean}> = ({label, name, value, onChange, options, disabled, isBaseSelect}) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <select id={name} name={name} value={value} onChange={onChange} disabled={disabled} className="theme-input">
            <option value="">{isBaseSelect ? 'เลือกระดับการศึกษา' : `เลือก${label}`}</option>
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);

const InsightSection: React.FC<{title: string, items?: string[], color: 'pink' | 'blue' | 'amber'}> = ({ title, items, color }) => {
    const colorClasses = {
      pink: 'bg-pink-100 text-pink-800',
      blue: 'bg-blue-100 text-blue-800',
      amber: 'bg-amber-100 text-amber-800'
    };
    
    if (!items || items.length === 0) {
        return (
            <div>
                <h4 className="font-bold text-lg text-slate-700 mb-2">{title}</h4>
                <p className="text-sm text-slate-500">ทำแบบทดสอบเพื่อดูข้อมูลส่วนนี้</p>
            </div>
        );
    }
    return (
         <div>
            <h4 className="font-bold text-lg text-slate-700 mb-2">{title}</h4>
            <div className="flex flex-wrap gap-2">
                {items.map((item, index) => (
                    <span key={index} className={`text-sm px-3 py-1 rounded-full font-medium ${colorClasses[color]}`}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;