import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import ListDoctorsController from '@/adapters/controllers/listDoctors.controller';
import ListDoctorsUseCase from '@/domain/usecases/listDoctors/listDoctors.usecase';
import { PrismaDoctorRepository } from '@/infra/database/prisma/doctor.repository';
import validator from '@/infra/middlewares/validator';
import { JwtGenerate } from '@/infra/services/jwt';

export const listDoctors = express.Router();

const jwtGenerate = new JwtGenerate();
const prismaClient = new PrismaClient();
const doctorRepository = new PrismaDoctorRepository(prismaClient);
const listDoctorsUseCase = new ListDoctorsUseCase(doctorRepository);
const listDoctorsController = new ListDoctorsController(listDoctorsUseCase, jwtGenerate);

listDoctors.get(
  '/',
  validator('listDoctors'),
  async (request: Request, response: Response) => {
    const { code, body } = await listDoctorsController.execute({
      headers: request.headers,
    });

    return response.status(code).send(body);
  },
);
