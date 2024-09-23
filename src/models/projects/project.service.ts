import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op, UUIDV4 } from 'sequelize';
import { v4 as uuidV4 } from 'uuid'; 
import { TaskProject } from 'models/taskProject.model';
import { ProjectUser } from 'models/projectUser.model';
import { Project } from 'models/project.model';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project)
    private readonly projectModel: typeof Project,
  ) {}

  @InjectModel(TaskProject)
  private readonly taskProjectModel: typeof TaskProject;
  @InjectModel(ProjectUser)
  private readonly projectUserModel: typeof ProjectUser;

  async getProjectsByUserId(userId: string) {
    return await this.projectModel.findAll({
        include: {
            model: this.projectUserModel,
            required: true,
            where: { userId },
            attributes: []
        }
    })
  }
}
