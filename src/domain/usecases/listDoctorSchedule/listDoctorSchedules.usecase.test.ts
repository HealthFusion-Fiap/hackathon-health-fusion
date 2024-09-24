// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import { DoctorRepository } from '@/domain/repositories/doctor';
import { Doctor } from '@/entities/doctor.entity';
import {
  ListDoctorSchedulesUseCase,
} from '@/domain/usecases/listDoctorSchedule/listDoctorSchedules.usecase';
import { ScheduleRepository } from '@/domain/repositories/schedule';
import { Schedule } from '@/entities/schedule.entity';
import { DoctorNotFound } from '@/domain/errors';

describe('Suit tests for List Doctors Use Case', () => {
  let doctorRepository: MockProxy<DoctorRepository>;
  let scheduleRepository: MockProxy<ScheduleRepository>;
  let listDoctorSchedulesUseCase: ListDoctorSchedulesUseCase;

  beforeEach(() => {
    doctorRepository = mock();
    scheduleRepository = mock();
    listDoctorSchedulesUseCase = new ListDoctorSchedulesUseCase(scheduleRepository, doctorRepository);
  });

  it('should be able to list doctor schedules', async () => {
    const doctor = new Doctor({
      cpf: '23123123',
      crm: '121',
      email: 'email@email.com.br',
      name: 'Doctor who',
      password: 'doctor cool',
    });

    const schedule = new Schedule({
      id: '123',
      doctorId: doctor.id,
      doctor,
      startAt: new Date(),
      endAt: new Date(),
    });

    doctorRepository.findById.mockResolvedValue(doctor);
    scheduleRepository.findOpenSchedules.mockResolvedValue([schedule]);

    const { schedules } = await listDoctorSchedulesUseCase.execute(doctor.id);

    expect(schedules).toEqual([schedule]);
  });

  it('should not be able to list doctor schedules', async () => {
    const doctor = null;
    const doctorNotFound = new DoctorNotFound();

    doctorRepository.findById.mockResolvedValue(doctor);

    expect(() => listDoctorSchedulesUseCase.execute('id'))
      .rejects
      .toThrowError(doctorNotFound);
    expect(scheduleRepository.findOpenSchedules)
      .toHaveBeenCalledTimes(0);
  });
});
