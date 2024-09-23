import { mock, MockProxy } from 'jest-mock-extended';
import { BadRequestError, NotFoundError } from '@/domain/errors';
import { ScheduleRepository } from '@/domain/repositories/schedule';
import { Doctor } from '@/entities/doctor.entity';
import { Schedule } from '@/entities/schedule.entity';
import { UpdateScheduleUseCase } from './updateSchedule.usecase';

describe('Suit tests for Update Schedule Use Case', () => {
  let scheduleRepository: MockProxy<ScheduleRepository>;
  let updateScheduleUseCase: UpdateScheduleUseCase;

  beforeEach(() => {
    scheduleRepository = mock();
    updateScheduleUseCase = new UpdateScheduleUseCase(scheduleRepository);
  });

  it('should throw error when schedule was not found', async () => {
    scheduleRepository.findById.mockResolvedValue(null);

    await expect(updateScheduleUseCase.execute({
      scheduleId: '1',
      endAt: '2023-10-10',
      startAt: '2023-10-10',
    })).rejects.toThrow(new NotFoundError('Schedule not found'));
  });

  it('should throw error when schedule is not available', async () => {
    const schedule = mock<Schedule>();
    scheduleRepository.findById.mockResolvedValue(schedule);

    scheduleRepository.isAvailable.mockResolvedValue(false);

    await expect(updateScheduleUseCase.execute({
      scheduleId: '1',
      endAt: '2023-10-10',
      startAt: '2023-10-10',
    })).rejects.toThrow(new BadRequestError('Schedule not available'));
  });

  it('should be able to update a schedule', async () => {
    const doctor = new Doctor({
      cpf: '23123123',
      crm: '121',
      email: 'doctor@email.com',
      name: 'Doctor who',
      password: 'doctor cool',
    });

    const schedule = new Schedule({
      id: '1',
      doctor,
      startAt: new Date('2024-10-10'),
      endAt: new Date('2025-10-10'),
    });

    scheduleRepository.findById.mockResolvedValue(schedule);
    scheduleRepository.isAvailable.mockResolvedValue(true);

    const { schedule: newSchedule } = await updateScheduleUseCase.execute({
      scheduleId: schedule.id,
      startAt: '2024-11-11',
      endAt: '2025-11-11',
    });

    expect(newSchedule).toEqual({
      _id: '1',
      props: {
        doctor: {
          _id: doctor.id,
          props: {
            cpf: '23123123',
            crm: '121',
            email: 'doctor@email.com',
            name: 'Doctor who',
            password: 'doctor cool',
          },
        },
        endAt: new Date('2025-11-11T00:00:00.000Z'),
        id: '1',
        startAt: new Date('2024-11-11T00:00:00.000Z'),
      },
    });

    expect(scheduleRepository.isAvailable).toHaveBeenCalledTimes(1);
    expect(scheduleRepository.update).toHaveBeenNthCalledWith(1, newSchedule);
  });
});
