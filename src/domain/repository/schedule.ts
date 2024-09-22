import { Schedule } from '@/entities/schedule.entity';

export interface ScheduleRepository {
  create: (schedule: Schedule) => Promise<void>
  isAvailable: (doctorId:string, startAt: Date, endAt: Date) => Promise<boolean>
}
