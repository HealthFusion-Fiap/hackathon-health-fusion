import { Doctor } from '@/entities/doctor.entity';

export type CreateDoctorInput = {
  name: string
  email: string
  password: string
  cpf: string
  crm: string
};

export type CreateDoctorOutput = {
  doctor: Doctor
};
