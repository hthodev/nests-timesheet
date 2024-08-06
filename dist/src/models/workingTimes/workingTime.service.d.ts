import { WorkingTime } from '../../../models/workingTime.model';
export declare class WorkingTimeService {
    private readonly workingTimeModel;
    constructor(workingTimeModel: typeof WorkingTime);
    create(workingTime: Partial<WorkingTime>, transaction: any): Promise<void | WorkingTime>;
    findAll(): Promise<WorkingTime[]>;
    findOne(id: string): Promise<WorkingTime>;
    remove(id: string): Promise<void>;
}
