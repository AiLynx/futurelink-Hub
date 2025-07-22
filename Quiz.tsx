
import React, { useState, useMemo } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import type { QuizQuestion, QuizAnswers, QuestionOption } from '../types';

interface QuizProps {
  onComplete: (answers: QuizAnswers) => void;
}

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="w-full bg-pink-100 rounded-full h-2.5 mb-8">
      <div
        className="bg-gradient-to-r from-pink-400 to-amber-400 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [openEndedAnswer, setOpenEndedAnswer] = useState('');

  const currentQuestion = useMemo(() => QUIZ_QUESTIONS[currentQuestionIndex], [currentQuestionIndex]);
  const totalQuestions = QUIZ_QUESTIONS.length;
  
  const handleSelectOption = (optionValue: string) => {
    const newAnswers = { ...answers, [currentQuestion.key]: optionValue };
    setAnswers(newAnswers);
    goToNext(newAnswers);
  };

  const handleOpenEndedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (openEndedAnswer.trim()) {
      const newAnswers = { ...answers, [currentQuestion.key]: openEndedAnswer.trim() };
      setAnswers(newAnswers);
      goToNext(newAnswers);
    }
  };
  
  const goToNext = (currentAnswers: Partial<QuizAnswers>) => {
     if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setOpenEndedAnswer('');
    } else {
      onComplete(currentAnswers as QuizAnswers);
    }
  }

  const renderQuestionType = (question: QuizQuestion) => {
    switch (question.type) {
      case 'multiple-choice-image':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options?.map((option: QuestionOption) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option.value)}
                className="relative group rounded-lg overflow-hidden border-2 border-transparent hover:border-pink-400 focus:border-pink-400 transition-all duration-300 outline-none"
              >
                <img src={option.image} alt={option.label} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-xl font-semibold p-2 bg-black/30 rounded">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        );
      case 'multiple-choice-text':
        return (
          <div className="flex flex-col space-y-3">
            {question.options?.map((option: QuestionOption) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option.value)}
                className="w-full text-left p-4 bg-white/30 rounded-lg border border-white/40 hover:bg-white/50 hover:border-pink-400 transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        );
      case 'open-ended':
        return (
          <form onSubmit={handleOpenEndedSubmit}>
            <textarea
              value={openEndedAnswer}
              onChange={(e) => setOpenEndedAnswer(e.target.value)}
              className="theme-input h-40 resize-none"
              placeholder="ลองเล่าความคิดของคุณ..."
            ></textarea>
            <button
              type="submit"
              disabled={!openEndedAnswer.trim()}
              className="mt-4 theme-button-primary"
            >
              ส่งคำตอบ
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 theme-card animate-fade-in">
      <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-slate-800">
        {currentQuestion.prompt}
      </h3>
      <div>
        {renderQuestionType(currentQuestion)}
      </div>
    </div>
  );
};

export default Quiz;