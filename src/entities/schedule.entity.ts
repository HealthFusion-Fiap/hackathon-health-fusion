import { Doctor } from './doctor.entity';
import { Entity } from './entity';
import { Patient } from './patient.entity';

interface ScheduleProps {
  id?: string
  doctor: Doctor
  patient?: Patient
  startAt: Date
  endAt: Date
}

export class Schedule extends Entity<ScheduleProps> {
  constructor(input: ScheduleProps) {
    super(input, input.id);
  }

  get doctor() {
    return this.props.doctor;
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

  updatePatientId(patientId: string) {
    this.props.patient = new Patient({
      id: patientId,
      name: '',
      cpf: '',
      password: '',
      email: '',
    });
  }
}
