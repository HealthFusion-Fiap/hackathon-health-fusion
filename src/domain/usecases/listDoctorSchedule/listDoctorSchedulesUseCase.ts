import { NotFoundError } from '@/domain/errors';
import { ScheduleRepository } from '@/domain/repositories/schedule';
import { DoctorRepository } from '@/domain/repositories/doctor';
import { ListDoctorSchedulesOutput } from '@/domain/usecases/listDoctorSchedule/dtos';

export class ListDoctorSchedulesUseCase {
  constructor(
    private scheduleRepository: ScheduleRepository,
    private doctorRepository: DoctorRepository,
  ) {}

  async execute(doctorId: string): Promise<ListDoctorSchedulesOutput> {
    if (await this.doctorRepository.findById(doctorId)) {
      const schedules = await this.scheduleRepository.findOpenSchedules(doctorId);
      return { schedules };
    }
    throw new NotFoundError('doctorId not found');
  }
}
