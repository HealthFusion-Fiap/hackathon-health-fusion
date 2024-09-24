import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { PatientLoginController } from '@/adapters/controllers/patientLogin.controller';
import PatientLoginUsecase from '@/domain/usecases/patientLogin/patientLogin.usecase';
import { PrismaPatientRepository } from '@/infra/database/prisma/patient.repository';
import { BcryptHasher } from '@/infra/services/bcryptHasher';
import { JwtGenerate } from '@/infra/services/jwt';
import validator from '@/infra/middlewares/validator';

export const patientLogin = express.Router();

const prismaClient = new PrismaClient();
const bcryptHasher = new BcryptHasher();
const jwtGenerate = new JwtGenerate();

const patientRepository = new PrismaPatientRepository(prismaClient);
const patientLoginUseCase = new PatientLoginUsecase(patientRepository, bcryptHasher, jwtGenerate);
const patientLoginController = new PatientLoginController(patientLoginUseCase);

patientLogin.post(
  '/patient/login',
  validator('patientLogin'),
  async (request: Request, response: Response) => {
    const { code, body } = await patientLoginController.execute({
      body: request.body,
    });

    return response.status(code).send(body);
  },
);
