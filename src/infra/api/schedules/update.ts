import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { UpdateScheduleController } from '@/adapters/controllers/updateSchedule.controller';
import { UpdateScheduleUseCase } from '@/domain/usecases/updateSchedule/updateSchedule.usecase';
import { PrismaScheduleRepository } from '@/infra/database/prisma/schedule.repository';
import validator from '@/infra/middlewares/validator';

const updateSchedule = express.Router();

const prismaClient = new PrismaClient();
const scheduleRepository = new PrismaScheduleRepository(prismaClient);
const updateScheduleUseCase = new UpdateScheduleUseCase(scheduleRepository);
const updateScheduleController = new UpdateScheduleController(updateScheduleUseCase);

updateSchedule.put(
  '/:scheduleId',
  validator('updateSchedule'),
  async (request: Request, response: Response) => {
    const { code, body } = await updateScheduleController.execute({
      body: request.body,
      params: request.params,
    });

    return response.status(code).send(body);
  },
);

export { updateSchedule };
