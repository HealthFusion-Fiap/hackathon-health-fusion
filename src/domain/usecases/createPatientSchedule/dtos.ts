import { Schedule } from '@/entities/schedule.entity';

export type CreatePatientScheduleInput = {
  patientId: string
  scheduleId: string
};

export type CreatePatientScheduleOutput = {
  schedule: Schedule
}
