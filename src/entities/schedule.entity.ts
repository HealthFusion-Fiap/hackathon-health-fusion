import { randomUUID } from 'node:crypto';

export class Schedule {
  id: string;
  patient_id: string;
  doctor_id: string;
  start_at: Date;
  end_at: Date;

  constructor(input: Schedule) {
    this.id = input.id ?? randomUUID();

    Object.assign(this, input);
  }
}
