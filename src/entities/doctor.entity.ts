import { randomUUID } from "node:crypto";

export class Doctor {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  crm: string;

  constructor(input: Doctor) {
    this.id = input.id ?? randomUUID();

    Object.assign(this, input);
  }
}
