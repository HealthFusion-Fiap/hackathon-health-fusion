export type CreateDoctorInput = {
  name: string
  crm: string
  landline: string
  cellPhone: string
  cep: string
  specialties: string[]
}

export type CreateDoctorOutput = {
  id: string
  name: string
  crm: string
  landline: string
  cellPhone: string
  cep: string
  specialties: string[]
}

