// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import { BadRequestError } from '@/domain/errors';
import { Jwt } from '@/domain/services/jwt';
import { UpdateScheduleUseCase } from '@/domain/usecases/updateSchedule/updateSchedule.usecase';
import { Schedule } from '@/entities/schedule.entity';
import { UpdateScheduleController } from './updateSchedule.controller';

describe('Suit tests for Update Schedule Controller', () => {
  let jwt: MockProxy<Jwt>;
  let updateScheduleUsecase: MockProxy<UpdateScheduleUseCase>;
  let updateScheduleController: UpdateScheduleController;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    updateScheduleUsecase = mock();
    jwt = mock();

    updateScheduleController = new UpdateScheduleController(updateScheduleUsecase, jwt);
  });

  afterAll(() => {
    (console.error as any).mockRestore();
  });

  it('should return 400 when body is not provided', async () => {
    const input = {
      body: undefined,
    };

    const { code } = await updateScheduleController.execute(input);

    expect(code).toBe(400);
  });

  it('should return 400 when params is not provided', async () => {
    const input = {
      body: {
        startAt: '2024-09-23T15:00:00.000Z',
        endAt: '2024-09-23T16:00:00.000Z',
      },
      params: undefined,
    };

    const { code } = await updateScheduleController.execute(input);

    expect(code).toBe(400);
  });

  it('should return 400 when some error occurs', async () => {
    const input = {
      body: {
        startAt: '2024-09-23T15:00:00.000Z',
        endAt: '2024-09-23T16:00:00.000Z',
      },
      params: {
        id: '123',
      },
      headers: {
        authorization: '1312312',
      },
    };

    updateScheduleUsecase.execute.mockRejectedValue(new BadRequestError('Bad Request'));
    jwt.login.mockResolvedValue('123' as never);

    const { code, body } = await updateScheduleController.execute(input);

    expect(code).toBe(400);
    expect(body).toEqual({ message: 'Bad Request' });
  });

  it('should return 200 when schedule is updated', async () => {
    const input = {
      body: {
        startAt: '2024-09-23T15:00:00.000Z',
        endAt: '2024-09-23T16:00:00.000Z',
      },
      params: {
        id: '123',
      },
      headers: {
        authorization: '123',
      },
    };

    const schedule = mock<Schedule>();
    updateScheduleUsecase.execute.mockResolvedValue({ schedule });
    jwt.login.mockResolvedValue('123' as never);

    const { code } = await updateScheduleController.execute(input);

    expect(code).toBe(200);
  });

  it('should return 500 when an error occurs', async () => {
    const input = {
      body: {
        startAt: '2024-09-23T15:00:00.000Z',
        endAt: '2024-09-23T16:00:00.000Z',
      },
      params: {
        id: '123',
      },
      headers: {
        authorization: '1312312',
      },
    };

    updateScheduleUsecase.execute.mockRejectedValue(new Error());
    jwt.login.mockResolvedValue('123' as never);

    const { code } = await updateScheduleController.execute(input);

    expect(code).toBe(500);
  });
});
