// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import { PatientNotFound, InvalidPassword } from '@/domain/errors';
import { PatientRepository } from '@/domain/repositories/patient';
import { HashGenerator } from '@/domain/services/hashGenerator';
import { Jwt } from '@/domain/services/jwt';
import { Patient } from '@/entities/patient.entity';
import CreatePatientUsecase from './patientLogin.usecase';

describe('Suit tests for Patient Login Use Case', () => {
  let jwt: MockProxy<Jwt>;
  let patientRepository: MockProxy<PatientRepository>;
  let hashGenerator: MockProxy<HashGenerator>;
  let createPatientUsecase: CreatePatientUsecase;

  beforeEach(() => {
    jest.clearAllMocks();

    jwt = mock();
    hashGenerator = mock();
    patientRepository = mock();

    createPatientUsecase = new CreatePatientUsecase(patientRepository, hashGenerator, jwt);
  });

  it('should throw error when email does not exists', async () => {
    patientRepository.findByEmail.mockResolvedValue(null);

    await expect(createPatientUsecase.execute({
      email: 'patient@gmail.com',
      password: '123',
    })).rejects.toThrow(new PatientNotFound());
  });

  it('should throw error when password does not match', async () => {
    const patient = mock<Patient>();
    patientRepository.findByEmail.mockResolvedValue(patient);
    hashGenerator.compareSync.mockReturnValueOnce(false);

    await expect(createPatientUsecase.execute({
      email: 'patient@gmail.com',
      password: 'Xyz',
    })).rejects.toThrow(new InvalidPassword());
  });

  it('should return a token when patient is found', async () => {
    const patient = mock<Patient>();
    patientRepository.findByEmail.mockResolvedValue(patient);
    hashGenerator.compareSync.mockReturnValueOnce(true);
    process.env.JWT_SECRET = 'secret';
    const token = 'token';
    jwt.sign.mockReturnValue(token);

    const result = await createPatientUsecase.execute({
      email: 'patient@gmail.com',
      password: '123',
    });

    expect(result).toEqual({ token });
  });
});
