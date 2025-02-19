import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op, UUIDV4 } from 'sequelize';
import { v4 as uuidV4 } from 'uuid'; 
import { IBodyTask, IProjectTask } from './task.interface';
import { Task } from './task.model';
import { ProjectTask } from '../projectTasks/projectTask.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
  ) {}
  @InjectModel(ProjectTask)
  private readonly projectTaskModel: typeof ProjectTask;
  async findTask(taskId: string, name?: string) {
    return await this.taskModel.findOne({
      where: { [Op.or]: { id: taskId, ...(name ? { name } : {}) } },
      raw: true,
      useMaster: false,
      logging: false
    });
  }

  async getAllTask() {
    return await this.taskModel.findAll({
      useMaster: false,
      raw: true,
      nest: true,
      order: [['createdAt', 'ASC']]
    });
  }

  async updateTask(body: IBodyTask, taskId: string) {
    const task = await this.findTask(taskId);
    if (!task) {
      throw new HttpException('No record updated', 400);
    }
    
    const updated = await this.taskModel.update(body, { where: { id: taskId }});
    if (!updated[0]) {
      throw new HttpException('No record updated', 400);
    }
    
  }

  async deleteTask(taskId) {
    const [branch] = await Promise.all([
      this.findTask(taskId),
    ]);
    if (!branch) {
      throw new HttpException('No record deleted', 400);
    }

    const updated = await this.taskModel.destroy({ where: { id: taskId }});
    if (!updated) {
      throw new HttpException('No record deleted', 400);
    }
  }

  async newTask(body: IBodyTask) {
    const task = await this.findTask(null, body.name);
    if (task) {
      throw new HttpException('this name is conflict', 409);
    }

    return await this.taskModel.create({
      id: body.id || uuidV4(),
      name: body.name,
      type: body.type,
    })
  }

  async getTasksByProjects(projectIds: string[]) {
    const tasks = await this.taskModel.findAll({
      include: {
        model: this.projectTaskModel,
        required: true,
        where: { projectId: { [ Op.in ]: projectIds } },
        attributes: ['projectId']
      },
      logging: false
    })
    const groupedTasks = new Map<string, any[]>();

    tasks.forEach((task) => {
      task.taskProjects.forEach(project => {
        const projectId = project.projectId;
        if (!groupedTasks.has(projectId)) {
          groupedTasks.set(projectId, []);
        }
        const taskPush = task.toJSON();
        delete taskPush.taskProjects;
        groupedTasks.get(projectId)?.push(taskPush);
      });
    });
    return Object.fromEntries(groupedTasks);
  }

  async getProjectTask(projectId) {
    return this.projectTaskModel.findAll({
      where: { projectId },
      include: { model: this.taskModel },
      useMaster: false,
      logging: false,
    })
  }
}
