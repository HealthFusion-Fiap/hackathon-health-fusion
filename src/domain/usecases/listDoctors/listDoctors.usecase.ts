import { DoctorRepository } from '@/domain/repositories/doctor';
import { ListDoctorsOutput } from './dtos';

export default class ListDoctorsUseCase {
  constructor(private doctorRepository: DoctorRepository) { }

  async execute(): Promise<ListDoctorsOutput> {
    const doctors = await this.doctorRepository.findAll();

    return {
      doctors,
    };
  }
}
