import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class WatchlistService {
  constructor(private prisma: DatabaseService) {}

  async getWatchlists(userId: string) {
    return this.prisma.watchlist.findMany({
      where: { userId },
      include: {
        items: true,
      },
      orderBy: { isPinned: 'desc' },
    });
  }

  async createWatchlist(userId: string, name: string) {
    return this.prisma.watchlist.create({
      data: {
        userId,
        name,
      },
    });
  }

  async addWatchlistItem(userId: string, watchlistId: string, symbol: string, assetType: string) {
    // Verify ownership
    const watchlist = await this.prisma.watchlist.findFirst({
      where: { id: watchlistId, userId }
    });
    if (!watchlist) throw new NotFoundException('Watchlist not found');

    return this.prisma.watchlistItem.create({
      data: {
        watchlistId,
        symbol,
        assetType,
      }
    });
  }
}
