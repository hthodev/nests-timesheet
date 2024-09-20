import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationBodyPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const { error } = this.schema.validate(value);
      if (error) {
        throw new BadRequestException('Validation failed: ' + error.message);
      }
    }
    return value;
  }
}
