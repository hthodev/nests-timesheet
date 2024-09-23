import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Project } from './project.model';
import { Task } from './task.model';

@Table({
  tableName: 'taskProjects',
  timestamps: true,
})
export class TaskProject extends Model<TaskProject> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  projectId: string;
  @BelongsTo(() => Project)
  projectUser: Project

  @ForeignKey(() => Task)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  taskId: string;
  @BelongsTo(() => Task)
  taskProject: Task
}
