import { Entity } from './entity';

interface PatientProps {
  id?: string
  name: string
  email: string
  password: string
  cpf: string
}

export class Patient extends Entity<PatientProps> {
  constructor(input: PatientProps) {
    super(input, input.id);
  }

  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }
}
