import { Table, Column, Model, DataType, BelongsTo, ForeignKey, HasOne } from 'sequelize-typescript';
import { Branch } from './branch.model';
import { WorkingTime } from './workingTime.model';

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
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  userName: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  pmId: string;
  @BelongsTo(() => User, { foreignKey: 'pmId' })
  pm: User;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  allowedLeaveDay: number;

  @Column({
    type: DataType.ENUM("Intern", "Staff", "Collaborator"),
    allowNull: false,
  })
  type: string;
  
  @Column({
    type: DataType.ENUM("Intern", "Fresher", "Junior", "Senior"),
    allowNull: false,
  })
  level: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  salary: number;

  @Column({
    type: DataType.ENUM("Male", "Female"),
    allowNull: false,
  })
  sex: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean;
  
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  branchId: string;

  @BelongsTo(() => Branch, { foreignKey: 'branchId', constraints: false })
  branch: Branch;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  picture: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  birthday;

  @Column({
    type: DataType.ENUM("Dev", "PM", "HR", "Admin", "Sale", "Tester", "Designer", "BA", "DA", "PO"),
    allowNull: false,
  })
  position;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bankName;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bankAccount;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  taxCode;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  emergencyContactPhone;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  insuranceStatus;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  identify;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  dateOfIssue;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  issuedBy;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  placeOfOrigin;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  placeOfResidence;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  currentAddress;

  @HasOne(() => WorkingTime, { foreignKey: 'userId', constraints: false })
  workingTime: WorkingTime;
}
