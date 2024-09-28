import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op, UUIDV4, QueryTypes, where } from 'sequelize';
import { v4 as uuidV4 } from 'uuid';
import { TimeSheet } from 'models/timesheet.model';
import {
  IBodyTimeSheet,
  IBodyWeaklyTimeSheet,
  IWeaklyTimeSheet,
  STATUS,
  TYPE_LOG,
} from './timesheet.interface';
import { Project } from 'models/project.model';
import { Task } from 'models/task.model';
import { PmProject } from 'models/pmProject.model';
import { User } from 'models/user.model';
import { ProjectUser } from 'models/projectUser.model';
import { formatDate } from 'src/shares/ultis';

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
  @InjectModel(PmProject)
  private readonly pmProjectModel: typeof Project;
  @InjectModel(User)
  private readonly userModel: typeof User;
  @InjectModel(ProjectUser)
  private readonly projectUserModel: typeof ProjectUser;

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
    console.log('body', body);

    const timeSheets = await this.getTimeSheets(userId, body.dateLog);
    let timeLogNormal: number = body.timeLog;
    timeSheets.forEach((ts: TimeSheet) => {
      if (body.typeLog === TYPE_LOG.NORMAL) timeLogNormal += ts.timeLog;
    });

    console.log('timeLogNormal', timeLogNormal);

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

  groupTimeSheet(timeSheets) {
    const groupedLogsMap = new Map();
    timeSheets.forEach((log) => {
      const date = formatDate(log.dateLog);
      if (groupedLogsMap.has(date)) {
        const current = groupedLogsMap.get(date);
        current.timeLog += log.timeLog;
        current.logs.push(log);
      } else {
        groupedLogsMap.set(date, {
          dateLog: date,
          timeLog: log.timeLog,
          logs: [log],
        });
      }
    });
    return Array.from(groupedLogsMap.values());
  }

  async getWeeklyTimeSheet(
    { monday, sunday }: IBodyWeaklyTimeSheet,
    userId: string,
  ) {
    const timeSheets: IWeaklyTimeSheet[] = await this.sequelize.query(
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

    return this.groupTimeSheet(timeSheets);
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
      { where: { id: timeSheetId } },
    );
  }

  async deleteTimeSheet(timeSheetId: string) {
    const timeSheet = await this.timeSheetModel.findOne({
      where: { id: timeSheetId },
      attributes: ['id', 'status'],
    });
    if (timeSheet.status === STATUS.APPROVED)
      throw new BadRequestException('timeSheet delete invalid!');
    await this.timeSheetModel.destroy({ where: { id: timeSheetId } });
  }

  async getAllRequestTimeSheet(userId: string, body) {
    console.log('body', body);

    const { monthPicker, workingType, status } = body;
    const [year, month] = monthPicker.split('-').map(Number);
    if (!month || !year)
      throw new BadRequestException('monthPicker format invalid!');
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    console.log(firstDayOfMonth.toISOString(), lastDayOfMonth.toISOString());

    const projects = await this.projectModel.findAll({
      attributes: ['id', 'name', 'title'],
      include: [
        {
          model: this.pmProjectModel,
          where: { userId },
          required: true,
          attributes: [],
        },
        {
          model: this.projectUserModel,
          attributes: ['id'],
          required: true,
          include: [
            {
              model: this.userModel,
              required: true,
              attributes: [
                'id',
                'firstName',
                'lastName',
                'type',
                'level',
                'sex',
                'picture',
              ],
              include: [
                {
                  model: this.timeSheetModel,
                  required: true,
                  where: this.sequelize.literal(
                    `"projectUsers->userProject->timeSheets"."status" ${
                      status && status === 'All'
                        ? `IN ('${STATUS.PENDING}', '${STATUS.APPROVED}', '${STATUS.REJECTED}') AND`
                        : `= '${status}' AND`
                    } 
                      ${workingType && workingType !== 'All' ? `"projectUsers->userProject->timeSheets"."typeLog" = '${workingType}' AND` : ''}
                    ("projectUsers->userProject->timeSheets"."dateLog" >= '${formatDate(firstDayOfMonth)}' AND
                     "projectUsers->userProject->timeSheets"."dateLog" <= '${formatDate(lastDayOfMonth)}')`,
                  ),
                  include: [
                    {
                      model: this.taskModel,
                      attributes: ['name'],
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      order: [
        this.sequelize.literal(
          `"projectUsers->userProject->timeSheets"."dateLog" DESC`,
        ),
      ],
      // logging: false,
    });

    return projects.map((project) => {
      project = project.toJSON();
      project.projectUsers.map((projectUser) => {
        projectUser.userProject.timeSheets = this.groupTimeSheet(
          projectUser.userProject.timeSheets,
        );
        return projectUser;
      });
      return project;
    });
  }

  async approveOrReject({
    status,
    timeSheetIds,
  }: {
    status: STATUS;
    timeSheetIds: string[];
  }) {
    const timeSheets = await this.timeSheetModel.findAll({
      where: { id: timeSheetIds },
      attributes: ['id', 'status'],
    });
    timeSheets.forEach((timeSheet) => {
      if (timeSheet.status !== STATUS.PENDING)
        throw new BadRequestException('timeSheetId invalid');
    });
    const timeSheetChangeStatus = await this.sequelize.transaction(
      async (transaction) => {
        const timeSheetChangeStatus = await this.timeSheetModel.update(
          { status },
          { where: { id: timeSheetIds }, transaction, logging: false },
        );

        return timeSheetChangeStatus[0];
      },
    );
    console.log('timeSheetChangeStatus', timeSheetChangeStatus);
    return timeSheetChangeStatus;
  }
}
