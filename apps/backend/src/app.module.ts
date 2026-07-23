import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { MarketModule } from './market/market.module';
import { AiModule } from './ai/ai.module';
import { LearningModule } from './learning/learning.module';
import { ReportModule } from './report/report.module';
import { NewsModule } from './news/news.module';
import { SettingsModule } from './settings/settings.module';
import { NotificationModule } from './notification/notification.module';
import { SecurityModule } from './security/security.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule } from './health/health.module';
import { AdminModule } from './admin/admin.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100, // 100 requests per minute
    }]),
    ScheduleModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthModule,
    PortfolioModule,
    WatchlistModule,
    MarketModule,
    AiModule,
    LearningModule,
    ReportModule,
    NewsModule,
    SettingsModule,
    NotificationModule,
    SecurityModule,
    HealthModule,
    AdminModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule {}
