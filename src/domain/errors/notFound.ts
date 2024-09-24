export class NotFoundError extends Error {
  constructor(public message: string) {
    super(message || 'Not Found');
  }
}

export class DoctorNotFound extends NotFoundError {
  constructor() {
    super('Doctor not found');
  }
}

export class ScheduleNotFound extends NotFoundError {
  constructor() {
    super('Schedule not found');
  }
}

export class PatientNotFound extends NotFoundError {
  constructor() {
    super('Patient not found');
  }
}
