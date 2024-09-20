// src/user/user.service.ts
import { Injectable, Inject, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../../../models/user.model';
import {
  ICreateUserParam,
  IParamGetUsersPaging,
  IUserRelation,
} from './user.interface';
import { calculateWorkingTime, hashPassword } from 'src/shares/ultis';
import { WorkingTime } from '../../../models/workingTime.model';
import { v4 as uuidv4 } from 'uuid';
import { Branch } from 'models/branch.model';
import { Op, QueryTypes } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
  @Inject('SEQUELIZE') private readonly sequelize: Sequelize;
  @InjectModel(WorkingTime)
  private readonly workingTimeModel: typeof WorkingTime;
  @InjectModel(Branch)
  private readonly branchModel: typeof Branch;

  async createNewEmployee(body: ICreateUserParam): Promise<User> {
    const transaction = await this.sequelize.transaction();
    try {
      const userId = uuidv4();
      const workingTime = {
        userId,
        morningStartAt: body.workingTime.morningStartAt,
        morningEndAt: body.workingTime.morningEndAt,
        morningWorking: calculateWorkingTime(
          body.workingTime.morningStartAt,
          body.workingTime.morningEndAt,
        ),
        afternoonStartAt: body.workingTime.afternoonStartAt,
        afternoonEndAt: body.workingTime.afternoonEndAt,
        afternoonWorking: calculateWorkingTime(
          body.workingTime.afternoonStartAt,
          body.workingTime.afternoonEndAt,
        ),
      };
      const user = {
        id: userId,
        branchId: body.branchId,
        firstName: body.firstName,
        lastName: body.lastName,
        userName: body.userName,
        birthday: body.birthday,
        email: body.email,
        phoneNumber: body.phoneNumber,
        pmId: body.pmId,
        position: body.position,
        type: body.type,
        level: body.level,
        salary: body.salary,
        sex: body.sex,
      };
      await this.workingTimeModel.create(workingTime, {
        transaction,
        logging: false,
      });
      const createdUser = await this.userModel.create(user, {
        transaction,
        logging: false,
      });

      await transaction.commit();
      return createdUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async myInformation(id) {
    return this.userModel.findOne({
      where: { id },
      useMaster: false,
      raw: true,
    });
  }

  async getAllUserNoPaging() {
    return await this.userModel.findAll({
      raw: true,
      attributes: ['id', 'firstName', 'lastName', 'picture'],
    });
  }

  async updateEmployee(body: IUserRelation, userId: string) {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      userName,
      pmId,
      allowedLeaveDay,
      type,
      level,
      salary,
      sex,
      isActive,
      branchId,
      picture,
      birthday,
      position,
      workingTime,
    } = body;
    const transaction = await this.sequelize.transaction();
    try {
      const [officeManager, user] = await Promise.all([
        this.branchModel.findOne({
          where: { officeManagerId: userId },
          useMaster: false,
          raw: true,
          attributes: ['id'],
          logging: false,
        }),
        this.userModel.findOne({
          where: { id: userId },
          raw: true,
          useMaster: false,
          logging: false,
        }),
      ]);
      if (officeManager && user.isActive !== isActive)
        throw new HttpException(
          'Change office manager before deactivate this employee',
          400,
        );

      await this.userModel.update(
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          userName,
          pmId,
          allowedLeaveDay,
          type,
          level,
          salary,
          sex,
          isActive,
          branchId,
          picture,
          birthday,
          position,
        },
        { where: { id: userId }, transaction, logging: false },
      );
      await this.workingTimeModel.update(
        {
          morningStartAt: workingTime.morningStartAt,
          morningEndAt: workingTime.morningEndAt,
          morningWorking: calculateWorkingTime(
            workingTime.morningStartAt,
            workingTime.morningEndAt,
          ),
          afternoonStartAt: workingTime.afternoonStartAt,
          afternoonEndAt: workingTime.afternoonEndAt,
          afternoonWorking: calculateWorkingTime(
            workingTime.afternoonStartAt,
            workingTime.afternoonEndAt,
          ),
        },
        { where: { userId }, transaction, logging: false },
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  }

  async getAccountEmployeesPaging(body: IParamGetUsersPaging) {
    const limit = body.limit || 10;
    const search = body.search ? `%${body.search}%` : '%%';
    const currentPage = body.currentPage ? Number(body.currentPage) - 1 : 0;
    const offset = currentPage * limit;
    const filters = body.filters || [];
    const defaultGetIsActive = body?.filters?.some(
      ({ key, names }) => key === 'isActive' && names.length,
    )
      ? ''
      : `AND "User"."isActive" = true`;
    const filterValues = filters.map((item) => {
      if (item.key === 'position')
        return `"User"."position" IN (${item?.names?.map((name) => `'${name}'`)})`;
      if (item.key === 'level')
        return `"User"."level" IN (${item?.names?.map((name) => `'${name}'`)})`;
      if (item.key === 'isActive')
        return `"User"."isActive" IN (${item?.names?.map((name) => name)})`;
      if (item.key === 'sex')
        return `"User"."sex" IN (${item?.names?.map((name) => `'${name}'`)})`;
      if (item.key === 'type') {
      }
      return `"User"."type" IN (${item?.names?.map((name) => `'${name}'`)})`;
    });
    const pmIds = body.pmIds || [];
    pmIds.length &&
      filterValues.push(
        `"User"."pmId" IN (${pmIds.map((pmId) => `'${pmId}'`)})`,
      );
    const filterSql = filterValues.length
      ? `AND ${filterValues.join(' AND ')}`
      : '';

    const [rawUsers, total] = await Promise.all([
      this.sequelize.query(
        `
        SELECT "User"."id",
              "User"."firstName",
              "User"."lastName",
              "User"."email",
              "User"."phoneNumber",
              "User"."userName",
              "User"."pmId",
              "User"."allowedLeaveDay",
              "User"."type",
              "User"."level",
              "User"."salary",
              "User"."sex",
              "User"."isActive",
              "User"."branchId",
              "User"."picture",
              "User"."birthday",
              "User"."position",
              "User"."createdAt",
              "User"."updatedAt",
              "pm"."id"                        AS "pm.id",
              "pm"."firstName"                 AS "pm.firstName",
              "pm"."lastName"                  AS "pm.lastName",
              "pm"."picture"                   AS "pm.picture",
              "branch"."id"                    AS "branch.id",
              "branch"."name"                  AS "branch.name",
              "branch"."morningStartAt"        AS "branch.morningStartAt",
              "branch"."morningEndAt"          AS "branch.morningEndAt",
              "branch"."morningWorking"        AS "branch.morningWorking",
              "branch"."afternoonStartAt"      AS "branch.afternoonStartAt",
              "branch"."afternoonEndAt"        AS "branch.afternoonEndAt",
              "branch"."afternoonWorking"      AS "branch.afternoonWorking",
              "branch"."officeManagerId"       AS "branch.officeManagerId",
              "branch"."createdAt"             AS "branch.createdAt",
              "branch"."updatedAt"             AS "branch.updatedAt",
              "workingTime"."id"               AS "workingTime.id",
              "workingTime"."userId"           AS "workingTime.userId",
              "workingTime"."morningStartAt"   AS "workingTime.morningStartAt",
              "workingTime"."morningEndAt"     AS "workingTime.morningEndAt",
              "workingTime"."morningWorking"   AS "workingTime.morningWorking",
              "workingTime"."afternoonStartAt" AS "workingTime.afternoonStartAt",
              "workingTime"."afternoonEndAt"   AS "workingTime.afternoonEndAt",
              "workingTime"."afternoonWorking" AS "workingTime.afternoonWorking",
              "workingTime"."createdAt"        AS "workingTime.createdAt",
              "workingTime"."updatedAt"        AS "workingTime.updatedAt"
        FROM "users" AS "User"
                LEFT OUTER JOIN "users" AS "pm" ON "User"."pmId" = "pm"."id"
                LEFT OUTER JOIN "branches" AS "branch" ON "User"."branchId" = "branch"."id"
                LEFT OUTER JOIN "workingTimes" AS "workingTime" ON "User"."id" = "workingTime"."userId"
        WHERE (
                "User"."firstName" ilike :search OR "User"."lastName" ilike :search
                OR concat("User"."firstName", "User"."lastName") ilike :search
                OR "User"."userName" ilike :search
                OR "User"."email" ilike :search
            ) ${defaultGetIsActive} ${filterSql}
        ORDER BY CONCAT("User"."firstName", "User"."lastName") ASC
        LIMIT :limit OFFSET :offset;
        `,
        {
          replacements: { search, limit, offset },
          type: QueryTypes.SELECT,
          logging: false,
        },
      ),
      this.sequelize.query(
        `
        SELECT count(*)
        FROM "users" AS "User"
        WHERE (
                "User"."firstName" ilike :search OR "User"."lastName" ilike :search
                OR concat("User"."firstName", "User"."lastName") ilike :search
                OR "User"."userName" ilike :search
                OR "User"."email" ilike :search
            ) ${filters.length ? `AND ${filterValues.join(' AND ')}` : ''};
      `,
        { replacements: { search }, type: QueryTypes.SELECT, logging: false },
      ),
    ]);

    const users = rawUsers.map((user: User) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userName: user.userName,
      pmId: user.pmId,
      allowedLeaveDay: user.allowedLeaveDay,
      type: user.type,
      level: user.level,
      salary: user.salary,
      sex: user.sex,
      isActive: user.isActive,
      branchId: user.branchId,
      picture: user.picture,
      birthday: user.birthday,
      position: user.position,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      pm: {
        id: user['pm.id'],
        firstName: user['pm.firstName'],
        lastName: user['pm.lastName'],
        picture: user['pm.picture'],
      },
      branch: {
        id: user['branch.id'],
        name: user['branch.name'],
        morningStartAt: user['branch.morningStartAt'],
        morningEndAt: user['branch.morningEndAt'],
        morningWorking: user['branch.morningWorking'],
        afternoonStartAt: user['branch.afternoonStartAt'],
        afternoonEndAt: user['branch.afternoonEndAt'],
        afternoonWorking: user['branch.afternoonWorking'],
        officeManagerId: user['branch.officeManagerId'],
        createdAt: user['branch.createdAt'],
        updatedAt: user['branch.updatedAt'],
      },
      workingTime: {
        id: user['workingTime.id'],
        userId: user['workingTime.userId'],
        morningStartAt: user['workingTime.morningStartAt'],
        morningEndAt: user['workingTime.morningEndAt'],
        morningWorking: user['workingTime.morningWorking'],
        afternoonStartAt: user['workingTime.afternoonStartAt'],
        afternoonEndAt: user['workingTime.afternoonEndAt'],
        afternoonWorking: user['workingTime.afternoonWorking'],
        createdAt: user['workingTime.createdAt'],
        updatedAt: user['workingTime.updatedAt'],
      },
    }));
    return {
      users,
      total: Math.ceil(+(total as any)[0].count / limit),
      currentPage: body.currentPage,
    };
  }

  async getAllManagers() {
    return this.sequelize.query(
      `
      SELECT distinct
       "pm"."id",
       "pm"."firstName",
       "pm"."lastName",
       "pm"."picture"
      FROM "users" AS "User"
        INNER JOIN "users" AS "pm" ON "User"."pmId" = "pm"."id"
      WHERE "User"."pmId" IS NOT NULL;`,
      { type: QueryTypes.SELECT, logging: false },
    );
  }

  async changeActiveEmployee(id: string, body: { isActive: boolean }) {
    const transaction = await this.sequelize.transaction();
    try {
      const officeManager = await this.branchModel.findOne({
        where: { officeManagerId: id },
        useMaster: false,
        raw: true,
        attributes: ['id'],
        logging: false,
      });
      if (officeManager)
        throw new HttpException(
          'Change office manager before deactivate this employee',
          400,
        );
      await this.userModel.update(
        { isActive: body.isActive },
        { where: { id }, transaction, logging: false },
      );

      transaction.commit();
    } catch (error: any) {
      transaction.rollback();
      throw new HttpException(error.message, error.status);
    }
  }
}
