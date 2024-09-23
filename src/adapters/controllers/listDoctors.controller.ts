import ListDoctorsUseCase from '@/domain/usecases/listDoctors/listDoctors.usecase';
import { DoctorPresenter } from '../presenters/doctor.presenter';
import { ErrorPresenter } from '../presenters/error.presenter';
import { Controller, Response } from './controller';

export default class ListDoctorsController implements Controller {
  constructor(private useCase: ListDoctorsUseCase) { }

  execute = async (): Promise<Response> => {
    try {
      const { doctors } = await this.useCase.execute();

      const presenter = doctors.map(DoctorPresenter.toPresent);

      return { code: 201, body: presenter };
    } catch (error) {
      console.error(error);
      return ErrorPresenter.toPresent(error as Error);
    }
  };
}
