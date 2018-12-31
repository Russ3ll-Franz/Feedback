import { AddProjectDTO } from '../models/user/projects.dto';
import { ProjectsService } from '../projects/projects.service';
import { ProjectsController } from '../projects/projects.controller';

jest.mock('./../projects/projects.service');
jest.mock('../projects/projects.controller');

describe('Projects Service', () => {
    let projectCtrl: ProjectsController;
    let projectService: ProjectsService;

    beforeEach(async () => {
        projectService = new ProjectsService(null);
        projectCtrl = new ProjectsController(projectService);
    });

    it('should call addProject method', async () => {
        // Arrange
        jest.spyOn(projectService, 'addProject').mockImplementation(() => {
            return 'test';
        });
        const project: AddProjectDTO = new AddProjectDTO();

        // Act & Assert
        expect(projectService.addProject(project)).toBe('test');
    });

    it('should call getMembers method', async () => {
        // Arrange
        jest.spyOn(projectService, 'getMembers').mockImplementation(() => {
            return 'test';
        });

        // Act & Assert
        expect(projectService.getMembers('')).toBe('test');
    });

    it('should call getProject method', async () => {
        // Arrange
        jest.spyOn(projectService, 'getProject').mockImplementation(() => {
            return 'test';
        });

        // Act & Assert
        expect(projectService.getProject('')).toBe('test');
    });

    it('should call findAll method', async () => {
        // Arrange
        jest.spyOn(projectService, 'findAll').mockImplementation(() => {
            return 'test';
        });

        // Act & Assert
        expect(projectService.findAll()).toBe('test');
    });

    it('should call getMemberFeedbacklog method', async () => {
        // Arrange
        jest.spyOn(projectService, 'getMemberFeedbacklog').mockImplementation(() => {
            return 'test';
        });

        // Act & Assert
        expect(projectService.getMemberFeedbacklog('')).toBe('test');
    });

});
