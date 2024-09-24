import {
  DoctorNotFound,
  InvalidPassword,
} from '@/domain/errors';
import { DoctorRepository } from '@/domain/repositories/doctor';
import { HashGenerator } from '@/domain/services/hashGenerator';
import { Jwt } from '@/domain/services/jwt';
import { DoctorLoginInput, DoctorLoginOutput } from './dtos';

export default class DoctorLoginUsecase {
  constructor(
    private doctorRepository: DoctorRepository,
    private hashGenerator: HashGenerator,
    private jwt: Jwt,
  ) { }

  async execute(data: DoctorLoginInput): Promise<DoctorLoginOutput> {
    const doctor = await this.doctorRepository.findByEmail(data.email);

    if (!doctor) {
      throw new DoctorNotFound();
    }

    if (!this.hashGenerator.compareSync(data.password, doctor.password)) {
      throw new InvalidPassword();
    }

    const token = this.jwt.sign({ doctorId: doctor.id });

    return { token };
  }
}
