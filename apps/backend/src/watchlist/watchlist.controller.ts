import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('watchlists')
@UseGuards(JwtAuthGuard)
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Get()
  async getWatchlists(@Request() req: any) {
    return this.watchlistService.getWatchlists(req.user.userId);
  }

  @Post()
  async createWatchlist(@Request() req: any, @Body() body: { name: string }) {
    return this.watchlistService.createWatchlist(req.user.userId, body.name);
  }

  @Post(':id/items')
  async addWatchlistItem(
    @Request() req: any, 
    @Param('id') id: string, 
    @Body() body: { symbol: string, assetType: string }
  ) {
    return this.watchlistService.addWatchlistItem(req.user.userId, id, body.symbol, body.assetType);
  }
}
