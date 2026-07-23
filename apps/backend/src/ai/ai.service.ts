import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService as PrismaService } from '../database/database.service';
import { Observable } from 'rxjs';

@Injectable()
export class AiService {
  constructor(private readonly prisma: PrismaService) {}

  async getConversations(userId: string) {
    return this.prisma.aiConversation.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getConversation(userId: string, id: string) {
    const conversation = await this.prisma.aiConversation.findUnique({
      where: { id, userId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }

  async createConversation(userId: string, title: string, agentType: string) {
    return this.prisma.aiConversation.create({
      data: {
        userId,
        title,
        agentType,
        messages: {
          create: [
            {
              role: 'SYSTEM',
              content: this.getSystemPromptForAgent(agentType),
            },
          ],
        },
      },
    });
  }

  async addMessage(conversationId: string, role: string, content: string) {
    return this.prisma.aiMessage.create({
      data: {
        conversationId,
        role,
        content,
      },
    });
  }

  // A mock generator for Server-Sent Events (SSE) that simulates an LLM streaming response
  streamMockAiResponse(prompt: string, agentType: string): Observable<{ data: { chunk: string; isDone: boolean } }> {
    return new Observable((subscriber) => {
      let isCancelled = false;

      const run = async () => {
        if (process.env.OPENAI_API_KEY) {
          // Future: Implement actual OpenAI stream processing here
          // For now, gracefully fall back to mock data
        }

        // Simulated network delay
        await new Promise((resolve) => setTimeout(resolve, 600));
        
        const responseText = this.generateMockResponseText(prompt, agentType);
        const chunks = responseText.split(' ');

        for (let i = 0; i < chunks.length; i++) {
          if (isCancelled) break;
          
          subscriber.next({
            data: { chunk: chunks[i] + (i === chunks.length - 1 ? '' : ' '), isDone: false },
          });

          // Simulate variable streaming speed (20ms to 80ms per word)
          await new Promise((resolve) => setTimeout(resolve, Math.random() * 60 + 20));
        }

        if (!isCancelled) {
          subscriber.next({ data: { chunk: '', isDone: true } });
          subscriber.complete();
        }
      };

      run();

      return () => {
        isCancelled = true;
      };
    });
  }

  private getSystemPromptForAgent(agentType: string): string {
    switch (agentType) {
      case 'MARKET_ANALYST':
        return 'You are an elite Market Analyst. Focus on technical analysis, macro trends, and data-driven insights. Be concise, professional, and highlight risks.';
      case 'LEARNING_COACH':
        return 'You are a supportive Financial Learning Coach. Explain complex financial concepts simply using analogies. Encourage the user and check for understanding.';
      case 'GENERAL':
      default:
        return 'You are TradeOXX AI, an advanced financial operating system. You are helpful, professional, and knowledgeable about all aspects of finance.';
    }
  }

  private generateMockResponseText(prompt: string, agentType: string): string {
    const lowercasePrompt = prompt.toLowerCase();
    
    if (lowercasePrompt.includes('rsi') || lowercasePrompt.includes('macd')) {
      return `### Technical Indicator Explanation\n\nSure, I can explain that.\n\n**RSI (Relative Strength Index)** is a momentum oscillator that measures the speed and change of price movements. It oscillates between zero and 100.\n\n*   **Overbought:** Typically considered above 70.\n*   **Oversold:** Typically considered below 30.\n\nHere is a simple python snippet to calculate it:\n\n\`\`\`python\ndef calculate_rsi(prices, period=14):\n    # Calculation logic here\n    pass\n\`\`\`\n\n> **Note:** Always use RSI in conjunction with other indicators like MACD or Volume for confirmation.`;
    }

    if (lowercasePrompt.includes('portfolio') || lowercasePrompt.includes('allocation')) {
      return `Based on standard modern portfolio theory, a typical balanced allocation might look like this:\n\n| Asset Class | Target Allocation | Risk Level |\n| :--- | :--- | :--- |\n| Large Cap Equities | 40% | Moderate |\n| Bonds/Fixed Income | 30% | Low |\n| Tech / Growth | 20% | High |\n| Cash/Equivalents | 10% | Lowest |\n\n*Disclaimer: This is educational and not financial advice.*`;
    }

    return `I am currently operating in **V1.0 Mock Mode**. To process complex requests like "${prompt}", the backend needs to be connected to a live LLM API (e.g., OpenAI or Gemini). \n\nHowever, you can see that my markdown rendering, streaming capabilities, and UI components are fully operational!`;
  }
}
