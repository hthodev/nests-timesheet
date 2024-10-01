import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { responseEndpoint } from 'src/responses/endpoint';
import { validate } from 'uuid';
import { JoiValidationBodyPipe } from 'src/middlewares/joiValidationPipe';
import { IBodyCustomer } from './customer.interface';
import { CustomerService } from './customer.service';

@Controller('/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('new-customer')
  async newCustomer(@Body() body: IBodyCustomer) {
    return responseEndpoint({
      result: await this.customerService.newCustomer(body),
    });
  }

  @Get('get-all-customers')
  async getAllCustomer() {
    return responseEndpoint({
      result: await this.customerService.findAllCustomers(),
    });
  }
}
