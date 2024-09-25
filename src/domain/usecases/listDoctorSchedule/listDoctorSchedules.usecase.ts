import { DoctorNotFound } from '@/domain/errors';
import { ScheduleRepository } from '@/domain/repositories/schedule';
import { DoctorRepository } from '@/domain/repositories/doctor';
import { ListDoctorSchedulesOutput } from '@/domain/usecases/listDoctorSchedule/dtos';

export class ListDoctorSchedulesUseCase {
  constructor(
    private scheduleRepository: ScheduleRepository,
    private doctorRepository: DoctorRepository,
  ) {}

  async execute(doctorId: string): Promise<ListDoctorSchedulesOutput> {
    const doctor = await this.doctorRepository.findById(doctorId);

    if (!doctor) {
      throw new DoctorNotFound();
    }

    const schedules = await this.scheduleRepository.findOpenSchedules(doctorId);

    return { schedules };
  }
}
