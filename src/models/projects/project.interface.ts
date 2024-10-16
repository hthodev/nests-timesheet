export enum PROJECT_USER_TYPE {
  MEMBER = 'Member',
  PROJECT_MANAGER = 'Project Manager',
  SUPERVISOR = 'Supervisor',
}

export interface IBodyProject {
  customerId: string;
  projectName: string;
  projectType: string;
  projectStart: Date;
  projectEnd?: Date;
  projectUsers: {
    userId: string;
    projectUserType: PROJECT_USER_TYPE;
  }[];
  tasks: { id: string }[];
  allEmployeesSelected: boolean;
}

interface IPMProject {
  id: string;
  projectId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  pmProject: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

interface IProjectUser {
  userId: string;
}

interface IProject {
  id: string;
  name: string;
  type: string;
  pmProjects: IPMProject[];
  projectUsers: IProjectUser[];
}

export interface ILandingCustomerProject {
  id: string;
  name: string;
  region: string;
  projects: IProject[];
}
