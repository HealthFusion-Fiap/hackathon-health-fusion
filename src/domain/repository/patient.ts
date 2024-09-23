import { Patient } from '@/entities/patient.entity';

export interface PatientRepository {
  findById: (id: string) => Promise<Patient | null>
  findByCpf: (cpf: string) => Promise<Patient | null>
  create: (doctor: Patient) => Promise<void>
}
