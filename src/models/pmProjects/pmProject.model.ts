import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Project } from '../projects/project.model';
import { User } from '../users/user.model';

@Table({
  tableName: 'pmProjects',
  timestamps: true,
})
export class PmProject extends Model<PmProject> {
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
  projectPm: Project

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;
  @BelongsTo(() => User)
  pmProject: User
}
