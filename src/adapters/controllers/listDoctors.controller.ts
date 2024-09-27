import { UnauthorizedError, ValidationError } from '@/domain/errors';
import { Jwt } from '@/domain/services/jwt';
import ListDoctorsUseCase from '@/domain/usecases/listDoctors/listDoctors.usecase';
import { DoctorPresenter } from '../presenters/doctor.presenter';
import { ErrorPresenter } from '../presenters/error.presenter';
import { Controller, Request, Response } from './controller';

export default class ListDoctorsController implements Controller {
  constructor(private useCase: ListDoctorsUseCase, private jwt: Jwt) { }

  execute = async (input: Request): Promise<Response> => {
    try {
      if (!input.headers) {
        throw new ValidationError('headers is empty');
      }

      const patientId = this.jwt.login(input.headers.authorization);

      if (!patientId) {
        throw new UnauthorizedError('Invalid token');
      }

      const { doctors } = await this.useCase.execute();

      const presenter = doctors.map(DoctorPresenter.toPresent);

      return { code: 200, body: presenter };
    } catch (error) {
      console.error(error);
      return ErrorPresenter.toPresent(error as Error);
    }
  };
}
