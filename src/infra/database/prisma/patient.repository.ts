import { PrismaClient } from '@prisma/client';
import { PatientRepository } from '@/domain/repository/patient';
import { Patient } from '@/entities/patient.entity';

export class PrismaPatientRepository implements PatientRepository {
  constructor(private prisma: PrismaClient) {}

  findByCpf = async (cpf: string): Promise<Patient | null> => {
    const patient = await this.prisma.patient.findFirst({
      where: {
        cpf,
      },
    });

    if (!patient) {
      return null;
    }

    return new Patient(patient);
  };

  findById = async (id: string): Promise<Patient | null> => {
    const doctor = await this.prisma.patient.findFirst({
      where: {
        id,
      },
    });

    if (!doctor) {
      return null;
    }

    return new Patient(doctor);
  };

  create = async (patient: Patient): Promise<void> => {
    await this.prisma.patient.create({
      data: {
        cpf: patient.cpf,
        email: patient.email,
        id: patient.id,
        name: patient.name,
        password: patient.password,
      },
    });
  };
}
