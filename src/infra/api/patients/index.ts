import express from 'express';
import { createPatient } from './create';
import { createPatientSchedule } from '@/infra/api/patients/createSchedule';

const patientRoutes = express.Router();

patientRoutes.use(createPatient);
patientRoutes.use(createPatientSchedule);

export { patientRoutes };
