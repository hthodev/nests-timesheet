import { Task } from "models/task.model";
import { ProjectTask } from "models/projectTask.model";

export interface IBodyTask {
    id?: string;
    name: string;
    type: string;
}

export interface IProjectTask extends Omit<Task, 'projectTasks'> {
    projectTasks: { projectId: string }[]
}