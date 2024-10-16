import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op, UUIDV4 } from 'sequelize';
import { v4 as uuidV4 } from 'uuid';
import { IBodyProject, PROJECT_USER_TYPE } from './project.interface';
import { UserService } from '../users/user.service';
import { Project } from './project.model';
import { ProjectTask } from '../projectTasks/projectTask.model';
import { ProjectUser } from '../projectUsers/projectUser.model';
import { Customer } from '../customers/customer.model';
import { PmProject } from '../pmProjects/pmProject.model';
import { User } from '../users/user.model';

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
        attributes: [
          'id',
          'name',
          'type',
          'projectStart',
          'projectEnd',
          'customerId',
        ],
        required: true,
        include: [
          {
            model: this.pmProjectModel,
            required: true,
            where: { userId },
          },
          {
            model: this.projectUserModel,
            attributes: ['userId'],
            required: true,
          },
        ],
      },
      logging: false,
    });

    const projectIds = [];
    projectCustomers.forEach((customer) =>
      customer.projects.forEach((project) => projectIds.push(project.id)),
    );
    const pmProjects = await this.pmProjectModel.findAll({
      where: { projectId: projectIds },
      attributes: ['id', 'userId', 'projectId'],
      include: {
        model: this.userModel,
        attributes: ['id', 'firstName', 'lastName', 'position', 'sex', 'type'],
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

    return projectCustomers.map((customer) => {
      customer = customer.toJSON();
      customer.projects.map((project) => {
        const pmProjectsByProject = pmProjects
          .filter((pmProject) => pmProject.projectId === project.id)
          .map((pmProject) => pmProject.toJSON());
        project.pmProjects = pmProjectsByProject;
        return project;
      });
      return customer;
    });
  }

  async createNewProject(body: IBodyProject) {
    const {
      projectEnd,
      projectName,
      projectStart,
      projectType,
      customerId,
      allEmployeesSelected,
    } = body;

    const userService = new UserService(User);
    const supervisors = await userService.findSupervisor();

    const pmProjects = body.projectUsers.filter(
      (projectUser) => projectUser.projectUserType === 'Project Manager',
    );
    if (!pmProjects.length)
      throw new BadRequestException('project at least 1 project manager');
    supervisors.forEach((supervisor) => {
      if (!pmProjects.some((pmProject) => pmProject.userId === supervisor.id)) {
        pmProjects.push({
          userId: supervisor.id,
          projectUserType: PROJECT_USER_TYPE.PROJECT_MANAGER,
        });
      }
    });

    if (allEmployeesSelected) {
      const users = await this.userModel.findAll({
        attributes: ['id'],
        useMaster: false,
      });
      body.projectUsers = users.map((user) => ({
        userId: user.id,
        projectUserType: PROJECT_USER_TYPE.MEMBER,
      }));
    }

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

  async updateProject(projectId: string, body: IBodyProject) {
    let {
      projectEnd,
      projectName,
      projectStart,
      projectType,
      customerId,
      allEmployeesSelected,
      projectUsers,
      tasks,
    } = body;

    const userService = new UserService(User);
    const supervisors = await userService.findSupervisor();

    const pmProjects = body.projectUsers.filter(
      (projectUser) => projectUser.projectUserType === 'Project Manager',
    );
    if (!pmProjects.length)
      throw new BadRequestException('project at least 1 project manager');
    supervisors.forEach((supervisor) => {
      if (!pmProjects.some((pmProject) => pmProject.userId === supervisor.id)) {
        pmProjects.push({
          userId: supervisor.id,
          projectUserType: PROJECT_USER_TYPE.PROJECT_MANAGER,
        });
      }
    });

    if (allEmployeesSelected) {
      const users = await this.userModel.findAll({
        attributes: ['id'],
        useMaster: false,
      });
      projectUsers = users.map((user) => ({
        userId: user.id,
        projectUserType: PROJECT_USER_TYPE.MEMBER,
      }));
    }

    await this.sequelize.transaction(async transaction => {
      await this.projectModel.update({
        projectStart,
        projectEnd,
        type: projectType,
        customerId,
        name: projectName,
      }, { where: { id: projectId }});

      await Promise.all([
        this.projectUserModel.destroy({ where: { projectId }}),
        this.projectTaskModel.destroy({ where: { projectId }}),
        this.pmProjectModel.destroy({ where: { projectId }})
      ])

      const bulkPmProjects = pmProjects.map((pmProject) => ({
        userId: pmProject.userId,
        projectId,
      }));
      const bulkProjectUsers = projectUsers.map((projectUser) => ({
        userId: projectUser.userId,
        projectId,
      }));
      const bulkProjectTasks = tasks.map((task) => ({
        taskId: task.id,
        projectId,
      }));
      await Promise.all([
        this.pmProjectModel.bulkCreate(bulkPmProjects, { transaction }),
        this.projectUserModel.bulkCreate(bulkProjectUsers, { transaction }),
        this.projectTaskModel.bulkCreate(bulkProjectTasks, { transaction }),
      ]);
    })
  }
}
