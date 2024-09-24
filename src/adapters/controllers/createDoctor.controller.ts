import CreateDoctorUsecase from '@/domain/usecases/createDoctor/createDoctor.usecase';
import { DoctorPresenter } from '../presenters/doctor.presenter';
import { ErrorPresenter } from '../presenters/error.presenter';
import { Controller, Request, Response } from './controller';

export class CreateDoctorController implements Controller {
  constructor(private useCase: CreateDoctorUsecase) { }

  execute = async (input: Request): Promise<Response> => {
    try {
      if (!input.body) {
        return {
          body: undefined,
          code: 400,
        };
      }

      const { doctor } = await this.useCase.execute({
        name: input.body.name,
        cpf: input.body.cpf,
        crm: input.body.crm,
        email: input.body.email,
        password: input.body.password,
      });

      const presenter = DoctorPresenter.toPresent(doctor);

      return { code: 201, body: presenter };
    } catch (error) {
      console.error(error);
      return ErrorPresenter.toPresent(error as Error);
    }
  };
}
