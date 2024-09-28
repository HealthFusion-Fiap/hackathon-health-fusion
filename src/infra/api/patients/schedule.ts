import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { SchedulePatientController } from '@/adapters/controllers/schedulePatient.controller';
import { SchedulePatientUseCase } from '@/domain/usecases/schedulePatient/schedulePatient.usecase';
import { PrismaScheduleRepository } from '@/infra/database/prisma/schedule.repository';
import { MailJetClient } from '@/infra/httpClient/mailJetClient';
import validator from '@/infra/middlewares/validator';
import { JwtGenerate } from '@/infra/services/jwt';

const schedulePatient = express.Router();

const jwtGenerate = new JwtGenerate();
const prismaClient = new PrismaClient();
const scheduleRepository = new PrismaScheduleRepository(prismaClient);
const mailJetClient = new MailJetClient();
const schedulePatientUseCase = new SchedulePatientUseCase(scheduleRepository, mailJetClient);
const schedulePatientController = new SchedulePatientController(
  schedulePatientUseCase,
  jwtGenerate,
);

schedulePatient.post(
  '/:patientId/schedules/:scheduleId',
  validator('schedulePatient'),
  async (request: Request, response: Response) => {
    const { code, body } = await schedulePatientController.execute({
      params: request.params,
      headers: request.headers,
    });

    return response.status(code).send(body);
  },
);

export { schedulePatient };
