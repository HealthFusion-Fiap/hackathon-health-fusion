import { Patient } from '@/entities/patient.entity';

export type CreatePatientInput = {
  name: string
  email: string
  password: string
  cpf: string
};

export type CreatePatientOutput = {
  patient: Patient
};
