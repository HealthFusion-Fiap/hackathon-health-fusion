import { Doctor } from "@/entities/doctor.entity";
import { PrismaClient } from "@prisma/client";

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

  public async exists(doctor: Doctor): Promise<boolean> {
    const doctorBd = this.prisma.doctor.findUnique({
      where: { doctorId: doctor.id },
    });
    return doctorBd != null;
  }
}
