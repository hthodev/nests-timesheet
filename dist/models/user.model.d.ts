import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    allowedLeaveDay: number;
    type: string;
    level: string;
    salary: number;
    sex: number;
    isActive: boolean;
    branchId: string;
}
