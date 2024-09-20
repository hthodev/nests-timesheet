import { Branch } from 'models/branch.model';
import { User } from 'models/user.model';
import { WorkingTime } from 'models/workingTime.model';

export enum POSITION {
  DEV = 'Dev',
  PM = 'PM',
  HR = 'HR',
  ADMIN = 'Admin',
  SALE = 'Sale',
  TESTER = 'Tester',
  DESIGNER = 'Designer',
  BA = 'BA',
  DA = 'DA',
  PO = 'PO',
}

export enum TYPE {
  INTERN = "Intern",
  STAFF = "Staff",
  COLLABORATOR = "Collaborator"
}

export enum LEVEL {
  INTERN = "Intern", 
  FRESHER = "Fresher",
  JUNIOR = "Junior",
  SENIOR = "Senior"
}

export enum SEX {
  MALE = "Male",
  FEMALE = "Female"
}

export interface ICreateUserParam {
  branchId: string;
  workingTime: {
    morningStartAt: string;
    morningEndAt: string;
    afternoonStartAt: string;
    afternoonEndAt: string;
  };
  firstName: string;
  lastName: string;
  userName: string;
  birthday: string;
  email: string;
  phoneNumber: string;
  pmId: string;
  position: POSITION;
  type: TYPE;
  level: LEVEL;
  salary: number;
  sex: SEX;
}

export interface IParamGetUsersPaging {
  currentPage?: number;
  limit?: number;
  search?: string;
  filters?: {
    key: 'position' | 'type' | 'level' | 'sex' | 'isActive';
    names: string[] | boolean[];
  }[];
  pmIds?: string[];
}

export interface IUserRelation extends Omit<User, 'pm'> {
  pm: {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    picture: string | null;
  };
  branch: Branch;
  workingTime: WorkingTime;
}
