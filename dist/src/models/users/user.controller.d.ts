import { UserService } from './user.service';
import { User } from 'models/user.model';
import { ICreateUserParam } from './user.interface';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(id: string): Promise<User>;
    createNewUser(body: ICreateUserParam): Promise<any>;
}
