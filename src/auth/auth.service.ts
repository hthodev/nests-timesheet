import { HttpException, Injectable } from '@nestjs/common';
import { IAuthentication, IResponseGoogle, IUserLogin } from './auth.interface';
import { User } from 'models/user.model';
import { Op } from 'sequelize';
import bcrypt from "bcrypt";
import { hashPassword } from 'src/shares/ultis';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()

export class AuthService {
  @InjectModel(User)
  private readonly userModel: typeof User;
  verifyDomain(user: IUserLogin): object {
    const domainEmail = process.env.DOMAIN_EMAIL || 'ncc.asia';
    if (user?.hd === domainEmail || user.email.match(domainEmail)) {
      return user;
    }

    throw new HttpException("This account google isn't register!", 400);
  };

  async verifyGoogle(payload: IResponseGoogle) {
    this.verifyDomain({ ...payload, firstName: payload.family_name, lastName: payload.given_name })
    const user: User = await this.userModel.findOne({
      where: { 
        email: payload.email,
      },
      attributes: ["id"],
      useMaster: false
    });
    
    if (user) {
      return { ...payload, userId: user.id }
    };
    throw new HttpException("This account google isn't register!", 400);
  };

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