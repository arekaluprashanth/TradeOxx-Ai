import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: DatabaseService) {}

  async getNotifications(userId: string) {
    // Generate some mock unread notifications for V1.0 if none exist
    const count = await this.prisma.notification.count({ where: { userId } });
    if (count === 0) {
      await this.prisma.notification.createMany({
        data: [
          { userId, title: 'Welcome to TradeOXX AI', message: 'Your personalized AI trading assistant is ready.', type: 'SYSTEM' },
          { userId, title: 'Market Alert: TSLA', message: 'TSLA has crossed the $200 resistance level.', type: 'MARKET', link: '/dashboard/markets/TSLA' },
          { userId, title: 'AI Portfolio Analysis Complete', message: 'Your latest portfolio risk report has been generated.', type: 'AI', link: '/dashboard/reports' }
        ]
      });
    }

    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async markAsRead(userId: string, id: string) {
    return this.prisma.notification.updateMany({
      where: { id, userId },
      data: { isRead: true }
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true }
    });
  }
}
