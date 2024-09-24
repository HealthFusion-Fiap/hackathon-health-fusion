import { ScheduleNotFound } from '@/domain/errors';
import { ScheduleRepository } from '@/domain/repositories/schedule';
import {
  CreatePatientScheduleInput,
  CreatePatientScheduleOutput,
} from '@/domain/usecases/createPatientSchedule/dtos';

export class CreatePatientScheduleUseCase {
  constructor(
    private scheduleRepository: ScheduleRepository,
  ) {}

  async execute(body: CreatePatientScheduleInput): Promise<CreatePatientScheduleOutput> {
    const schedule = await this.scheduleRepository.findById(body.scheduleId);

    if (!schedule || schedule.patient) {
      throw new ScheduleNotFound();
    }

    schedule.updatePatientId(body.scheduleId);
    await this.scheduleRepository.updatePatientSchedule(schedule);
    return {
      schedule,
    };
  }
}
