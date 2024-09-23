import { Schedule } from '@/entities/schedule.entity';

export type UpdateScheduleInput = {
  scheduleId: string
  startAt: string
  endAt: string
}

export type UpdateScheduleOutput = {
  schedule: Schedule
}
