interface ICreateDoctorInput {
  name: string;
  crm: string;
  landline: string;
  cellPhone: string;
  cep: string;
  specialties: string[];
}

interface ICreateDoctorOutput {
  id: string;
  name: string;
  crm: string;
  landline: string;
  cellPhone: string;
  cep: string;
  specialties: string[];
}
