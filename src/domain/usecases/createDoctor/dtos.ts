import { Doctor } from '@/entities/doctor.entity';

export type CreateDoctorInput = {
  id: string
  name: string
  email: string
  password: string
  cpf: string
  crm: string
};

export type CreateDoctorOutput = {
  doctor: Doctor
};
