import { AuthService } from './auth.service';
import { IAuthentication } from './auth.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): {
        result: {};
        targetUrl: any;
        success: boolean;
        error: any;
        unAuthorizedRequest: boolean;
        __abp: boolean;
    };
    authenticate(body: IAuthentication): Promise<{
        result: {};
        targetUrl: any;
        success: boolean;
        error: any;
        unAuthorizedRequest: boolean;
        __abp: boolean;
    }>;
}
