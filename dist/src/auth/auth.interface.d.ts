export interface IUserLogin {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    accessToken: string;
}
export interface IAuthentication {
    password: string;
    rememberClient: boolean;
    userNameOrEmailAddress: string;
}
