import { ValidationError } from '@/domain/errors';
import CreatePatientUsecase from '@/domain/usecases/createPatient/createPatient.usecase';
import { ErrorPresenter } from '../presenters/error.presenter';
import { PatientPresenter } from '../presenters/patient.presenter';
import { Controller, Request, Response } from './controller';

export class CreatePatientController implements Controller {
  constructor(private useCase: CreatePatientUsecase) { }

  execute = async (input: Request): Promise<Response> => {
    try {
      if (!input.body) {
        throw new ValidationError('body is empty');
      }

      const { patient } = await this.useCase.execute({
        name: input.body.name,
        cpf: input.body.cpf,
        email: input.body.email,
        password: input.body.password,
      });

      const presenter = PatientPresenter.toPresent(patient);

      return { code: 201, body: presenter };
    } catch (error) {
      console.error(error);
      return ErrorPresenter.toPresent(error as Error);
    }
  };
}
