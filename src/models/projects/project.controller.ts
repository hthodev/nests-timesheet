import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
} from '@nestjs/common';
import { responseEndpoint } from 'src/responses/endpoint';
import { validate } from 'uuid';
import { JoiValidationBodyPipe } from 'src/middlewares/joiValidationPipe';
import { ProjectService } from './project.service';

@Controller('/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get('get-projects-by-userId')
  async getProjectsByUserId(@Req() req: Request) {
    const user = req['user'];
    return responseEndpoint({
      result: await this.projectService.getProjectsByUserId(user.id),
    });
  }

  @Get('get-projects-landing-view')
  async getProjectLandingView(@Req() req: Request) {
    const user = req['user']
    return responseEndpoint({
      result: await this.projectService.getProjectLandingView(user.id),
    });
  }

  @Post('create-new-project')
  async createNewProject(@Body() body) {
    return responseEndpoint({
      result: await this.projectService.createNewProject(body),
    });
  }
}
