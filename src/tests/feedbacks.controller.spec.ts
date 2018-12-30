import { FeedbackDTO } from './../models/user/feedback.dto';
import { FeedbacksController } from '../feedbacks/feedbacks.controller';
import { FeedbackService } from '../feedbacks/feedbacks.service';

jest.mock('./../feedbacks/feedbacks.service');
jest.mock('../feedbacks/feedbacks.controller');

describe('Feedbacks Controller', () => {
    let feedbackServ: FeedbackService;
    let feedbackCtrl: FeedbacksController;
    beforeEach(() => {
        feedbackServ = new FeedbackService(null);
        feedbackCtrl = new FeedbacksController(feedbackServ);
    });

    it('should call FeedbackService findAll method', async () => {
        // Arrange
        jest.spyOn(feedbackServ, 'findAll').mockImplementation(() => {
            return 'test';
        });

        // Act
        await feedbackCtrl.findFeedbacks(null);

        // Assert
        expect(feedbackServ.findAll()).toBe('test');
    });

    it('should call FeedbackService addNew method', async () => {
        // Arrange
        jest.spyOn(feedbackServ, 'addNew').mockImplementation(() => {
            return 'test';
        });
        const feedback: FeedbackDTO = new FeedbackDTO();

        // Act
        await feedbackCtrl.addFeedback(feedback, null);

        // Assert
        expect(feedbackServ.addNew(feedback, '')).toBe('test');
    });

    it('should call FeedbackService findOne method', async () => {
        // Arrange
        jest.spyOn(feedbackServ, 'findOne').mockImplementation(() => {
            return 'test value';
        });

        // Act
        await feedbackCtrl.findFeedbacks('');

        // Assert
        expect(feedbackServ.findOne(1)).toBe('test value');

    });
});
