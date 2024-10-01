import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op, UUIDV4 } from 'sequelize';
import { v4 as uuidV4 } from 'uuid';
import { Customer } from 'models/customer.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}
  async findOneCustomer({ id = null, name = null, transaction = null }) {
    return await this.customerModel.findOne({
      where: { [Op.or]: { id, name } },
      transaction,
      logging: false,
      raw: true,
      useMaster: false,
    });
  }

  async newCustomer(body) {
    const customer = await this.findOneCustomer({ name: body.name });
    if (customer.name === body.name)
      throw new BadRequestException('name customer have been already');
    return await this.customerModel.create(body);
  }

  async findAllCustomers() {
    return await this.customerModel.findAll({ logging: false, raw: true, useMaster: false });
  }
}
