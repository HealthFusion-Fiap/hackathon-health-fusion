import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { SchedulePatientController, } from '@/adapters/controllers/schedulePatient.controller';
import { SchedulePatientUseCase, } from '@/domain/usecases/schedulePatient/schedulePatient.usecase';
import { PrismaScheduleRepository } from '@/infra/database/prisma/schedule.repository';
import validator from '@/infra/middlewares/validator';
import { MailJetClient } from '@/infra/httpClient/mailJetClient';

const schedulePatient = express.Router();

const prismaClient = new PrismaClient();
const scheduleRepository = new PrismaScheduleRepository(prismaClient);
const mailJetClient = new MailJetClient();
const schedulePatientUseCase = new SchedulePatientUseCase(scheduleRepository, mailJetClient);
const schedulePatientController = new SchedulePatientController(schedulePatientUseCase);

schedulePatient.post(
  '/:patientId/schedules/:scheduleId',
  validator('schedulePatient'),
  async (request: Request, response: Response) => {
    const { code, body } = await schedulePatientController.execute({
      params: request.params,
    });

    return response.status(code).send(body);
  },
);

export { schedulePatient };
