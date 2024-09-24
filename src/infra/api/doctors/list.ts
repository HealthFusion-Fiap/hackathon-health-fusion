import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import ListDoctorsController from '@/adapters/controllers/listDoctors.controller';
import { PrismaDoctorRepository } from '@/infra/database/prisma/doctor.repository';
import ListDoctorsUseCase from '@/domain/usecases/listDoctors/listDoctors.usecase';
import validator from '@/infra/middlewares/validator';

export const listDoctors = express.Router();

const prismaClient = new PrismaClient();
const doctorRepository = new PrismaDoctorRepository(prismaClient);
const listDoctorsUseCase = new ListDoctorsUseCase(doctorRepository);
const listDoctorsController = new ListDoctorsController(listDoctorsUseCase);

listDoctors.get(
  '/',
  validator('listDoctors'),
  async (request: Request, response: Response) => {
    const { code, body } = await listDoctorsController.execute();

    return response.status(code).send(body);
  },
);
