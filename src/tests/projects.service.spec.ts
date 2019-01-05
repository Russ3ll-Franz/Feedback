import { AddProjectDTO } from '../models/user/projects.dto';
import { ProjectsService } from '../projects/projects.service';

describe('Projects Service', () => {
    let projectService: ProjectsService;
    let projectRepo: any;

    beforeEach(() => {
        projectRepo = {
            findOne: () => { },
            findOneOrFail: () => { },
            find: () => { },
        };
        projectService = new ProjectsService(projectRepo);
    });

    it('should call projectRepository findOne method from addProject method', () => {
        // Arrange
        jest.spyOn(projectRepo, 'findOne');
        const project: AddProjectDTO = new AddProjectDTO();

        // Act
        projectService.addProject(project);
        // Assert
        expect(projectRepo.findOne).toHaveBeenCalledTimes(1);
    });

    it('should call projectRepository find method from findAll method', () => {
        // Arrange
        jest.spyOn(projectRepo, 'find');

        // Act
        projectService.findAll();

        // Assert
        expect(projectRepo.find).toHaveBeenCalledTimes(1);
    });

    it('should call projectRepository findOneOrFail method from getProject method', () => {
        // Arrange
        jest.spyOn(projectRepo, 'findOneOrFail');

        // Act
        projectService.getProject('1');

        // Assert
        expect(projectRepo.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should call projectRepository findOneOrFail method from getMembers method', () => {
        // Arrange
        jest.spyOn(projectRepo, 'findOneOrFail');

        // Act
        projectService.getMembers('1');

        // Assert
        expect(projectRepo.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should call projectRepository findOneOrFail method from getMemberFeedbacklog method', () => {
        // Arrange
        jest.spyOn(projectRepo, 'findOneOrFail');

        // Act
        projectService.getMemberFeedbacklog('');

        // Assert
        expect(projectRepo.findOneOrFail).toHaveBeenCalledTimes(1);
    });
});
