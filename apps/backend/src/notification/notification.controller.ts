import { Controller, Get, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getNotifications(@Request() req: any) {
    return this.notificationService.getNotifications(req.user.userId);
  }

  @Patch('read-all')
  markAllAsRead(@Request() req: any) {
    return this.notificationService.markAllAsRead(req.user.userId);
  }

  @Patch(':id/read')
  markAsRead(@Request() req: any, @Param('id') id: string) {
    return this.notificationService.markAsRead(req.user.userId, id);
  }
}
