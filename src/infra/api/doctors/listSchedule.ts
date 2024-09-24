import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaScheduleRepository } from '@/infra/database/prisma/schedule.repository';
import {
  ListDoctorSchedulesUseCase,
} from '@/domain/usecases/listDoctorSchedule/listDoctorSchedulesUseCase';
import {
  ListDoctorSchedulesController,
} from '@/adapters/controllers/listDoctorSchedules.controller';
import { PrismaDoctorRepository } from '@/infra/database/prisma/doctor.repository';

const listDoctorSchedules = express.Router();

const prismaClient = new PrismaClient();
const scheduleRepository = new PrismaScheduleRepository(prismaClient);
const doctorRepository = new PrismaDoctorRepository(prismaClient);
const listDoctorSchedulesUseCase = new ListDoctorSchedulesUseCase(scheduleRepository, doctorRepository);
const listDoctorSchedulesController = new ListDoctorSchedulesController(listDoctorSchedulesUseCase);

listDoctorSchedules
  .post('/:doctorId/schedules', async (request: Request, response:Response) => {
    const { code, body } = await listDoctorSchedulesController.execute({
      body: request.body,
    });

    return response.status(code).send(body);
  });

export { listDoctorSchedules };
