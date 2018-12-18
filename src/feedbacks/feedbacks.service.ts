import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedbacklog } from 'src/data/entities/feedbacklog.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedbacklog)
    private readonly feedbackRepository: Repository<Feedbacklog>) {}

  async findAll(): Promise<Feedbacklog[]> {
    try {
        return await this.feedbackRepository.find();
    } catch (error) {
        return error;
    }
  }

  async findOne(projectID: number): Promise<Feedbacklog> {
    try {
        const Feedback = this.feedbackRepository.findOne({ where: { feedbackLogID: projectID} });
        console.log(Feedback);
        return await this.feedbackRepository.findOne({ where: { feedbackLogID: projectID} });
    } catch (error) {
        return error;
    }
  }
}