import { HashGenerator } from '@/domain/cryptography/hashGenerator';
import { BadRequestError } from '@/domain/errors';
import { PatientRepository } from '@/domain/repository/patient';
import { Patient } from '@/entities/patient.entity';
import { CreatePatientInput, CreatePatientOutput } from './dtos';

export default class CreatePatientUsecase {
  constructor(
    private patientRepository: PatientRepository,
    private hashGenerator: HashGenerator,
  ) {
  }

  async execute(data: CreatePatientInput): Promise<CreatePatientOutput> {
    const cpfAlreadyExists = await this.patientRepository.findByCpf(data.cpf);

    if (cpfAlreadyExists) {
      throw new BadRequestError('CPF already exists');
    }

    const hashedPassword = await this.hashGenerator.hash(data.password);

    const patient = new Patient({
      ...data,
      password: hashedPassword,
    });

    await this.patientRepository.create(patient);

    return { patient };
  }
}
