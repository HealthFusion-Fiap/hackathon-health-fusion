import express from 'express';
import { createSchedule } from './create';
import { updateSchedule } from './update';

const scheduleRoutes = express.Router();

scheduleRoutes.use(createSchedule);
scheduleRoutes.use(updateSchedule);

export { scheduleRoutes };
