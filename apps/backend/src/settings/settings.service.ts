import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: DatabaseService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: { user: { select: { email: true } } }
    });
    
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async updateProfile(userId: string, data: any) {
    return this.prisma.profile.update({
      where: { userId },
      data
    });
  }
}
