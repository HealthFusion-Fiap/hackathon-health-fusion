import { Schedule } from '@/entities/schedule.entity';
import Presenter from './presenter';

export class SchedulePresenter extends Presenter {
  adaptOutput(data: Schedule) {
    return {
      status: 201,
      body: {
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
      },
    };
  }
}
