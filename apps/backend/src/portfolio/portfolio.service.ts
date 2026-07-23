import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PortfolioService {
  constructor(private prisma: DatabaseService) {}

  async getPortfolios(userId: string) {
    return this.prisma.portfolio.findMany({
      where: { userId, isArchive: false },
      include: {
        holdings: true,
      },
    });
  }

  async getPortfolioById(userId: string, portfolioId: string) {
    const portfolio = await this.prisma.portfolio.findFirst({
      where: { id: portfolioId, userId },
      include: {
        holdings: {
          include: {
            transactions: true,
          }
        },
      },
    });

    if (!portfolio) throw new NotFoundException('Portfolio not found');
    return portfolio;
  }

  async createPortfolio(userId: string, name: string, currency: string = 'USD') {
    return this.prisma.portfolio.create({
      data: {
        userId,
        name,
        currency,
      },
    });
  }

  // Basic mock calculation helper for V1.0 to feed the frontend charts
  async getPortfolioSummary(userId: string, portfolioId: string) {
    const portfolio = await this.getPortfolioById(userId, portfolioId);
    
    // In a real app, this would query current market prices.
    // For V1.0, we generate realistic mock data based on the holdings.
    let totalValue = 0;
    let totalCost = 0;
    
    const enhancedHoldings = portfolio.holdings.map(h => {
      // Mock current price (roughly around average cost + random walk)
      const currentPrice = h.averageCost === 0 ? 100 : h.averageCost * (1 + (Math.random() * 0.4 - 0.1)); 
      const marketValue = h.quantity * currentPrice;
      const costBasis = h.quantity * h.averageCost;
      const gainLoss = marketValue - costBasis;
      const gainLossPercent = costBasis > 0 ? (gainLoss / costBasis) * 100 : 0;

      totalValue += marketValue;
      totalCost += costBasis;

      return {
        ...h,
        currentPrice,
        marketValue,
        gainLoss,
        gainLossPercent
      };
    });

    const totalUnrealizedGain = totalValue - totalCost;
    const todayChange = totalValue * (Math.random() * 0.04 - 0.02); // Mock daily change

    return {
      portfolio,
      summary: {
        totalValue,
        todayChange,
        todayChangePercent: (todayChange / totalValue) * 100,
        totalUnrealizedGain,
        totalReturnPercent: totalCost > 0 ? (totalUnrealizedGain / totalCost) * 100 : 0,
      },
      holdings: enhancedHoldings.map(h => ({
        ...h,
        allocation: totalValue > 0 ? (h.marketValue / totalValue) * 100 : 0
      }))
    };
  }
}
