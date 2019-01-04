import { Users } from '../data/entities/users.entity';
import { FeedbackDTO } from '../models/user/feedback.dto';
import { FeedbackService } from '../feedbacks/feedbacks.service';

describe('Feedbacks Service', () => {
    let feedbackServ: FeedbackService;

    beforeEach(() => {
        feedbackServ = new FeedbackService(null);
    });

    it('should call findAll method', async () => {
        // Arrange
        jest.spyOn(feedbackServ, 'findAll').mockImplementation(() => {
            return 'test';
        });

        // Act & Assert
        expect(feedbackServ.findAll()).toBe('test');
    });

    it('should call addNew method', async () => {
        // Arrange
        jest.spyOn(feedbackServ, 'addNew').mockImplementation(() => {
            return 'test';
        });
        const feedback: FeedbackDTO = new FeedbackDTO();
        const sender: Users = new Users();

        // Act & Assert
        expect(feedbackServ.addNew(feedback, sender)).toBe('test');
    });

    it('should call findByID method', async () => {
        // Arrange
        jest.spyOn(feedbackServ, 'findByID').mockImplementation(() => {
            return 'test value';
        });

        // Act & Assert
        expect(feedbackServ.findByID(1)).toBe('test value');

    });
});
