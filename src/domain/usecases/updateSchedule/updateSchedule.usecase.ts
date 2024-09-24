import { ScheduleNotAvailable, ScheduleNotFound } from '@/domain/errors';
import { ScheduleRepository } from '@/domain/repositories/schedule';
import { Schedule } from '@/entities/schedule.entity';
import { UpdateScheduleInput, UpdateScheduleOutput } from './dtos';

export class UpdateScheduleUseCase {
  constructor(private scheduleRepository: ScheduleRepository) { }

  async execute({
    scheduleId,
    endAt,
    startAt,
  }: UpdateScheduleInput): Promise<UpdateScheduleOutput> {
    const schedule = await this.scheduleRepository.findById(scheduleId);

    if (!schedule) {
      throw new ScheduleNotFound();
    }

    const newStartAt = new Date(startAt);
    const newEndAt = new Date(endAt);

    const isAvailable = await this.scheduleRepository
      .isAvailable(schedule.doctor.id, newStartAt, newEndAt);

    if (!isAvailable) {
      throw new ScheduleNotAvailable();
    }

    const newSchedule = new Schedule({
      endAt: newEndAt,
      startAt: newStartAt,
      id: scheduleId,
    } as any);

    await this.scheduleRepository.update(newSchedule);

    return {
      schedule: newSchedule,
    };
  }
}
