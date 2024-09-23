import { Schedule } from '@/entities/schedule.entity';

export class SchedulePresenter {
  static toPresent(data: Schedule) {
    return {
      id: data.id,
      startAt: data.startAt,
      endAt: data.endAt,
      doctor: {
        id: data.doctor.id,
        name: data.doctor.name,
        email: data.doctor.email,
        crm: data.doctor.crm,
        cpf: data.doctor.cpf,
      },
    };
  }
}
