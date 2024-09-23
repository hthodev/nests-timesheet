import { Task } from "models/task.model";
import { TaskProject } from "models/taskProject.model";

export interface IBodyTask {
    id?: string;
    name: string;
    type: string;
}

export interface ITaskProjects extends Omit<Task, 'taskProjects'> {
    taskProjects: { projectId: string }[]
}