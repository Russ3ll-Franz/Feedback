import { Module } from '@nestjs/common';
import { FeedbackServiceService } from '../src/feedback-service/feedback-service.service';
import { FeedbackServiceController } from '../src/feedback-service/feedback-service.controller';

@Module({
  providers: [FeedbackServiceService],
  controllers: [FeedbackServiceController]
})
export class FeedbacksModule {}
