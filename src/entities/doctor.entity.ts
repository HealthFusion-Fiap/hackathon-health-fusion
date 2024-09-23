import { Entity } from './entity';

interface DoctorProps {
  id?: string
  name: string
  email: string
  password: string
  cpf: string
  crm: string
}

export class Doctor extends Entity<DoctorProps> {
  constructor(input: DoctorProps) {
    super(input, input.id);
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get cpf() {
    return this.props.cpf;
  }

  get crm() {
    return this.props.crm;
  }
}
