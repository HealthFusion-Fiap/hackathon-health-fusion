import { Schedule } from '@/entities/schedule.entity';
import { PrismaClient } from "@prisma/client";

export default class PrismaScheduleRepository /* implements DoctorRepository */ {
  constructor(private prisma: PrismaClient) {}

  public async createSchedule(schedule: Schedule): Promise<any> {
    return this.prisma.schedule.create({
      data: schedule,
    });
  }

  public async findOpenSchedules(doctorId: string): Promise<any> {
    return this.prisma.schedule.findMany({
      where: {
        doctor_id: doctorId,
        patient_id: null,
      },
    });
  }

  public async isScheduleOpen(schedule: Schedule): Promise<any> {
    return this.prisma.schedule.findUnique({
      where: {
        id: schedule.id,
        doctor_id: schedule.doctor_id,
        patient_id: schedule.patient_id,
      },
    });
  }
}
