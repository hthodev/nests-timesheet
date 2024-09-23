import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put, Query, Req, UsePipes } from '@nestjs/common';
import { responseEndpoint } from 'src/responses/endpoint';
import { validate } from 'uuid';
import { JoiValidationBodyPipe } from 'src/middlewares/joiValidationPipe';
import { TimeSheetService } from './timesheet.service';
import { IBodyTimeSheet } from './timesheet.interface';

@Controller('/timesheets')
export class TimeSheetController {
  constructor(private readonly timeSheetService: TimeSheetService) {}

  @Post('/log-timesheet')
  async logTimeSheet(@Body() body: IBodyTimeSheet, @Req() req: Request) {
    const user = req['user']
    return responseEndpoint({
      result: await this.timeSheetService.logTimeSheet(body, user.userId),
    })
  }

  @Get('/get-weakly-timesheet')
  async getWeeklyTimeSheet(@Query('monday') monday: string, @Query('sunday') sunday: string, @Req() req: Request) {
    const user = req['user']
    return responseEndpoint({
      result: await this.timeSheetService.getWeeklyTimeSheet({ monday, sunday }, user.userId)
    })
  }

  @Post('/submit-timesheet-to-pending')
  async submitTimeSheetToPending(@Body() body: { timeSheetIds: string[] }) {
    return responseEndpoint({
      result: await this.timeSheetService.submitTimeSheetToPending(body.timeSheetIds)
    })
  }

  @Put('/update-timesheet/:timesheetId')
  async updateTimeSheet(@Body() body: IBodyTimeSheet, @Param('timesheetId') timesheetId: string) {
    await this.timeSheetService.updateTimeSheet(body, timesheetId);
    return responseEndpoint({
      result: 'Updated'
    })
  }
}
