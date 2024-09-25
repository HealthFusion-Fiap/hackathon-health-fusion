// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import { ScheduleRepository } from '@/domain/repositories/schedule';
import { Doctor } from '@/entities/doctor.entity';
import { Schedule } from '@/entities/schedule.entity';
import { SchedulePatientUseCase } from '@/domain/usecases/schedulePatient/schedulePatient.usecase';
import { DoctorNotFound, ScheduleNotFound } from '@/domain/errors';

describe('Suit tests for Update Schedule Use Case', () => {
  let scheduleRepository: MockProxy<ScheduleRepository>;
  let schedulePatientUseCase: SchedulePatientUseCase;

  beforeEach(() => {
    scheduleRepository = mock();
    schedulePatientUseCase = new SchedulePatientUseCase(scheduleRepository);
  });

  it('should be able to update schedule for patient', async () => {
    const patientId = 'patientId';

    const doctor = new Doctor({
      cpf: '23123123',
      crm: '121',
      email: 'doctor@email.com',
      name: 'Doctor who',
      password: 'doctor cool',
      id: '1',
    });

    const schedule = new Schedule({
      id: '1',
      doctorId: doctor.id,
      doctor,
      startAt: new Date('2024-10-10'),
      endAt: new Date('2025-10-10'),
    });

    scheduleRepository.findById.mockResolvedValue(schedule);

    const { schedule: newSchedule } = await schedulePatientUseCase.execute({
      scheduleId: schedule.id,
      patientId,
    });

    expect(newSchedule).toEqual({
      _id: '1',
      props: {
        id: '1',
        startAt: new Date('2024-10-10'),
        endAt: new Date('2025-10-10'),
        patientId,
        doctorId: doctor.id,
        doctor,
      },
    });

    expect(scheduleRepository.findById).toHaveBeenCalledTimes(1);
    expect(scheduleRepository.update)
      .toHaveBeenCalledTimes(1);
  });

  it('should be able to update schedule for patient', async () => {
    const patientId = 'patientId';
    const scheduleId = 'scheduleId';
    const scheduleNotFound = new ScheduleNotFound();

    scheduleRepository.findById.mockResolvedValue(null);

    expect(() => schedulePatientUseCase.execute({
      scheduleId,
      patientId,
    }))
      .rejects
      .toThrowError(scheduleNotFound);
    expect(scheduleRepository.findOpenSchedules)
      .toHaveBeenCalledTimes(0);
  });
});
