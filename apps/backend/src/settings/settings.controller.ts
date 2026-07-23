import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('profile')
  getProfile(@Request() req: any) {
    return this.settingsService.getProfile(req.user.userId);
  }

  @Patch('profile')
  updateProfile(@Request() req: any, @Body() data: any) {
    return this.settingsService.updateProfile(req.user.userId, data);
  }
}
