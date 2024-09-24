import express from 'express';
import { createPatient } from './create';
import { schedulePatient } from '@/infra/api/patients/schedule';

const patientRoutes = express.Router();

patientRoutes.use(createPatient);
patientRoutes.use(schedulePatient);

export { patientRoutes };
