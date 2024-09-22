import { PrismaClient } from '@prisma/client';
import { ScheduleRepository } from '@/domain/repository/schedule';
import { Schedule } from '@/entities/schedule.entity';

export class PrismaScheduleRepository implements ScheduleRepository {
  constructor(private prisma: PrismaClient) { }

  create = async (schedule: Schedule): Promise<void> => {
    await this.prisma.schedule.create({
      data: {
        id: schedule.id,
        endAt: schedule.endAt,
        startAt: schedule.startAt,
        doctor_id: schedule.doctor.id,
      },
    });
  };

  isAvailable = async (doctorId: string, startAt: Date, endAt: Date): Promise<boolean> => {
    const hasSchedule = await this.prisma.schedule.findMany({
      where: {
        startAt: {
          lte: startAt,
        },
        endAt: {
          gte: endAt,
        },
        doctor_id: doctorId,
      },
    });

    return !!hasSchedule;
  };
}
