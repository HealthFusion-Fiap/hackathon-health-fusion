import { Controller, Request, Response } from '@/adapters/controllers/controller';
import {
  CreatePatientScheduleUseCase,
} from '@/domain/usecases/createPatientSchedule/createPatientScheduleUseCase';
import { ErrorPresenter } from '@/adapters/presenters/error.presenter';
import { SchedulePresenter } from '@/adapters/presenters/schedule.presenter';

export class CreatePatientScheduleController implements Controller {
  constructor(
    private useCase: CreatePatientScheduleUseCase,
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

      const { schedule } = await this.useCase.execute({
        patientId: input.params.patientId,
        scheduleId: input.params.scheduleId,
      });

      const presenter = SchedulePresenter.toPresent(schedule);

      return { code: 201, body: presenter };
    } catch (error) {
      console.error(error);
      return ErrorPresenter.toPresent(error as Error);
    }
  };
}
