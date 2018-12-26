import { FeedbackDTO } from './../models/user/feedback.dto';
import { Controller, Get, UseGuards, HttpService, Inject, Query, Post, Body, BadRequestException } from '@nestjs/common';
import { FeedbackService } from './feedbacks.service';
import { Feedbacklog } from 'src/data/entities/feedbacklog.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('feedbacks')
export class FeedbacksController {

  constructor(private readonly feedbackRepository: FeedbackService) { }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Query() QParams): Promise<Feedbacklog | Feedbacklog[]> {
    // if (QParams.feedbackid){
    //   console.log(QParams.feedbackid);
    //   return this.feedbackRepository.findOne(QParams.feedbackid);
    // }
    return this.feedbackRepository.findAll();
  }

  @Post('/new')
  addFeedback(@Body() body: FeedbackDTO) {
    if (body.receiver !== body.sender) {
      return this.feedbackRepository.addNew(body);
    } else {
      throw new BadRequestException('Username is dublicate.');
    }
  }
}
