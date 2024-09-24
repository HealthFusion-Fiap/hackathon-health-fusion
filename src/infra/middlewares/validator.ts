import { NextFunction, Request, Response } from 'express';
import JsonValidator from '../services/jsonValidator';
import { ValidationError } from '@/domain/errors';

function interpolateErrorMessages(schemaErr: any): string {
  let { message } = schemaErr;
  // regex to find {{}} in string
  const regex = /{{(.*?)}}/g;
  const matches = message.match(regex);

  if (matches) {
    message = message.replace(regex, (key: string) => {
      const keyName = key.replace(/[{}]/g, '');

      return schemaErr.params.errors[0].params[keyName];
    });
  }

  return message;
}

export default (schema: string) => async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const jsonValidator = new JsonValidator();

    await jsonValidator.validate(schema, {
      ...request.body,
      ...request.query,
      ...request.params,
    });

    return next();
  } catch (schemaError) {
    if (!(schemaError instanceof ValidationError)) {
      return response.status(500).send({
        message: 'Something went wrong when validating the request',
      });
    }

    const schemaErrMsg = JSON.parse(schemaError.message);
    const firstSchemaErr = schemaErrMsg[0];
    const message = interpolateErrorMessages(firstSchemaErr);

    return response.status(400).send({ message });
  }
};
