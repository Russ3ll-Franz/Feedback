import { Teams } from 'src/data/entities/teams.entity';
import { FeedbackDTO } from './../models/user/feedback.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, JoinTable, getConnection, getManager, createQueryBuilder, getRepository } from 'typeorm';
import { Feedbacklog } from '../data/entities/feedbacklog.entity';
import { Users } from '../data/entities/users.entity';
import { from } from 'rxjs';

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

  async addNew(body: FeedbackDTO, sender: Users) {
    try {
      const receiverID = await this.entityManager.findOneOrFail(Users, { select: ['userID'], where: { username: body.receiver } });
      const senderID = sender.userID;
      let usersTeams;

      await this.entityManager.query(
        `SELECT COUNT(usersUserID) from teams_user_users
        WHERE usersUserID IN(${senderID}, ${receiverID.userID})
        AND teamsTeamID = ${body.teamID}`,
      ).then((response) => {
        usersTeams = response;
      });

      // let isAlreadyGivenFeedback: any;
      // await this.entityManager
      // .find(Feedbacklog,
      //   { select: ['feedback', 'senderUserID'], where: { senderUserID: senderID },
      // }).then((result) => {
      //   //  if (result.sender === senderID && result.receiver === receiverID.userID && result.teamID === body.teamID) {
      //   //   console.log('ebi si maikata shiban komp')
      //   //  }
      //   console.log(result);
      // });

      if (usersTeams.length !== 2) {
        throw new Error('You and the person you want to vote for are not in the team you have specified!');
      }

      if (receiverID.userID === senderID) {
        throw new BadRequestException(`You can not give feedback to yourself!`);
      }

      const receivedFeedbacksCount = await this.entityManager
        .findOne(Users, { select: ['receivedFeedbacks'], where: { username: body.receiver } });

      const givenFeedbacksCount = await this.entityManager
        .findOne(Users, { select: ['givenFeedbacks'], where: { username: sender.username } });

      await this.entityManager.update(Users, receiverID, { receivedFeedbacks: Number(receivedFeedbacksCount.receivedFeedbacks) + 1 });
      await this.entityManager.update(Users, sender, { givenFeedbacks: Number(givenFeedbacksCount.givenFeedbacks) + 1 });

      const newFeedback = await this.entityManager.create(Feedbacklog);
      newFeedback.feedback = body.feedback;
      newFeedback.receiver = receiverID;
      newFeedback.sender = sender;
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