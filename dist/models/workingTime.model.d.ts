import { Model } from 'sequelize-typescript';
export declare class WorkingTime extends Model<WorkingTime> {
    id: string;
    userId: string;
    morningStartAt: string;
    morningEndAt: string;
    morningWorking: Number;
    afternoonStartAt: string;
    afternoonEndAt: string;
    afternoonWorking: Number;
}
