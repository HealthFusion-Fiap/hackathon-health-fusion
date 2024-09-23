import express from 'express';
import { createDoctor } from './create';

const doctorRoutes = express.Router();

doctorRoutes.use(createDoctor);

export { doctorRoutes };
