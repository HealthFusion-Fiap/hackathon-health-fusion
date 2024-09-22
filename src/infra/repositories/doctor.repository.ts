import { PrismaClient } from '@prisma/client';
import { Doctor } from '@/entities/doctor.entity';

export default class PrismaDoctorRepository /* implements DoctorRepository */ {
  constructor(private prisma: PrismaClient) {}

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
