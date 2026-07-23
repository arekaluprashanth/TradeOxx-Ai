import { Injectable } from '@nestjs/common';
import { DatabaseService as PrismaService } from '../database/database.service';

@Injectable()
export class LearningService {
  constructor(private readonly prisma: PrismaService) {}

  // V1.0 Mock Curriculum embedded in the backend
  private curriculum = [
    {
      id: 'course_1',
      title: 'Beginner Stock Market',
      difficulty: 'Beginner',
      estimatedTime: '2h 30m',
      lessons: [
        {
          id: 'lesson_1_1',
          title: 'What is a Stock?',
          readTime: '5 min',
          content: '### The Basics\n\nA stock represents partial ownership in a company. When you buy a share of stock, you are buying a tiny slice of that business.\n\n#### Why do companies issue stock?\nCompanies issue stock to raise money to fund their operations, expand into new markets, or pay off debt.\n\n> **Key Takeaway**: Buying a stock means you are an owner, not a lender. If the company grows, the value of your slice grows.'
        },
        {
          id: 'lesson_1_2',
          title: 'How the Market Works',
          readTime: '8 min',
          content: '### The Auction House\n\nThe stock market functions like an auction. Buyers bid for shares, and sellers ask for a specific price.\n\nWhen a bid (buyer) and an ask (seller) match, a trade is executed. \n\n*   **Bull Market**: A period where prices are rising, and sentiment is optimistic.\n*   **Bear Market**: A period where prices are falling (usually 20% or more), and sentiment is pessimistic.'
        }
      ]
    },
    {
      id: 'course_2',
      title: 'Technical Analysis Masterclass',
      difficulty: 'Advanced',
      estimatedTime: '4h 15m',
      lessons: [
        {
          id: 'lesson_2_1',
          title: 'Support and Resistance',
          readTime: '10 min',
          content: '### The Invisible Floors and Ceilings\n\nSupport and Resistance are foundational concepts in technical analysis.\n\n*   **Support**: A price level where a downtrend tends to pause due to a concentration of demand (buying interest).\n*   **Resistance**: A price level where an uptrend tends to pause due to a concentration of supply (selling interest).'
        }
      ]
    }
  ];

  async getCurriculum(userId: string) {
    // Fetch user progress and merge it into the curriculum
    const progress = await this.prisma.lessonProgress.findMany({
      where: { userId }
    });

    const progressMap = progress.reduce((acc: any, curr: any) => {
      acc[curr.lessonId] = curr.status;
      return acc;
    }, {} as Record<string, string>);

    return this.curriculum.map(course => {
      let completedLessons = 0;
      const mappedLessons = course.lessons.map(lesson => {
        const status = progressMap[lesson.id] || 'NOT_STARTED';
        if (status === 'COMPLETED') completedLessons++;
        return { ...lesson, status };
      });
      return {
        ...course,
        lessons: mappedLessons,
        progress: Math.round((completedLessons / course.lessons.length) * 100)
      };
    });
  }

  async getLesson(lessonId: string) {
    for (const course of this.curriculum) {
      const lesson = course.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
    return null;
  }

  async markLessonProgress(userId: string, lessonId: string, status: string) {
    return this.prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { status },
      create: { userId, lessonId, status }
    });
  }
}
