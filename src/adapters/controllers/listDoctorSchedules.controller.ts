import { Controller, Request, Response } from '@/adapters/controllers/controller';
import { ErrorPresenter } from '@/adapters/presenters/error.presenter';
import { SchedulePresenter } from '@/adapters/presenters/schedule.presenter';
import { ValidationError } from '@/domain/errors';
import {
  ListDoctorSchedulesUseCase,
} from '@/domain/usecases/listDoctorSchedule/listDoctorSchedules.usecase';

export class ListDoctorSchedulesController implements Controller {
  constructor(private useCase: ListDoctorSchedulesUseCase) { }

  execute = async (input: Request): Promise<Response> => {
    try {
      if (!input.params) {
        throw new ValidationError('params is empty');
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
