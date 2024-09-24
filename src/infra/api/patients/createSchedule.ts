import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import {
  CreatePatientScheduleController,
} from '@/adapters/controllers/createPatientSchedule.controller';
import {
  CreatePatientScheduleUseCase,
} from '@/domain/usecases/createPatientSchedule/createPatientScheduleUseCase';
import { PrismaScheduleRepository } from '@/infra/database/prisma/schedule.repository';

const createPatientSchedule = express.Router();

const prismaClient = new PrismaClient();
const scheduleRepository = new PrismaScheduleRepository(prismaClient);
const createPatientScheduleUseCase = new CreatePatientScheduleUseCase(scheduleRepository);
const createPatientScheduleController = new CreatePatientScheduleController(createPatientScheduleUseCase);

createPatientSchedule
  .post('/:patientId/schedules/:scheduleId', async (request: Request, response:Response) => {
    const { code, body } = await createPatientScheduleController.execute({
      body: request.body,
    });

    return response.status(code).send(body);
  });

export { createPatientSchedule };
