
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import type { QuizAnswers, AIRecommendations } from '../types';
import { BriefcaseIcon, AcademicCapIcon, SparklesIcon, RefreshIcon } from './icons/Icons';
import Badge from './Badge';

interface ResultsPageProps {
  answers: QuizAnswers;
  recommendations: AIRecommendations;
  onRestart: () => void;
}

const COLORS = ['#F472B6', '#60A5FA', '#FBBF24', '#34D399'];

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className }) => (
  <div className={`theme-card ${className}`}>
    <div className="flex items-center mb-4">
      <div className="mr-3">{icon}</div>
      <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
    </div>
    {children}
  </div>
);

const ResultsPage: React.FC<ResultsPageProps> = ({ answers, recommendations, onRestart }) => {
  const chartData = Object.entries(answers)
    .filter(([key]) => key !== 'passion')
    .map(([key, value]) => ({ name: key, value: value }));

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center p-8 theme-card">
        <h2 className="text-4xl font-extrabold mb-3 theme-text-gradient">
          ผลการวิเคราะห์ของคุณ
        </h2>
        <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-6">
          {recommendations.summary}
        </p>
        <div className="flex justify-center items-center gap-4">
          <Badge name="นักค้นหาเส้นทาง" icon="🧭" />
          <span className="text-green-600 font-bold">+100 คะแนน!</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Career Suggestions */}
        <SectionCard title="อาชีพที่แนะนำ" icon={<BriefcaseIcon className="w-8 h-8 text-pink-500"/>}>
          <div className="space-y-4">
            {recommendations.careerSuggestions.map((career, index) => (
              <div key={index} className="bg-white/30 p-4 rounded-lg">
                <h4 className="font-bold text-lg text-pink-700">{career.name}</h4>
                <p className="text-sm text-slate-600 mb-2">{career.description}</p>
                <div className="flex flex-wrap gap-2">
                  {career.requiredSkills.map(skill => <span key={skill} className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full font-medium">{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Education Suggestions */}
        <SectionCard title="คณะ/สาขาที่น่าสนใจ" icon={<AcademicCapIcon className="w-8 h-8 text-blue-500"/>}>
          <div className="space-y-4">
            {recommendations.educationSuggestions.map((edu, index) => (
              <div key={index} className="bg-white/30 p-4 rounded-lg">
                <h4 className="font-bold text-lg text-blue-700">{edu.major}</h4>
                <p className="text-sm text-slate-600 mb-2">{edu.description}</p>
                 <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-semibold mr-1 text-slate-700">อาชีพเกี่ยวข้อง:</span>
                  {edu.relatedCareers.map(career => <span key={career} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">{career}</span>)}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Activity Suggestions */}
        <SectionCard title="กิจกรรมเสริมทักษะ" icon={<SparklesIcon className="w-8 h-8 text-amber-500"/>}>
          <div className="space-y-4">
            {recommendations.activitySuggestions.map((activity, index) => (
              <div key={index} className="bg-white/30 p-4 rounded-lg">
                <h4 className="font-bold text-lg text-amber-700">{activity.name}</h4>
                <p className="text-xs text-slate-500 mb-1">{activity.type}</p>
                <p className="text-sm text-slate-600">{activity.description}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

       <div className="text-center mt-12">
        <button
          onClick={onRestart}
          className="theme-button-secondary inline-flex items-center gap-2"
        >
          <RefreshIcon className="w-5 h-5" />
          ทำแบบทดสอบอีกครั้ง
        </button>
      </div>

    </div>
  );
};

export default ResultsPage;