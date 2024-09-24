import { CreateScheduleUseCase } from '@/domain/usecases/createSchedule/createSchedule.usecase';
import { ErrorPresenter } from '../presenters/error.presenter';
import { SchedulePresenter } from '../presenters/schedule.presenter';
import { Controller, Request, Response } from './controller';
import { ValidationError } from '@/domain/errors';

export class CreateScheduleController implements Controller {
  constructor(private useCase: CreateScheduleUseCase) { }

  execute = async (input: Request): Promise<Response> => {
    try {
      if (!input.body) {
        throw new ValidationError('body is empty');
      }

      const { schedule } = await this.useCase.execute({
        doctorId: input.body.doctorId,
        endAt: input.body.endAt,
        startAt: input.body.startAt,
      });

      const presenter = SchedulePresenter.toPresent(schedule);

      return { code: 201, body: presenter };
    } catch (error) {
      console.error(error);
      return ErrorPresenter.toPresent(error as Error);
    }
  };
}
