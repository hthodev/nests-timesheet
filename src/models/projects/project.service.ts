import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op, UUIDV4 } from 'sequelize';
import { v4 as uuidV4 } from 'uuid';
import { ProjectTask } from 'models/projectTask.model';
import { ProjectUser } from 'models/projectUser.model';
import { Project } from 'models/project.model';
import { Customer } from 'models/customer.model';
import { PmProject } from 'models/pmProject.model';
import { User } from 'models/user.model';
import { IBodyProject, PROJECT_USER_TYPE } from './project.interface';
import { UserService } from '../users/user.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project)
    private readonly projectModel: typeof Project,
  ) {}
  @Inject('SEQUELIZE') private readonly sequelize: Sequelize;
  @InjectModel(ProjectTask)
  private readonly projectTaskModel: typeof ProjectTask;
  @InjectModel(ProjectUser)
  private readonly projectUserModel: typeof ProjectUser;

  @InjectModel(Customer)
  private readonly customerModel: typeof Customer;

  @InjectModel(PmProject)
  private readonly pmProjectModel: typeof PmProject;

  @InjectModel(User)
  private readonly userModel: typeof User;

  async getProjectsByUserId(userId: string) {
    return await this.projectModel.findAll({
      include: {
        model: this.projectUserModel,
        required: true,
        where: { userId },
        attributes: [],
      },
    });
  }

  async getProjectLandingView(userId): Promise<any> {
    const projectCustomers = await this.customerModel.findAll({
      attributes: ['id', 'name', 'region'],
      include: {
        model: this.projectModel,
        attributes: ['id', 'name', 'type', 'projectStart'],
        required: true,
        include: [
          {
            model: this.pmProjectModel,
            required: true,
            where: { userId }
          },
          {
            model: this.projectUserModel,
            attributes: ['userId'],
            required: true,
          },
        ],
      },
      logging: false
    });

    const projectIds = []
    projectCustomers.forEach(customer => customer.projects.forEach(project => projectIds.push(project.id)));
    const pmProjects = await this.pmProjectModel.findAll({ 
      where: { projectId: projectIds },
      attributes: ['id', 'userId', 'projectId'],
      include: {
        model: this.userModel,
        attributes: ['id', 'firstName', 'lastName', 'position', 'sex', 'type']
      },
      order: [
        this.sequelize.literal(
          ` CASE
                WHEN "pmProject"."position" = 'Supervisor' THEN 1
                WHEN "pmProject"."position" = 'Admin' THEN 2
            END DESC`,
        ),
      ],
    });

    return projectCustomers.map(customer => {
      customer = customer.toJSON();
      customer.projects.map(project => {
        const pmProjectsByProject = pmProjects.filter(pmProject => pmProject.projectId === project.id).map(pmProject => pmProject.toJSON());
        project.pmProjects = pmProjectsByProject;
        return project
      })
      return customer;
    })
  }

  async createNewProject(body: IBodyProject) {
    const { projectEnd, projectName, projectStart, projectType, customerId } =
      body;

    const userService = new UserService(User);
    const supervisors = await userService.findSupervisor();

    const pmProjects = body.projectUsers.filter(
      (projectUser) => projectUser.projectUserType === 'Project Manager',
    );
    if (!pmProjects.length)
      throw new BadRequestException('project at least 1 project manager');

    pmProjects.push(...supervisors.map(supervisor => ({ userId: supervisor.id, projectUserType: PROJECT_USER_TYPE.PROJECT_MANAGER })))

    return await this.sequelize.transaction(async (transaction) => {
      const projectId = uuidV4();
      const project = await this.projectModel.create(
        {
          id: projectId,
          name: projectName,
          projectStart,
          projectEnd: projectEnd || null,
          type: projectType,
          customerId,
        },
        { transaction },
      );
      const bulkPmProjects = pmProjects.map((pmProject) => ({
        userId: pmProject.userId,
        projectId,
      }));
      const bulkProjectUsers = body.projectUsers.map((projectUser) => ({
        userId: projectUser.userId,
        projectId,
      }));
      const bulkProjectTasks = body.tasks.map((task) => ({
        taskId: task.id,
        projectId,
      }));
      await Promise.all([
        this.pmProjectModel.bulkCreate(bulkPmProjects, { transaction }),
        this.projectUserModel.bulkCreate(bulkProjectUsers, { transaction }),
        this.projectTaskModel.bulkCreate(bulkProjectTasks, { transaction }),
      ]);

      return project;
    });
  }
}
