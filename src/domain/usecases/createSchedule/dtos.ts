import { Schedule } from '@/entities/schedule.entity';

export type CreateScheduleInput = {
  doctorId: string
  startAt: string
  endAt: string
};

export type CreateScheduleOutput = {
  schedule: Schedule
}
