import { ValidationError } from '@/domain/errors';
import { UpdateScheduleUseCase } from '@/domain/usecases/updateSchedule/updateSchedule.usecase';
import { ErrorPresenter } from '../presenters/error.presenter';
import { SchedulePresenter } from '../presenters/schedule.presenter';
import { Controller, Request, Response } from './controller';

export class UpdateScheduleController implements Controller {
  constructor(private useCase: UpdateScheduleUseCase) { }

  execute = async (input: Request): Promise<Response> => {
    try {
      if (!input.body || !input.params) {
        throw new ValidationError('body or params is empty');
      }

      const { schedule } = await this.useCase.execute({
        endAt: input.body.endAt,
        startAt: input.body.startAt,
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
