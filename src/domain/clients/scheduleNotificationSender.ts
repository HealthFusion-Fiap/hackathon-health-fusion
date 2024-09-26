import { Schedule } from '@/entities/schedule.entity';

export interface ScheduleNotificationSender {
  notify: (schedule: Schedule) => Promise<void>
}
