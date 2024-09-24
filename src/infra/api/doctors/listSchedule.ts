import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import {
  ListDoctorSchedulesController,
} from '@/adapters/controllers/listDoctorSchedules.controller';
import {
  ListDoctorSchedulesUseCase,
} from '@/domain/usecases/listDoctorSchedule/listDoctorSchedules.usecase';
import { PrismaDoctorRepository } from '@/infra/database/prisma/doctor.repository';
import { PrismaScheduleRepository } from '@/infra/database/prisma/schedule.repository';
import validator from '@/infra/middlewares/validator';

const listDoctorSchedules = express.Router();

const prismaClient = new PrismaClient();
const scheduleRepository = new PrismaScheduleRepository(prismaClient);
const doctorRepository = new PrismaDoctorRepository(prismaClient);
const listDoctorSchedulesUseCase = new ListDoctorSchedulesUseCase(
  scheduleRepository,
  doctorRepository,
);
const listDoctorSchedulesController = new ListDoctorSchedulesController(listDoctorSchedulesUseCase);

listDoctorSchedules.get(
  '/:doctorId/schedules',
  validator('listDoctorSchedules'),
  async (request: Request, response: Response) => {
    const { code, body } = await listDoctorSchedulesController.execute({
      params: request.params,
    });

    return response.status(code).send(body);
  },
);

export { listDoctorSchedules };
