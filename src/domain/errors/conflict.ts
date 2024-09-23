export class ConflictError extends Error {
  constructor(public message: string) {
    super(message || 'Conflict');
  }
}

export class CpfAlreadyExists extends ConflictError {
  constructor() {
    super('CPF already exists');
  }
}

export class CrmAlreadyExists extends ConflictError {
  constructor() {
    super('CRM already exists');
  }
}

export class EmailAlreadyExists extends ConflictError {
  constructor() {
    super('Email already exists');
  }
}

export class ScheduleNotAvailable extends ConflictError {
  constructor() {
    super('Schedule not available');
  }
}
