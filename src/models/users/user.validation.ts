import { JoiPipeModule, JoiSchema, JoiSchemaOptions, CREATE, UPDATE } from 'nestjs-joi';
import * as Joi from 'joi';

@JoiSchemaOptions({
    allowUnknown: false,
})
export class MyInformationDTO {
    @JoiSchema(Joi.string().uuid().required())
    id: string;
}

