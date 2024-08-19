// src/models/user.model.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
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
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  allowedLeaveDay: number;

  @Column({
    type: DataType.ENUM("INTERN", "STAFF", "COLLABORATOR"),
    allowNull: false,
  })
  type: string;
  
  @Column({
    type: DataType.ENUM("INTERN", "FRESHER", "JUNIOR", "SENIOR"),
    allowNull: false,
  })
  level: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  salary: number;

  @Column({
    type: DataType.ENUM("MALE", "FEMALE"),
    allowNull: false,
  })
  sex: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isActive: boolean;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  branchId: string;
}
