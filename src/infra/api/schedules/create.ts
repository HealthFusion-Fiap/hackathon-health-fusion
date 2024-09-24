import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { CreateScheduleController } from '@/adapters/controllers/createSchedule.controller';
import { CreateScheduleUseCase } from '@/domain/usecases/createSchedule/createSchedule.usecase';
import { PrismaDoctorRepository } from '@/infra/database/prisma/doctor.repository';
import { PrismaScheduleRepository } from '@/infra/database/prisma/schedule.repository';
import validator from '@/infra/middlewares/validator';

const createSchedule = express.Router();

const prismaClient = new PrismaClient();
const doctorRepository = new PrismaDoctorRepository(prismaClient);
const scheduleRepository = new PrismaScheduleRepository(prismaClient);
const createScheduleUseCase = new CreateScheduleUseCase(scheduleRepository, doctorRepository);
const createScheduleController = new CreateScheduleController(createScheduleUseCase);

createSchedule.post(
  '/',
  validator('createSchedule'),
  async (request: Request, response: Response) => {
    const { code, body } = await createScheduleController.execute({
      body: request.body,
    });

    return response.status(code).send(body);
  },
);

export { createSchedule };
