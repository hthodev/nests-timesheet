export interface IUserLogin {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken?: string;
  hd?: string;
  name?: string;
}

export interface IResponseGoogle {
  hd: string
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
}
