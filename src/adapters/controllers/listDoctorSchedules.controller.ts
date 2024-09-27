import { Controller, Request, Response } from '@/adapters/controllers/controller';
import { ErrorPresenter } from '@/adapters/presenters/error.presenter';
import { SchedulePresenter } from '@/adapters/presenters/schedule.presenter';
import { UnauthorizedError, ValidationError } from '@/domain/errors';
import { Jwt } from '@/domain/services/jwt';
import {
  ListDoctorSchedulesUseCase,
} from '@/domain/usecases/listDoctorSchedule/listDoctorSchedules.usecase';

export class ListDoctorSchedulesController implements Controller {
  constructor(private useCase: ListDoctorSchedulesUseCase, private jwt: Jwt) { }

  execute = async (input: Request): Promise<Response> => {
    try {
      if (!input.params || !input.headers) {
        throw new ValidationError('params or headers are empty');
      }

      const patientId = this.jwt.login(input.headers.authorization);

      if (!patientId) {
        throw new UnauthorizedError('Invalid token');
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
