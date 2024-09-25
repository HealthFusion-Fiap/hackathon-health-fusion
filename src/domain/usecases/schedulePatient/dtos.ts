import { Schedule } from '@/entities/schedule.entity';

export type SchedulePatientInput = {
  patientId: string
  scheduleId: string
};

export type SchedulePatientOutput = {
  schedule: Schedule
}
