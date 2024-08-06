export interface ICreateUserParam {
  userName: string;
  password: string;
  roleNames: string[];
  isActive: boolean;
  allowedLeaveDay: number;
  branchId: string;
  morningStartAt: string;
  morningEndAt: string;
  afternoonStartAt: string;
  afternoonEndAt: string;
  morningWorking: number;
  afternoonWorking: number;
  email: string;
  type: string;
  firstName: string;
  lastName: string;
  sex: number;
  positionId: number;
  managerId: number | null;
  level: string;
  salary: number;
  beginLevel: number;
  startDateAt: string;
  salaryAt: string;
  address: string;
  phoneNumber: string;
  workingTimeId: string;
}
