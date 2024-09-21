import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from 'models/task.model';
import { Sequelize, Op, UUIDV4 } from 'sequelize';
import { v4 as uuidV4 } from 'uuid'; 
import { IBodyTask } from './task.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
  ) {}
  async findTask(taskId: string, name?: string) {
    return await this.taskModel.findOne({
      where: { [Op.or]: { id: taskId, ...(name ? { name } : {}) } },
      raw: true,
      useMaster: false,
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

    return this.taskModel.create({
      id: body.id || uuidV4(),
      name: body.name,
        type: body.type
    })
  }
}
