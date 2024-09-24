import express from 'express';
import { doctorLogin } from './doctorLogin';
import { patientLogin } from './patientLogin';

export const authRoutes = express.Router();

authRoutes.use(doctorLogin);
authRoutes.use(patientLogin);
