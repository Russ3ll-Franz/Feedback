import { FeedbackService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Feedbacklog } from 'src/data/entities/feedbacklog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feedbacklog])],
  providers: [FeedbackService],
  controllers: [FeedbacksController],
})
export class FeedbacksModule {}
