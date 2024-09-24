import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { DoctorLoginController } from '@/adapters/controllers/doctorLogin.controller';
import DoctorLoginUsecase from '@/domain/usecases/doctorLogin/doctorLogin.usecase';
import { PrismaDoctorRepository } from '@/infra/database/prisma/doctor.repository';
import { BcryptHasher } from '@/infra/services/bcryptHasher';
import { JwtGenerate } from '@/infra/services/jwt';
import validator from '@/infra/middlewares/validator';

export const doctorLogin = express.Router();

const prismaClient = new PrismaClient();
const bcryptHasher = new BcryptHasher();
const jwtGenerate = new JwtGenerate();

const doctorRepository = new PrismaDoctorRepository(prismaClient);
const doctorLoginUseCase = new DoctorLoginUsecase(doctorRepository, bcryptHasher, jwtGenerate);
const doctorLoginController = new DoctorLoginController(doctorLoginUseCase);

doctorLogin.post(
  '/doctor/login',
  validator('doctorLogin'),
  async (request: Request, response: Response) => {
    const { code, body } = await doctorLoginController.execute({
      body: request.body,
    });

    return response.status(code).send(body);
  },
);
