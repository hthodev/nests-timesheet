import { WorkingTimeService } from './workingTime.service';
import { WorkingTime } from 'models/workingTime.model';
export declare class UserController {
    private readonly workingTimeService;
    constructor(workingTimeService: WorkingTimeService);
    getUser(id: string): Promise<WorkingTime>;
}
