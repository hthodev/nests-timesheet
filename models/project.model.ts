import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { User } from './user.model';
import { ProjectUser } from './projectUser.model';
import { TimeSheet } from './timesheet.model';
import { Customer } from './customer.model';
import { PmProject } from './pmProject.model';

@Table({
  tableName: 'projects',
  timestamps: true,
})
export class Project extends Model<Project> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.ENUM("T&M", "Fixed cost", "Company", "ODC"),
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  projectStart: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  projectEnd: Date;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  customerId: string;
  @BelongsTo(() => Customer)
  customer: Customer

  @HasMany(() => ProjectUser)
  projectUsers: ProjectUser[]

  @HasMany(() => TimeSheet)
  timeSheets: TimeSheet[]

  @HasMany(() => PmProject)
  pmProjects: PmProject[]
}