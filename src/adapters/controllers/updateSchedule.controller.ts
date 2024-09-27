import { UnauthorizedError, ValidationError } from '@/domain/errors';
import { Jwt } from '@/domain/services/jwt';
import { UpdateScheduleUseCase } from '@/domain/usecases/updateSchedule/updateSchedule.usecase';
import { ErrorPresenter } from '../presenters/error.presenter';
import { SchedulePresenter } from '../presenters/schedule.presenter';
import { Controller, Request, Response } from './controller';

export class UpdateScheduleController implements Controller {
  constructor(private useCase: UpdateScheduleUseCase, private jwt: Jwt) { }

  execute = async (input: Request): Promise<Response> => {
    try {
      if (!input.body || !input.params || !input.headers) {
        throw new ValidationError('body or params or headers is empty');
      }

      console.log(input.headers);

      const doctorId = this.jwt.login(input.headers.authorization);

      if (!doctorId) {
        throw new UnauthorizedError('Invalid token');
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
