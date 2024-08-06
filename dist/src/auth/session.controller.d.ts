import { UserService } from './../models/users/user.service';
export declare class SessionController {
    private readonly userService;
    constructor(userService: UserService);
    getCurrentLoginInformations(): Promise<object>;
}
