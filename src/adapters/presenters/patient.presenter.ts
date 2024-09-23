import { Patient } from '@/entities/patient.entity';

export class PatientPresenter {
  static toPresent(data: Patient) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      cpf: data.cpf,
    };
  }
}
