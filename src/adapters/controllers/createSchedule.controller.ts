import { UnauthorizedError, ValidationError } from '@/domain/errors';
import { Jwt } from '@/domain/services/jwt';
import { CreateScheduleUseCase } from '@/domain/usecases/createSchedule/createSchedule.usecase';
import { ErrorPresenter } from '../presenters/error.presenter';
import { SchedulePresenter } from '../presenters/schedule.presenter';
import { Controller, Request, Response } from './controller';

export class CreateScheduleController implements Controller {
  constructor(
    private useCase: CreateScheduleUseCase,
    private jwt: Jwt,
  ) { }

  execute = async (input: Request): Promise<Response> => {
    try {
      if (!input.body || !input.headers) {
        throw new ValidationError('body or headers is empty');
      }

      const doctorId = this.jwt.login(input.headers.authorization);

      if (!doctorId) {
        throw new UnauthorizedError('Invalid token');
      }

      const { schedule } = await this.useCase.execute({
        doctorId,
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
