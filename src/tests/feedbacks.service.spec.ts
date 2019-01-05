import { Users } from '../data/entities/users.entity';
import { FeedbackDTO } from '../models/user/feedback.dto';
import { FeedbackService } from '../feedbacks/feedbacks.service';

describe('Feedbacks Service', () => {
    let feedbackService: FeedbackService;
    let feedbackRepository: any;
    beforeEach(() => {
        feedbackRepository = {
            findOne: () => { },
            findOneOrFail: () => { },
            find: () => { },
        };
        feedbackService = new FeedbackService(feedbackRepository);
    });

    it('should call feedbackRepository find method from findAll method', () => {
        // Arrange
        jest.spyOn(feedbackRepository, 'find');

        // Act
        feedbackService.findAll();

        // Act & Assert
        expect(feedbackRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should call feedbackRepository findOneOrFail method from addNew method', () => {
        // Arrange
        jest.spyOn(feedbackRepository, 'findOneOrFail');
        const body: FeedbackDTO = {
            feedback: '',
            reciever: '',
            teamID: 1,
        };
        const sender: Users = new Users();

        // Act
        feedbackService.addNew(body, sender);

        // Act & Assert
        expect(feedbackRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should call feedbackRepository findOneOrFail method from findByID method', () => {
        // Arrange
        jest.spyOn(feedbackRepository, 'findOneOrFail');

        // Act
        feedbackService.findByID(1);

        // Act & Assert
        expect(feedbackRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });
});
