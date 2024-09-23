import { PrismaClient } from '@prisma/client';
import { DoctorRepository } from '@/domain/repository/doctor';
import { Doctor } from '@/entities/doctor.entity';

export class PrismaDoctorRepository implements DoctorRepository {
  constructor(private prisma: PrismaClient) {}

  findByCpf = async (cpf: string): Promise<Doctor | null> => {
    const doctor = await this.prisma.doctor.findFirst({
      where: {
        cpf,
      },
    });

    if (!doctor) {
      return null;
    }

    return new Doctor(doctor);
  };

  findByCrm = async (crm: string): Promise<Doctor | null> => {
    const doctor = await this.prisma.doctor.findFirst({
      where: {
        crm,
      },
    });

    if (!doctor) {
      return null;
    }

    return new Doctor(doctor);
  };

  findByEmail = async (email: string): Promise<Doctor | null> => {
    const doctor = await this.prisma.doctor.findFirst({
      where: {
        email,
      },
    });

    if (!doctor) {
      return null;
    }

    return new Doctor(doctor);
  };

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

  create = async (doctor: Doctor): Promise<void> => {
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
  };
}
