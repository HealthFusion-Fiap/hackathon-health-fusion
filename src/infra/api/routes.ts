import { Application } from 'express';
import { authRoutes } from './auth';
import { doctorRoutes } from './doctors';
import { patientRoutes } from './patients';
import { scheduleRoutes } from './schedules';

export default (app: Application) => {
  app.route('/healthcheck')
    .get((_, response) => response.status(200).end());

  app.route('/').get((_, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World!\n');
  });

  app.use('/schedules', scheduleRoutes);
  app.use('/doctors', doctorRoutes);
  app.use('/patients', patientRoutes);
  app.use('/auth', authRoutes);
};
