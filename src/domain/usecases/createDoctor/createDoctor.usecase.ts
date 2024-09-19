import Usecase from '../usecase';
import { CreateDoctorInput, CreateDoctorOutput } from './dtos';

export default class CreateDoctorUsecase extends Usecase {
  async execute(data: CreateDoctorInput): Promise<CreateDoctorOutput> {
    const doctor = await this.gateway.doctorRepository.create(data);

    return doctor;
  }
}
