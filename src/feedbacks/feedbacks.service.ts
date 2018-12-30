import { FeedbackDTO } from './../models/user/feedback.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Feedbacklog } from '../data/entities/feedbacklog.entity';
import { Users } from '../data/entities/users.entity';

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

  async addNew(body: FeedbackDTO, sender: string) {
    try {
      let receiverID: Users;
      let senderID: Users;

      await this.entityManager.findOneOrFail(Users, { select: ['userID'], where: { username: body.receiver } }).then((res) => {
        receiverID = res;
      });
      await this.entityManager.findOneOrFail(Users, { select: ['userID'], where: { username: sender } }).then((res) => {
        senderID = res;
      });

      if (receiverID.userID === senderID.userID) {
        throw new BadRequestException(`You can not give feedback to yourself!`);
      }

      const receivedFeedbacksCount = await this.entityManager
        .findOne(Users, { select: ['receivedFeedbacks'], where: { username: body.receiver } });

      const givenFeedbacksCount = await this.entityManager
        .findOne(Users, { select: ['givenFeedbacks'], where: { username: sender } });

      await this.entityManager.update(Users, receiverID, { receivedFeedbacks: Number(receivedFeedbacksCount.receivedFeedbacks) + 1 });
      await this.entityManager.update(Users, senderID, { givenFeedbacks: Number(givenFeedbacksCount.givenFeedbacks) + 1 });

      const newFeedback = await this.entityManager.create(Feedbacklog);
      newFeedback.feedback = body.feedback;
      newFeedback.receiver = receiverID;
      newFeedback.sender = senderID;
      await this.entityManager.save(newFeedback);

      return `Successfully created feedback!`;
    } catch (error) {
      throw new BadRequestException(error.message);
    }

  }

  async findOne(projectID: number): Promise<Feedbacklog> {
    try {
      const Feedback = this.entityManager.findOne(Feedbacklog, { where: { feedbackLogID: projectID } });
      return await this.entityManager.findOne(Feedbacklog, { where: { feedbackLogID: projectID } });
    } catch (error) {
      return error;
    }
  }
}