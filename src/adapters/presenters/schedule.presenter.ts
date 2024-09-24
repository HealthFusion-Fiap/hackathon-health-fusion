import { Schedule } from '@/entities/schedule.entity';
import { DoctorPresenter } from './doctor.presenter';

export class SchedulePresenter {
  static toPresent(data: Schedule) {
    return {
      id: data.id,
      startAt: data.startAt,
      endAt: data.endAt,
      doctor: data.doctor ? DoctorPresenter.toPresent(data.doctor) : undefined,
      patientId: data.patientId,
    };
  }
}
