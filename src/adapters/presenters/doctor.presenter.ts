import { Doctor } from '@/entities/doctor.entity';

export class DoctorPresenter {
  static toPresent(data: Doctor) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      crm: data.crm,
      cpf: data.cpf,
    };
  }
}
