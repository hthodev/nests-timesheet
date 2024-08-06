import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'branches',
  timestamps: true,
})
export class Branch extends Model<Branch> {
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
