import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'workingTimes',
  timestamps: true,
})
export class WorkingTime extends Model<WorkingTime> {
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
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  morningStartAt: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  morningEndAt: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  morningWorking: Number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  afternoonStartAt: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  afternoonEndAt: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  afternoonWorking: Number;
}
