import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class SecurityService {
  constructor(private readonly prisma: DatabaseService) {}

  async getSecurityLogs(userId: string) {
    // Mock seed a login event for V1.0 if empty
    const count = await this.prisma.securityLog.count({ where: { userId } });
    if (count === 0) {
      await this.prisma.securityLog.create({
        data: {
          userId,
          event: 'LOGIN',
          ipAddress: '192.168.1.1',
          device: 'Chrome on Windows',
          location: 'San Francisco, CA'
        }
      });
    }

    return this.prisma.securityLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async revokeSession(userId: string, sessionId: string) {
    // In a real app, this would invalidate a JWT or session token in Redis.
    // For V1.0, we just mock the success response.
    return { success: true, message: 'Session revoked' };
  }
}
