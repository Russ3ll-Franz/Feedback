import { FeedbackService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Feedbacklog } from 'src/data/entities/feedbacklog.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Feedbacklog]), AuthModule],
  providers: [FeedbackService],
  controllers: [FeedbacksController],
})
export class FeedbacksModule {}
