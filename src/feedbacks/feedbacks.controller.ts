import { Controller, Get, UseGuards, HttpService, Inject } from '@nestjs/common';
import { FeedbackService } from './feedbacks.service';
import { Feedbacklog } from 'src/data/entities/feedbacklog.entity';

@Controller('feedbacks')
export class FeedbacksController {

  constructor(private readonly feedbackRepository: FeedbackService) {}

  @Get()
//   @UseGuards(AuthGuard())
  findAll(): Promise<Feedbacklog[]> {
    return this.feedbackRepository.findAll();
  }
}
