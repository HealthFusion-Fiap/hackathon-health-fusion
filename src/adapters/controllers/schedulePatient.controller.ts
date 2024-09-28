import { Controller, Request, Response } from '@/adapters/controllers/controller';
import { ErrorPresenter } from '@/adapters/presenters/error.presenter';
import { SchedulePresenter } from '@/adapters/presenters/schedule.presenter';
import { UnauthorizedError, ValidationError } from '@/domain/errors';
import { Jwt } from '@/domain/services/jwt';
import { SchedulePatientUseCase } from '@/domain/usecases/schedulePatient/schedulePatient.usecase';

export class SchedulePatientController implements Controller {
  constructor(private useCase: SchedulePatientUseCase, private jwt: Jwt) { }

  execute = async (input: Request): Promise<Response> => {
    try {
      if (!input.params || !input.headers) {
        throw new ValidationError('params or headers are empty');
      }

      const patientId = this.jwt.login(input.headers.authorization);

      if (!patientId) {
        throw new UnauthorizedError('Invalid token');
      }

      const { schedule } = await this.useCase.execute({
        patientId,
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
