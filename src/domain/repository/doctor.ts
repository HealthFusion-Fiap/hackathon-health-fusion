import { Doctor } from '@/entities/doctor.entity';

export interface DoctorRepository {
  findById: (id: string) => Promise<Doctor | null>
}
