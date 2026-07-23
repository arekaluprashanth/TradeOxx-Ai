import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { LearningService } from './learning.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('learning')
@UseGuards(JwtAuthGuard)
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @Get('curriculum')
  getCurriculum(@Request() req: any) {
    return this.learningService.getCurriculum(req.user.userId);
  }

  @Get('lessons/:id')
  getLesson(@Param('id') id: string) {
    return this.learningService.getLesson(id);
  }

  @Post('lessons/:id/progress')
  updateProgress(
    @Request() req: any,
    @Param('id') id: string,
    @Body('status') status: string
  ) {
    return this.learningService.markLessonProgress(req.user.userId, id, status);
  }
}
