import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';
import { Project } from './project.model';
import { Task } from './task.model';

@Table({
  tableName: 'timeSheets',
  timestamps: true,
})
export class TimeSheet extends Model<TimeSheet> {
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
  note: string;

  @ForeignKey(() => Task)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  taskId: string
  @BelongsTo(() => Task)
  task: Task;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  projectId: string;
  @BelongsTo(() => Project)
  project: Project

  @Column({
    type: DataType.ENUM('Approved', 'Rejected', 'Pending', 'Draft'),
    defaultValue: 'Draft',
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.ENUM('Approved', 'Rejected', 'Pending', 'Draft'),
    allowNull: true,
  })
  oldStatus: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  timeLog: number;

  @Column({
    type: DataType.ENUM('Normal', 'OverTime'),
    defaultValue: 'Normal',
    allowNull: false,
  })
  typeLog: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateLog: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true
  })
  isCustomerCharged: boolean;
}
