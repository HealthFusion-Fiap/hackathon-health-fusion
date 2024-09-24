// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import { HashGenerator } from '@/domain/services/hashGenerator';
import { CpfAlreadyExists, EmailAlreadyExists } from '@/domain/errors';
import { PatientRepository } from '@/domain/repositories/patient';
import { Patient } from '@/entities/patient.entity';
import CreatePatientUsecase from './createPatient.usecase';

describe('Suit tests for Create Patient Use Case', () => {
  let patientRepository: MockProxy<PatientRepository>;
  let hashGenerator: MockProxy<HashGenerator>;
  let createPatientUsecase: CreatePatientUsecase;

  beforeEach(() => {
    hashGenerator = mock();
    patientRepository = mock();

    createPatientUsecase = new CreatePatientUsecase(patientRepository, hashGenerator);
  });

  it('should throw error when cpf already exists', async () => {
    const patient = mock<Patient>();
    patientRepository.findByCpf.mockResolvedValue(patient);

    await expect(createPatientUsecase.execute({
      cpf: '123123213',
      email: 'patient@gmail.com',
      name: 'patient who',
      password: '123',
    })).rejects.toThrow(new CpfAlreadyExists());
  });

  it('should throw error when email already exists', async () => {
    patientRepository.findByCpf.mockResolvedValue(null);
    patientRepository.findByEmail.mockResolvedValue(mock<Patient>());

    await expect(createPatientUsecase.execute({
      cpf: '123123213',
      email: 'patient@gmail.com',
      name: 'patient who',
      password: '123',
    })).rejects.toThrow(new EmailAlreadyExists());
  });

  it('should be able to create a patient', async () => {
    patientRepository.findByCpf.mockResolvedValue(null);
    hashGenerator.hash.mockResolvedValue('321');

    const { patient } = await createPatientUsecase.execute({
      cpf: '123123213',
      email: 'patient@gmail.com',
      name: 'patient who',
      password: '123',
    });

    expect(patient).toEqual({
      _id: patient.id,
      props: {
        cpf: '123123213',
        email: 'patient@gmail.com',
        name: 'patient who',
        password: '321',
      },
    });
  });
});
