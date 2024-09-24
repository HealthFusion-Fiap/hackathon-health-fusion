// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import { CreateScheduleUseCase } from '@/domain/usecases/createSchedule/createSchedule.usecase';
import { CreateScheduleController } from './createSchedule.controller';
import { Schedule } from '@/entities/schedule.entity';
import { DoctorNotFound } from '@/domain/errors';

describe('Suit tests for Create Schedule Controller', () => {
  let createScheduleUsecase: MockProxy<CreateScheduleUseCase>;
  let createScheduleController: CreateScheduleController;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    createScheduleUsecase = mock();

    createScheduleController = new CreateScheduleController(createScheduleUsecase);
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
    };

    createScheduleUsecase.execute.mockRejectedValue(new DoctorNotFound());

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
    };

    const schedule = mock<Schedule>();
    createScheduleUsecase.execute.mockResolvedValue({ schedule });

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
    };

    createScheduleUsecase.execute.mockRejectedValue(new Error());

    const { code } = await createScheduleController.execute(input);

    expect(code).toBe(500);
  });
});
