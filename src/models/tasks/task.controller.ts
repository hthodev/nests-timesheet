import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { TaskService } from './task.service';
import { responseEndpoint } from 'src/responses/endpoint';
import { validate } from 'uuid';
import { JoiValidationBodyPipe } from 'src/middlewares/joiValidationPipe';
import { IBodyTask } from './task.interface';
import { updateOrCreateTask } from './task.validation';

@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  
  @Get('get-all-tasks')
  async getAllTask() {
    return responseEndpoint({
      result: await this.taskService.getAllTask()
    })
  }

  @Put('update-task/:taskId')
  @UsePipes(new JoiValidationBodyPipe(updateOrCreateTask))
  async updateBranch(@Param('taskId') taskId: string, @Body() body: IBodyTask) {
    if (!validate(taskId)) throw new HttpException('taskId is required', 400);
    await this.taskService.updateTask(body, taskId);
    return responseEndpoint({
      result: 'Updated'
    })
  }

  
  @Delete('delete-task/:taskId')
  async deleteBranch(@Param('taskId') taskId: string) {
    if (!validate(taskId)) throw new HttpException('userId is required', 400);
    await this.taskService.deleteTask(taskId);
    return responseEndpoint({
      result: 'Deleted'
    })
  }

  @Post('new-task')
  @UsePipes(new JoiValidationBodyPipe(updateOrCreateTask))
  async newBranch(@Body() body: IBodyTask) {
    return responseEndpoint({
      result: await this.taskService.newTask(body)
    })
  }


  @Post('get-tasks-by-project')
  @HttpCode(200)
  async getTasksByProjects(@Body() body: { projectIds: string[] }) {
    return responseEndpoint({
      result: await this.taskService.getTasksByProjects(body.projectIds)
    })
  }

  @Get('get-project-tasks/:projectId')
  async getProjectTask(@Param('projectId') projectId: string) {
    return responseEndpoint({ result: await this.taskService.getProjectTask(projectId)})
  }
}
