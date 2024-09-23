import { BadRequestError, NotFoundError } from '@/domain/errors';
import { ScheduleRepository } from '@/domain/repository/schedule';
import { Schedule } from '@/entities/schedule.entity';
import { UpdateScheduleInput, UpdateScheduleOutput } from './dtos';

export class UpdateScheduleUseCase {
  constructor(
    private scheduleRepository: ScheduleRepository,
  ) {
  }

  async execute({
    scheduleId,
    endAt,
    startAt,
  }: UpdateScheduleInput): Promise<UpdateScheduleOutput> {
    const schedule = await this.scheduleRepository.findById(scheduleId);

    if (!schedule) {
      throw new NotFoundError('Schedule not found');
    }

    const newStartAt = new Date(startAt);
    const newEndAt = new Date(endAt);

    const isAvailable = await this.scheduleRepository
      .isAvailable(schedule.doctor.id, newStartAt, newEndAt);

    if (!isAvailable) {
      throw new BadRequestError('Schedule not available');
    }

    const newSchedule = new Schedule({
      doctor: schedule.doctor,
      endAt: newEndAt,
      startAt: newStartAt,
      id: scheduleId,
    });

    await this.scheduleRepository.update(newSchedule);

    return {
      schedule: newSchedule,
    };
  }
}
