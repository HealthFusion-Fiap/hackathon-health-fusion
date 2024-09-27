import {
  InvalidPassword,
  PatientNotFound,
} from '@/domain/errors';
import { PatientRepository } from '@/domain/repositories/patient';
import { HashGenerator } from '@/domain/services/hashGenerator';
import { Jwt } from '@/domain/services/jwt';
import { PatientLoginInput, PatientLoginOutput } from './dtos';

export default class PatientLoginUsecase {
  constructor(
    private patientRepository: PatientRepository,
    private hashGenerator: HashGenerator,
    private jwt: Jwt,
  ) { }

  async execute(data: PatientLoginInput): Promise<PatientLoginOutput> {
    const patient = await this.patientRepository.findByEmail(data.email);

    if (!patient) {
      throw new PatientNotFound();
    }

    if (!this.hashGenerator.compareSync(data.password, patient.password)) {
      throw new InvalidPassword();
    }

    const token = this.jwt.sign({ id: patient.id });

    return { token };
  }
}
