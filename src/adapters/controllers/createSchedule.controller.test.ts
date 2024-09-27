// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import { DoctorNotFound } from '@/domain/errors';
import { Jwt } from '@/domain/services/jwt';
import { CreateScheduleUseCase } from '@/domain/usecases/createSchedule/createSchedule.usecase';
import { Schedule } from '@/entities/schedule.entity';
import { CreateScheduleController } from './createSchedule.controller';

describe('Suit tests for Create Schedule Controller', () => {
  let createScheduleUsecase: MockProxy<CreateScheduleUseCase>;
  let jwt: MockProxy<Jwt>;
  let createScheduleController: CreateScheduleController;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    createScheduleUsecase = mock();
    jwt = mock();

    createScheduleController = new CreateScheduleController(createScheduleUsecase, jwt);
  });

  afterAll(() => {
    (console.error as any).mockRestore();
  });

  it('should return 400 when body is not provided', async () => {
    const input = {
      body: undefined,
    };

    const { code } = await createScheduleController.execute(input);

    expect(code).toBe(400);
  });

  it('should return 404 when doctor does not exist', async () => {
    const input = {
      body: {
        doctorId: '123',
        startAt: '2024-09-23T15:00:00.000Z',
        endAt: '2024-09-23T16:00:00.000Z',
      },
      headers: {
        authorization: '123',
      },
    };

    createScheduleUsecase.execute.mockRejectedValue(new DoctorNotFound());
    jwt.login.mockResolvedValue('123' as never);

    const { code, body } = await createScheduleController.execute(input);

    expect(code).toBe(404);
    expect(body).toEqual({ message: 'Doctor not found' });
  });

  it('should return 201 when schedule is created', async () => {
    const input = {
      body: {
        doctorId: '123',
        startAt: '2024-09-23T15:00:00.000Z',
        endAt: '2024-09-23T16:00:00.000Z',
      },
      headers: {
        authorization: '123',
      },
    };

    const schedule = mock<Schedule>();
    createScheduleUsecase.execute.mockResolvedValue({ schedule });
    jwt.login.mockResolvedValue('123' as never);

    const { code } = await createScheduleController.execute(input);

    expect(code).toBe(201);
  });

  it('should return 500 when an error occurs', async () => {
    const input = {
      body: {
        doctorId: '123',
        startAt: '2024-09-23T15:00:00.000Z',
        endAt: '2024-09-23T16:00:00.000Z',
      },
      headers: {
        authorization: '123',
      },
    };

    createScheduleUsecase.execute.mockRejectedValue(new Error());
    jwt.login.mockResolvedValue('123' as never);

    const { code } = await createScheduleController.execute(input);

    expect(code).toBe(500);
  });
});
