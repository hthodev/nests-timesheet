import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Customer } from '../customers/customer.model';
import { ProjectUser } from '../projectUsers/projectUser.model';
import { TimeSheet } from '../timesheets/timesheet.model';
import { PmProject } from '../pmProjects/pmProject.model';

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
    type: DataType.ENUM("T&M", "Fixed cost", "Company", "ODC", "Non-billable"),
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