import { User } from '../../../models/user.model';
import { ICreateUserParam } from './user.interface';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: typeof User);
    private readonly sequelize;
    private readonly workingTimeModel;
    createNewUser(body: ICreateUserParam): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    remove(id: string): Promise<void>;
}
