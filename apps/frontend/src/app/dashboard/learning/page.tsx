"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useLearningStore } from '@/store/useLearningStore';
import { Card, CardContent } from '@/components/ui/Card';
import { BookOpen, Clock, BarChart, ChevronRight } from 'lucide-react';

export default function LearningCenterPage() {
  const { curriculum, fetchCurriculum, isLoading } = useLearningStore();

  useEffect(() => {
    fetchCurriculum();
  }, [fetchCurriculum]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-black text-white tracking-tight">Learning Center</h1>
        <p className="text-brand-textMuted text-lg max-w-2xl">
          Master the financial markets with structured learning paths. From the basics of stocks to advanced technical analysis.
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {isLoading ? (
          <div className="col-span-2 text-center text-brand-textMuted p-12">Loading curriculum...</div>
        ) : (
          curriculum.map(course => (
            <Card key={course.id} className="bg-brand-surfaceElevated border-white/5 overflow-hidden flex flex-col">
              <div className="p-6 md:p-8 flex-1 flex flex-col gap-6">
                
                {/* Course Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md ${
                        course.difficulty === 'Beginner' ? 'bg-brand-success/20 text-brand-success' :
                        course.difficulty === 'Intermediate' ? 'bg-brand-warning/20 text-brand-warning' :
                        'bg-brand-danger/20 text-brand-danger'
                      }`}>
                        {course.difficulty}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-brand-textMuted">
                        <Clock size={14} /> {course.estimatedTime}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{course.title}</h2>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="text-brand-cyan" size={24} />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mt-auto">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-brand-textSecondary">Course Progress</span>
                    <span className="text-brand-cyan">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-brand-cyan h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Lesson List Preview */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  {course.lessons.map((lesson, idx) => (
                    <Link 
                      key={lesson.id} 
                      href={`/dashboard/learning/${lesson.id}`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          lesson.status === 'COMPLETED' ? 'bg-brand-success text-brand-bgPrimary' :
                          lesson.status === 'IN_PROGRESS' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' :
                          'bg-white/10 text-brand-textMuted'
                        }`}>
                          {idx + 1}
                        </div>
                        <span className={`text-sm font-medium ${
                          lesson.status === 'COMPLETED' ? 'text-brand-textSecondary' : 'text-white'
                        }`}>
                          {lesson.title}
                        </span>
                      </div>
                      <ChevronRight size={16} className="text-brand-textMuted group-hover:text-white transition-colors" />
                    </Link>
                  ))}
                </div>

              </div>
            </Card>
          ))
        )}
      </div>

    </div>
  );
}
