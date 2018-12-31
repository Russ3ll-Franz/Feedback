import { AddProjectDTO } from './../models/user/projects.dto';
import { ProjectsService } from '../projects/projects.service';
import { ProjectsController } from '../projects/projects.controller';

jest.mock('./../projects/projects.service');
jest.mock('../projects/projects.controller');

describe('Projects Controller', () => {
    let projectCtrl: ProjectsController;
    let projectService: ProjectsService;

    beforeEach(async () => {
        projectService = new ProjectsService(null);
        projectCtrl = new ProjectsController(projectService);
    });

    it('should call memberFeedbacklog method', async () => {
        // Arrange
        jest.spyOn(projectCtrl, 'memberFeedbacklog').mockImplementation(() => {
            return 'test';
        });

        // Act
        await projectCtrl.memberFeedbacklog('');

        // Assert
        expect(projectCtrl.memberFeedbacklog).toBeCalledTimes(1);
    });

    it('should call getOne method', async () => {
        // Arrange
        jest.spyOn(projectCtrl, 'getOne').mockImplementation(() => {
            return 'test';
        });

        // Act
        await projectCtrl.getOne('');

        // Assert
        expect(projectCtrl.getOne).toBeCalledTimes(1);
    });

    it('should call showMembers method', async () => {
        // Arrange
        jest.spyOn(projectCtrl, 'showMembers').mockImplementation(() => {
            return 'test';
        });

        // Act
        await projectCtrl.showMembers('');

        // Assert
        expect(projectCtrl.showMembers).toBeCalledTimes(1);
    });

    it('should call addProject method', async () => {
        // Arrange
        jest.spyOn(projectCtrl, 'addProject').mockImplementation(() => {
            return 'test';
        });
        const project: AddProjectDTO = new AddProjectDTO();

        // // Act
        await projectCtrl.addProject(project);

        // Assert
        expect(projectCtrl.addProject).toBeCalledTimes(1);
    });
});
