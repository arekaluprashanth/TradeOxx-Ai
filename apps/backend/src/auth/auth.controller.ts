import { Controller, Post, Body, UnauthorizedException, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('verify')
  async verify(@Body() body: { email: string; code: string }) {
    if (!body.email || !body.code) {
      throw new UnauthorizedException('Email and code are required');
    }
    return this.authService.verifyEmail(body.email, body.code);
  }

  @Post('resend-code')
  async resendCode(@Body() body: { email: string }) {
    if (!body.email) {
      throw new UnauthorizedException('Email is required');
    }
    return this.authService.resendVerificationCode(body.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
