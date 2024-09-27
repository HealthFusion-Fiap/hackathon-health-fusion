import { mock, MockProxy } from 'jest-mock-extended';
import { SchedulePatientController } from '@/adapters/controllers/schedulePatient.controller';
import { Jwt } from '@/domain/services/jwt';
import { SchedulePatientUseCase } from '@/domain/usecases/schedulePatient/schedulePatient.usecase';
import { Schedule } from '@/entities/schedule.entity';

describe('Suit tests for Update Schedule Controller', () => {
  let schedulePatientUseCase: MockProxy<SchedulePatientUseCase>;
  let jwt: MockProxy<Jwt>;
  let schedulePatientController: SchedulePatientController;

  beforeAll(() => {
    jest.spyOn(console, 'error')
      .mockImplementation(() => {
      });
  });

  beforeEach(() => {
    schedulePatientUseCase = mock();
    jwt = mock();

    schedulePatientController = new SchedulePatientController(schedulePatientUseCase, jwt);
  });

  afterAll(() => {
    (console.error as any).mockRestore();
  });

  it('should return 400 when body is not provided', async () => {
    const input = {
      params: undefined,
    };

    const { code } = await schedulePatientController.execute(input);

    expect(code).toBe(400);
  });

  it('should return 500 when an error occurs', async () => {
    const input = {
      params: {
        patientId: '123',
        scheduleId: '456',
      },
      headers: {
        authorization: '123',
      },
    };

    schedulePatientUseCase.execute.mockRejectedValue(new Error());
    jwt.login.mockResolvedValue('123' as never);

    const { code } = await schedulePatientController.execute(input);

    expect(code).toBe(500);
  });

  it('should return 200 when schedule is updated', async () => {
    const input = {
      params: {
        patientId: '123',
        scheduleId: '456',
      },
      headers: {
        authorization: '123',
      },
    };

    const schedule = mock<Schedule>();
    schedulePatientUseCase.execute.mockResolvedValue({ schedule });
    jwt.login.mockResolvedValue('123' as never);

    const { code } = await schedulePatientController.execute(input);

    expect(code).toBe(200);
  });
});
