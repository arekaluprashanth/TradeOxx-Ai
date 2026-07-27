import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { DatabaseService } from '../database/database.service';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private db: DatabaseService,
    private mail: MailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        profile: user.profile,
      }
    };
  }

  async register(data: any) {
    // Automatically verify users on free tier because Render blocks SMTP outbound ports
    const user = await this.usersService.create({ ...data, isVerified: true });
    
    // Automatically log them in after registration
    return this.login(user);
  }

  private async generateAndSendVerificationToken(userId: string, email: string) {
    // Rate limit check
    const recentToken = await this.db.token.findFirst({
      where: { userId, type: 'VERIFY_EMAIL' },
      orderBy: { createdAt: 'desc' },
    });

    if (recentToken) {
      const diffMs = new Date().getTime() - recentToken.createdAt.getTime();
      if (diffMs < 60000) { // 60 seconds
        throw new BadRequestException('Please wait 60 seconds before requesting a new code.');
      }
    }

    // Secure OTP Generation
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15); // Valid for 15 mins

    // Hash the OTP
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Clear existing verification tokens for this user
    await this.db.token.deleteMany({
      where: { userId, type: 'VERIFY_EMAIL' },
    });

    // Save token hash to DB
    await this.db.token.create({
      data: {
        userId,
        token: hashedOtp, // Only store the hash
        type: 'VERIFY_EMAIL',
        expiresAt,
      },
    });

    // Send the plaintext token to the user
    await this.mail.sendVerificationEmail(email, otp);
  }

  async verifyEmail(email: string, token: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');

    const dbToken = await this.db.token.findFirst({
      where: {
        userId: user.id,
        type: 'VERIFY_EMAIL',
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!dbToken) {
      throw new BadRequestException('Invalid verification code');
    }

    if (new Date() > dbToken.expiresAt) {
      throw new BadRequestException('Verification code expired');
    }

    // Compare provided token with hashed token in DB
    const isMatch = await bcrypt.compare(token, dbToken.token);
    if (!isMatch) {
      throw new BadRequestException('Invalid verification code');
    }

    // Mark as verified
    await this.db.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });

    // Delete token
    await this.db.token.delete({ where: { id: dbToken.id } });

    // Generate JWT and return
    return this.login(await this.usersService.findByEmail(email));
  }

  async resendVerificationCode(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Don't throw error to prevent email enumeration, just return silently
      return { success: true };
    }
    
    if (user.isVerified) {
      throw new BadRequestException('User is already verified');
    }

    await this.generateAndSendVerificationToken(user.id, user.email);
    return { success: true, message: 'Verification code sent' };
  }
}

