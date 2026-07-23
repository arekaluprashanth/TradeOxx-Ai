import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsService {
  
  getDailyNews() {
    return [
      {
        id: 'news_1',
        title: 'Tech Stocks Rally on AI Optimism',
        summary: 'Major technology companies saw significant gains today as new AI models demonstrate unexpected reasoning capabilities, driving up hardware demand.',
        source: 'TradeOXX Intelligence',
        date: new Date().toISOString(),
        tags: ['Technology', 'AI', 'Equities'],
        sentiment: 'BULLISH'
      },
      {
        id: 'news_2',
        title: 'Fed Signals Potential Rate Hold',
        summary: 'In recent comments, Federal Reserve officials hinted that interest rates may remain steady through the next quarter as inflation metrics show signs of cooling.',
        source: 'Macro Watch',
        date: new Date().toISOString(),
        tags: ['Macro', 'Interest Rates', 'Bonds'],
        sentiment: 'NEUTRAL'
      },
      {
        id: 'news_3',
        title: 'Crypto Markets Stabilize Post-Halving',
        summary: 'Following the highly anticipated Bitcoin halving event, market volatility has compressed, with major assets trading in a tight range as miners adjust to new block rewards.',
        source: 'Crypto Insider',
        date: new Date().toISOString(),
        tags: ['Crypto', 'Bitcoin', 'Blockchain'],
        sentiment: 'NEUTRAL'
      }
    ];
  }
}
