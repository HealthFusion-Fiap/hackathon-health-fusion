import { BadRequestError, NotFoundError } from '@/domain/errors';
import { DoctorRepository } from '@/domain/repository/doctor';
import { ScheduleRepository } from '@/domain/repository/schedule';
import { Schedule } from '@/entities/schedule.entity';
import { CreateScheduleInput, CreateScheduleOutput } from './dtos';

export class CreateScheduleUseCase {
  constructor(
    private scheduleRepository: ScheduleRepository,
    private doctorRepository: DoctorRepository,
  ) {}

  async execute({ doctorId, endAt, startAt }: CreateScheduleInput): Promise<CreateScheduleOutput> {
    const doctor = await this.doctorRepository.findById(doctorId);

    if (!doctor) {
      throw new NotFoundError('Doctor not found');
    }

    const startAtToSchedule = new Date(startAt);
    const endAtToSchedule = new Date(endAt);

    const isAvaliable = await this.scheduleRepository
      .isAvailable(doctorId, startAtToSchedule, endAtToSchedule);

    if (!isAvaliable) {
      throw new BadRequestError('Schedule not available');
    }

    const schedule = new Schedule({
      doctor,
      endAt: endAtToSchedule,
      startAt: startAtToSchedule,
    });

    await this.scheduleRepository.create(schedule);

    return {
      schedule,
    };
  }
}
