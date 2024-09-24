import DoctorLoginUsecase from '@/domain/usecases/doctorLogin/doctorLogin.usecase';
import { AuthPresenter } from '../presenters/auth.presenter';
import { ErrorPresenter } from '../presenters/error.presenter';
import { Controller, Request, Response } from './controller';

export class DoctorLoginController implements Controller {
  constructor(private useCase: DoctorLoginUsecase) { }

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
