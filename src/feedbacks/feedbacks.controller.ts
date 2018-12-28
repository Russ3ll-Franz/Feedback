import { FeedbackDTO } from './../models/user/feedback.dto';
import { Controller, Get, UseGuards, HttpService, Inject, Query, Post, Body, BadRequestException, Headers } from '@nestjs/common';
import { FeedbackService } from './feedbacks.service';
import { Feedbacklog } from 'src/data/entities/feedbacklog.entity';
import { AuthGuard } from '@nestjs/passport';
import * as jwt_decode from 'jwt-decode';
import { TokenDTO } from 'src/models/token-from-header-dto';
import { Roles } from 'src/common';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@Controller('feedbacks')
export class FeedbacksController {

  constructor(private readonly feedbackRepository: FeedbackService) { }

  @Get()

  @Post('/new')
  @Roles('Team Lead', 'Admin', 'User')
  @UseGuards(AuthGuard(), RolesGuard)
  findAll(@Query() QParams): Promise<Feedbacklog | Feedbacklog[]> {
    if (QParams.feedbackid) {
      return this.feedbackRepository.findOne(QParams.feedbackid);
    }
    return this.feedbackRepository.findAll();
  }

  @Post('/new')

  @Roles('Team Lead', 'Admin', 'User')
  @UseGuards(AuthGuard(), RolesGuard)
  async addFeedback(@Body() body: FeedbackDTO, @Headers() header: any) {
    const sender: TokenDTO = jwt_decode(header.authorization);
    return await this.feedbackRepository.addNew(body, sender.username);
  }
}
