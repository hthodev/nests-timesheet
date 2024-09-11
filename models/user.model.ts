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
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  userName: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  pmId: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
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
    allowNull: true,
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
    defaultValue: true,
  })
  isActive: boolean;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    references: {
      model: 'branches',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  branchId: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isOfficeManager: string;

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
    type: DataType.ENUM("DEV", "PM", "HR", "ADMIN", "SALE", "TESTER", "DESIGNER", "BA", "DA", "PO"),
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
}
