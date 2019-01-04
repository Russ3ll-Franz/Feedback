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

  async findAll() {
    try {
      const feedbacks = await this.entityManager.find(Feedbacklog, {});

      const object = Promise.all(feedbacks.map(async (feedback) => {
        const sender = await feedback.sender;
        const reciever = await feedback.reciever;
        return {
          id: feedback.feedbacklogID,
          Feedback: feedback.feedback,
          Sender: sender.email,
          Reciever: reciever.email,
        };
      }));

      return object;
    } catch (error) {
      throw new BadRequestException('There is no feedback to show');
    }
  }

  async addNew(body: FeedbackDTO, sender: Users) {
    try {
      const receiverID = await this.entityManager.findOneOrFail(Users, { select: ['userID'], where: { username: body.reciever } }).catch(() => {
        throw new BadRequestException(`There is no such user!`);
      });
      const senderID = sender.userID;

      if (receiverID.userID === senderID) {
        throw new BadRequestException(`You can not give feedback to yourself!`);
      }

      let usersTeams;

      await this.entityManager.query(
        `SELECT COUNT(usersUserID) AS matches from teams_user_users
        WHERE usersUserID IN(${senderID}, ${receiverID.userID})
        AND teamsTeamID = ${body.teamID}`,
      ).then((response) => {
        usersTeams = response[0].matches;
      });

      await this.entityManager.findOne(Feedbacklog, { where: { sender: senderID, receiver: receiverID } }).then((res) => {
        if (res !== undefined) {
          throw new BadRequestException('You have already given a feedback to this user!');

        }
      });

      if (usersTeams !== '2') {
        throw new BadRequestException('You and the person you want to vote for are not in the team you have specified!');
      }

      const receivedFeedbacksCount = await this.entityManager
        .findOne(Users, { select: ['receivedFeedbacks'], where: { username: body.reciever } });

      const givenFeedbacksCount = await this.entityManager
        .findOne(Users, { select: ['givenFeedbacks'], where: { username: sender.username } });

      await this.entityManager.update(Users, receiverID, { receivedFeedbacks: Number(receivedFeedbacksCount.receivedFeedbacks) + 1 });
      await this.entityManager.update(Users, sender, { givenFeedbacks: Number(givenFeedbacksCount.givenFeedbacks) + 1 });

      const newFeedback = await this.entityManager.create(Feedbacklog);
      newFeedback.feedback = body.feedback;
      newFeedback.reciever = Promise.resolve(await this.entityManager.findOneOrFail(Users, { where: { username: body.reciever } }));
      newFeedback.sender = Promise.resolve(sender);
      newFeedback.teamID = body.teamID;
      await this.entityManager.save(newFeedback);

      return `Successfully created feedback!`;
    } catch (error) {
      throw new BadRequestException(error.message.message);
    }
  }

  async findByID(feedbackID: number): Promise<Feedbacklog> {
    try {
      return await this.entityManager.findOneOrFail(Feedbacklog, { where: { feedbacklogID: feedbackID } });
    } catch (error) {
      throw new BadRequestException(`No feedback with id ${feedbackID}`);
    }
  }
}