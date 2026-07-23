import { Injectable, ConflictException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async findByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  async findById(id: string) {
    return this.db.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async create(data: any) {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    return this.db.user.create({
      data: {
        email: data.email,
        passwordHash,
        profile: {
          create: {
            displayName: data.displayName || data.email.split('@')[0],
          },
        },
      },
      include: {
        profile: true,
      },
    });
  }
}
