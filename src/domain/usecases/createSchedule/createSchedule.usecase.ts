import { DoctorNotFound, ScheduleNotAvailable } from '@/domain/errors';
import { DoctorRepository } from '@/domain/repositories/doctor';
import { ScheduleRepository } from '@/domain/repositories/schedule';
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
      throw new DoctorNotFound();
    }

    const startAtToSchedule = new Date(startAt);
    const endAtToSchedule = new Date(endAt);

    const isAvaliable = await this.scheduleRepository
      .isAvailable(doctorId, startAtToSchedule, endAtToSchedule);

    if (!isAvaliable) {
      throw new ScheduleNotAvailable();
    }

    const schedule = new Schedule({
      doctorId: doctor.id,
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
