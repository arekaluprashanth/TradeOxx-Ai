"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLearningStore, Lesson } from '@/store/useLearningStore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '@/lib/api';
import { ChevronLeft, CheckCircle2, Bookmark, Share2 } from 'lucide-react';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const { markLessonProgress } = useLearningStore();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await api.get(`/learning/lessons/${id}`);
        setLesson(response.data);
        // Mark as in progress when opened
        markLessonProgress(id, 'IN_PROGRESS');
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLesson();
  }, [id, markLessonProgress]);

  const handleComplete = async () => {
    await markLessonProgress(id, 'COMPLETED');
    router.push('/dashboard/learning');
  };

  if (isLoading) {
    return <div className="p-8 text-brand-textMuted text-center">Loading lesson...</div>;
  }

  if (!lesson) {
    return <div className="p-8 text-brand-danger text-center">Lesson not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto w-full pb-24">
      
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 bg-brand-bgPrimary/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
        <Link 
          href="/dashboard/learning"
          className="flex items-center gap-2 text-brand-textMuted hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="font-medium hidden sm:inline">Back to Learning Center</span>
        </Link>
        <div className="flex gap-2">
          <button className="p-2 text-brand-textMuted hover:text-white bg-white/5 rounded-lg transition-colors">
            <Bookmark size={18} />
          </button>
          <button className="p-2 text-brand-textMuted hover:text-white bg-white/5 rounded-lg transition-colors">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 text-brand-cyan mb-4">
          <span className="text-xs font-bold uppercase tracking-wider bg-brand-cyan/10 px-3 py-1 rounded-full">
            LESSON
          </span>
          <span className="text-sm font-medium">{lesson.readTime} read</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-8">
          {lesson.title}
        </h1>
      </div>

      {/* Lesson Content (Markdown) */}
      <div className="p-8 pt-0 prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-brand-cyan prose-blockquote:border-l-brand-cyan prose-blockquote:bg-brand-cyan/5 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-brand-textSecondary">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {lesson.content}
        </ReactMarkdown>
      </div>

      {/* Bottom Completion Action */}
      <div className="mt-12 p-8 border-t border-white/5 flex flex-col items-center justify-center gap-6">
        <p className="text-brand-textMuted">Finished reading this lesson?</p>
        <button 
          onClick={handleComplete}
          className="flex items-center gap-2 px-8 py-4 bg-brand-success text-brand-bgPrimary font-bold rounded-2xl hover:bg-brand-success/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
        >
          <CheckCircle2 size={24} />
          Mark as Completed
        </button>
      </div>

    </div>
  );
}
