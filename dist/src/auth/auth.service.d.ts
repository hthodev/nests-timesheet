import { IAuthentication, IUserLogin } from './auth.interface';
import { User } from 'models/user.model';
export declare class AuthService {
    private readonly userModel;
    verifyLogin(user: IUserLogin): object;
    authenticate(body: IAuthentication): Promise<User>;
}
