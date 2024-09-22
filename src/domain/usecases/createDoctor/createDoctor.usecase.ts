import { Doctor } from '@/entities/doctor.entity';
import Usecase from '../usecase';
import { CreateDoctorInput, CreateDoctorOutput } from './dtos';

export default class CreateDoctorUsecase extends Usecase {
  async execute(data: CreateDoctorInput): Promise<CreateDoctorOutput> {
    const doctor = new Doctor(data);

    await this.gateway.doctorRepository.create(doctor);

    return { doctor };
  }
}
