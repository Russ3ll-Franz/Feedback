import { AddProjectDTO } from './../models/user/projects.dto';
import { ProjectsService } from '../projects/projects.service';
import { ProjectsController } from '../projects/projects.controller';

jest.mock('../projects/projects.service');

describe('Projects Controller', () => {
    let projectCtrl: ProjectsController;
    let projectService: ProjectsService;

    beforeEach(async () => {
        projectService = new ProjectsService(null, null, null);
        projectCtrl = new ProjectsController(projectService);
    });

    it('should call ProjectService addProject method', async () => {
        // Arrange
        jest.spyOn(projectService, 'addProject').mockImplementation(() => {
            return 'test';
        });
        const project: AddProjectDTO = new AddProjectDTO();

        // // Act
        await projectCtrl.addProject(project, { user: {userID: 0} });

        // Assert
        expect(projectService.addProject).toHaveBeenCalledTimes(1);
    });

    it('should call ProjectService findAll method', async () => {
        // Arrange
        jest.spyOn(projectService, 'findAll').mockImplementation(() => {
            return 'test';
        });

        // // Act
        await projectCtrl.getAllProjects();

        // Assert
        expect(projectService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should call ProjectService getProject method', async () => {
        // Arrange
        jest.spyOn(projectService, 'getProject').mockImplementation(() => {
            return 'test';
        });
        const params = {
            id: 1,
        };

        // // Act
        await projectCtrl.getOne(params);

        // Assert
        expect(projectService.getProject).toHaveBeenCalledTimes(1);
    });

    it('should call ProjectService getMemberFeedbacklog method', async () => {
        // Arrange
        jest.spyOn(projectService, 'getMemberFeedbacklog').mockImplementation(() => {
            return 'test';
        });
        const memberInfo = {
            id: 1,
            username: 'm.bechev',
        };

        // // Act
        await projectCtrl.memberFeedbacklog(memberInfo, '');

        // Assert
        expect(projectService.getMemberFeedbacklog).toHaveBeenCalledTimes(1);
    });

    it('should call ProjectService getMembers method', async () => {
        // Arrange
        jest.spyOn(projectService, 'getMembers').mockImplementation(() => {
            return 'test';
        });

        // // Act
        await projectCtrl.showMembers('1');

        // Assert
        expect(projectService.getMembers).toHaveBeenCalledTimes(1);
    });

});
