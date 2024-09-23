import { HashGenerator } from '@/domain/cryptography/hashGenerator';
import { CpfAlreadyExists, CrmAlreadyExists, EmailAlreadyExists } from '@/domain/errors';
import { DoctorRepository } from '@/domain/repository/doctor';
import { Doctor } from '@/entities/doctor.entity';
import { CreateDoctorInput, CreateDoctorOutput } from './dtos';

export default class CreateDoctorUsecase {
  constructor(
    private doctorRepository: DoctorRepository,
    private hashGenerator: HashGenerator,
  ) { }

  async execute(data: CreateDoctorInput): Promise<CreateDoctorOutput> {
    const cpfAlreadyExists = await this.doctorRepository.findByCpf(data.cpf);

    if (cpfAlreadyExists) {
      throw new CpfAlreadyExists();
    }

    const crmAlreadyExists = await this.doctorRepository.findByCrm(data.crm);

    if (crmAlreadyExists) {
      throw new CrmAlreadyExists();
    }

    const emailAlreadyExists = await this.doctorRepository.findByEmail(data.email);

    if (emailAlreadyExists) {
      throw new EmailAlreadyExists();
    }

    const hashedPassword = await this.hashGenerator.hash(data.password);

    const doctor = new Doctor({
      ...data,
      password: hashedPassword,
    });

    await this.doctorRepository.create(doctor);

    return { doctor };
  }
}
