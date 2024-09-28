import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { CreateDoctorController } from '@/adapters/controllers/createDoctor.controller';
import CreateDoctorUsecase from '@/domain/usecases/createDoctor/createDoctor.usecase';
import { PrismaDoctorRepository } from '@/infra/database/prisma/doctor.repository';
import validator from '@/infra/middlewares/validator';
import { BcryptHasher } from '@/infra/services/bcryptHasher';

export const createDoctor = express.Router();

const prismaClient = new PrismaClient();
const bcryptHasher = new BcryptHasher();
const doctorRepository = new PrismaDoctorRepository(prismaClient);
const createDoctorUseCase = new CreateDoctorUsecase(doctorRepository, bcryptHasher);
const createDoctorController = new CreateDoctorController(createDoctorUseCase);

createDoctor.post(
  '/',
  validator('createDoctor'),
  async (request: Request, response: Response) => {
    const { code, body } = await createDoctorController.execute({
      body: request.body,
    });

    return response.status(code).send(body);
  },
);
