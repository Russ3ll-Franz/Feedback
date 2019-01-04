import { FeedbackDTO } from './../models/user/feedback.dto';
import { Controller, Get, UseGuards, Request, Query, Post, Body } from '@nestjs/common';
import { FeedbackService } from './feedbacks.service';
import { Feedbacklog } from 'src/data/entities/feedbacklog.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles/roles.guard';

@Controller('feedbacks')
export class FeedbacksController {

  constructor(private readonly feedbackService: FeedbackService) { }

  @Get()

  @Roles('Team Lead', 'Admin', 'User')
  @UseGuards(AuthGuard(), RolesGuard)
  async findFeedbacks(@Query() QParams, @Request() req) {
    if (QParams.id) {
      const feedback = await this.feedbackService.findByID(+QParams.id);
      const sender = await feedback.sender;

      const reciever = await feedback.reciever;
      if (sender.userID === req.user.userID || req.user.userID === reciever.userID || req.user.role === 'Admin' || req.user.role === 'Team Lead') {

        return {
          Sender: sender.email,
          Reciever: reciever.email,
          Feedback: feedback.feedback,
        };
      }
      return `You can not view this feedback because it's not sent to you or you aren't the sender!`;
    }
    else {
      return 'Sorry we were unable to find any feedbacks with the parameters you gave us, if you want you can use ?all to find all teams!';
    }

  }

  @Get('/all')

  @Roles('Team Lead', 'Admin')
  @UseGuards(AuthGuard(), RolesGuard)

  async findAllFeedbacks() {
    return await this.feedbackService.findAll();
  }

  @Post('/new')

  @Roles('Team Lead', 'Admin', 'User')
  @UseGuards(AuthGuard(), RolesGuard)
  async addFeedback(@Body() body: FeedbackDTO, @Request() req) {
    return await this.feedbackService.addNew(body, req.user);
  }
}
