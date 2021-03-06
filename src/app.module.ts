import { AdminPanelService } from './admin-panel/admin-panel.service';
import { ConfigService } from './config/config.service';
import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CoreModule } from './common/core/core.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { FeedbacksController } from './feedbacks/feedbacks.controller';
import { FeedbackService } from './feedbacks/feedbacks.service';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsModule } from './projects/projects.module';
import { ProjectsService } from './projects/projects.service';
import { AdminPanelController } from './admin-panel/admin-panel.controller';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.dbType as any,
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUsername,
        password: configService.dbPassword,
        database: configService.dbName,
        entities: ['./src/data/entities/*.entity.ts'],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    CoreModule,
    FeedbacksModule,
    ProjectsModule,
    AdminPanelModule,
  ],
  controllers: [FeedbacksController, ProjectsController, AdminPanelController],
  providers: [FeedbackService, ProjectsService, AdminPanelService],
})
export class AppModule { }
