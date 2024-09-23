import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { CreatePatientController } from '@/adapters/controllers/createPatient.controller';
import CreatePatientUsecase from '@/domain/usecases/createPatient/createPatient.usecase';
import { BcryptHasher } from '@/infra/cryptography/bcryptHasher';
import { PrismaPatientRepository } from '@/infra/database/prisma/patient.repository';

const createPatient = express.Router();

const prismaClient = new PrismaClient();
const bcryptHasher = new BcryptHasher();
const patientRepository = new PrismaPatientRepository(prismaClient);
const createPatientUseCase = new CreatePatientUsecase(patientRepository, bcryptHasher);
const createPatientController = new CreatePatientController(createPatientUseCase);

createPatient.post('/', async (request: Request, response:Response) => {
  const { code, body } = await createPatientController.execute({
    body: request.body,
  });

  return response.status(code).send(body);
});

export { createPatient };
