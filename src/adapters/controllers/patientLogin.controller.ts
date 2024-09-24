import PatientLoginUsecase from '@/domain/usecases/patientLogin/patientLogin.usecase';
import { AuthPresenter } from '../presenters/auth.presenter';
import { ErrorPresenter } from '../presenters/error.presenter';
import { Controller, Request, Response } from './controller';

export class PatientLoginController implements Controller {
  constructor(private useCase: PatientLoginUsecase) { }

  execute = async (input: Request): Promise<Response> => {
    try {
      if (!input.body) {
        return {
          body: undefined,
          code: 400,
        };
      }

      const result = await this.useCase.execute({
        email: input.body.email,
        password: input.body.password,
      });

      const presenter = AuthPresenter.toPresent(result);

      return { code: 200, body: presenter };
    } catch (error) {
      console.error(error);
      return ErrorPresenter.toPresent(error as Error);
    }
  };
}
