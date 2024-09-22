import { mock, MockProxy } from 'jest-mock-extended';
import { DoctorRepository } from '@/domain/repository/doctor';
import { ScheduleRepository } from '@/domain/repository/schedule';
import { CreateScheduleUseCase } from './createSchedule.usecase';

describe('Suit tests for Create Schedule Use Case', () => {
  let scheduleRepository: MockProxy<ScheduleRepository>;
  let doctorRepository: MockProxy<DoctorRepository>;
  let createScheduleUseCase: CreateScheduleUseCase;

  beforeAll(() => {
    scheduleRepository = mock();
    doctorRepository = mock();

    createScheduleUseCase = new CreateScheduleUseCase(scheduleRepository, doctorRepository);
  });
});
