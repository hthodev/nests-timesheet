import { Branch } from 'models/branch.model';
import { User } from 'models/user.model';
import { WorkingTime } from 'models/workingTime.model';

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
  position: "DEV" | "PM" | "HR" | "ADMIN" | "SALE" | "TESTER" | "DESIGNER" | "BA" | "DA" | "PO";
  type: "INTERN" | "STAFF" | "COLLABORATOR";
  level: "INTERN" | "FRESHER" | "JUNIOR" | "SENIOR";
  salary: number;
  sex: "MALE" | "FEMALE";
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
