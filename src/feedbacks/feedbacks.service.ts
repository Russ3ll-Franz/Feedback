import { FeedbackDTO } from './../models/user/feedback.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Feedbacklog } from 'src/data/entities/feedbacklog.entity';
import { Users } from 'src/data/entities/users.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) { }

  async findAll(): Promise<Feedbacklog[]> {
    try {
      return await this.entityManager.find(Feedbacklog, {});
    } catch (error) {
      return error;
    }
  }

  async addNew(body: FeedbackDTO) {
    try {
      const receiverID = await this.entityManager.findOneOrFail(Users, { select: ['userID'], where: { username: body.receiver } });
      const senderID = await this.entityManager.findOneOrFail(Users, { select: ['userID'], where: { username: body.sender } });

      // tslint:disable-next-line:max-line-length
      const receivedFeedbacksCount = await this.entityManager
        .findOne(Users, { select: ['receivedFeedbacks'], where: { username: body.receiver } });

      const givenFeedbacksCount = await this.entityManager
        .findOne(Users, { select: ['givenFeedbacks'], where: { username: body.sender } });

      await this.entityManager.update(Users, receiverID, { receivedFeedbacks:  Number(receivedFeedbacksCount.receivedFeedbacks) + 1 });
      await this.entityManager.update(Users, senderID, { givenFeedbacks: Number(givenFeedbacksCount.givenFeedbacks) + 1 });

      const newFeedback = await this.entityManager.create(Feedbacklog);
      newFeedback.feedback = body.feedback;
      newFeedback.receiver = receiverID;
      newFeedback.sender = senderID;
      await this.entityManager.save(newFeedback);
    } catch (error) {
      throw new BadRequestException('Invalid username');
    }

  }

  // async findOne(projectID: number): Promise<Feedbacklog> {
  //   try {
  //     const Feedback = this.feedbackRepository.findOne({ where: { feedbackLogID: projectID } });
  //     return await this.feedbackRepository.findOne({ where: { feedbackLogID: projectID } });
  //   } catch (error) {
  //     return error;
  //   }
  // }
}