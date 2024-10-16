import { Task } from "./task.model";

export interface IBodyTask {
    id?: string;
    name: string;
    type: string;
}

export interface IProjectTask extends Omit<Task, 'projectTasks'> {
    projectTasks: { projectId: string }[]
}