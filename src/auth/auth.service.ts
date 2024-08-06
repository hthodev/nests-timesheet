import { HttpException, Injectable } from '@nestjs/common';
import { IAuthentication, IUserLogin } from './auth.interface';
import { User } from 'models/user.model';
import { Op } from 'sequelize';
import bcrypt from "bcrypt";
import { hashPassword } from 'src/shares/ultis';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()

export class AuthService {
  @InjectModel(User)
  private readonly userModel: typeof User;
  verifyLogin(user: IUserLogin): object {
    const domainEmail = process.env.DOMAIN_EMAIL || 'ts@gmail.com';
    if (user?.email?.match(domainEmail)) {
      return user;
    }

    throw new HttpException("Can't login", 400);
  }

  authenticate(body: IAuthentication) {
    const user = this.userModel.findOne({
      where: { 
        [Op.or]: { 
          email: body.userNameOrEmailAddress,
          userName: body.userNameOrEmailAddress,
        },
      }
    })
    return user
  }
}

// function comparePassword(passwordInput, password): any {
//   passwordInput = hashPassword(passwordInput),
//   return bcrypt.compareSync(passwordInput, password);
// }