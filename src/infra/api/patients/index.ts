import express from 'express';
import { createPatient } from './create';

const patientRoutes = express.Router();

patientRoutes.use(createPatient);

export { patientRoutes };
