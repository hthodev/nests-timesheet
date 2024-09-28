import { TimeSheet } from "models/timesheet.model";

export enum STATUS {
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  PENDING = 'Pending',
  DRAFT = 'Draft',
}

export enum TYPE_LOG {
  NORMAL = 'Normal',
  OVER_TIME = 'OverTime',
}

export interface IBodyTimeSheet {
  note: string;
  taskId: string;
  projectId: string;
  timeLog: number;
  typeLog: string;
  dateLog: Date;
  isCustomerCharged?: boolean;
}

export interface IBodyWeaklyTimeSheet {
  monday: string;
  sunday: string;
}

export interface IWeaklyTimeSheet extends TimeSheet {
  projectName: string;
  projectTitle: string;
  taskName: string;
  taskType: string;
}