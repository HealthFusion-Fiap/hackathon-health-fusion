import { Doctor } from './doctor.entity';
import { Entity } from './entity';
import { Patient } from './patient.entity';

interface ScheduleProps {
  id?: string
  doctorId: string
  doctor: Doctor
  patientId?: string
  patient?: Patient
  startAt: Date
  endAt: Date
}

export class Schedule extends Entity<ScheduleProps> {
  constructor(input: ScheduleProps) {
    super(input, input.id);
  }

  get doctorId() {
    return this.props.doctorId;
  }

  get doctor() {
    return this.props.doctor;
  }

  get patientId(): string | null {
    return this.props.patientId ?? null;
  }

  set patientId(patientId: string) {
    this.props.patientId = patientId;
  }

  get patient() {
    return this.props.patient;
  }

  get startAt() {
    return this.props.startAt;
  }

  get endAt() {
    return this.props.endAt;
  }
}
