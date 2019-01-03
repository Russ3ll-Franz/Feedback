import { FeedbackDTO } from './../models/user/feedback.dto';
import { Controller, Get, UseGuards, HttpService, Inject, Request , Query, Post, Body, BadRequestException, Headers } from '@nestjs/common';
import { FeedbackService } from './feedbacks.service';
import { Feedbacklog } from 'src/data/entities/feedbacklog.entity';
import { AuthGuard } from '@nestjs/passport';
import { TokenDTO } from 'src/models/token-from-header-dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles/roles.guard';
import { Users } from 'src/data/entities/users.entity';

@Controller('feedbacks')
export class FeedbacksController {

  constructor(private readonly feedbackService: FeedbackService) { }

  @Get()

  @Roles('Team Lead', 'Admin', 'User')
  @UseGuards(AuthGuard(), RolesGuard)
  async findFeedbacks(@Query() QParams, @Request() req) {
    if (QParams.id) {
      const feedback = await this.feedbackService.findOne(+QParams.id);
      const sender = await feedback.sender;
      const reciever = await feedback.receiver;
      if (sender.userID === req.user.userID || req.user.userID === reciever.userID){
        return {
          Sender: sender.email,
          Reciever: reciever.email,
          Feedback: feedback.feedback,
        };
      }
      return `You can not view this feedback because it's not sent to you or you aren't the sender!`;
    }
    else{
      return 'Sorry we were unable to find any feedbacks with the parameters you gave us, if you want you can use ?all to find all teams!';
    }

  }

  @Get('/all')

  @Roles('Team Lead', 'Admin')
  @UseGuards(AuthGuard(), RolesGuard)
  async findAllFeedbacks(){
    const feedbacks: Feedbacklog[] = await this.feedbackService.findAll();
    return await Promise.all(feedbacks.map(async (feedback) => {
      const sender = await feedback.sender;
      const reciever = await feedback.receiver;
      return { id: feedback.feedbacklogID,
        Feedback: feedback.feedback,
        Sender: sender.email,
        Reciever: reciever.email,
      }
    }));
  }

  @Post('/new')

  @Roles('Team Lead', 'Admin', 'User')
  @UseGuards(AuthGuard(), RolesGuard)
  async addFeedback(@Body() body: FeedbackDTO, @Request() req) {
    return await this.feedbackService.addNew(body, req.user);
  }
}
