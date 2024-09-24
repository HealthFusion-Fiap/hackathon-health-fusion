// eslint-disable-next-line import/no-extraneous-dependencies
import { mock, MockProxy } from 'jest-mock-extended';
import { DoctorNotFound, InvalidPassword } from '@/domain/errors';
import { DoctorRepository } from '@/domain/repositories/doctor';
import { HashGenerator } from '@/domain/services/hashGenerator';
import { Jwt } from '@/domain/services/jwt';
import { Doctor } from '@/entities/doctor.entity';
import CreateDoctorUsecase from './doctorLogin.usecase';

describe('Suit tests for Doctor Login Use Case', () => {
  let jwt: MockProxy<Jwt>;
  let doctorRepository: MockProxy<DoctorRepository>;
  let hashGenerator: MockProxy<HashGenerator>;
  let createDoctorUsecase: CreateDoctorUsecase;

  beforeEach(() => {
    jest.clearAllMocks();

    jwt = mock();
    hashGenerator = mock();
    doctorRepository = mock();

    createDoctorUsecase = new CreateDoctorUsecase(doctorRepository, hashGenerator, jwt);
  });

  it('should throw error when email does not exists', async () => {
    doctorRepository.findByEmail.mockResolvedValue(null);

    await expect(createDoctorUsecase.execute({
      email: 'doctor@gmail.com',
      password: '123',
    })).rejects.toThrow(new DoctorNotFound());
  });

  it('should throw error when password does not match', async () => {
    const doctor = mock<Doctor>();
    doctorRepository.findByEmail.mockResolvedValue(doctor);
    hashGenerator.compareSync.mockReturnValueOnce(false);

    await expect(createDoctorUsecase.execute({
      email: 'doctor@gmail.com',
      password: 'Xyz',
    })).rejects.toThrow(new InvalidPassword());
  });

  it('should return a token when doctor is found', async () => {
    const doctor = mock<Doctor>();
    doctorRepository.findByEmail.mockResolvedValue(doctor);
    hashGenerator.compareSync.mockReturnValueOnce(true);
    process.env.JWT_SECRET = 'secret';
    const token = 'token';
    jwt.sign.mockReturnValue(token);

    const result = await createDoctorUsecase.execute({
      email: 'doctor@gmail.com',
      password: '123',
    });

    expect(result).toEqual({ token });
  });
});
