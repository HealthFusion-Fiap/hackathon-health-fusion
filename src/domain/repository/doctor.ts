import { Doctor } from '@/entities/doctor.entity';

export interface DoctorRepository {
  findById: (id: string) => Promise<Doctor | null>
  findByCpf: (cpf: string) => Promise<Doctor | null>
  findByCrm: (cpf: string) => Promise<Doctor | null>
  create: (doctor: Doctor) => Promise<void>
}
