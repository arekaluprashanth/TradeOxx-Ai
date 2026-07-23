import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getReports(@Request() req: any) {
    return this.reportService.getReports(req.user.userId);
  }

  @Get(':id')
  getReport(@Request() req: any, @Param('id') id: string) {
    return this.reportService.getReport(req.user.userId, id);
  }

  @Post()
  createReport(
    @Request() req: any,
    @Body('title') title: string,
    @Body('type') type: string,
    @Body('tags') tags?: string
  ) {
    return this.reportService.createReport(req.user.userId, title, type, tags);
  }
}
