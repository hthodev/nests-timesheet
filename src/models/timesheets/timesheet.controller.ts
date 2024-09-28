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
import { TimeSheetService } from './timesheet.service';
import { IBodyTimeSheet, STATUS, TYPE_LOG } from './timesheet.interface';

@Controller('/timesheets')
export class TimeSheetController {
  constructor(private readonly timeSheetService: TimeSheetService) {}

  @Post('/log-timesheet')
  async logTimeSheet(@Body() body: IBodyTimeSheet, @Req() req: Request) {
    const user = req['user'];
    return responseEndpoint({
      result: await this.timeSheetService.logTimeSheet(body, user.id),
    });
  }

  @Get('/get-weakly-timesheet')
  async getWeeklyTimeSheet(
    @Query('monday') monday: string,
    @Query('sunday') sunday: string,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return responseEndpoint({
      result: await this.timeSheetService.getWeeklyTimeSheet(
        { monday, sunday },
        user.id,
      ),
    });
  }

  @Post('/submit-timesheet-to-pending')
  async submitTimeSheetToPending(@Body() body: { timeSheetIds: string[] }) {
    return responseEndpoint({
      result: await this.timeSheetService.submitTimeSheetToPending(
        body.timeSheetIds,
      ),
    });
  }

  @Put('/update-timesheet/:timeSheetId')
  async updateTimeSheet(
    @Body() body: IBodyTimeSheet,
    @Param('timeSheetId') timesheetId: string,
  ) {
    await this.timeSheetService.updateTimeSheet(body, timesheetId);
    return responseEndpoint({
      result: 'Updated',
    });
  }

  @Delete('delete-timesheet/:timeSheetId')
  async deleteTimeSheet(@Param('timeSheetId') timeSheetId: string) {
    await this.timeSheetService.deleteTimeSheet(timeSheetId);
    return responseEndpoint({ result: 'Deleted' });
  }

  @Post('get-all-requests')
  @HttpCode(200)
  async getAllRequestTimeSheet(@Req() req: Request, @Body() body: { monthPicker: string, workingType: TYPE_LOG | 'All', status: STATUS | 'All' }) {
    const user = req['user'];
    return responseEndpoint({ result: await this.timeSheetService.getAllRequestTimeSheet(user.id, body)})
  }

  @Put('approve-or-reject')
  @HttpCode(200)
  async approveOrReject(@Body() body: { status: STATUS, timeSheetIds: string[] }) {
    return responseEndpoint({ result: await this.timeSheetService.approveOrReject(body) })
  }
}
