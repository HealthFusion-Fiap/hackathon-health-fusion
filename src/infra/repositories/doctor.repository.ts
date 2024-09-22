import { PrismaClient } from '@prisma/client';
import { DoctorRepository } from '@/domain/repository/doctor';
import { Doctor } from '@/entities/doctor.entity';

export class PrismaDoctorRepository implements DoctorRepository {
  constructor(private prisma: PrismaClient) {}

  findById = async (id: string): Promise<Doctor | null> => {
    const doctor = await this.prisma.doctor.findFirst({
      where: {
        id,
      },
    });

    if (!doctor) {
      return null;
    }

    return new Doctor(doctor);
  };

  public async create(doctor: Doctor): Promise<void> {
    await this.prisma.doctor.create({
      data: {
        cpf: doctor.cpf,
        crm: doctor.crm,
        email: doctor.email,
        id: doctor.id,
        name: doctor.name,
        password: doctor.password,
      },
    });
  }
}
