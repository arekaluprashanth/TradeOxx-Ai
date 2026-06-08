import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserIdFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { portfolios: true }
      });
      
      if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
      
      return NextResponse.json({
        walletBalance: user.walletBalance,
        holdings: user.portfolios
      });
    } catch (dbError) {
      // Vercel Prisma Edge/Read-only fallback
      if (userId === 'demo-user-123') {
        return NextResponse.json({
          walletBalance: 100000.0,
          holdings: [
            { id: '1', symbol: 'AAPL', quantity: 15, averagePrice: 150.20, currentPrice: 175.50 },
            { id: '2', symbol: 'MSFT', quantity: 10, averagePrice: 310.50, currentPrice: 338.10 },
            { id: '3', symbol: 'TSLA', quantity: 5, averagePrice: 205.10, currentPrice: 215.40 }
          ]
        });
      }
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  } catch (error) {
    console.error('Portfolio error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
