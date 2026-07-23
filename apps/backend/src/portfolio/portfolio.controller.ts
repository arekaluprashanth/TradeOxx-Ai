import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('portfolios')
@UseGuards(JwtAuthGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async getPortfolios(@Request() req: any) {
    return this.portfolioService.getPortfolios(req.user.userId);
  }

  @Post()
  async createPortfolio(@Request() req: any, @Body() body: { name: string, currency?: string }) {
    return this.portfolioService.createPortfolio(req.user.userId, body.name, body.currency);
  }

  @Get(':id/summary')
  async getPortfolioSummary(@Request() req: any, @Param('id') id: string) {
    return this.portfolioService.getPortfolioSummary(req.user.userId, id);
  }
}
