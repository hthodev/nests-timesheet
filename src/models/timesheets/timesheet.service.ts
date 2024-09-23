import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op, UUIDV4, QueryTypes } from 'sequelize';
import { v4 as uuidV4 } from 'uuid';
import { TimeSheet } from 'models/timesheet.model';
import {
  IBodyTimeSheet,
  IBodyWeaklyTimeSheet,
  STATUS,
  TYPE_LOG,
} from './timesheet.interface';
import { Project } from 'models/project.model';
import { Task } from 'models/task.model';

@Injectable()
export class TimeSheetService {
  constructor(
    @InjectModel(TimeSheet)
    private readonly timeSheetModel: typeof TimeSheet,
  ) {}
  @Inject('SEQUELIZE') private readonly sequelize: Sequelize;
  @InjectModel(Project)
  private readonly projectModel: typeof Project;
  @InjectModel(Task)
  private readonly taskModel: typeof Task;

  async getTimeSheets(userId: string, dateLog: Date) {
    return this.sequelize.query(
      `SELECT *
      FROM "timeSheets"
      WHERE "userId" = :userId
      AND DATE("dateLog") = :dateLog;
      `,
      {
        replacements: { userId, dateLog },
        type: QueryTypes.SELECT,
        logging: false,
      },
    );
  }

  async logTimeSheet(body: IBodyTimeSheet, userId: string): Promise<TimeSheet> {
    const timeSheets = await this.getTimeSheets(userId, body.dateLog);
    let timeLogNormal: number = body.timeLog;
    timeSheets.forEach((ts: TimeSheet) => {
      if (ts.typeLog === TYPE_LOG.NORMAL) timeLogNormal += ts.timeLog;
    });

    if (timeLogNormal > 8)
      throw new BadRequestException(
        'Normal working time not exceeding 8 hours',
      );

    const isCustomerCharged =
      body.typeLog === TYPE_LOG.OVER_TIME ? !!body.isCustomerCharged : true;
    return await this.timeSheetModel.create({
      note: body.note,
      projectId: body.projectId,
      userId,
      typeLog: body.typeLog,
      taskId: body.taskId,
      timeLog: body.timeLog,
      status: STATUS.DRAFT,
      dateLog: body.dateLog,
      isCustomerCharged,
    });
  }

  async getWeeklyTimeSheet(
    { monday, sunday }: IBodyWeaklyTimeSheet,
    userId: string,
  ) {
    return await this.sequelize.query(
      `
      SELECT "timeSheet".*,
        "project"."name"  AS "projectName",
        "project"."title" AS "projectTitle",
        "task"."name"     AS "taskName",
        "task"."type"     AS "taskType"
      FROM "timeSheets" AS "timeSheet"
      INNER JOIN "projects" AS "project" ON "timeSheet"."projectId" = "project"."id"
      INNER JOIN "tasks" AS "task" ON "timeSheet"."taskId" = "task"."id"
      WHERE ("timeSheet"."dateLog" >= :monday AND "timeSheet"."dateLog" <= :sunday)
        AND "timeSheet"."userId" = :userId;`,
      {
        replacements: { monday, sunday, userId },
        type: QueryTypes.SELECT,
        logging: false,
      },
    );
  }

  async submitTimeSheetToPending(timeSheetIds: string[]) {
    const timeSheets = await this.timeSheetModel.findAll({
      where: { id: timeSheetIds },
      attributes: ['id', 'status'],
    });

    timeSheets.forEach((timeSheet) => {
      if (timeSheet.status !== STATUS.DRAFT)
        throw new BadRequestException('timeSheet submit invalid!');
    });

    const numberOfUpdate = await this.sequelize.transaction(
      async (transaction) => {
        return await this.timeSheetModel.update(
          {
            status: STATUS.PENDING,
          },
          {
            where: { id: timeSheetIds },
            transaction,
            returning: true,
            logging: false,
          },
        );
      },
    );

    return numberOfUpdate[1] || {};
  }

  async updateTimeSheet(body: IBodyTimeSheet, timeSheetId: string) {
    const timeSheet = await this.timeSheetModel.findOne({
      where: { id: timeSheetId },
      attributes: ['id', 'status'],
    });
    if (timeSheet.status === STATUS.APPROVED)
      throw new BadRequestException('timeSheet request invalid!');

    await this.timeSheetModel.update(
      {
        note: body.note,
        timeLog: body.timeLog,
        projectId: body.projectId,
        taskId: body.taskId,
        status: STATUS.DRAFT,
        oldStatus: timeSheet.status,
        typeLog: body.typeLog,
        isCustomerCharged: body.isCustomerCharged,
      },
      { where: { id: timeSheetId }},
    );
  }
}
