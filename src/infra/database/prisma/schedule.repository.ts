import { PrismaClient } from '@prisma/client';
import { ScheduleRepository } from '@/domain/repositories/schedule';
import { Doctor } from '@/entities/doctor.entity';
import { Patient } from '@/entities/patient.entity';
import { Schedule } from '@/entities/schedule.entity';

export class PrismaScheduleRepository implements ScheduleRepository {
  constructor(private prisma: PrismaClient) { }

  findById = async (id: string): Promise<Schedule | null> => {
    const schedule = await this.prisma.schedule.findFirst({
      where: {
        id,
      },
      include: {
        doctor: true,
        patient: true,
      },
    });

    if (!schedule) {
      return null;
    }

    let patient;

    if (schedule.patient) {
      patient = new Patient(schedule.patient);
    }

    const doctor = new Doctor(schedule.doctor);

    return new Schedule({
      ...schedule,
      patientId: schedule.patientId as string | undefined,
      doctor,
      patient,
    });
  };

  update = async (schedule: Schedule): Promise<void> => {
    await this.prisma.schedule.update({
      data: {
        patientId: schedule.patientId,
        endAt: schedule.endAt,
        startAt: schedule.startAt,
      },
      where: {
        id: schedule.id,
      },
    });
  };

  create = async (schedule: Schedule): Promise<void> => {
    await this.prisma.schedule.create({
      data: {
        id: schedule.id,
        endAt: schedule.endAt,
        startAt: schedule.startAt,
        doctorId: schedule.doctorId,
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
        doctorId,
      },
    });

    return !hasSchedule.length;
  };

  findOpenSchedules = async (doctorId: string): Promise<Schedule[]> => {
    const schedules = await this.prisma.schedule.findMany({
      where: {
        doctorId,
        patientId: null,
      },
    });

    return schedules.map((schedule: any) => new Schedule({
      ...schedule,
      patientId: schedule.patientId as string | undefined,
    }));
  };
}
