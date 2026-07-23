import { create } from 'zustand';
import api from '@/lib/api';

export interface Lesson {
  id: string;
  title: string;
  readTime: string;
  content: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface Course {
  id: string;
  title: string;
  difficulty: string;
  estimatedTime: string;
  lessons: Lesson[];
  progress: number;
}

interface LearningState {
  curriculum: Course[];
  isLoading: boolean;
  error: string | null;
  fetchCurriculum: () => Promise<void>;
  markLessonProgress: (lessonId: string, status: string) => Promise<void>;
}

export const useLearningStore = create<LearningState>((set, get) => ({
  curriculum: [],
  isLoading: false,
  error: null,

  fetchCurriculum: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/learning/curriculum');
      set({ curriculum: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to load curriculum', isLoading: false });
    }
  },

  markLessonProgress: async (lessonId: string, status: string) => {
    try {
      await api.post(`/learning/lessons/${lessonId}/progress`, { status });
      // Optimistic update
      const { curriculum } = get();
      const updatedCurriculum = curriculum.map(course => {
        let completedLessons = 0;
        const updatedLessons = course.lessons.map(lesson => {
          const newStatus = lesson.id === lessonId ? (status as any) : lesson.status;
          if (newStatus === 'COMPLETED') completedLessons++;
          return { ...lesson, status: newStatus };
        });
        return {
          ...course,
          lessons: updatedLessons,
          progress: Math.round((completedLessons / course.lessons.length) * 100)
        };
      });
      set({ curriculum: updatedCurriculum });
    } catch (error) {
      console.error('Failed to update progress', error);
    }
  }
}));
