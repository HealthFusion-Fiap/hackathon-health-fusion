// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import { BadRequestError, NotFoundError } from '@/domain/errors';
import { DoctorRepository } from '@/domain/repositories/doctor';
import { ScheduleRepository } from '@/domain/repositories/schedule';
import { Doctor } from '@/entities/doctor.entity';
import { CreateScheduleUseCase } from './createSchedule.usecase';

describe('Suit tests for Create Schedule Use Case', () => {
  let scheduleRepository: MockProxy<ScheduleRepository>;
  let doctorRepository: MockProxy<DoctorRepository>;
  let createScheduleUseCase: CreateScheduleUseCase;

  beforeEach(() => {
    scheduleRepository = mock();
    doctorRepository = mock();

    createScheduleUseCase = new CreateScheduleUseCase(scheduleRepository, doctorRepository);
  });

  it('should throw error when doctor was not found', async () => {
    doctorRepository.findById.mockResolvedValue(null);

    await expect(createScheduleUseCase.execute({
      doctorId: '1',
      endAt: '2023-10-20',
      startAt: '2023-10-20',
    })).rejects.toThrow(new NotFoundError('Doctor not found'));
  });

  it('should throw error when schedule is not available', async () => {
    const doctor = mock<Doctor>();
    doctorRepository.findById.mockResolvedValue(doctor);

    scheduleRepository.isAvailable.mockResolvedValue(false);

    await expect(createScheduleUseCase.execute({
      doctorId: '1',
      endAt: '2023-10-20',
      startAt: '2023-10-20',
    })).rejects.toThrow(new BadRequestError('Schedule not available'));
  });

  it('should be able to create a schedule', async () => {
    const doctor = new Doctor({
      cpf: '23123123',
      crm: '121',
      email: 'doctor@email.com',
      name: 'Doctor who',
      password: 'doctor cool',
    });
    doctorRepository.findById.mockResolvedValue(doctor);

    scheduleRepository.isAvailable.mockResolvedValue(true);

    const { schedule } = await createScheduleUseCase.execute({
      doctorId: doctor.id,
      endAt: '2023-10-20',
      startAt: '2023-10-20',
    });

    expect(schedule).toEqual({
      _id: schedule.id,
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
        doctorId: expect.any(String),
        endAt: new Date('2023-10-20T00:00:00.000Z'),
        startAt: new Date('2023-10-20T00:00:00.000Z'),
      },
    });

    expect(doctorRepository.findById).toHaveBeenCalledTimes(1);
    expect(scheduleRepository.isAvailable).toHaveBeenCalledTimes(1);
    expect(scheduleRepository.create).toHaveBeenNthCalledWith(1, schedule);
  });
});
