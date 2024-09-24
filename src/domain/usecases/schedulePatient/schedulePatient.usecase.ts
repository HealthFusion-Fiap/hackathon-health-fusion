import { ScheduleNotFound } from '@/domain/errors';
import { ScheduleRepository } from '@/domain/repositories/schedule';
import {
  SchedulePatientInput,
  SchedulePatientOutput,
} from '@/domain/usecases/schedulePatient/dtos';

export class SchedulePatientUseCase {
  constructor(private scheduleRepository: ScheduleRepository) { }

  async execute(input: SchedulePatientInput): Promise<SchedulePatientOutput> {
    const schedule = await this.scheduleRepository.findById(input.scheduleId);

    if (!schedule) {
      throw new ScheduleNotFound();
    }

    schedule.patientId = input.patientId;

    await this.scheduleRepository.update(schedule);

    return {
      schedule,
    };
  }
}
