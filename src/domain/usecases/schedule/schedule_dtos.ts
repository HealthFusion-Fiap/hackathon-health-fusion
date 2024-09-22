export type CreateScheduleInput = {
  doctor_id: string;
  patient_id: string;
  start_at: Date;
  end_at: Date;
}

export type CreateScheduleOutput = {
  id: string;
  doctor_id: string;
  start_at: Date;
  end_at: Date;
}

export type OpenSchedules = {
  id: string;
}
