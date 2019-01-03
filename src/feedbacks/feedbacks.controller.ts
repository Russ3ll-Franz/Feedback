import { FeedbackDTO } from './../models/user/feedback.dto';
import { Controller, Get, UseGuards, HttpService, Inject, Request , Query, Post, Body, BadRequestException, Headers } from '@nestjs/common';
import { FeedbackService } from './feedbacks.service';
import { Feedbacklog } from 'src/data/entities/feedbacklog.entity';
import { AuthGuard } from '@nestjs/passport';
import { TokenDTO } from 'src/models/token-from-header-dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles/roles.guard';

@Controller('feedbacks')
export class FeedbacksController {

  constructor(private readonly feedbackService: FeedbackService) { }

  @Get()

  @Roles('Team Lead', 'Admin', 'User')
  @UseGuards(AuthGuard(), RolesGuard)
  findFeedbacks(@Query() QParams) {
    if (QParams.id) {
      return this.feedbackService.findOne(QParams.id).then((res) => {
        return res;
      }).catch((err) => {
        throw new Error('No team with such an ID');
      });
    }
    if (QParams.all){
      return this.feedbackService.findAll();
    }
    if (QParams.projectName){
      return this.feedbackService.findOne(QParams.projectName);
    }
    else{
      return 'Sorry we were unable to find any teams with the parameters you gave us, if you want you can use ?all to find all teams!';
    }

  }

  @Post('/new')

  @Roles('Team Lead', 'Admin', 'User')
  @UseGuards(AuthGuard(), RolesGuard)
  async addFeedback(@Body() body: FeedbackDTO, @Request() req) {
    return await this.feedbackService.addNew(body, req.user);
  }
}
