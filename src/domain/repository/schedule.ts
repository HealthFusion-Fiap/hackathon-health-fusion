import { Schedule } from '@/entities/schedule.entity';

export interface ScheduleRepository {
  findById: (id: string) => Promise<Schedule | null>
  create: (schedule: Schedule) => Promise<void>
  update: (schedule: Schedule) => Promise<void>
  isAvailable: (doctorId:string, startAt: Date, endAt: Date) => Promise<boolean>
}
