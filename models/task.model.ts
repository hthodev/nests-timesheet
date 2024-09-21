import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';

@Table({
  tableName: 'tasks',
  timestamps: true,
})
export class Task extends Model<Task> {
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
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;
}
