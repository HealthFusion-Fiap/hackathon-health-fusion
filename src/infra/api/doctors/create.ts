import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { CreateDoctorController } from '@/adapters/controllers/createDoctor.controller';
import CreateDoctorUsecase from '@/domain/usecases/createDoctor/createDoctor.usecase';
import { BcryptHasher } from '@/infra/cryptography/bcryptHasher';
import { PrismaDoctorRepository } from '@/infra/database/prisma/doctor.repository';

const createDoctor = express.Router();

const prismaClient = new PrismaClient();
const bcryptHasher = new BcryptHasher();
const doctorRepository = new PrismaDoctorRepository(prismaClient);
const createDoctorUseCase = new CreateDoctorUsecase(doctorRepository, bcryptHasher);
const createDoctorController = new CreateDoctorController(createDoctorUseCase);

createDoctor.post('/', async (request: Request, response: Response) => {
  const { code, body } = await createDoctorController.execute({
    body: request.body,
  });

  return response.status(code).send(body);
});

export { createDoctor };
