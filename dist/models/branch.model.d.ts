import { Model } from 'sequelize-typescript';
export declare class Branch extends Model<Branch> {
    id: string;
    name: string;
    morningStartAt: string;
    morningEndAt: string;
    morningWorking: Number;
    afternoonStartAt: string;
    afternoonEndAt: string;
    afternoonWorking: Number;
}
