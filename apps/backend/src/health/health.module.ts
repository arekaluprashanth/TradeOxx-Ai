import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

import { TerminusModule } from '@nestjs/terminus';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [TerminusModule, DatabaseModule],
  controllers: [HealthController],
  providers: [HealthService]
})
export class HealthModule {}
