import express from 'express';
import { listDoctorSchedules } from '@/infra/api/doctors/listSchedule';
import { createDoctor } from './create';
import { listDoctors } from './list';

const doctorRoutes = express.Router();

doctorRoutes.use(createDoctor);
doctorRoutes.use(listDoctors);
doctorRoutes.use(listDoctorSchedules);

export { doctorRoutes };
