import { PrismaClient } from '@prisma/client';
import { ScheduleRepository } from '@/domain/repository/schedule';
import { Schedule } from '@/entities/schedule.entity';

export default class PrismaScheduleRepository implements ScheduleRepository {
  constructor(private prisma: PrismaClient) {}

  isAvailable: (startAt: Date, endAt: Date) => Promise<boolean>;

  findById: (id: string) => Promise<Schedule>;

  public async create(schedule: Schedule): Promise<void> {
    await this.prisma.schedule.create({
      data: {
        id: schedule.id,
        endAt: schedule.endAt,
        startAt: schedule.startAt,
        doctor_id: schedule.doctor.id,
      },
    });
  }
}
