import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';
import { Project } from './project.model';

@Table({
  tableName: 'projectUsers',
  timestamps: true,
})
export class ProjectUser extends Model<ProjectUser> {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;
  @BelongsTo(() => User)
  userProject: User
}
