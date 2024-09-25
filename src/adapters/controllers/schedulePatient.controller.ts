import { Controller, Request, Response } from '@/adapters/controllers/controller';
import { ErrorPresenter } from '@/adapters/presenters/error.presenter';
import { SchedulePresenter } from '@/adapters/presenters/schedule.presenter';
import { ValidationError } from '@/domain/errors';
import {
  SchedulePatientUseCase,
} from '@/domain/usecases/schedulePatient/schedulePatient.usecase';

export class SchedulePatientController implements Controller {
  constructor(private useCase: SchedulePatientUseCase) { }

  execute = async (input: Request): Promise<Response> => {
    try {
      if (!input.params) {
        throw new ValidationError('params is empty');
      }

      const { schedule } = await this.useCase.execute({
        patientId: input.params.patientId,
        scheduleId: input.params.scheduleId,
      });

      const presenter = SchedulePresenter.toPresent(schedule);

      return { code: 200, body: presenter };
    } catch (error) {
      console.error(error);
      return ErrorPresenter.toPresent(error as Error);
    }
  };
}
