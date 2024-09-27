import { ScheduleNotFound } from '@/domain/errors';
import { ScheduleRepository } from '@/domain/repositories/schedule';
import {
  SchedulePatientInput,
  SchedulePatientOutput,
} from '@/domain/usecases/schedulePatient/dtos';
import { ScheduleNotificationSender } from '@/domain/clients/scheduleNotificationSender';

export class SchedulePatientUseCase {
  constructor(private scheduleRepository: ScheduleRepository, private notificationProducer: ScheduleNotificationSender) { }

  async execute(input: SchedulePatientInput): Promise<SchedulePatientOutput> {
    const schedule = await this.scheduleRepository.findById(input.scheduleId);

    if (!schedule) {
      throw new ScheduleNotFound();
    }

    schedule.patientId = input.patientId;

    await this.scheduleRepository.update(schedule);
    await this.notificationProducer.notify(schedule);

    return {
      schedule,
    };
  }
}
