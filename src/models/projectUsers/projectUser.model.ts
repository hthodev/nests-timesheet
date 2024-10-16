import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Project } from '../projects/project.model';
import { User } from '../users/user.model';

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
  project: Project

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;
  @BelongsTo(() => User)
  user: User
}
