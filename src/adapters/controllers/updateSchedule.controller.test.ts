// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import { UpdateScheduleUseCase } from '@/domain/usecases/updateSchedule/updateSchedule.usecase';
import { UpdateScheduleController } from './updateSchedule.controller';
import { Schedule } from '@/entities/schedule.entity';
import { BadRequestError } from '@/domain/errors';

describe('Suit tests for Update Schedule Controller', () => {
  let updateScheduleUsecase: MockProxy<UpdateScheduleUseCase>;
  let updateScheduleController: UpdateScheduleController;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    updateScheduleUsecase = mock();

    updateScheduleController = new UpdateScheduleController(updateScheduleUsecase);
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
    };

    updateScheduleUsecase.execute.mockRejectedValue(new BadRequestError('Bad Request'));

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
    };

    const schedule = mock<Schedule>();
    updateScheduleUsecase.execute.mockResolvedValue({ schedule });

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
    };

    updateScheduleUsecase.execute.mockRejectedValue(new Error());

    const { code } = await updateScheduleController.execute(input);

    expect(code).toBe(500);
  });
});
