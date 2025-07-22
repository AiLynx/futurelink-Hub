
import React from 'react';
import { RocketIcon, BrainCircuitIcon, GamepadIcon } from './icons/Icons';

interface HomePageProps {
  onStartQuiz: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="theme-card transform hover:scale-105 hover:border-pink-400/80 transition-all duration-300 text-left">
    <div className="flex items-center justify-center w-12 h-12 bg-pink-500/10 rounded-full mb-4 border border-pink-500/30">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ onStartQuiz }) => {
  return (
    <div className="text-center py-16 animate-fade-in">
      <h2 className="text-5xl md:text-6xl font-extrabold mb-4 theme-text-gradient">
        ปลดล็อกศักยภาพในตัวคุณ
      </h2>
      <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-10">
        FutureLink Hub คือพื้นที่สำรวจอนาคตส่วนตัวของคุณ ค้นหาความถนัด ค้นพบอาชีพที่ใช่ และวางแผนเส้นทางการเรียนรู้ผ่านกิจกรรมและคำแนะนำจาก AI ที่สร้างมาเพื่อคุณโดยเฉพาะ
      </p>
      <button
        onClick={onStartQuiz}
        className="theme-button-primary text-lg"
      >
        🚀 เริ่มการสำรวจ
      </button>

      <div className="mt-24 max-w-5xl mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-center text-slate-800">ฟังก์ชันเด่นของเรา</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<RocketIcon className="w-7 h-7 text-pink-500" />}
            title="สำรวจตนเอง (Self-Exploration)"
            description="ทำแบบทดสอบและกิจกรรมสนุกๆ เพื่อค้นหาความสนใจและความถนัดที่ซ่อนอยู่ในตัวคุณ"
          />
          <FeatureCard
            icon={<BrainCircuitIcon className="w-7 h-7 text-pink-500" />}
            title="คำแนะนำจาก AI (AI-Powered)"
            description="รับคำแนะนำคณะ, อาชีพ, และคอร์สเรียนที่ตรงกับบุคลิกของคุณ จากการวิเคราะห์ของ AI"
          />
          <FeatureCard
            icon={<GamepadIcon className="w-7 h-7 text-pink-500" />}
            title="สนุกกับการเรียนรู้ (Gamification)"
            description="สะสมคะแนน, เลื่อนระดับ, และรับเหรียญตราในทุกๆ ก้าวของการเดินทางสำรวจอนาคตของคุณ"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;