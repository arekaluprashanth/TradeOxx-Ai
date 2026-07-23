import { Controller, Get, Post, Body, Param, Query, UseGuards, Request, Sse, MessageEvent } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Observable } from 'rxjs';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('conversations')
  getConversations(@Request() req: any) {
    return this.aiService.getConversations(req.user.userId);
  }

  @Get('conversations/:id')
  getConversation(@Request() req: any, @Param('id') id: string) {
    return this.aiService.getConversation(req.user.userId, id);
  }

  @Post('conversations')
  createConversation(
    @Request() req: any,
    @Body('title') title: string,
    @Body('agentType') agentType: string,
  ) {
    return this.aiService.createConversation(req.user.userId, title || 'New Conversation', agentType || 'GENERAL');
  }

  @Post('conversations/:id/messages')
  async addMessage(
    @Request() req: any,
    @Param('id') id: string,
    @Body('content') content: string,
    @Body('role') role: string,
  ) {
    // In a real app, verify the conversation belongs to the user first
    return this.aiService.addMessage(id, role, content);
  }

  @Sse('conversations/:id/stream')
  streamAiResponse(
    @Request() req: any,
    @Param('id') id: string,
    @Query('prompt') prompt: string,
    @Query('agentType') agentType: string,
  ): Observable<MessageEvent> {
    // This expects a GET or POST depending on how the frontend handles SSE. 
    // Usually SSE is strictly GET, but since we need to pass a prompt, 
    // we often pass it via query params or use a POST request with a custom reader.
    // For simplicity in NestJS @Sse, we might extract from query if it's a GET, 
    // but let's assume we can pass the last message ID and it fetches it.
    // For V1 mock, we just generate based on agentType.
    
    // NOTE: Standard EventSource only supports GET.
    return this.aiService.streamMockAiResponse(prompt || 'Hello', agentType || 'GENERAL') as any;
  }
}
