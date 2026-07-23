import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MarketService {
  private readonly logger = new Logger(MarketService.name);
  
  // Algorithmic generation of mock OHLCV data for realistic chart testing in V1.0
  getHistoricalData(symbol: string, timeframe: string = '1D', points: number = 100) {
    if (process.env.POLYGON_API_KEY) {
      this.logger.debug(`Fetching live data for ${symbol} from Polygon.io...`);
      // Future: Implement actual axios call to Polygon.io here
      // For now, gracefully fall back to mock data
    } else {
      this.logger.debug(`No POLYGON_API_KEY found. Generating mock data for ${symbol}.`);
    }

    const data = [];
    let currentPrice = this.getBasePriceForSymbol(symbol);
    
    // Set a date in the past to start from
    const date = new Date();
    date.setDate(date.getDate() - points);

    for (let i = 0; i < points; i++) {
      // Random walk volatility
      const volatility = currentPrice * 0.02; 
      
      const open = currentPrice;
      const close = open + (Math.random() - 0.48) * volatility; // slight upward bias
      
      // Ensure high and low encompass open and close
      const high = Math.max(open, close) + Math.random() * (volatility * 0.5);
      const low = Math.min(open, close) - Math.random() * (volatility * 0.5);
      
      const volume = Math.floor(Math.random() * 1000000) + 500000;

      data.push({
        time: date.toISOString().split('T')[0], // format: YYYY-MM-DD
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
        value: Number(close.toFixed(2)), // For line charts
        volume
      });

      currentPrice = close;
      date.setDate(date.getDate() + 1);
    }

    return data;
  }

  private getBasePriceForSymbol(symbol: string): number {
    const bases: Record<string, number> = {
      'AAPL': 150,
      'MSFT': 380,
      'TSLA': 200,
      'NVDA': 800,
      'BTC': 60000,
      'ETH': 3000,
    };
    return bases[symbol.toUpperCase()] || 100;
  }

  getMarketOverview() {
    return {
      indices: [
        { name: 'S&P 500', value: 5123.40, change: 1.2 },
        { name: 'NASDAQ', value: 16234.10, change: 1.5 },
        { name: 'DOW JONES', value: 39120.50, change: 0.8 },
      ],
      topGainers: [
        { symbol: 'NVDA', price: 825.10, change: 4.2 },
        { symbol: 'AMD', price: 180.20, change: 3.8 },
      ],
      topLosers: [
        { symbol: 'TSLA', price: 175.40, change: -2.1 },
        { symbol: 'BA', price: 190.10, change: -1.8 },
      ]
    };
  }
}
