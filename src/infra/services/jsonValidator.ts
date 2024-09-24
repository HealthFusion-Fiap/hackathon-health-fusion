import Ajv, { ValidateFunction } from 'ajv';
import ajvErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import fs from 'fs';
import path from 'path';
import { ValidationError } from '@/domain/errors';
import PasswordValidator from '@/domain/validators/PasswordValidator';
import CpfValidator from '@/domain/validators/CpfValidator';

export default class JsonValidator {
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });

    try {
      ajvErrors(this.ajv);
      addFormats(this.ajv, ['date-time', 'email', 'date', 'int64', 'uri']);
      this.ajv.addFormat('password', PasswordValidator.validate);
      this.ajv.addFormat('cpf', CpfValidator.validate);
    } catch (error) {
      // ignore
    }
  }

  addSchema(schemaObj: any, schemaName: string): void {
    this.ajv.addSchema(schemaObj, schemaName);
  }

  removeSchema(schemaName: string): void {
    this.ajv.removeSchema(schemaName);
  }

  private async getSchema(schemaName: string): Promise<ValidateFunction> {
    if (this.ajv.getSchema(schemaName)) {
      return this.ajv.getSchema(schemaName) as ValidateFunction;
    }

    const schemaPath = path.resolve(
      `${__dirname}/../schemas/${schemaName}.json`,
    );

    return new Promise((resolve, reject) => {
      fs.readFile(schemaPath, (fileError, data) => {
        if (fileError) {
          reject(fileError);
        }

        try {
          const schemaDefault = {
            $async: true,
            type: 'object',
            additionalProperties: false,
            errorMessage: {
              required: "O campo '{{missingProperty}}' é obrigatório.",
              additionalProperties: "Não deve ter propriedade adicional '{{additionalProperty}}'.",
            },
          };

          const schemaParsed = JSON.parse(data.toString());

          const schemaObj = {
            $id: schemaParsed.$id,
            ...schemaDefault,
            ...schemaParsed,
          };

          if (!this.ajv.getSchema(schemaName)) {
            this.ajv.addSchema(schemaObj, schemaName);
          }

          resolve(this.ajv.getSchema(schemaName) as ValidateFunction);
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async validate(schemaName: string, data: unknown): Promise<void> {
    const jsonSchema = await this.getSchema(schemaName);

    try {
      await jsonSchema(data);
    } catch (error) {
      if (!(error instanceof Ajv.ValidationError)) {
        throw error;
      }

      throw new ValidationError(JSON.stringify(error.errors, null, 2));
    }
  }
}
