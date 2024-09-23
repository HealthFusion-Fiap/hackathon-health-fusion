import express from 'express';
import { createDoctor } from './create';
import { listDoctors } from './list';

const doctorRoutes = express.Router();

doctorRoutes.use(createDoctor);
doctorRoutes.use(listDoctors);

export { doctorRoutes };
