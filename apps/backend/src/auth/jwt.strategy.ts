import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'tradeoxx_super_secret_key_2026', // Use env in prod
    });
  }

  async validate(payload: any) {
    // This payload is the decoded JWT. We can fetch the latest user info from DB if needed
    const user = await this.usersService.findById(payload.sub);
    if (!user) return null;
    
    // Passport will attach this to req.user
    return { userId: payload.sub, email: payload.email, role: payload.role, profile: user.profile };
  }
}
