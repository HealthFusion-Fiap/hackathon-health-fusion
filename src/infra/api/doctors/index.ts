import express from 'express';
import { createDoctor } from './create';
import { listDoctors } from './list';
import { listDoctorSchedules } from '@/infra/api/doctors/listSchedule';

const doctorRoutes = express.Router();

doctorRoutes.use(createDoctor);
doctorRoutes.use(listDoctors);
doctorRoutes.use(listDoctorSchedules);

export { doctorRoutes };
