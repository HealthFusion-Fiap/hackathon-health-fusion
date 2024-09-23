import cors from 'cors';
import express from 'express';
import { doctorRoutes } from './doctors';
import { patientRoutes } from './patients';
import { scheduleRoutes } from './schedules';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/schedules', scheduleRoutes);
app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
