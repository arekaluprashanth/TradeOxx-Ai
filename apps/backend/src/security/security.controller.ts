import { Controller, Get, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { SecurityService } from './security.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('security')
@UseGuards(JwtAuthGuard)
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Get('logs')
  getSecurityLogs(@Request() req: any) {
    return this.securityService.getSecurityLogs(req.user.userId);
  }

  @Delete('sessions/:id')
  revokeSession(@Request() req: any, @Param('id') id: string) {
    return this.securityService.revokeSession(req.user.userId, id);
  }
}
