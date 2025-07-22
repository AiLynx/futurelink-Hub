
import React, { useState, useCallback } from 'react';
import { UserProfile, QuizAnswers, AIRecommendations } from './types';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Quiz from './components/Quiz';
import ResultsPage from './components/ResultsPage';
import ProfilePage from './components/ProfilePage';
import { generateRecommendations } from './services/geminiService';
import LoadingSpinner from './components/LoadingSpinner';
import { POINTS_PER_QUIZ, POINTS_PER_LEVEL } from './constants';

type View = 'home' | 'quiz' | 'results' | 'profile';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'นักสำรวจอนาคต',
    level: 1,
    points: 0,
    avatar: '👩‍🚀',
    badges: [],
    firstName: '',
    lastName: '',
    nickname: '',
    birthDate: '',
    educationLevel: '',
    educationYear: '',
    aptitudes: [],
    interests: [],
    likes: [],
  });
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [recommendations, setRecommendations] = useState<AIRecommendations | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = () => {
    setView('quiz');
  };

  const handleQuizCompletion = useCallback(async (answers: QuizAnswers) => {
    setIsLoading(true);
    setError(null);
    setQuizAnswers(answers);
    try {
      const result = await generateRecommendations(answers);
      setRecommendations(result);
      setUserProfile(prev => {
        const newPoints = prev.points + POINTS_PER_QUIZ;
        const newLevel = Math.floor(newPoints / POINTS_PER_LEVEL) + 1;
        
        const hasBadge = prev.badges.some(b => b.name === 'นักค้นหาเส้นทาง');
        const newBadges = hasBadge ? prev.badges : [...prev.badges, { id: `b${Date.now()}`, name: 'นักค้นหาเส้นทาง', icon: '🧭' }];

        return {
            ...prev,
            points: newPoints,
            level: newLevel,
            badges: newBadges,
            aptitudes: result.userInsights.aptitudes,
            interests: result.userInsights.interests,
            likes: result.userInsights.likes,
        };
      });
      setView('results');
    } catch (err) {
      console.error("Error getting recommendations:", err);
      setError('เกิดข้อผิดพลาดในการสร้างคำแนะนำ โปรดลองอีกครั้งในภายหลัง');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleProfileUpdate = (updatedData: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updatedData }));
  };

  const restart = () => {
    setView('home');
    setQuizAnswers(null);
    setRecommendations(null);
    setError(null);
  }

  const goHome = () => setView('home');
  const showProfile = () => setView('profile');

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner message="AI กำลังวิเคราะห์ข้อมูลของคุณ..." />;
    }

    if (error) {
       return (
        <div className="text-center p-8">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <button
            onClick={restart}
            className="theme-button-secondary"
          >
            กลับสู่หน้าหลัก
          </button>
        </div>
      );
    }
    
    switch (view) {
      case 'profile':
        return <ProfilePage userProfile={userProfile} onBackToHome={goHome} onUpdateProfile={handleProfileUpdate} />;
      case 'quiz':
        return <Quiz onComplete={handleQuizCompletion} />;
      case 'results':
        if (quizAnswers && recommendations) {
            return <ResultsPage answers={quizAnswers} recommendations={recommendations} onRestart={restart} />;
        }
        return null;
      case 'home':
      default:
        return <HomePage onStartQuiz={startQuiz} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header userProfile={userProfile} onProfileClick={showProfile} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-slate-600 text-sm">
        <p>สร้างสรรค์โดย FutureLink Hub &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;