import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { MarketService } from './market.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('markets')
@UseGuards(JwtAuthGuard)
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('overview')
  getOverview() {
    return this.marketService.getMarketOverview();
  }

  @Get(':symbol/history')
  getHistory(
    @Param('symbol') symbol: string,
    @Query('timeframe') timeframe: string = '1D',
    @Query('points') points: string = '100'
  ) {
    return this.marketService.getHistoricalData(symbol, timeframe, parseInt(points, 10));
  }
}
