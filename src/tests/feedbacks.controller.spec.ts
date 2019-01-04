import { FeedbacksController } from '../feedbacks/feedbacks.controller';
import { FeedbackService } from '../feedbacks/feedbacks.service';
import { EntityManager } from 'typeorm';
import { Users } from '../data/entities/users.entity';
import { FeedbackDTO } from '../models/user/feedback.dto';

jest.mock('../feedbacks/feedbacks.service');

describe('Feedbacks Controller', () => {
    let feedbackServ: FeedbackService;
    let feedbackCtrl: FeedbacksController;

    beforeEach(() => {
        const entityManager: EntityManager = new EntityManager(null);
        feedbackServ = new FeedbackService(entityManager);
        feedbackCtrl = new FeedbacksController(feedbackServ);
    });

    it('should call FeedbackService findAll method', async () => {
        // Arrange
        jest.spyOn(feedbackServ, 'findAll').mockImplementation(() => {
            return 'test';
        });

        // Act
        await feedbackCtrl.findAllFeedbacks();

        // Assert
        expect(feedbackServ.findAll).toHaveBeenCalledTimes(1);
    });

    it('should call FeedbackService addNew method', async () => {
        // Arrange
        jest.spyOn(feedbackServ, 'addNew').mockImplementation(() => {
            return 'test';
        });
        const feedback: FeedbackDTO = new FeedbackDTO();
        const user: Users = new Users();

        // Act
        await feedbackCtrl.addFeedback(feedback, '');

        // Assert
        expect(feedbackServ.addNew(feedback, user)).toBe('test');
    });

    it('should call FeedbackService findByID method', async () => {
        // Arrange
        jest.spyOn(feedbackServ, 'findByID').mockImplementation(() => {
            return 'debaa';
        });
        const feedback: FeedbackDTO = new FeedbackDTO();

        // Act
        await feedbackCtrl.findFeedbacks(feedback, '');

        // Assert
        expect(feedbackServ.findByID(1)).toBe('debaa');
    });

});
