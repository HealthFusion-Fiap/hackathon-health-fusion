import { Controller, Request, Response } from '@/adapters/controllers/controller';
import { ErrorPresenter } from '@/adapters/presenters/error.presenter';
import {
  ListDoctorSchedulesUseCase,
} from '@/domain/usecases/listDoctorSchedule/listDoctorSchedulesUseCase';
import { SchedulePresenter } from '@/adapters/presenters/schedule.presenter';

export class ListDoctorSchedulesController implements Controller {
  constructor(
    private useCase: ListDoctorSchedulesUseCase,
  ) {

  }

  execute = async (input: Request): Promise<Response> => {
    try {
      if (!input.params) {
        return {
          body: undefined,
          code: 400,
        };
      }

      const { schedules } = await this.useCase.execute(input.params.doctorId);

      const presenter = schedules.map(SchedulePresenter.toPresent);

      return { code: 201, body: presenter };
    } catch (error) {
      console.error(error);
      return ErrorPresenter.toPresent(error as Error);
    }
  };
}
